import { useState } from "react";

export function Learn() {

  // --- Quiz Logic ---
  const questions = [
    { q: "A stranger online offers you free game items and asks for your phone number. What should you do?", opts: ["Give your number — it's just a game", "Tell a trusted adult and do not share your number", "Accept the items but don't give personal info", "Ignore them and keep playing"], ans: 1, exp: "✅ Always tell a trusted adult when strangers online ask for personal info. That's a major warning sign of grooming." },
    { q: "You get a message: 'Your account will be deleted! Click here to save it!' What is this?", opts: ["An urgent official notice", "A helpful reminder", "A phishing scam designed to scare you", "A normal game update"], ans: 2, exp: "✅ This is phishing! Scary, urgent messages that force you to click links are classic tricks to steal your info." },
    { q: "Which of these is SAFE to post publicly on social media?", opts: ["Your home address", "Your school's name and grade section", "A drawing you made", "Your daily schedule"], ans: 2, exp: "✅ Sharing artwork is safe! Personal info like your address, school details, or schedule can help strangers find you in real life." },
    { q: "A classmate is posting mean comments about you on TikTok. What should you do?", opts: ["Post meaner things back", "Do nothing — it will stop eventually", "Screenshot, block, and report to a trusted adult", "Delete your account forever"], ans: 2, exp: "✅ Screenshot evidence, block the bully, and report it to a trusted adult or teacher. You are not alone, and it is not your fault." },
    { q: "An online friend asks to video call and says 'If you're my real friend, you'll turn on your camera.' What is this?", opts: ["A normal thing friends do online", "Peer pressure — a warning sign of grooming", "Just a fun suggestion", "A test of your friendship"], ans: 1, exp: "✅ Real friends don't pressure or guilt-trip you. This is peer pressure and a grooming tactic. Say no and tell an adult." }
  ];
  const [qIdx, setQIdx] = useState(0);
  const [answeredQuiz, setAnsweredQuiz] = useState<number | null>(null);

  const answerQuiz = (i: number) => {
    if (answeredQuiz !== null) return;
    setAnsweredQuiz(i);
  };

  const nextQuestion = () => {
    setQIdx((qIdx + 1) % questions.length);
    setAnsweredQuiz(null);
  };

  const currentQ = questions[qIdx];

  // --- Spot Danger ---
  const [spotResult, setSpotResult] = useState<'correct' | 'wrong' | null>(null);
  const spotDanger = (res: 'correct' | 'wrong') => {
    if (!spotResult) setSpotResult(res);
  };

  // --- Oversharing ---
  const [overshareStatus, setOvershareStatus] = useState<Record<number, 'danger' | 'safe' | null>>({});
  const checkOvershare = (idx: number, level: 'danger' | 'safe') => {
    if (overshareStatus[idx]) return;
    setOvershareStatus({ ...overshareStatus, [idx]: level });
  };

  const overshareItems = [
    { text: '📍 "At SM Megamall with my family until 8pm!"', type: 'danger' as const },
    { text: '🎨 "My favorite color is blue!"', type: 'safe' as const },
    { text: '🏫 "Grade 6 at [School Name] in Quezon City"', type: 'danger' as const },
    { text: '🐕 "I love dogs and want one someday!"', type: 'safe' as const },
    { text: '📱 "My phone number: 09XX-XXX-XXXX"', type: 'danger' as const }
  ];

  // --- Story ---
  const storyData: Record<string, { text: string, choices: { text: string, next: string }[] }> = {
    start: { text: "Maya, 13, is playing her favorite online game. A player named 'Alex12' starts chatting with her and is really helpful. After a few days, Alex sends her a private message: 'Hey Maya! I want to give you rare items, but I need your phone number to send them through a different app. Don't tell your parents — they won't understand gamers like us!' 🎮\n\nWhat should Maya do?", choices: [{ text: "📱 Give Alex her phone number (he seems nice!)", next: 'bad1' }, { text: "🗣️ Tell her parents about Alex right away", next: 'good1' }, { text: "😶 Ignore the message and keep playing", next: 'ok1' }] },
    bad1: { text: "Maya gave Alex her number. He started texting her outside the game — asking about her school, what she looks like, and where she lives. She started feeling uncomfortable and scared... 😰\n\nThis is online grooming. It's never Maya's fault — but she needs help now. What should she do?", choices: [{ text: "👨‍👩‍👧 Tell her parents everything right away", next: 'good2' }, { text: "🤐 Keep it secret and hope it stops", next: 'bad2' }] },
    good1: { text: "Maya told her parents! Her mom was worried but so proud of Maya for speaking up. Her parents helped her block Alex and reported the account. Maya kept playing the game safely. 🌟\n\n🏆 Maya made the BEST choice! Telling a trusted adult is ALWAYS the right thing to do when something online feels wrong.", choices: [] },
    ok1: { text: "Maya ignored the message — good instinct! But Alex kept sending messages. After a week, he offered her in-game coins again. Maya still feels uncertain...\n\nThe safest step is still to tell an adult. What does Maya do now?", choices: [{ text: "🗣️ Tell her parents now", next: 'good1' }, { text: "📱 Finally give Alex her number", next: 'bad1' }] },
    bad2: { text: "Maya stayed quiet. Alex's messages got more frequent and more uncomfortable. She stopped enjoying games and started feeling trapped and afraid. 😟\n\n💡 It's NEVER too late to ask for help! Telling a trusted adult is still the right move.", choices: [{ text: "🗣️ Maya finally tells her mom", next: 'good2' }] },
    good2: { text: "Maya told her parents. They were relieved she spoke up and immediately helped her block Alex and report to authorities. A counselor helped Maya process her feelings. She learned it was never her fault.\n\n🌟 Even when we make mistakes online, telling a trusted adult is always the right next step. You are not alone!", choices: [] }
  };
  const [storyNode, setStoryNode] = useState('start');
  const currentNode = storyData[storyNode];

  return (
    <div id="page-learn" className="page active">
      <div className="learn-hero">
        <div className="container">
          <div className="badge" style={{ margin: '0 auto 1rem', display: 'table' }}>📘 Online Safety Education</div>
          <h1>Learn the Basics</h1>
          <p>Understand online dangers — explained simply, with examples, and interactive activities.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="badge green">⚠️ Key Safety Topics</div>
          <h2 className="section-title">What Every Child Should Know</h2>
          <p className="section-sub">Tap each topic to learn more. Use the SafeBot chat bubble if you have questions!</p>

          <div className="grid-2" style={{ marginTop: '2rem' }}>
            {/* Grooming Card */}
            <div className="topic-card">
              <div className="topic-header">
                <div className="topic-icon" style={{ background: 'var(--red-50)' }}>🚨</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gray-800)' }}>What is Online Grooming?</h3>
                  <span className="badge" style={{ margin: 0, background: 'var(--red-50)', color: 'var(--red-600)', borderColor: 'var(--red-100)', fontSize: '.72rem' }}>High Risk</span>
                </div>
              </div>
              <div className="topic-body">
                <p>Online grooming happens when an adult pretends to be a friend to a child online — to gain trust, then ask for photos, meetings, or secrets. It can start with small gifts, compliments, or game currency.</p>
                <ul className="signs-list">
                  <li>Asking to keep your friendship a secret</li>
                  <li>Sending gifts or game credits unexpectedly</li>
                  <li>Asking for personal photos or your home address</li>
                  <li>Wanting to chat on private platforms only</li>
                </ul>
              </div>
            </div>

            {/* Oversharing Card */}
            <div className="topic-card">
              <div className="topic-header">
                <div className="topic-icon" style={{ background: 'var(--orange-50)' }}>📸</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gray-800)' }}>What is Oversharing?</h3>
                  <span className="badge" style={{ margin: 0, background: 'var(--orange-100)', color: 'var(--orange-500)', borderColor: 'var(--orange-100)', fontSize: '.72rem' }}>Common Risk</span>
                </div>
              </div>
              <div className="topic-body">
                <p>Oversharing means posting too much personal information online — like your school name, home address, daily schedule, or photos that show where you live. Even friendly posts can be dangerous.</p>
                <ul className="signs-list">
                  <li>Posting your school uniform with school name visible</li>
                  <li>Sharing your full name and birthday publicly</li>
                  <li>Posting "I'm home alone" or your location</li>
                  <li>Photos with house number or landmarks visible</li>
                </ul>
              </div>
            </div>

            {/* Cyberbullying Card */}
            <div className="topic-card">
              <div className="topic-header">
                <div className="topic-icon" style={{ background: 'var(--purple-50)' }}>💬</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gray-800)' }}>What is Cyberbullying?</h3>
                  <span className="badge" style={{ margin: 0, background: 'var(--purple-100)', color: 'var(--purple-600)', borderColor: 'var(--purple-100)', fontSize: '.72rem' }}>Very Common</span>
                </div>
              </div>
              <div className="topic-body">
                <p>Cyberbullying is when someone uses the internet or a phone to hurt, embarrass, or threaten another person. It can happen in games, group chats, social media comments, or private messages.</p>
                <ul className="signs-list">
                  <li>Mean comments, name-calling online</li>
                  <li>Spreading rumors or fake stories on social media</li>
                  <li>Sharing embarrassing photos without permission</li>
                  <li>Being left out of groups on purpose</li>
                </ul>
              </div>
            </div>

            {/* Phishing Card */}
            <div className="topic-card">
              <div className="topic-header">
                <div className="topic-icon" style={{ background: 'var(--yellow-50)' }}>🎣</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gray-800)' }}>What is Phishing?</h3>
                  <span className="badge" style={{ margin: 0, background: 'var(--yellow-100)', color: 'var(--yellow-500)', borderColor: 'var(--yellow-100)', fontSize: '.72rem' }}>Tricky Scam</span>
                </div>
              </div>
              <div className="topic-body">
                <p>Phishing is when scammers send fake messages pretending to be from games, apps, or banks — to steal your passwords or personal info. They often promise free game items, prizes, or rewards.</p>
                <ul className="signs-list">
                  <li>"You won! Click here to claim your prize!"</li>
                  <li>Fake login pages that look like real sites</li>
                  <li>Links asking for your password or OTP</li>
                  <li>Urgent messages: "Your account will be deleted!"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Section */}
      <section style={{ background: 'var(--gray-100)', padding: '4rem 0' }}>
        <div className="container">
          <div className="badge">🎮 Interactive Learning</div>
          <h2 className="section-title">Practice What You've Learned</h2>
          <p className="section-sub">Hands-on activities that make safety knowledge stick!</p>
          <div className="interactive-grid">

            {/* Spot the Danger */}
            <div className="interactive-card">
              <span className="ic-badge game">🔍 Spot the Danger</span>
              <div className="ic-title">Spot the Danger</div>
              <div className="ic-desc">Read the scenario and identify what the danger is.</div>
              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-md)', padding: '1rem', fontSize: '.88rem', color: 'var(--gray-600)', marginBottom: '1rem', border: '1.5px solid var(--gray-200)' }}>
                <b style={{ color: 'var(--gray-800)' }}>Scenario:</b> A new player in your online game sends you a friend request. After chatting for a week, he offers to give you rare game items — but asks for your phone number and says "Don't tell your parents, they won't understand." <br /><br />
                <b style={{ color: 'var(--red-600)' }}>❓ What is the danger here?</b>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                <button className={`quiz-opt ${spotResult ? (spotResult === 'correct' ? '' : 'wrong') : ''}`} disabled={!!spotResult} onClick={() => spotDanger('wrong')}>The game items might be fake</button>
                <button className={`quiz-opt ${spotResult === 'correct' ? 'correct' : ''}`} disabled={!!spotResult} onClick={() => spotDanger('correct')}>This is online grooming — keeping secrets and asking for contact info are red flags</button>
                <button className={`quiz-opt ${spotResult ? (spotResult === 'correct' ? '' : 'wrong') : ''}`} disabled={!!spotResult} onClick={() => spotDanger('wrong')}>The player is just being friendly</button>
              </div>
              {spotResult && (
                <div className={`quiz-feedback show ${spotResult}`}>
                  {spotResult === 'correct'
                    ? '✅ Correct! Asking to keep secrets from parents and requesting contact info are two of the biggest grooming warning signs. Always tell a trusted adult!'
                    : '❌ Look more carefully — the real danger is the secrecy and the request for a phone number. That\'s classic online grooming.'}
                </div>
              )}
            </div>

            {/* Quick Safety Quiz */}
            <div className="interactive-card">
              <span className="ic-badge quiz">🧠 Quick Quiz</span>
              <div className="ic-title">Quick Safety Quiz</div>
              <div className="ic-desc">Test your online safety knowledge — 5 quick questions!</div>
              <div className="quiz-container visible">
                <div className="quiz-q">{currentQ.q}</div>
                <div className="quiz-opts">
                  {currentQ.opts.map((opt, i) => {
                    let btnClass = "quiz-opt";
                    if (answeredQuiz !== null) {
                      if (i === currentQ.ans) btnClass += " correct";
                      else if (i === answeredQuiz && i !== currentQ.ans) btnClass += " wrong";
                    }
                    return (
                      <button key={i} className={btnClass} disabled={answeredQuiz !== null} onClick={() => answerQuiz(i)}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {answeredQuiz !== null && (
                  <div className={`quiz-feedback show ${answeredQuiz === currentQ.ans ? 'correct' : 'wrong'}`}>
                    {currentQ.exp}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '.8rem', color: 'var(--gray-400)', fontWeight: 600 }}>Question {qIdx + 1} of {questions.length}</span>
                  {answeredQuiz !== null && (
                    <button className="btn btn-primary btn-sm" onClick={nextQuestion}>Next →</button>
                  )}
                </div>
              </div>
            </div>

            {/* Oversharing Detector */}
            <div className="interactive-card">
              <span className="ic-badge activity">📋 Activity</span>
              <div className="ic-title">Oversharing Detector</div>
              <div className="ic-desc">Which of these would you post on a public profile? Tap each to check!</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginTop: '.5rem' }}>
                {overshareItems.map((item, idx) => {
                  const status = overshareStatus[idx];
                  let style: React.CSSProperties = { background: 'var(--gray-50)', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--r-md)', padding: '.7rem 1rem', cursor: 'pointer', transition: 'all .2s', fontSize: '.87rem', fontWeight: 600, color: 'var(--gray-700)' };
                  let text = item.text;

                  if (status === 'danger') {
                    style = { ...style, background: 'var(--red-50)', borderColor: 'var(--red-400)', color: 'var(--red-600)' };
                    text = '🚨 DANGEROUS! ' + item.text;
                  } else if (status === 'safe') {
                    style = { ...style, background: 'var(--green-50)', borderColor: 'var(--green-400)', color: 'var(--green-700)' };
                    text = '✅ SAFE! ' + item.text;
                  }

                  return (
                    <div key={idx} onClick={() => checkOvershare(idx, item.type)} style={style}>
                      {text}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Interactive Story */}
            <div className="interactive-card">
              <span className="ic-badge story">📖 Story Choices</span>
              <div className="ic-title">Interactive Story: "The New Friend"</div>
              <div className="ic-desc">Make decisions for Maya and see what happens!</div>
              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-md)', padding: '1rem', fontSize: '.88rem', color: 'var(--gray-600)', marginBottom: '1rem', border: '1.5px solid var(--gray-200)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: currentNode.text.replace(/\n/g, '<br>') }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {currentNode.choices.map((c, i) => (
                  <button key={i} className="quiz-opt" onClick={() => setStoryNode(c.next)}>
                    {c.text}
                  </button>
                ))}
              </div>
              {currentNode.choices.length === 0 && (
                <div style={{ marginTop: '.8rem' }}>
                  <div style={{ background: 'var(--green-50)', border: '1.5px solid var(--green-200)', borderRadius: 'var(--r-md)', padding: '.8rem', fontSize: '.85rem', color: 'var(--green-700)', fontWeight: 600 }}>
                    Story complete!
                    <button onClick={() => setStoryNode('start')} style={{ background: 'var(--green-500)', color: '#fff', border: 'none', borderRadius: 'var(--r-full)', padding: '.3rem .8rem', fontSize: '.8rem', fontWeight: 700, cursor: 'pointer', marginLeft: '.5rem', fontFamily: 'var(--font-body)' }}>Play Again</button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
