import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  template: `
    <section class="steps-section">
      <div class="container">
        <h2 class="section-title">Comment ça marche ?</h2>
        <div class="steps-grid">
          <div class="step-card glass-card">
            <div class="step-number">1</div>
            <h3>Choisis ton plat</h3>
            <p>Parcourez notre catalogue de 12 recettes emblématiques de la Teranga sénégalaise.</p>
          </div>
          <div class="step-card glass-card">
            <div class="step-number">2</div>
            <h3>Ajuste les portions</h3>
            <p>Indiquez le nombre de convives. Les quantités d’ingrédients et le prix s'ajustent automatiquement.</p>
          </div>
          <div class="step-card glass-card">
            <div class="step-number">3</div>
            <h3>Reçois via WhatsApp</h3>
            <p>Validez votre panier. Vous êtes redirigé sur WhatsApp pour planifier votre livraison rapide.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .steps-section { padding: 80px 2rem; background: #fff; }
    .container { max-width: 1200px; margin: 0 auto; text-align: center; }
    .section-title { font-size: 2.2rem; color: var(--primary-green); font-weight: 800; margin-bottom: 4rem; }
    .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem; }
    .step-card {
      padding: 3rem 2rem 2rem 2rem;
      position: relative;
      text-align: center;
      h3 { font-size: 1.3rem; margin-bottom: 1rem; color: var(--text-dark); }
      p { color: var(--text-light); line-height: 1.5; font-size: 0.95rem; }
    }
    .step-number {
      position: absolute;
      top: -25px;
      left: calc(50% - 25px);
      width: 50px;
      height: 50px;
      background: var(--accent-gold);
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.2rem;
      box-shadow: 0 4px 10px rgba(218, 165, 32, 0.3);
    }
  `]
})
export class HowItWorksComponent {}