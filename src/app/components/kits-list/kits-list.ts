import { Component, inject, signal, computed, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { KitService } from '../../services/kit.service';
import { Kit, KitCategory } from '../../models/kit.model';

@Component({
  selector: 'app-kits-list',
  standalone: true,
  imports: [FormsModule, SlicePipe],
  template: `
    <section class="catalog-section">
      <div class="container">
        <h2 class="section-title">Nos Kits Prêts à Cuisiner</h2>
        <p class="section-subtitle">Sélectionnez votre plat sénégalais, recevez vos ingrédients dosés au gramme près.</p>

        <div class="filter-bar">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Rechercher un plat (Ex: Thiéboudienne...)" 
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)" />
          </div>
          
          <div class="category-tabs">
            <button 
              class="tab-btn" 
              [class.active]="selectedCategory() === 'Tous'"
              (click)="selectedCategory.set('Tous')">
              Tous
            </button>
            @for (cat of categories; track cat) {
              <button 
                class="tab-btn" 
                [class.active]="selectedCategory() === cat"
                (click)="selectedCategory.set(cat)">
                {{ cat }}
              </button>
            }
          </div>
        </div>

        <div class="kits-grid">
          @for (kit of filteredKits(); track kit.id) {
            <div class="kit-card transition-fade" (click)="selectedKit.emit(kit)">
              <div class="card-img-container">
                <img [src]="kit.imagePath" [alt]="kit.title" class="kit-img" />
              </div>
              <div class="card-body">
                <span class="badge">{{ kit.category }}</span>
                <h3>{{ kit.title }}</h3>
                <p class="desc">{{ kit.description | slice:0:85 }}...</p>
                <div class="card-footer">
                  <span class="price">{{ kit.basePricePerPerson }} FCFA <small>/ pers</small></span>
                  <span class="time">⏱ {{ kit.cookingTime }} min</span>
                </div>
              </div>
            </div>
          } @empty {
            <div class="no-result">
              <p>Aucun kit ne correspond à votre recherche. Essayez un autre mot !</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .catalog-section { padding: 80px 20px; background: #faf9f5; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section-title { text-align: center; color: #111; font-size: 2.3rem; font-weight: 800; margin-bottom: 10px; }
    .section-subtitle { text-align: center; color: #555; margin-bottom: 50px; }
    
    .filter-bar { display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px; }
    @media (min-width: 768px) {
      .filter-bar { flex-direction: row; justify-content: space-between; align-items: center; }
    }
    
    .search-box input {
      padding: 14px 24px; width: 100%; max-width: 350px;
      border: 2px solid #e2e8f0; border-radius: 30px; font-size: 1rem;
      transition: all 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    }
    .search-box input:focus { border-color: #008751; outline: none; box-shadow: 0 4px 12px rgba(0, 135, 81, 0.15); }
    
    .category-tabs { display: flex; gap: 12px; flex-wrap: wrap; }
    .tab-btn {
      padding: 10px 22px; border: 2px solid #e2e8f0; background: #fff;
      border-radius: 25px; cursor: pointer; font-weight: 600; transition: all 0.3s; color: #444;
    }
    .tab-btn.active, .tab-btn:hover { background: #008751; color: #fff; border-color: #008751; transform: translateY(-1px); }
    
    .kits-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 35px; }
    .kit-card {
      background: #fff; border-radius: 16px; overflow: hidden;
      box-shadow: 0 10px 20px rgba(0,0,0,0.04); cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid #f1f5f9;
    }
    .kit-card:hover { 
      transform: translateY(-8px); 
      box-shadow: 0 20px 30px rgba(0,0,0,0.1);
      border-color: rgba(235, 209, 22, 0.3);
    }
    
    .card-img-container { height: 210px; overflow: hidden; background: #eaeaea; position: relative;}
    .kit-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .kit-card:hover .kit-img { transform: scale(1.06); }
    
    .card-body { padding: 25px; }
    .badge {
      background: rgba(0, 135, 81, 0.08); color: #008751; padding: 5px 14px;
      border-radius: 20px; font-size: 0.8rem; font-weight: 700; display: inline-block;
    }
    .card-body h3 { margin: 15px 0 10px 0; font-size: 1.4rem; color: #111; font-weight: 700; }
    .desc { color: #666; font-size: 0.95rem; line-height: 1.5; margin-bottom: 20px; }
    
    .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 20px; }
    .price { font-weight: 800; color: #008751; font-size: 1.2rem; }
    .price small { font-weight: normal; color: #777; font-size: 0.85rem; }
    .time { color: #555; font-size: 0.9rem; font-weight: 500; }
    
    .no-result { grid-column: 1 / -1; text-align: center; color: #666; padding: 40px 0; }
  `]
})
export class KitsListComponent {
  private kitService = inject(KitService);

  @Output() selectedKit = new EventEmitter<Kit>();

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('Tous');

  categories: KitCategory[] = ['Riz', 'Sauces', 'Grillades', 'Traditionnel'];

  filteredKits = computed(() => {
    let list: Kit[] = this.kitService.activeKits();
    
    if (this.selectedCategory() !== 'Tous') {
      list = list.filter((k: Kit) => k.category === this.selectedCategory());
    }
    
    if (this.searchQuery().trim() !== '') {
      const query = this.searchQuery().toLowerCase();
      list = list.filter((k: Kit) => 
        k.title.toLowerCase().includes(query) || 
        k.description.toLowerCase().includes(query)
      );
    }
    
    return list;
  });
}