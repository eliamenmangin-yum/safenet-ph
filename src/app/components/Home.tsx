import { Link } from "react-router";

export function Home() {
  return (
    <div id="page-home" className="page active">
      {/* Hero */}
      <section className="hero">
        <div className="hero-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              
              <h1>Stay Safe Online,<br /><span>Kids.</span></h1>
              <p className="hero-sub">SafeNet PH helps children, parents, and teachers prevent online dangers through simple guidance and a safety chatbot.</p>
              <div className="hero-btns">
                <Link to="/learn" className="btn btn-white btn-lg">🧒 I am a Child</Link>
                <Link to="/learn" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.18)', color: '#fff', border: '2px solid rgba(255,255,255,.4)', backdropFilter: 'blur(8px)' }}>👨‍👩‍👧 I am a Parent / Teacher</Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card-stack">
                <div className="hcard hcard-1">
                  <div className="hcard-icon" style={{ background: 'var(--green-50)' }}>🛡️</div>
                  <div>
                    <div className="hcard-text">You're protected!</div>
                    <div className="hcard-sub">SafeBot is watching out for you</div>
                  </div>
                </div>
                <div className="hcard hcard-2">
                  <div className="hcard-icon" style={{ background: 'var(--orange-50)' }}>⚠️</div>
                  <div>
                    <div className="hcard-text">Stranger alert!</div>
                    <div className="hcard-sub">Never share your address online</div>
                  </div>
                </div>
                <div className="hcard hcard-3">
                  <div className="hcard-icon" style={{ background: 'var(--blue-50)' }}>🤖</div>
                  <div>
                    <div className="hcard-text">Ask SafeBot anything</div>
                    <div className="hcard-sub">Safe, private, helpful</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-inner">
            <div className="trust-item"><span>🛡️</span><span>Child-Safe Platform</span></div>
            <div className="trust-item"><span>🔒</span><span>No Personal Data Collected</span></div>
            <div className="trust-item"><span>🇵🇭</span><span>Philippine Digital Safety Aligned</span></div>
            <div className="trust-item"><span>👨‍👩‍👧</span><span>For Children, Parents & Teachers</span></div>
            <div className="trust-item"><span>🏛️</span><span>DICT & RA 10175 Aligned</span></div>
            <div className="trust-item"><span>✅</span><span>Free & Always Available</span></div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <div className="badge">🌟 What You Can Do Here</div>
            <h2 className="section-title">Everything You Need to Stay Safe</h2>
            <p className="section-sub">Simple tools for children, parents, and teachers — no sign-up needed.</p>
          </div>
          <div className="feat-cards">
            <Link to="/learn" className="feat-card blue" style={{ display: 'block' }}>
              <span className="feat-card-emoji">📚</span>
              <h3>Learn the Basics</h3>
              <p>Understand online grooming, cyberbullying, phishing, and more — explained simply for kids.</p>
              <span className="card-arrow">Start learning →</span>
            </Link>
            <Link to="/learn" className="feat-card green" style={{ display: 'block' }}>
              <span className="feat-card-emoji">🎮</span>
              <h3>Play Safety Games</h3>
              <p>Interactive quizzes, spot-the-danger games, and story choices — learn while having fun!</p>
              <span className="card-arrow" style={{ color: 'var(--green-600)' }}>Play now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="section-sm" style={{ paddingBottom: '5rem' }}>
        <div className="container">
          <div className="why-section">
            <div className="why-text">
              <div className="badge">❓ Why We Exist</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Online Risks Are Real for Filipino Kids</h2>
              <p style={{ fontSize: '.95rem', color: 'var(--gray-500)', marginBottom: '.8rem', lineHeight: 1.7 }}>Millions of Filipino children are online daily — on social media, gaming platforms, and messaging apps. But many don't know what dangers to watch out for.</p>
              <p style={{ fontSize: '.95rem', color: 'var(--gray-500)', marginBottom: '1.2rem', lineHeight: 1.7 }}>SafeNet PH was created to give every child, parent, and teacher in the Philippines the knowledge and tools to stay safe — in simple, friendly, Filipino-first ways.</p>
              <Link to="/about" className="btn btn-primary">Learn Our Story →</Link>
            </div>
            <div className="why-stats">
              <div className="stat-card">
                <span className="stat-num">73%</span>
                <div className="stat-label">of PH kids experienced cyberbullying</div>
              </div>
              <div className="stat-card">
                <span className="stat-num green">67M+</span>
                <div className="stat-label">Filipinos are active on social media</div>
              </div>
              <div className="stat-card">
                <span className="stat-num orange">1 in 3</span>
                <div className="stat-label">children shared info with strangers online</div>
              </div>
              <div className="stat-card">
                <span className="stat-num red">PH #1</span>
                <div className="stat-label">most at-risk for online child exploitation in SEA</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
