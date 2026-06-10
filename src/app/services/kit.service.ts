import { Injectable, signal, computed } from '@angular/core';
import { Kit } from '../models/kit.model';

@Injectable({
  providedIn: 'root'
})
export class KitService {
  // CORRECTION FINALE : Retrait de "/assets" des chemins car les images sont dans public/images/
  private kitsList = signal<Kit[]>([
    { 
      id: '1', 
      title: 'Thiéboudienne Penda Mbaye', 
      description: 'Le majestueux riz au poisson national, servi avec ses légumes frais.', 
      basePricePerPerson: 2500, 
      cookingTime: 45, 
      category: 'Riz', 
      imagePath: '/images/thieboudienne.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '2', 
      title: 'Yassa Poulet Poulo', 
      description: 'Poulet mariné au citron vert, oignons fondants et moutarde.', 
      basePricePerPerson: 2000, 
      cookingTime: 35, 
      category: 'Grillades', 
      imagePath: '/images/yassa_poulet.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '3', 
      title: 'Yassa Poisson', 
      description: 'Poisson grillé sur lit d\'oignons caramélisés et piment de jardin.', 
      basePricePerPerson: 2200, 
      cookingTime: 30, 
      category: 'Traditionnel', 
      imagePath: '/images/yassa_poisson.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '4', 
      title: 'Mafé Viande', 
      description: 'Une onctueuse sauce de pâte d\'arachide avec de la viande tendre de bœuf.', 
      basePricePerPerson: 1800, 
      cookingTime: 40, 
      category: 'Sauces', 
      imagePath: '/images/mafe.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '5', 
      title: 'Soupou Kandia', 
      description: 'La célèbre sauce de gombos à l\'huile de palme et fruits de mer.', 
      basePricePerPerson: 3000, 
      cookingTime: 50, 
      category: 'Sauces', 
      imagePath: '/images/soupou_kandia.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '6', 
      title: 'Domoda Bœuf', 
      description: 'Sauce tomate acidulée au citron avec des légumes croquants.', 
      basePricePerPerson: 1700, 
      cookingTime: 35, 
      category: 'Sauces', 
      imagePath: '/images/domoda.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '7', 
      title: 'Caldou Poisson', 
      description: 'Poisson cuit à l\'eau avec une sauce d\'oignons blancs et son piment.', 
      basePricePerPerson: 1900, 
      cookingTime: 25, 
      category: 'Traditionnel', 
      imagePath: '/images/caldou.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '8', 
      title: 'Thiou Crevettes', 
      description: 'Une délicieuse sauce tomate mijotée aux crevettes fraîches de mer.', 
      basePricePerPerson: 2800, 
      cookingTime: 30, 
      category: 'Riz', 
      imagePath: '/images/thiou.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '9', 
      title: 'Mbakhal Saloum', 
      description: 'Riz traditionnel à la pâte d\'arachide et au poisson sec (Gueth).', 
      basePricePerPerson: 1600, 
      cookingTime: 40, 
      category: 'Riz', 
      imagePath: '/images/mbakhal.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '10', 
      title: 'Thiéré Bassi Salte', 
      description: 'Le fameux couscous de mil sénégalais, riche en viande et haricots.', 
      basePricePerPerson: 2400, 
      cookingTime: 45, 
      category: 'Traditionnel', 
      imagePath: '/images/thiere.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '11', 
      title: 'Ndambé', 
      description: 'Le ragoût de haricots (niébé) épicé au bœuf, idéal avec du pain.', 
      basePricePerPerson: 1200, 
      cookingTime: 20, 
      category: 'Traditionnel', 
      imagePath: '/images/ndambe.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    },
    { 
      id: '12', 
      title: 'Lakhou Bissap', 
      description: 'Une semoule de mil cuite dans une sauce de bissap vert acidulée.', 
      basePricePerPerson: 1500, 
      cookingTime: 30, 
      category: 'Traditionnel', 
      imagePath: '/images/lakhou_bissap.jpg', 
      ingredients: [],
      steps: [],
      isActive: true
    }
  ]);

  activeKits = computed(() => this.kitsList().filter(k => k.isActive));

  incrementView(id: string) { console.log(`Kit ${id} consulté.`); }
  incrementOrder(id: string) { console.log(`Kit ${id} commandé.`); }
}