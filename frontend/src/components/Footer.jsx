import { Link } from 'react-router-dom';
import { Github, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div>
            <div className="footer__brand-name">🌿 CarbonWise</div>
            <p className="footer__brand-desc">Honest lifecycle emissions data for every vehicle decision. Built for India's EV era.</p>
            <div className="footer__sources">
              {['EPA', 'EEA', 'CEA India', 'ARAI', 'IEA 2023'].map(s => (
                <span key={s} className="footer__source">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__col-title">Tools</div>
            <ul className="footer__links">
              <li><Link to="/compare" className="footer__link">Compare Cars</Link></li>
              <li><Link to="/calculator" className="footer__link">Carbon Calculator</Link></li>
              <li><Link to="/insights" className="footer__link">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer__col-title">Learn</div>
            <ul className="footer__links">
              <li><Link to="/the-reality" className="footer__link">The Reality</Link></li>
              <li><Link to="/community" className="footer__link">Community</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer__col-title">Project</div>
            <ul className="footer__links">
              <li><Link to="/about" className="footer__link">About &amp; Team</Link></li>
              <li>
                <a
                  href="https://github.com/ayushi-ag-25/CarbonWise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  GitHub
                </a>
              </li>
              <li><a href="https://technex.in" target="_blank" rel="noopener noreferrer" className="footer__link">IIT BHU EcoHackathon</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">© 2025 CarbonWise 🌍 — IIT BHU EcoHackathon</span>
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="https://github.com/ayushi-ag-25/CarbonWise"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                background: 'rgba(245,240,232,0.06)',
                color: 'rgba(245,240,232,0.4)',
                transition: 'all 0.2s',
              }}
            >
              <Github size={15} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                background: 'rgba(245,240,232,0.06)',
                color: 'rgba(245,240,232,0.4)',
                transition: 'all 0.2s',
              }}
            >
              <Youtube size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
