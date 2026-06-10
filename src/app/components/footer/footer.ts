import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="footer-container">
        <div class="footer-info">
          <h3>Sa Ndugu</h3>
          <p>Le goût de la tradition, le confort de la modernité.</p>
          <p class="developer">Propulsé par <a href="http://moussadioufportfolio.kesug.com" target="_blank" class="portfolio-link">Moussa Diouf</a></p>
        </div>
        
        <div class="footer-contact">
          <h4>Contact & Support</h4>
          <p>📞 +221 77 118 39 54 / +221 77 906 11 73</p>
          <p>✉️ dioufmoussa20030918&#64;gmail.com</p>
        </div>

        <div class="footer-socials">
          <h4>Suivez-nous</h4>
          <div class="social-links">
            <a href="#" target="_blank">TikTok</a>
            <a href="#" target="_blank">Instagram</a>
            <a href="#" target="_blank">Facebook</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 Sa Ndugu - Tous droits réservés.
      </div>
    </footer>
  `,
  styles: [`
    footer { background: #132b14; color: rgba(255,255,255,0.8); padding: 4rem 2rem 2rem 2rem; font-size: 0.9rem; }
    .footer-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; }
    h3 { color: #fff; font-size: 1.6rem; margin-bottom: 1rem; }
    h4 { color: var(--accent-gold); font-size: 1.1rem; margin-bottom: 1.2rem; }
    p { margin-bottom: 0.6rem; line-height: 1.5; }
    .developer { margin-top: 1.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.5); }
    .portfolio-link { color: var(--accent-gold); text-decoration: none; font-weight: 600; &:hover { text-decoration: underline; } }
    .social-links {
      display: flex; gap: 1rem;
      a { color: #fff; text-decoration: none; background: rgba(255,255,255,0.08); padding: 0.4rem 0.8rem; border-radius: 6px; transition: background 0.2s;
        &:hover { background: var(--accent-gold); color: #132b14; }
      }
    }
    .footer-bottom { text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.8rem; color: rgba(255,255,255,0.4); }
  `]
})
export class FooterComponent {}