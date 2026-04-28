// ============================================================
// FILE: /api/chat.ts  — place at PROJECT ROOT /api/chat.ts
// Vercel serverless function: Groq AI + Supabase logging
// ============================================================
// Env vars to add in Vercel Dashboard → Settings → Env Variables:
//   GROQ_API_KEY
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL   = "llama-3.3-70b-versatile";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function buildSystemPrompt(lang: string, mode: string): string {
  const langInstr =
    lang === "fil"
      ? `
LANGUAGE RULES (SUNDIN ITO PALAGI):
- Sumagot sa natural na Filipino na ginagamit ng mga totoong Pilipino sa araw-araw.
- Huwag mag-translate ng salita sa salita mula sa Ingles — magsulat nang natural, parang nakikipag-usap ka sa isang kaibigan o kamag-anak.
- Huwag gumamit ng malalim o pormal na Filipino na hindi ginagamit sa totoong buhay.
- Panatilihin ang mga karaniwang tech na salita sa Ingles: "online", "chat", "account", "password", "settings", "screenshot", "block", "report". Huwag puwersahang i-translate ito.
- Gumamit ng "po/opo" kapag kausap ang magulang o guro. Sa bata, gamitin ang mas relaxed na tono.
- MALI: "Kontrola ang inyong mga karapatan sa pagbabahagi ng impormasyon sa digital na espasyo."
- TAMA: "I-check ang iyong privacy settings para hindi makita ng lahat ang iyong profile."
- MALI: "Huwag ipahayag ang inyong pampaaralang pangalan sa mga estranyo sa internet."
- TAMA: "Huwag ibahagi ang pangalan ng iyong paaralan sa mga taong hindi mo kilala online."
`
      : `Respond in clear, simple English. Use everyday words — avoid legal or academic language.`;

  const toneInstr = `
TONE & LENGTH RULES:
- Keep replies SHORT. 3 to 5 sentences for simple questions. Never write a long essay unless the user specifically asks for more detail.
- Use numbered steps ONLY when giving actual step-by-step instructions. Otherwise write in normal sentences.
- Do not bullet-point everything — it feels robotic and cold.
- Be warm and friendly, not stiff or formal.
- End with one short follow-up offer if helpful, but keep it brief.
`;

  const modeCtx: Record<string, string> = {
    child:
      "You are speaking to a CHILD or TEEN. Use simple, kind words. Never shame them. Reassure them that they are safe and can always ask a trusted adult for help.",
    parent:
      "You are speaking to a PARENT or GUARDIAN. Give practical advice they can act on right away. Mention Philippine resources when relevant: MAKABATA 1383, PNP-ACG 8723-0401, RA 9775, RA 10175.",
    teacher:
      "You are speaking to a TEACHER or EDUCATOR. Provide DepEd K-12 aligned lesson ideas, classroom activities, and age-appropriate internet safety guides.",
    emergency:
      "EMERGENCY MODE. Stay calm and direct. ALWAYS include these hotlines early in your reply: PNP-ACG #8723-0401 | MAKABATA 1383 | DSWD 8888 | NBI Cybercrime (02)523-8231. User safety comes first.",
  };

  return `You are SafeBot, the child online safety assistant of SAFENET Philippines.

${modeCtx[mode] ?? modeCtx["child"]}
${langInstr}
${toneInstr}

You can help with: online grooming, cyberbullying, phishing, sextortion, app safety (TikTok, Facebook, Roblox, Discord), privacy settings, Philippine laws (RA 11930, RA 10173, RA 9775, RA 10175), and emergency escalation.

Rules:
- Never blame the victim
- Cite specific Philippine laws only when directly relevant
- If someone is in immediate danger, lead with hotline numbers first
- Only answer online safety topics — redirect anything unrelated`.trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Method not allowed" });

  const { messages, mode, lang, sessionId } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0)
    return res.status(400).json({ error: "messages[] is required" });

  const userMessage = messages[messages.length - 1]?.content ?? "";

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        Authorization:   `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model:       GROQ_MODEL,
        max_tokens:  400,   // reduced from 1024 — keeps replies short and conversational
        temperature: 0.6,   // slightly lower — more consistent, less rambling
        messages: [
          { role: "system", content: buildSystemPrompt(lang ?? "en", mode ?? "child") },
          ...messages,
        ],
      }),
    });

    if (!groqRes.ok) {
      const groqErr = await groqRes.json();
      throw new Error(groqErr?.error?.message ?? "Groq API error");
    }

    const groqData   = await groqRes.json();
    const reply      = groqData.choices?.[0]?.message?.content ?? "Sorry, I could not get a response.";
    const tokensUsed = groqData.usage?.total_tokens ?? 0;

    // Fire-and-forget Supabase log — never blocks the response
    supabase.from("chat_logs").insert({
      session_id:   sessionId ?? "anonymous",
      mode:         mode      ?? "child",
      lang:         lang      ?? "en",
      user_message: userMessage,
      bot_reply:    reply,
      tokens_used:  tokensUsed,
      model:        GROQ_MODEL,
      created_at:   new Date().toISOString(),
    }).then(({ error }) => {
      if (error) console.error("[Supabase log error]", error.message);
    });

    return res.status(200).json({ reply });

  } catch (err: any) {
    console.error("[SafeBot API error]", err.message);
    return res.status(500).json({ error: err.message ?? "Internal server error" });
  }
}