import { Component, signal, HostListener } from '@angular/core';
import { KitsListComponent } from './components/kits-list/kits-list';
import { KitDetailComponent } from './components/kit-detail/kit-detail';
import { OrderFormComponent } from './components/order-form/order-form';
import { Kit } from './models/kit.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    KitsListComponent,
    KitDetailComponent,
    OrderFormComponent
  ],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="nav-container">
        <a href="#" class="logo">Sa <span class="text-gold">Ndugu</span></a>
        <div class="nav-links">
          <a href="#catalogue">Catalogue</a>
          <a href="#commander" class="btn-nav-order">Commander</a>
        </div>
      </div>
    </nav>

    <main>
      <section class="hero-section">
        <div class="hero-content fade-in">
          <h1>Le Goût du Terroir Sénégalais Prêt à Cuisiner</h1>
          <p>Des ingrédients frais, prédosés au gramme près, livrés chez vous à Dakar avec leur fiche recette.</p>
          <a href="#catalogue" class="btn-hero">Découvrir nos Kits</a>
        </div>
      </section>

      <app-kits-list id="catalogue" (selectedKit)="openDetail($event)" />
      
      <app-order-form id="commander" [selectedKitForForm]="activeKitForForm()" />
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <h3>Sa <span>Ndugu</span></h3>
          <p>Votre marché gastronomique sénégalais à portée de main. Cuisinez comme un chef, sans le stress des courses.</p>
        </div>
        <div class="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#catalogue">Notre Catalogue</a></li>
            <li><a href="#commander">Passer Commande</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Ingénierie & Dev</h4>
          <p>👨‍💻 Développeur : <strong>Moussa Diouf</strong></p>
          <p>🌐 Portfolio : <a href="http://moussadioufportfolio.kesug.com" target="_blank" class="dev-link">moussadioufportfolio.kesug.com</a></p>
          <p>📞 Tel : <a href="tel:+221779061173" class="dev-link">+221 77 906 11 73</a></p>
          <p>📧 E-mail : <a href="mailto:dioufmoussa20030918&#64;gmail.com" class="dev-link">dioufmoussa20030918&#64;gmail.com</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Sa Ndugu. Conçu et développé avec passion par <a href="http://moussadioufportfolio.kesug.com" target="_blank" class="dev-link">Moussa Diouf</a>.</p>
      </div>
    </footer>

    @if (activeKit()) {
      <app-kit-detail 
        [kit]="activeKit()!" 
        (close)="closeDetail()" 
        (order)="preloadOrderForm($event)" />
    }

    <a href="https://wa.me/221771183954?text=Bonjour%20Sa%20Ndugu%20!%20Je%20souhaite%20avoir%20des%20informations%20sur%20vos%20kits%20de%20plats." 
       target="_blank" 
       class="whatsapp-floating-btn" 
       aria-label="Discuter sur WhatsApp">
      <svg viewBox="0 0 24 24" class="whatsapp-icon">
        <path fill="#FFF" d="M12.031 6.172c-2.32 0-4.53 1.058-6.002 2.903-1.892 2.37-2.072 5.64-.455 8.2l-1.07 3.912 4.01-1.053c2.473 1.348 5.511 1.034 7.643-.778 2.32-1.97 2.946-5.183 1.545-7.854-1.282-2.443-3.8-3.93-6.533-3.93zm4.613 7.828c-.23.645-1.122 1.185-1.576 1.222-.445.037-.993.053-2.376-.516-1.925-.79-3.13-2.75-3.225-2.88-.095-.127-.79-.1.053-1.053-.73-.722-.52-1.264-.39-1.503.13-.24.26-.3.39-.39.13-.09.26-.09.39 0 .13.09.842 2.052.915 2.2.074.15.074.324-.022.516-.095.192-.15.313-.294.482-.145.17-.3.35-.13.645.36.626.963 1.155 1.623 1.503.54.285.98.375 1.348.33.4-.05.81-.424.93-.842.12-.417.12-.77.085-.842-.036-.07-.15-.11-.314-.192"/>
      </svg>
    </a>
  `,
  styles: [`
    :host {
      --sn-green: #008751;
      --sn-gold: #FCD116;
      --sn-red: #E31B23;
      display: block;
      font-family: 'Poppins', sans-serif;
      scroll-behavior: smooth;
    }

    /* Navbar Transparent & Glassmorphism avec liseré Sénégal */
    .navbar {
      position: fixed;
      top: 0; left: 0; width: 100%;
      z-index: 1000;
      background: rgba(0, 135, 81, 0.15);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 4px solid var(--sn-gold);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .navbar.scrolled {
      background: rgba(0, 60, 36, 0.95);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.8rem;
      font-weight: 800;
      color: #fff;
      text-decoration: none;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .text-gold { color: var(--sn-gold); }
    .nav-links { display: flex; align-items: center; gap: 25px; }
    .nav-links a {
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: color 0.3s;
    }
    .nav-links a:hover { color: var(--sn-gold); }
    .btn-nav-order {
      background: var(--sn-red);
      padding: 8px 20px;
      border-radius: 20px;
      box-shadow: 0 4px 10px rgba(227, 27, 35, 0.3);
      transition: all 0.3s !important;
    }
    .btn-nav-order:hover {
      background: #b81218 !important;
      transform: translateY(-2px);
    }

    /* Hero Section - Alignée sur le dossier public */
    .hero-section {
      height: 75vh;
      background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('/images/thieboudienne.jpg') center/cover no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #fff;
      padding: 0 20px;
      margin-bottom: 20px;
    }
    .hero-content h1 { font-size: 3.2rem; font-weight: 800; margin-bottom: 20px; text-shadow: 0 2px 12px rgba(0,0,0,0.6); }
    .hero-content p { font-size: 1.3rem; max-width: 720px; margin: 0 auto 35px auto; color: #f5f5f5; text-shadow: 0 1px 5px rgba(0,0,0,0.4); }
    .btn-hero {
      background: var(--sn-green);
      color: #fff;
      text-decoration: none;
      padding: 15px 40px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 1.1rem;
      border: 2px solid var(--sn-gold);
      box-shadow: 0 6px 20px rgba(0, 135, 81, 0.4);
      transition: all 0.3s;
    }
    .btn-hero:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0, 135, 81, 0.6); }

    /* Animations */
    .fade-in { animation: fadeIn 1s ease-out forwards; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(25px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Footer */
    .footer {
      background: #111412;
      color: #aabbb0;
      padding: 60px 20px 20px 20px;
      border-top: 5px solid var(--sn-green);
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }
    .footer-brand h3 { color: #fff; font-size: 1.8rem; font-weight: 800; margin-bottom: 15px; }
    .footer-brand h3 span { color: var(--sn-gold); }
    .footer-brand p { line-height: 1.6; font-size: 0.95rem; }
    
    .footer-links h4, .footer-contact h4 { color: #fff; font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; position: relative; }
    .footer-links h4::after { content: ''; position: absolute; bottom: -6px; left: 0; width: 35px; height: 2px; background: var(--sn-gold); }
    
    .footer-links ul { list-style: none; padding: 0; margin: 0; }
    .footer-links ul li { margin-bottom: 12px; }
    .footer-links ul li a { color: #aabbb0; text-decoration: none; transition: color 0.2s; font-size: 0.95rem; }
    .footer-links ul li a:hover { color: var(--sn-gold); padding-left: 4px; }
    
    .footer-contact p { margin-bottom: 12px; font-size: 0.95rem; line-height: 1.5; }
    .dev-link { color: var(--sn-gold); text-decoration: none; transition: color 0.2s; font-weight: 500; }
    .dev-link:hover { color: #fff; text-decoration: underline; }
    
    .footer-bottom { max-width: 1200px; margin: 0 auto; padding-top: 20px; border-top: 1px solid #222a25; text-align: center; font-size: 0.85rem; color: #66776d; }
    .footer-bottom .dev-link { color: var(--sn-green); font-weight: 600; }
    .footer-bottom .dev-link:hover { color: var(--sn-gold); }

    /* Bouton flottant WhatsApp */
    .whatsapp-floating-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background-color: #25D366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      z-index: 999;
      transition: transform 0.3s ease;
    }
    .whatsapp-floating-btn:hover { transform: scale(1.1); }
    .whatsapp-icon { width: 35px; height: 35px; }

    /* --- RESPONSIVE SMARTPHONE --- */
    @media (max-width: 768px) {
      .nav-container { padding: 10px 15px; }
      .logo { font-size: 1.5rem; }
      .nav-links { gap: 15px; }
      .nav-links a { font-size: 0.9rem; }
      .btn-nav-order { padding: 6px 15px; }
      .hero-section { height: 60vh; padding: 0 15px; }
      .hero-content h1 { font-size: 2rem; }
      .hero-content p { font-size: 1rem; margin-bottom: 25px; }
      .btn-hero { padding: 12px 30px; font-size: 1rem; }
      .footer-container { grid-template-columns: 1fr; gap: 30px; }
      .whatsapp-floating-btn { bottom: 20px; right: 20px; width: 50px; height: 50px; }
      .whatsapp-icon { width: 28px; height: 28px; }
    }
  `]
})
export class App {
  activeKit = signal<Kit | null>(null);
  activeKitForForm = signal<Kit | null>(null);
  isScrolled = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  openDetail(kit: Kit) {
    this.activeKit.set(kit);
  }

  closeDetail() {
    this.activeKit.set(null);
  }

  preloadOrderForm(kit: Kit) {
    this.activeKitForForm.set(kit);
    this.closeDetail();
    
    const element = document.getElementById('commander');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}