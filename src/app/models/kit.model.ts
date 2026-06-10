export type KitCategory = 'Riz' | 'Sauces' | 'Grillades' | 'Traditionnel';

export interface Ingredient {
  name: string;
  baseQuantityPerPerson: number; // Quantité de base pour 1 seule personne
  unit: string;                  // g, kg, ml, gousses, morceaux, etc.
}

export interface Kit {
  id: string;
  title: string;
  description: string;
  category: KitCategory;
  basePricePerPerson: number;    // Prix en FCFA pour 1 personne
  imagePath: string;             // Chemin local vers src/assets/images/
  cookingTime: number;           // En minutes
  steps: string[];               // Étapes de préparation rapides
  ingredients: Ingredient[];
  isActive: boolean;             // Utile pour masquer/afficher un kit côté admin
  viewCount?: number;            // Statistique : nombre d'ouvertures de la fiche
  orderCount?: number;           // Statistique : nombre de clics sur Commander
}