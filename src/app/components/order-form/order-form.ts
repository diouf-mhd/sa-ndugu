import { Component, input, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Kit } from '../../models/kit.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="order-section" id="commander">
      <div class="form-container">
        <h2>Passer votre Commande</h2>
        <p class="subtitle">Remplissez le formulaire ci-dessous pour finaliser votre commande Sa Ndugu.</p>

        @if (selectedKitForForm()) {
          <div class="selected-kit-alert">
            <p>Plat sélectionné : <strong>{{ selectedKitForForm()?.title }}</strong></p>
            <p class="price-info">Prix de base : {{ selectedKitForForm()?.basePricePerPerson }} FCFA / personne</p>
          </div>
        }

        <form (ngSubmit)="onSubmit()" class="checkout-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Nom Complet *</label>
              <input type="text" id="name" name="name" [(ngModel)]="customerName" required placeholder="Ex: Moussa Diouf">
            </div>

            <div class="form-group">
              <label for="phone">Numéro de Téléphone *</label>
              <input type="tel" id="phone" name="phone" [(ngModel)]="customerPhone" required placeholder="Ex: +221 77 906 11 73">
            </div>

            <div class="form-group full-width">
              <label for="address">Adresse exacte de Livraison (Dakar) *</label>
              <input type="text" id="address" name="address" [(ngModel)]="customerAddress" required placeholder="Ex: Mermoz, Rue MZ 55, Dakar">
            </div>

            <div class="form-group">
              <label for="persons">Nombre de personnes (Parts) *</label>
              <input 
                type="number" 
                id="persons" 
                name="persons" 
                min="1" 
                [ngModel]="quantity()" 
                (ngModelChange)="quantity.set($event)" 
                required>
            </div>

            <div class="form-group summary-group">
              <label>Montant Total à Payer</label>
              <div class="total-price-box">
                {{ totalPrice() }} FCFA
              </div>
            </div>
          </div>

          <button type="submit" class="btn-submit">
            🚀 Confirmer ma Commande ({{ totalPrice() }} FCFA)
          </button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .order-section { padding: 60px 20px; background: #f9fbf9; }
    .form-container { max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    h2 { color: #008751; font-weight: 800; text-align: center; margin-bottom: 10px; }
    .subtitle { text-align: center; color: #666; margin-bottom: 30px; }
    
    .selected-kit-alert { background: rgba(0, 135, 81, 0.1); border-left: 5px solid #008751; padding: 15px; border-radius: 4px; margin-bottom: 25px; }
    .selected-kit-alert p { margin: 0; color: #333; }
    .price-info { font-size: 0.9rem; color: #666; margin-top: 5px !important; }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .full-width { grid-column: span 2; }
    
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-group label { font-weight: 600; color: #333; font-size: 0.95rem; }
    .form-group input { padding: 12px 15px; border: 1px solid #ccc; border-radius: 8px; font-family: inherit; font-size: 1rem; transition: border 0.3s; }
    .form-group input:focus { border-color: #008751; outline: none; }

    .total-price-box { padding: 10px 15px; background: #111412; color: #FCD116; font-size: 1.4rem; font-weight: 800; border-radius: 8px; text-align: center; }
    
    .btn-submit { width: 100%; background: #E31B23; color: #fff; border: none; padding: 15px; border-radius: 30px; font-size: 1.1rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(227, 27, 35, 0.3); transition: all 0.3s; }
    .btn-submit:hover { background: #b81218; transform: translateY(-2px); }

    @media (max-width: 600px) {
      .form-grid { grid-template-columns: 1fr; }
      .full-width { grid-column: span 1; }
    }
  `]
})
export class OrderFormComponent {
  // Déclaration de l'input Signal provenant du composant parent
  selectedKitForForm = input<Kit | null>(null);

  // Signaux pour la gestion de la quantité et des champs du formulaire
  quantity = signal<number>(1);
  customerName = '';
  customerPhone = '';
  customerAddress = '';

  // Effet pour réinitialiser la quantité à 1 à chaque fois qu'un nouveau plat est sélectionné
  constructor() {
    effect(() => {
      if (this.selectedKitForForm()) {
        this.quantity.set(1); // Optionnel : remet à 1 dès qu'on change de plat
      }
    }, { allowSignalWrites: true });
  }

  // Calcul du prix total automatique et réactif grâce à computed()
  totalPrice = computed(() => {
    const kit = this.selectedKitForForm();
    if (!kit) return 0;
    return kit.basePricePerPerson * this.quantity();
  });

  onSubmit() {
    if (!this.selectedKitForForm()) {
      alert('Veuillez sélectionner un kit de plat dans le catalogue d’abord.');
      return;
    }

    const orderData = {
      kit: this.selectedKitForForm(),
      quantity: this.quantity(),
      totalPrice: this.totalPrice(),
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      customerAddress: this.customerAddress
    };

    console.log('Commande soumise avec succès :', orderData);
    alert(`Merci ${orderData.customerName} ! Votre commande de ${orderData.quantity}x ${orderData.kit?.title} a été prise en compte (${orderData.totalPrice} FCFA).`);
    
    // Logique de réinitialisation si nécessaire
  }
}