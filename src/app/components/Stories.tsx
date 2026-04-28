export function Stories() {
  return (
    <div id="page-stories" className="page active">
      <div className="stories-hero">
        <div className="container">
          <div className="badge orange" style={{ margin: '0 auto 1rem', display: 'table' }}>⚠️ Real-World Scenarios</div>
          <h1 style={{ color: '#fff' }}>Real Stories</h1>
          <p>These are realistic scenarios based on common online dangers faced by Filipino children.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2">

            <div className="story-card">
              <div className="story-top">
                <span className="story-tag tag-grooming">🔴 Online Grooming</span>
                <span className="story-emoji">💬</span>
                <div className="story-title">The Secret Chat with a Stranger</div>
                <p className="story-text">Lia, 12, was playing an online game when a player named "KuuKuu21" started chatting with her. He said he was also 12 and gave her rare items. After a week, he asked her to move their chat to a private app — and said "Don't tell your parents, they're old-fashioned." Lia felt uneasy but didn't want to lose the friendship.</p>
              </div>
              <div className="story-bottom">
                <div className="lesson-box">This is online grooming. Asking for secrecy from parents and moving to private platforms are major red flags. Lia should have told a trusted adult immediately.</div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-top">
                <span className="story-tag tag-scam">🟠 Online Scam</span>
                <span className="story-emoji">🎮</span>
                <div className="story-title">The Free Game Currency Scam</div>
                <p className="story-text">Carlo, 10, received a Facebook message: "Claim your FREE 10,000 game coins! Limited time!" The link looked like the real game site. He clicked it and entered his username and password. The next day, his account was gone — and his saved game items were stolen.</p>
              </div>
              <div className="story-bottom">
                <div className="lesson-box">This is phishing. Fake sites that look real are designed to steal passwords. Free offers that seem too good to be true usually are traps.</div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-top">
                <span className="story-tag tag-privacy">🔵 Privacy Risk</span>
                <span className="story-emoji">📸</span>
                <div className="story-title">Sharing School Photos Online</div>
                <p className="story-text">Ana, 13, posted a photo in her school uniform after winning a contest. She was so proud she tagged her school, her grade, and her classroom number. She didn't notice that her profile was set to "Public" — and that strangers could now know exactly which school she attended and what section she was in.</p>
              </div>
              <div className="story-bottom">
                <div className="lesson-box">This is dangerous oversharing. School name, grade, and section together can help strangers find and identify you in real life. Always set profiles to private.</div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-top">
                <span className="story-tag tag-grooming">🔴 Exploitation Attempt</span>
                <span className="story-emoji">📷</span>
                <div className="story-title">The Webcam Request from an "Online Friend"</div>
                <p className="story-text">Miguel, 11, had been gaming online with "Alex" for two months. Alex seemed friendly and always helped him in games. One day, Alex asked Miguel to turn on his webcam "so they could talk face-to-face." When Miguel hesitated, Alex said "Don't you trust me? I thought we were real friends."</p>
              </div>
              <div className="story-bottom">
                <div className="lesson-box">Pressuring a child to use a webcam is a major grooming warning sign. Real friends do not pressure you. Miguel should close the chat and tell a trusted adult immediately.</div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-top">
                <span className="story-tag tag-scam">🟠 Cyberbullying</span>
                <span className="story-emoji">😢</span>
                <div className="story-title">The Group Chat Attack</div>
                <p className="story-text">Sofia, 14, was removed from her class group chat and didn't know why. The next day, she found out classmates had made a new chat to talk badly about her — posting edited photos of her and calling her names. She felt humiliated, afraid to go to school, and was too embarrassed to tell anyone.</p>
              </div>
              <div className="story-bottom">
                <div className="lesson-box">This is cyberbullying. Sofia is not alone — it is never her fault. She should screenshot the evidence, block the bullies, and report to a teacher or parent. She deserves support.</div>
              </div>
            </div>

            <div className="story-card">
              <div className="story-top">
                <span className="story-tag tag-privacy">🔵 Data Privacy</span>
                <span className="story-emoji">📝</span>
                <div className="story-title">The "Free Scholarship" Form</div>
                <p className="story-text">Mara, 15, saw a post: "Free scholarship for honor students! Fill out this form." It asked for her full name, school, address, phone number, and parent's mobile number. She filled it out completely because the scholarship sounded real. The "organization" was actually collecting personal data.</p>
              </div>
              <div className="story-bottom">
                <div className="lesson-box">Fake scholarship forms are a common way to steal personal data. Always verify scholarships through your school or official government websites before filling out any forms online.</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
