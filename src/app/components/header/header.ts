import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="glass-header">
      <div class="header-container">
        <div class="logo">
          <span class="green-text">Sa</span> <span class="gold-text">Ndugu</span>
        </div>
        <nav>
          <a href="#">Accueil</a>
          <a href="#comment-ca-marche">Comment ça marche ?</a>
          <a href="#catalogue">Nos Kits</a>
          <a href="#commander" class="btn-nav">Commander</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .glass-header {
      position: fixed;
      top: 0;
      width: 100%;
      background: rgba(251, 251, 249, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.05);
      z-index: 100;
    }
    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.2rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.8rem;
      font-weight: 800;
      letter-spacing: -1px;
      .green-text { color: var(--primary-green); }
      .gold-text { color: var(--accent-gold); }
    }
    nav {
      display: flex;
      gap: 2rem;
      align-items: center;
      a {
        text-decoration: none;
        color: var(--text-dark);
        font-weight: 500;
        font-size: 0.95rem;
        transition: color 0.3s;
        &:hover { color: var(--primary-green-light); }
      }
      .btn-nav {
        background: var(--primary-green);
        color: #fff;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        &:hover { background: var(--primary-green-light); color: #fff; }
      }
    }
  `]
})
export class HeaderComponent {}