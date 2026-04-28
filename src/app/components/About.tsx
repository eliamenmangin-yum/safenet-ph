export function About() {
  return (
    <div id="page-about" className="page active">
      <div className="about-hero">
        <div className="container">
          <div className="badge" style={{ margin: '0 auto 1rem', display: 'table' }}>ℹ️ About Us</div>
          <h1>About SafeNet PH</h1>
          <p>Protecting Filipino children online — one family, one classroom at a time.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          <div className="about-section">
            <div className="about-visual">
              <span className="about-visual-emoji">🌱</span>
              <div style={{ background: 'var(--blue-50)', borderRadius: 'var(--r-lg)', padding: '1rem', fontSize: '.84rem', color: 'var(--blue-700)', fontWeight: 600, border: '1.5px solid var(--blue-200)' }}>Every Filipino child deserves a safe digital space.</div>
            </div>
            <div className="about-text">
              <div className="badge">❓ Why We Were Created</div>
              <h2>Born From a Real Need</h2>
              <p>The Philippines has one of the highest rates of online child exploitation in Southeast Asia. Millions of children access the internet daily — many without the knowledge or tools to protect themselves.</p>
              <p>SafeNet PH was created to close that gap. We believe safety education should be accessible, understandable, and available to every Filipino child — regardless of where they live or what school they attend.</p>
              <p>Inspired by global child safety standards and aligned with Philippine law (RA 10175 — Cybercrime Prevention Act, RA 9775 — Anti-Child Pornography Act), SafeNet PH brings world-class safety education to Filipino homes and classrooms.</p>
            </div>
          </div>

          <div className="about-section" style={{ flexDirection: 'row-reverse' }}>
            <div className="about-visual">
              <span className="about-visual-emoji">🛡️</span>
              <div style={{ background: 'var(--green-50)', borderRadius: 'var(--r-lg)', padding: '1rem', fontSize: '.84rem', color: 'var(--green-700)', fontWeight: 600, border: '1.5px solid var(--green-200)' }}>Education + AI = Safer Futures</div>
            </div>
            <div className="about-text">
              <div className="badge green">✅ What We Do</div>
              <h2>Simple. Safe. Effective.</h2>
              <p>SafeNet PH provides three core things: educational content that explains online dangers in simple, age-appropriate language; interactive tools including games, quizzes, and story activities that make learning stick; and SafeBot, an AI-powered chatbot trained to answer child safety questions sensitively and accurately.</p>
              <p>Everything on SafeNet PH is free, available 24/7, and designed to be used with or without adult supervision.</p>
            </div>
          </div>

          {/* Who It's For */}
          <div style={{ margin: '3rem 0' }}>
            <div className="badge">👥 Who It's For</div>
            <h2 className="section-title">Built for Every Filipino</h2>
            <div className="who-grid" style={{ marginTop: '2rem' }}>
              <div className="who-card">
                <span className="who-emoji">🧒</span>
                <h3>Children</h3>
                <p>Ages 8–18. Learn what's safe and what's not. Play games. Ask SafeBot questions. Know when to tell an adult.</p>
              </div>
              <div className="who-card">
                <span className="who-emoji">👨‍👩‍👧</span>
                <h3>Parents & Guardians</h3>
                <p>Understand digital risks. Learn warning signs. Start conversations. Download guides to protect your family online.</p>
              </div>
              <div className="who-card">
                <span className="who-emoji">📚</span>
                <h3>Teachers & Educators</h3>
                <p>Access ready-made lesson plans, classroom activities, and printable quizzes aligned with DepEd competencies.</p>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="privacy-box">
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '.8rem' }}>🔒</span>
            <h2>Our Privacy Promise</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '.95rem', maxWidth: 500, margin: '0 auto' }}>SafeNet PH is built on trust. We keep it simple and absolute.</p>
            <div className="privacy-items">
              <div className="privacy-item"><span>🚫</span>No personal data collected</div>
              <div className="privacy-item"><span>🍪</span>No tracking cookies</div>
              <div className="privacy-item"><span>📵</span>No sign-up required</div>
              <div className="privacy-item"><span>👤</span>SafeBot conversations are private</div>
              <div className="privacy-item"><span>📢</span>No ads, ever</div>
            </div>
          </div>

          {/* Alignment */}
          <div className="align-items">
            <h3>🏛️ Aligned With Philippine Law & Global Standards</h3>
            <p style={{ color: 'var(--gray-500)', fontSize: '.9rem', marginBottom: '1.2rem' }}>SafeNet PH is designed in alignment with Philippine law and international child safety standards.</p>
            <div className="align-logos">
              <div className="align-logo-item">🇵🇭 RA 10175 — Cybercrime Prevention Act</div>
              <div className="align-logo-item">🇵🇭 RA 9775 — Anti-Child Pornography Act</div>
              <div className="align-logo-item">🏛️ DICT Cybersecurity Initiatives</div>
              <div className="align-logo-item">🌍 UN Convention on the Rights of the Child</div>
              <div className="align-logo-item">🏫 DepEd ICT Competency Standards</div>
              <div className="align-logo-item">🌐 ITU Child Online Protection Guidelines</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
