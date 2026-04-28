import { Outlet, Link, useLocation } from "react-router";
import "../../styles/safenet.css"; // Ensure this loads our custom CSS
import { useEffect } from "react";
import { FloatingChatBubble } from "./FloatingChatBubble";

export function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      {/* ====== NAVBAR ====== */}
      <nav id="navbar">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">🛡️</div>
          <div className="nav-logo-text">Safe<span>Net</span> PH</div>
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active-nav" : ""}`}>Home</Link>
          <Link to="/learn" className={`nav-link ${location.pathname === "/learn" ? "active-nav" : ""}`}>Learn the Basics</Link>
          <Link to="/stories" className={`nav-link ${location.pathname === "/stories" ? "active-nav" : ""}`}>Real Stories</Link>
          <Link to="/resources" className={`nav-link ${location.pathname === "/resources" ? "active-nav" : ""}`}>Resources</Link>
          <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active-nav" : ""}`}>About SafeNet PH</Link>
        </div>
      </nav>

      {/* ====== FLOATING CHAT BUBBLE ====== */}
      <FloatingChatBubble />

      {/* ====== MAIN ====== */}
      <div className="main-content">
        <Outlet />
      </div>

      {/* ====== FOOTER ====== */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">🛡️</div>
                <div className="footer-logo-text">SafeNet PH</div>
              </div>
              <p className="footer-desc">Helping Filipino children, parents, and teachers navigate the internet safely — one family at a time.</p>
            </div>
            <div className="footer-col">
              <h4>Navigate</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/learn">Learn the Basics</Link></li>
                <li><Link to="/stories">Real Stories</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/about">About SafeNet PH</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Help</h4>
              <ul>
                <li><Link to="/resources">Report a Crime</Link></li>
                <li><a>PNP ACG: 8723-0401</a></li>
                <li><a>DSWD: 1800-888-DSWD</a></li>
                <li><a>Emergency: 911</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a>Privacy Policy</a></li>
                <li><a>Terms of Use</a></li>
                <li><a>Accessibility</a></li>
                <li><a>RA 10175 Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-text">© 2025 SafeNet PH. Free for all Filipinos. 🇵🇭</div>
            <div className="footer-disclaimer">SafeBot is an AI assistant for educational purposes. For immediate danger, always call 911. SafeNet PH does not collect personal data from users.</div>
          </div>
        </div>
      </footer>
    </>
  );
}
