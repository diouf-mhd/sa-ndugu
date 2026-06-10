import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero-section">
      <div class="hero-content">
        <h1>Cuisinez le Sénégal <br><span class="highlight">Simplement & Premium</span></h1>
        <p>Recevez chez vous tous les ingrédients frais, prédosés et lavés pour préparer vos plats traditionnels préférés. Finie la corvée du marché !</p>
        <div class="hero-actions">
          <a href="#catalogue" class="btn-primary">Aller au marché (Sa Ndugu)</a>
          <a href="#comment-ca-marche" class="btn-secondary">Découvrir le concept</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 2rem 60px 2rem;
      background: radial-gradient(circle at 90% 10%, rgba(218, 165, 32, 0.08), transparent 40%),
                  radial-gradient(circle at 10% 90%, rgba(30, 70, 32, 0.06), transparent 40%);
      text-align: center;
    }
    .hero-content {
      max-width: 800px;
      h1 {
        font-size: 3.5rem;
        font-weight: 900;
        line-height: 1.2;
        color: var(--primary-green);
        margin-bottom: 1.5rem;
        .highlight { color: var(--accent-gold); }
      }
      p {
        font-size: 1.2rem;
        color: var(--text-light);
        line-height: 1.6;
        margin-bottom: 2.5rem;
      }
    }
    .hero-actions {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      .btn-primary {
        background: var(--primary-green);
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        box-shadow: 0 4px 14px rgba(30, 70, 32, 0.2);
        transition: all 0.3s;
        &:hover { background: var(--primary-green-light); transform: translateY(-2px); }
      }
      .btn-secondary {
        border: 2px solid var(--primary-green);
        color: var(--primary-green);
        padding: 1rem 2rem;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s;
        &:hover { background: rgba(30, 70, 32, 0.04); }
      }
    }
  `]
})
export class HeroComponent {}