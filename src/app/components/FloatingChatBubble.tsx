import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode    = "child" | "parent" | "teacher" | "emergency";
type Lang    = "en" | "fil";
type Screen  = "home" | "chat";
type Message = { role: "user" | "assistant"; content: string };

// ─── Session ID (unique per browser tab) ─────────────────────────────────────
const SESSION_ID = Math.random().toString(36).slice(2);

// ─── Suggestion chips per mode (bilingual) ────────────────────────────────────
const modeSuggestions: Record<Mode, Record<Lang, string[]>> = {
  child: {
    en:  ["What is online grooming?", "Is it safe to share my school name online?", "Someone is bullying me in a game chat", "I got a message saying I won a prize"],
    fil: ["Ano ang online grooming?", "Pwede bang ibahagi ang pangalan ng aking paaralan?", "May nambubully sa akin sa game chat", "May nag-message na nanalo raw ako ng premyo"],
  },
  parent: {
    en:  ["Signs my child is being groomed online", "How to set parental controls on Android", "How to talk to my child about online safety", "My child received a suspicious message"],
    fil: ["Paano malalaman kung ginugrumo ang anak ko online?", "Paano mag-set ng parental controls sa Android?", "Paano makikipag-usap sa anak tungkol sa online safety?", "Natanggap ng anak ko ang isang kahina-hinalang mensahe"],
  },
  teacher: {
    en:  ["How to teach online safety to Grade 5", "Activities about cyberbullying for class", "DepEd-aligned lesson plan for internet safety", "How to explain phishing to children"],
    fil: ["Paano ituturo ang online safety sa Grade 5?", "Mga aktibidad tungkol sa cyberbullying para sa klase", "Lesson plan tungkol sa internet safety na aligned sa DepEd", "Paano ipaliwanag ang phishing sa mga bata?"],
  },
  emergency: {
    en:  ["Someone is threatening me online right now", "I shared personal info with a stranger", "I'm scared of an online person", "I need help reporting something urgent"],
    fil: ["May nagbabanta sa akin online ngayon", "Nagbigay na ako ng personal na impormasyon sa isang estranyo", "Natatakot ako sa isang tao online", "Kailangan ko ng tulong para mag-report ng isang bagay"],
  },
};

// ─── Greeting messages (bilingual) ───────────────────────────────────────────
const greetings: Record<Mode, Record<Lang, string>> = {
  child: {
    en:  "Hello! I'm <strong>SafeBot</strong> — your online safety assistant.<br/><br/>How can I help you stay safe online today?",
    fil: "Kamusta! Ako si <strong>SafeBot</strong> — narito ako para tulungan ka na manatiling ligtas online.<br/><br/>Ano ang gusto mong malaman?",
  },
  parent: {
    en:  "Hello. I'm <strong>SafeBot</strong> in Parent Mode.<br/><br/>I'm here to help you understand online risks, recognize warning signs, and protect your child. What would you like to know?",
    fil: "Magandang araw po! Ako si <strong>SafeBot</strong>.<br/><br/>Narito ako para tulungan kayong protektahan ang inyong anak online. Ano ang gusto ninyong malaman?",
  },
  teacher: {
    en:  "Good day, Teacher. I'm <strong>SafeBot</strong> in Teacher Mode.<br/><br/>I can help you plan online safety lessons and classroom discussions. What do you need today?",
    fil: "Magandang araw po, Guro! Ako si <strong>SafeBot</strong>.<br/><br/>Makakatulong ako sa pagplanong mga aralin tungkol sa online safety. Ano ang kailangan ninyo?",
  },
  emergency: {
    en:  "⚠️ <strong>Emergency Mode Activated.</strong><br/><br/>If you are in immediate physical danger, please call <strong>911</strong> first.<br/><br/>For online safety emergencies:<br/>📞 PNP-ACG: <strong>8723-0401</strong><br/>📞 MAKABATA: <strong>1383</strong><br/><br/>Describe your situation and I will guide you. You are not alone.",
    fil: "⚠️ <strong>Emergency Mode.</strong><br/><br/>Kung nasa agarang panganib ka, tumawag sa <strong>911</strong>.<br/><br/>Para sa online safety:<br/>📞 PNP-ACG: <strong>8723-0401</strong><br/>📞 MAKABATA: <strong>1383</strong><br/><br/>Sabihin mo sa akin ang iyong sitwasyon. Nandito lang ako para sa iyo.",
  },
};

// ─── Mode config (home screen grid) ──────────────────────────────────────────
const MODE_CONFIG = [
  { id: "parent"    as Mode, label: "Parent",    labelFil: "Magulang", emoji: "👨‍👩‍👧", borderColor: "#93c5fd", hoverBorder: "#3b82f6", bgColor: "#fff" },
  { id: "child"     as Mode, label: "Child",     labelFil: "Bata",     emoji: "🧒",    borderColor: "#86efac", hoverBorder: "#22c55e", bgColor: "#fff" },
  { id: "teacher"   as Mode, label: "Teacher",   labelFil: "Guro",     emoji: "📚",    borderColor: "#d8b4fe", hoverBorder: "#a855f7", bgColor: "#fff" },
  { id: "emergency" as Mode, label: "Emergency", labelFil: "Emergency",emoji: "🚨",    borderColor: "#fca5a5", hoverBorder: "#ef4444", bgColor: "#fef2f2" },
] as const;

// ─── Quick Access items ───────────────────────────────────────────────────────
const QUICK_ACCESS = [
  { emoji: "🎮", label: "App Safety Checker",         labelFil: "App Safety Checker",       mode: "parent"   as Mode, prompt: "Which apps are safe for children?" },
  { emoji: "⚖️", label: "Philippine Law Explainer",   labelFil: "Paliwanag ng Batas",        mode: "parent"   as Mode, prompt: "Explain Philippine online safety laws for children." },
  { emoji: "🔒", label: "Privacy Settings Guide",     labelFil: "Gabay sa Privacy Settings", mode: "parent"   as Mode, prompt: "How do I set up privacy settings to protect my child?" },
  { emoji: "❓", label: "Frequently Asked Questions", labelFil: "Mga Madalas na Tanong",     mode: "child"    as Mode, prompt: "What are the most common online safety questions?" },
  { emoji: "📖", label: "Classroom Lesson Guide",     labelFil: "Gabay sa Leksyon",          mode: "teacher"  as Mode, prompt: "Give me a classroom lesson guide for online safety." },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

  .sb-shell * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }

  .sb-fab {
    position: fixed; bottom: 16px; right: 16px;
    display: flex; align-items: center; gap: 8px;
    padding: 12px 20px; border-radius: 50px;
    background: linear-gradient(135deg, #1a5fa8, #0f2b4a);
    border: none; box-shadow: 0 6px 24px rgba(15,43,74,.35);
    cursor: pointer; color: #fff; font-size: 14px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; letter-spacing: .2px;
    transition: transform .2s, box-shadow .2s; z-index: 1000;
  }
  .sb-fab:hover { transform: scale(1.05); box-shadow: 0 8px 28px rgba(15,43,74,.45); }

  .sb-panel {
    position: fixed; bottom: 16px; right: 24px;
    width: 600px; max-width: calc(90vw - 40px);
    height: 560px; max-height: calc(100vh - 100px);
    background: #fff; border-radius: 20px;
    box-shadow: 0 16px 56px rgba(15,43,74,.2);
    z-index: 999; display: flex; flex-direction: column; overflow: hidden;
    border: 1px solid rgba(15,43,74,.08);
    animation: sb-fadein .22s ease;
  }
  @keyframes sb-fadein { from{opacity:0;transform:translateY(12px) scale(.97)} to{opacity:1;transform:none} }

  .sb-header {
    background: linear-gradient(135deg, #0f2b4a 0%, #1a3f5c 100%);
    padding: 10px 14px;
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .sb-back-btn {
    background: none; border: none; cursor: pointer; color: rgba(255,255,255,.5);
    padding: 4px; display: flex; align-items: center; transition: color .2s; margin-right: 2px;
  }
  .sb-back-btn:hover { color: #fff; }
  .sb-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(74,222,128,.15); border: 1px solid rgba(74,222,128,.35);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80;
  }
  .sb-header-text { flex: 1; }
  .sb-bot-name { font-weight: 700; color: #fff; font-size: 14px; line-height: 1.2; }
  .sb-bot-sub  { font-size: 11px; color: rgba(255,255,255,.5); margin-top: 1px; }
  .sb-header-right { display: flex; align-items: center; gap: 6px; }
  .sb-lang-btn {
    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
    border-radius: 7px; color: #fff; font-size: 11px; font-weight: 700;
    padding: 4px 10px; cursor: pointer; letter-spacing: .3px;
    font-family: 'DM Sans', sans-serif; transition: background .2s;
  }
  .sb-lang-btn:hover { background: rgba(255,255,255,.22); }
  .sb-close-btn {
    background: none; border: none; cursor: pointer; color: rgba(255,255,255,.5);
    padding: 4px; display: flex; align-items: center; transition: color .2s;
  }
  .sb-close-btn:hover { color: #fff; }

  /* HOME */
  .sb-home { flex: 1; overflow-y: auto; padding: 16px 16px 16px; }
  .sb-home::-webkit-scrollbar { width: 4px; }
  .sb-home::-webkit-scrollbar-thumb { background: #dce8f0; border-radius: 4px; }
  .sb-home-title { font-size: 15px; font-weight: 700; color: #0f2b4a; margin-bottom: 4px; }
  .sb-home-sub   { font-size: 12px; color: #94a3b8; margin-bottom: 18px; }

  .sb-mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 22px; }
  .sb-mode-card {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    padding: 12px 8px; border-radius: 14px; border: 2px solid;
    cursor: pointer; transition: all .2s; text-align: center; background: #fff;
  }
  .sb-mode-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,.08); }
  .sb-mode-card:active { transform: scale(.97); }
  .sb-mode-icon  { font-size: 26px; line-height: 1; }
  .sb-mode-label { font-size: 12px; font-weight: 600; color: #1e293b; }

  .sb-qa-label { font-size: 10px; font-weight: 700; letter-spacing: 1.2px; color: #94a3b8; text-transform: uppercase; margin-bottom: 10px; }
  .sb-qa-list  { display: flex; flex-direction: column; gap: 6px; }
  .sb-qa-item {
    display: flex; align-items: center; gap: 11px;
    padding: 11px 14px; border-radius: 12px; background: #f8fafc;
    border: 1px solid #f1f5f9; cursor: pointer; transition: all .2s; text-align: left;
  }
  .sb-qa-item:hover { background: #f0fdf4; border-color: #86efac; }
  .sb-qa-emoji { font-size: 16px; flex-shrink: 0; }
  .sb-qa-text  { font-size: 13px; color: #334155; font-weight: 500; }

  /* CHAT */
  .sb-emg-banner {
    margin: 10px 16px 0; background: #fef2f2; border: 1px solid #fca5a5;
    border-radius: 12px; padding: 11px 32px 11px 13px; display: flex; gap: 9px;
    font-size: 12.5px; color: #991b1b; flex-shrink: 0; line-height: 1.6;
    cursor: pointer; position: relative;
    transition: opacity .4s ease, max-height .4s ease, margin .4s ease, padding .4s ease;
    max-height: 120px; opacity: 1; overflow: hidden;
  }
  .sb-emg-banner:hover { background: #fee2e2; }
  .sb-emg-banner.fading { opacity: 0; max-height: 0; margin-top: 0; padding-top: 0; padding-bottom: 0; pointer-events: none; }
  .sb-emg-banner a { color: #991b1b; font-weight: 700; }
  .sb-emg-dismiss { position: absolute; top: 8px; right: 10px; font-size: 12px; opacity: .5; }

  .sb-suggestions { padding: 10px 16px; overflow: hidden; flex-shrink: 0; transition: max-height .4s, opacity .4s, padding .4s; max-height: 180px; opacity: 1; }
  .sb-suggestions.hidden { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; pointer-events: none; }
  .sb-sugg-label { font-size: 10px; font-weight: 600; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
  .sb-chips { display: flex; flex-direction: column; gap: 6px; }
  .sb-chip {
    padding: 8px 13px; border-radius: 10px; border: 1.5px solid #dce8f0; background: #fff;
    font-size: 12.5px; color: #1a5fa8; cursor: pointer; text-align: left;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: background .2s, border-color .2s, opacity .3s, transform .3s;
  }
  .sb-chip:hover { background: #e8f4fb; border-color: #2e8bce; }
  .sb-chip.fading { opacity: 0; transform: translateY(-5px); pointer-events: none; }

  .sb-body { flex: 1; overflow-y: auto; padding: 16px 16px 8px; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth; background: #f8fafc; }
  .sb-body::-webkit-scrollbar { width: 4px; }
  .sb-body::-webkit-scrollbar-thumb { background: #dce8f0; border-radius: 4px; }

  .sb-msg { display: flex; gap: 8px; max-width: 88%; }
  .sb-msg.bot  { align-self: flex-start; }
  .sb-msg.user { align-self: flex-end; flex-direction: row-reverse; }
  .sb-msg-avatar { width: 30px; height: 30px; background: #2e8bce; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; align-self: flex-end; }
  .sb-bubble { padding: 12px 15px; border-radius: 16px; font-size: 13.5px; line-height: 1.75; color: #0f2b4a; }
  .sb-msg.bot  .sb-bubble { background: #fff; border: 1px solid #e2e8f0; border-bottom-left-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
  .sb-msg.user .sb-bubble { background: linear-gradient(135deg, #0f2b4a, #1a3f5c); color: #fff; border-bottom-right-radius: 4px; }
  @keyframes sb-msgin { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .sb-msg { animation: sb-msgin .22s ease; }

  .sb-typing { display: flex; gap: 4px; padding: 2px; }
  .sb-typing span { width: 6px; height: 6px; background: #94a3b8; border-radius: 50%; animation: sb-bounce .9s infinite; }
  .sb-typing span:nth-child(2) { animation-delay: .15s; }
  .sb-typing span:nth-child(3) { animation-delay: .30s; }
  @keyframes sb-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }

  .sb-footer { border-top: 1px solid #e2e8f0; padding: 12px 16px; background: #fff; flex-shrink: 0; }
  .sb-input-row { display: flex; gap: 8px; align-items: flex-end; }
  .sb-input {
    flex: 1; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 9px 13px;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif; color: #0f2b4a;
    outline: none; resize: none; max-height: 90px; line-height: 1.5;
    transition: border-color .2s; background: #f8fafc;
  }
  .sb-input::placeholder { color: #aab8c5; }
  .sb-input:focus { border-color: #2e8bce; background: #fff; }
  .sb-input:disabled { cursor: not-allowed; opacity: .6; }
  .sb-send {
    width: 40px; height: 40px; border-radius: 11px;
    background: linear-gradient(135deg, #0f2b4a, #1a3f5c);
    border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: opacity .2s, transform .15s; flex-shrink: 0;
  }
  .sb-send:hover:not(:disabled) { opacity: .88; }
  .sb-send:active:not(:disabled) { transform: scale(.93); }
  .sb-send:disabled { opacity: .35; cursor: not-allowed; }
  .sb-footnote { margin-top: 8px; font-size: 11px; color: #94a3b8; text-align: center; }
  .sb-footnote a { color: #c0392b; font-weight: 600; text-decoration: none; }
`;

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const IconShield = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
    <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
  </svg>
);

// ─── Markdown → HTML renderer ────────────────────────────────────────────────
function renderMessage(raw: string): string {
  // Greetings already have HTML tags — return as-is
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw;

  const lines = raw.split("\n");
  const output: string[] = [];

  const applyInline = (text: string) =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+?)\*/g, "<em>$1</em>")
      .replace(/(#777|1383|8888)/g,
        '<span style="background:#fef2f2;border:1px solid #fca5a5;color:#c0392b;font-weight:700;border-radius:6px;padding:1px 6px;font-size:12px">📞 $1</span>');

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    // Numbered list — matches "1." "1)" "1 " at start of line
    const numMatch = line.match(/^(\d+)[.)\s]\s*(.+)$/);
    if (numMatch) {
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        const m = l.match(/^(\d+)[.)\s]\s*(.+)$/);
        if (m)      { items.push(applyInline(m[2])); i++; }
        else if (!l){ i++; break; }
        else        { break; }
      }
      const stepsHtml = items.map((text, idx) =>
        `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:8px">` +
        `<span style="background:#0f2b4a;color:#fff;border-radius:50%;min-width:22px;height:22px;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${idx + 1}</span>` +
        `<span style="line-height:1.65">${text}</span></div>`
      ).join("");
      output.push(`<div style="margin:10px 0">${stepsHtml}</div>`);
      continue;
    }

    // Bullet list — "•", "-", "*"
    const bulletMatch = line.match(/^[•\-]\s+(.+)$/);
    if (bulletMatch) {
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        const m = l.match(/^[•\-]\s+(.+)$/);
        if (m)      { items.push(applyInline(m[1])); i++; }
        else if (!l){ i++; break; }
        else        { break; }
      }
      const listHtml = items.map(t =>
        `<li style="margin-bottom:5px;line-height:1.65">${t}</li>`
      ).join("");
      output.push(`<ul style="padding-left:18px;margin:8px 0">${listHtml}</ul>`);
      continue;
    }

    // Regular paragraph
    output.push(`<p style="margin:0 0 9px 0;line-height:1.7">${applyInline(line)}</p>`);
    i++;
  }

  return output.join("");
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FloatingChatBubble() {
  const [isOpen, setIsOpen]           = useState(false);
  const [screen, setScreen]           = useState<Screen>("home");
  const [mode, setMode]               = useState<Mode>("child");
  const [lang, setLang]               = useState<Lang>("en");
  const [messages, setMessages]       = useState<Message[]>([]);
  const [input, setInput]             = useState("");
  const [isTyping, setIsTyping]       = useState(false);
  const [chips, setChips]             = useState<string[]>([]);
  const [fadingChips, setFadingChips] = useState<Set<string>>(new Set());
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [bannerFading, setBannerFading] = useState(false);
  const [showBanner, setShowBanner]   = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef    = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── API call (shared helper) ──────────────────────────────────────────────────
  const sendToApi = useCallback(async (history: Message[], activeMode: Mode, activeLang: Lang) => {
    setIsTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages:  history.map(m => ({ role: m.role, content: m.content })),
          mode:      activeMode,
          lang:      activeLang,
          sessionId: SESSION_ID,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(err?.error ?? `Server error ${res.status}`);
      }
      const data = await res.json() as { reply: string };
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: `<span style="color:#c0392b">⚠️ Could not reach SafeBot. Please try again.<br/><small style="opacity:.7">${msg}</small></span>` },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  // ── Enter chat from home screen ───────────────────────────────────────────────
  const enterChat = useCallback((newMode: Mode, autoPrompt?: string) => {
    const greeting: Message = { role: "assistant", content: greetings[newMode][lang] };
    setMode(newMode);
    setChips(modeSuggestions[newMode][lang].slice(0, 2));
    setFadingChips(new Set());
    setShowSuggestions(true);
    setBannerFading(false);
    setShowBanner(true);
    setInput("");
    setScreen("chat");

    if (autoPrompt) {
      const userMsg: Message = { role: "user", content: autoPrompt };
      const history = [greeting, userMsg];
      setMessages(history);
      setShowSuggestions(false);
      sendToApi(history, newMode, lang);
    } else {
      setMessages([greeting]);
    }
  }, [lang, sendToApi]);

  // ── Go back to home ───────────────────────────────────────────────────────────
  const goHome = () => {
    setScreen("home");
    setMessages([]);
    setInput("");
    setIsTyping(false);
  };

  // ── Toggle language EN ↔ FIL ──────────────────────────────────────────────────
  const toggleLang = () => {
    const next: Lang = lang === "en" ? "fil" : "en";
    setLang(next);
    if (screen === "chat") {
      setMessages([{ role: "assistant", content: greetings[mode][next] }]);
      setChips(modeSuggestions[mode][next].slice(0, 2));
      setFadingChips(new Set());
      setShowSuggestions(true);
    }
  };

  const dismissChip = (chip: string, callback: () => void) => {
    setFadingChips(prev => new Set(prev).add(chip));
    setTimeout(() => {
      setChips(prev => {
        const next = prev.filter(c => c !== chip);
        if (next.length === 0) setShowSuggestions(false);
        return next;
      });
      setFadingChips(prev => { const s = new Set(prev); s.delete(chip); return s; });
      callback();
    }, 320);
  };

  const dismissBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBannerFading(true);
    setTimeout(() => setShowBanner(false), 420);
  };

  // ── MAIN SEND — calls /api/chat ───────────────────────────────────────────────
  const handleSend = useCallback(async (text: string = input) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    if (showSuggestions) setShowSuggestions(false);

    const userMsg: Message = { role: "user", content: trimmed };
    const nextHistory = [...messages, userMsg];

    setMessages(nextHistory);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await sendToApi(nextHistory, mode, lang);
  }, [input, isTyping, messages, mode, lang, showSuggestions, sendToApi]);

  const handleChipClick = (chip: string) => {
    dismissChip(chip, () => handleSend(chip));
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px";
  };

  const placeholder = lang === "fil" ? "I-type ang iyong tanong dito…" : "Type your question here…";
  const modeLabelMap: Record<Mode, string> = { child: "Child", parent: "Parent", teacher: "Teacher", emergency: "Emergency" };

  return (
    <div className="sb-shell">
      <style>{CSS}</style>

      {/* ── FAB ── */}
      {!isOpen && (
        <button className="sb-fab" onClick={() => setIsOpen(true)} aria-label="Open SafeNet Bot">
          <IconShield />
          SafeNet Bot
          <span style={{ fontSize: 16 }}>💬</span>
        </button>
      )}

      {/* ── Panel ── */}
      {isOpen && (
        <div className="sb-panel">

          {/* Header */}
          <div className="sb-header">
            {screen === "chat" && (
              <button className="sb-back-btn" onClick={goHome} aria-label="Back">
                <IconChevronLeft />
              </button>
            )}
            <div className="sb-avatar"><IconShield /></div>
            <div className="sb-header-text">
              <div className="sb-bot-name">SafeNet PH Bot</div>
              <div className="sb-bot-sub">
                {screen === "chat" ? `${modeLabelMap[mode]} Mode` : "Online Safety Assistant"}
              </div>
            </div>
            <div className="sb-header-right">
              <button className="sb-lang-btn" onClick={toggleLang}>
                {lang === "en" ? "FIL" : "EN"}
              </button>
              <button className="sb-close-btn" onClick={() => setIsOpen(false)} aria-label="Close">
                <IconX />
              </button>
            </div>
          </div>

          {/* ══════════ HOME ══════════ */}
          {screen === "home" && (
            <div className="sb-home">
              <div className="sb-home-title">
                {lang === "en" ? "Who are you talking to us as?" : "Sino ka sa amin ngayon?"}
              </div>
              <div className="sb-home-sub">
                {lang === "en" ? "Select your mode to get the best help." : "Piliin ang iyong mode para sa pinakamahusay na tulong."}
              </div>

              {/* 2×2 Mode Grid */}
              <div className="sb-mode-grid">
                {MODE_CONFIG.map(m => (
                  <button
                    key={m.id}
                    className="sb-mode-card"
                    style={{ borderColor: m.borderColor, backgroundColor: m.bgColor }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = m.hoverBorder)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = m.borderColor)}
                    onClick={() => enterChat(m.id)}
                  >
                    <span className="sb-mode-icon">{m.emoji}</span>
                    <span className="sb-mode-label">{lang === "en" ? m.label : m.labelFil}</span>
                  </button>
                ))}
              </div>

              {/* Quick Access */}
              <div className="sb-qa-label">
                {lang === "en" ? "Quick Access" : "Mabilis na Access"}
              </div>
              <div className="sb-qa-list">
                {QUICK_ACCESS.map((item, i) => (
                  <button key={i} className="sb-qa-item" onClick={() => enterChat(item.mode, item.prompt)}>
                    <span className="sb-qa-emoji">{item.emoji}</span>
                    <span className="sb-qa-text">{lang === "en" ? item.label : item.labelFil}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ CHAT ══════════ */}
          {screen === "chat" && (
            <>
              {/* Emergency Banner */}
              {mode === "emergency" && showBanner && (
                <div
                  className={`sb-emg-banner${bannerFading ? " fading" : ""}`}
                  onClick={dismissBanner}
                  title="Click to dismiss"
                >
                  <span>🆘</span>
                  <div>
                    {lang === "fil"
                      ? <>Nasa emergency mode ka. Agarang panganib? Tumawag sa <a href="tel:911" onClick={e => e.stopPropagation()}>911</a> o <a href="tel:1383" onClick={e => e.stopPropagation()}>MAKABATA 1383</a>.</>
                      : <>Emergency Mode is active. Immediate danger? Call <a href="tel:911" onClick={e => e.stopPropagation()}>911</a> or <a href="tel:1383" onClick={e => e.stopPropagation()}>MAKABATA 1383</a>.</>
                    }
                  </div>
                  <span className="sb-emg-dismiss">✕</span>
                </div>
              )}

              {/* Suggestion Chips */}
              <div className={`sb-suggestions${showSuggestions ? "" : " hidden"}`}>
                <div className="sb-sugg-label">
                  {lang === "fil" ? "💡 Subukan itanong" : "💡 Try asking"}
                </div>
                <div className="sb-chips">
                  {chips.map(chip => (
                    <button
                      key={chip}
                      className={`sb-chip${fadingChips.has(chip) ? " fading" : ""}`}
                      onClick={() => handleChipClick(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="sb-body">
                {messages.map((msg, i) => (
                  <div key={i} className={`sb-msg ${msg.role === "user" ? "user" : "bot"}`}>
                    {msg.role === "assistant" && <div className="sb-msg-avatar">🛡️</div>}
                    <div className="sb-bubble" dangerouslySetInnerHTML={{ __html: renderMessage(msg.content) }} />
                  </div>
                ))}
                {isTyping && (
                  <div className="sb-msg bot">
                    <div className="sb-msg-avatar">🛡️</div>
                    <div className="sb-bubble">
                      <div className="sb-typing"><span /><span /><span /></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Footer */}
              <div className="sb-footer">
                <div className="sb-input-row">
                  <textarea
                    ref={textareaRef}
                    className="sb-input"
                    placeholder={placeholder}
                    value={input}
                    rows={1}
                    disabled={isTyping}
                    onChange={autoResize}
                    onKeyDown={e => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                    }}
                  />
                  <button
                    className="sb-send"
                    onClick={() => handleSend()}
                    disabled={isTyping || !input.trim()}
                  >
                    <IconSend />
                  </button>
                </div>
                <div className="sb-footnote">
                  🔒 {lang === "fil" ? "Pribado ang iyong usapan" : "Your conversation is private"}
                  &nbsp;•&nbsp; Emergency: <a href="tel:911">911</a> | <a href="tel:1383">1383</a>
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}