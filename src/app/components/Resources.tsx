import { useState } from "react";

export function Resources() {
  const [activeTab, setActiveTab] = useState<'children' | 'parents' | 'teachers' | 'helplines'>('children');

  return (
    <div id="page-resources" className="page active">
      <div className="resources-hero">
        <div className="container">
          <div className="badge green" style={{ margin: '0 auto 1rem', display: 'table' }}>📂 Free Materials</div>
          <h1>Resources</h1>
          <p>Downloadable and printable materials for children, parents, and teachers — free for all.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* Tabs */}
          <div className="res-tabs">
            <button className={`res-tab ${activeTab === 'children' ? 'active' : ''}`} onClick={() => setActiveTab('children')}>🧒 For Children</button>
            <button className={`res-tab ${activeTab === 'parents' ? 'active' : ''}`} onClick={() => setActiveTab('parents')}>👨‍👩‍👧 For Parents</button>
            <button className={`res-tab ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>🍎 For Teachers</button>
            <button className={`res-tab ${activeTab === 'helplines' ? 'active' : ''}`} onClick={() => setActiveTab('helplines')}>🆘 Help & Report</button>
          </div>

          {/* Children */}
          {activeTab === 'children' && (
            <div className="res-content active">
              <div className="badge">🧒 Resources for Children</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Stay Safe — Easy Downloads</h2>
              <div className="res-items-col">
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--blue-50)' }}>🖼️</div>
                  <div className="res-item-body"><h4>Online Safety Poster (Tagalog)</h4><p>Colorful, child-friendly safety rules poster — perfect for bedrooms or study desks</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--green-50)' }}>📊</div>
                  <div className="res-item-body"><h4>What Not to Share Online — Infographic</h4><p>Visual guide showing safe vs. dangerous info to post online</p></div>
                  <span className="res-item-action">⬇ Download PNG</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--yellow-50)' }}>🎴</div>
                  <div className="res-item-body"><h4>Safety Tips Flashcard Set</h4><p>10 printable cards — each with a safety tip and a fun illustration</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--purple-50)' }}>📒</div>
                  <div className="res-item-body"><h4>My Safety Journal (Printable)</h4><p>A fun guided journal for kids to write about online experiences and feelings</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
              </div>
            </div>
          )}

          {/* Parents */}
          {activeTab === 'parents' && (
            <div className="res-content active">
              <div className="badge">👨‍👩‍👧 Resources for Parents</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Guide Your Child's Online Life</h2>
              <div className="res-items-col">
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--red-50)' }}>🚨</div>
                  <div className="res-item-body"><h4>Warning Signs Checklist</h4><p>Signs your child may be experiencing cyberbullying, grooming, or online danger</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--blue-50)' }}>💬</div>
                  <div className="res-item-body"><h4>Parent-Child Conversation Guide</h4><p>How to start honest, safe conversations about online safety with your child</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--green-50)' }}>📱</div>
                  <div className="res-item-body"><h4>Setting Up Safe Devices (Step-by-Step)</h4><p>How to configure parental controls on Android, iOS, and popular apps</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--orange-50)' }}>📋</div>
                  <div className="res-item-body"><h4>Family Online Safety Agreement</h4><p>A printable family agreement on rules for using the internet at home</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
              </div>
            </div>
          )}

          {/* Teachers */}
          {activeTab === 'teachers' && (
            <div className="res-content active">
              <div className="badge">🍎 Resources for Teachers</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Bring Online Safety to the Classroom</h2>
              <div className="res-items-col">
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--blue-50)' }}>📘</div>
                  <div className="res-item-body"><h4>30-Minute Online Safety Lesson Guide</h4><p>A complete, ready-to-use lesson plan for Grades 4–6 aligned with DepEd competencies</p></div>
                  <span className="res-item-action">⬇ Download DOCX</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--green-50)' }}>🎯</div>
                  <div className="res-item-body"><h4>Classroom Activity Sheet</h4><p>Group activity: "Would You Post This?" — discussion cards for classroom safety talks</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--purple-50)' }}>📝</div>
                  <div className="res-item-body"><h4>Printable Safety Quiz (20 Items)</h4><p>Multiple-choice quiz covering grooming, cyberbullying, phishing, and privacy</p></div>
                  <span className="res-item-action">⬇ Download PDF</span>
                </div>
                <div className="res-item">
                  <div className="res-item-icon" style={{ background: 'var(--yellow-50)' }}>🖼️</div>
                  <div className="res-item-body"><h4>Classroom Poster Set (5 Posters)</h4><p>Large-format printable posters on key online safety topics for classroom walls</p></div>
                  <span className="res-item-action">⬇ Download ZIP</span>
                </div>
              </div>
            </div>
          )}

          {/* Helplines */}
          {activeTab === 'helplines' && (
            <div className="res-content active">
              <div className="badge orange">🆘 Official Help & Reporting</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Where to Report & Get Help</h2>
              <p style={{ color: 'var(--gray-500)', marginBottom: '2rem', fontSize: '.95rem' }}>If you or someone you know is in danger online, report it immediately through these official channels.</p>
              <div className="helpline-grid">
                <div className="helpline-card">
                  <div className="helpline-icon">🚔</div>
                  <div className="helpline-body">
                    <h4>PNP Anti-Cybercrime Group</h4>
                    <p>For cybercrime, online child exploitation reports</p>
                    <div className="helpline-number">8723-0401</div>
                  </div>
                </div>
                <div className="helpline-card">
                  <div className="helpline-icon">🌐</div>
                  <div className="helpline-body">
                    <h4>DICT Cybersecurity Bureau</h4>
                    <p>Report cybersecurity incidents and online threats</p>
                    <div className="helpline-number">dict.gov.ph</div>
                  </div>
                </div>
                <div className="helpline-card">
                  <div className="helpline-icon">👨‍👩‍👧</div>
                  <div className="helpline-body">
                    <h4>DSWD Crisis Hotline</h4>
                    <p>Child welfare and protection services</p>
                    <div className="helpline-number">1800-10-888-DSWD</div>
                  </div>
                </div>
                <div className="helpline-card">
                  <div className="helpline-icon">🆘</div>
                  <div className="helpline-body">
                    <h4>National Emergency Hotline</h4>
                    <p>For immediate danger and emergencies</p>
                    <div className="helpline-number">911</div>
                  </div>
                </div>
                <div className="helpline-card">
                  <div className="helpline-icon">💻</div>
                  <div className="helpline-body">
                    <h4>NCMEC CyberTipline (International)</h4>
                    <p>Report online child sexual exploitation material</p>
                    <div className="helpline-number">cybertipline.org</div>
                  </div>
                </div>
                <div className="helpline-card">
                  <div className="helpline-icon">📱</div>
                  <div className="helpline-body">
                    <h4>ICTSI Foundation / Stairway Foundation</h4>
                    <p>Child abuse and exploitation support in PH</p>
                    <div className="helpline-number">stairwayfoundation.org</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
