import { Component, Input, Output, EventEmitter, signal, computed, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Kit, Ingredient } from '../../models/kit.model';
import { KitService } from '../../services/kit.service';

@Component({
  selector: 'app-kit-detail',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="btn-close" (click)="close.emit()">&times;</button>
        
        <div class="modal-layout">
          <div class="modal-img-side">
            <img [src]="kit.imagePath" [alt]="kit.title" class="detail-main-img" />
          </div>
          
          <div class="modal-info-side">
            <span class="badge">{{ kit.category }}</span>
            <h2>{{ kit.title }}</h2>
            <p class="duration">⏱ Temps de cuisson moyen : <strong>{{ kit.cookingTime }} min</strong></p>
            <p class="description">{{ kit.description }}</p>

            <div class="portion-selector">
              <label>Nombre de convives :</label>
              <div class="counter">
                <button (click)="decrement()">-</button>
                <input type="number" [value]="portions()" min="1" max="50" readonly />
                <button (click)="increment()">+</button>
              </div>
            </div>

            <div class="ingredients-box">
              <h3>Ingrédients inclus prédosés :</h3>
              <ul>
                @for (ing of computedIngredients(); track ing.name) {
                  <li>👉 <strong>{{ ing.quantity }} {{ ing.unit }}</strong> de {{ ing.name }}</li>
                }
              </ul>
            </div>

            <div class="total-box">
              <span>Prix Total :</span>
              <span class="total-price">{{ totalPrice() }} FCFA</span>
            </div>

            <button class="btn-order-now" (click)="handleOrder()">Préparer ma commande</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      z-index: 1100;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    }
    .modal-content {
      width: 100%; max-width: 950px; max-height: 90vh;
      overflow-y: auto; position: relative; padding: 35px; background: #fff;
      border-radius: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.15);
    }
    .btn-close {
      position: absolute; top: 20px; right: 25px;
      background: transparent; border: none; font-size: 2.2rem; cursor: pointer; color: #888;
      transition: color 0.2s; z-index: 10;
    }
    .btn-close:hover { color: #E31B23; }
    
    .modal-layout { display: grid; grid-template-columns: 1fr; gap: 35px; }
    @media(min-width: 768px) {
      .modal-layout { grid-template-columns: 11fr 13fr; }
    }
    
    .modal-img-side { height: 100%; min-height: 300px; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 16px rgba(0,0,0,0.05); }
    .detail-main-img { width: 100%; height: 100%; object-fit: cover; }
    
    .modal-info-side {
      .badge { background: rgba(0, 135, 81, 0.08); color: #008751; font-weight: 700; padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; }
      h2 { font-size: 2.2rem; color: #111; margin: 15px 0 10px 0; font-weight: 800; }
      .duration { font-size: 1rem; margin-bottom: 15px; color: #444; }
      .description { color: #666; font-size: 1rem; line-height: 1.6; margin-bottom: 25px; }
    }

    .portion-selector {
      margin-bottom: 25px;
      label { display: block; font-weight: 700; margin-bottom: 10px; color: #222; }
      .counter {
        display: flex; align-items: center; gap: 5px;
        button { width: 45px; height: 45px; background: #f1f5f9; border: none; font-size: 1.4rem; cursor: pointer; border-radius: 10px; font-weight: 700; transition: all 0.2s;}
        button:hover { background: #e2e8f0; }
        input { width: 65px; height: 45px; border: 2px solid #e2e8f0; border-radius: 10px; font-weight: 700; font-size: 1.1rem; text-align: center; }
      }
    }

    .ingredients-box {
      background: #fcfbf7; padding: 20px; border-radius: 16px; border: 1px dashed rgba(0, 135, 81, 0.2); margin-bottom: 25px;
      h3 { font-size: 1.1rem; margin-bottom: 12px; color: #111; font-weight: 700; }
      ul { list-style: none; display: grid; grid-template-columns: 1fr; gap: 8px; font-size: 0.95rem; padding: 0; margin: 0; }
    }

    .total-box {
      display: flex; justify-content: space-between; align-items: center;
      padding: 15px 0; border-top: 2px solid #f1f5f9; margin-bottom: 25px;
      span { font-size: 1.2rem; font-weight: 700; color: #222; }
      .total-price { font-size: 1.8rem; font-weight: 900; color: #008751; }
    }

    .btn-order-now {
      width: 100%; background: #008751; color: #fff; border: none; padding: 16px;
      border-radius: 14px; font-size: 1.1rem; font-weight: 700; cursor: pointer; 
      transition: all 0.3s; box-shadow: 0 6px 15px rgba(0, 135, 81, 0.2);
    }
    .btn-order-now:hover { background: #006e41; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 135, 81, 0.3); }
  `]
})
export class KitDetailComponent {
  private kitService = inject(KitService);

  @Input({ required: true }) kit!: Kit;
  @Output() close = new EventEmitter<void>();
  @Output() order = new EventEmitter<Kit>();

  portions = signal<number>(2); 

  totalPrice = computed(() => this.kit.basePricePerPerson * this.portions());

  computedIngredients = computed(() => {
    return this.kit.ingredients.map((ing: Ingredient) => ({
      name: ing.name,
      quantity: ing.baseQuantityPerPerson * this.portions(),
      unit: ing.unit
    }));
  });

  constructor() {
    // CORRECTION : Un effect() réactif est plus fiable qu'un ngOnInit pour traquer les ouvertures
    effect(() => {
      if (this.kit && this.kit.id) {
        this.kitService.incrementView(this.kit.id);
      }
    });
  }

  increment() { this.portions.update(p => p + 1); }
  decrement() { if (this.portions() > 1) this.portions.update(p => p - 1); }

  handleOrder() { this.order.emit(this.kit); }
}