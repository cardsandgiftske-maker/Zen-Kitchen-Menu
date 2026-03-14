import { MenuCategory, CustomizationOption } from './types';

const ACCOMPANIMENTS: CustomizationOption = {
  id: 'accompaniment',
  title: 'Choose Accompaniment',
  options: ['Ugali', 'Rice', 'Chapo', 'Chips'],
  required: true
};

const SAUCES: CustomizationOption = {
  id: 'sauce',
  title: 'Add Sauce',
  options: ['Garlic Sauce', 'BBQ Sauce', 'Chili Sauce', 'Cocktail Sauce'],
  required: false
};

const WING_FLAVORS: CustomizationOption = {
  id: 'flavor',
  title: 'Choose Flavor',
  options: ['Grilled', 'Crispy', 'BBQ', 'Sticky', 'Sweet & Sour'],
  required: true
};

const PIZZA_FLAVORS: CustomizationOption = {
  id: 'pizza-flavor',
  title: 'Choose Flavor',
  options: [
    'BBQ Beef', 'BBQ Chicken', 'Chicken Tikka', 'Periperi Beef', 'Periperi Chicken',
    'Chicken & Mushroom', 'Vegetable Tikka', 'Nyama Feast', 'Veg Feast',
    'Chicken Feast', 'Chicken & Beef Pepperoni', 'Meat Deluxe', 'Chicken Bacon',
    'Chicken Hawaiian', 'Beef Hawaiian'
  ],
  required: true
};

export const MENU_DATA: MenuCategory[] = [
  {
    id: 'offers',
    title: 'Special Offers',
    description: 'Limited time deals you can\'t miss!',
    items: [
      {
        id: 'offer-1',
        name: 'Shawarma Special Combo',
        icon: '🌯',
        description: '2 Shawarma Rolls, 2 Fries portions, 5 Chicken Wings, and Cocktail Sauce',
        price: 950,
        tags: ['Best Seller', 'Value'],
        customizations: [SAUCES]
      },
      {
        id: 'offer-2',
        name: 'Sizzling Wings Deal',
        icon: '🔥',
        description: '6 Sizzling Chicken Wings, 1 Fries portion, and 1 Free Complimentary Juice',
        price: 450,
        tags: ['New', 'Quick Bite'],
        customizations: [WING_FLAVORS]
      }
    ]
  },
  {
    id: 'shawarma',
    title: 'Shawarma Corner',
    items: [
      {
        id: 'shawarma-classic',
        name: 'Shawarma Classic',
        icon: '🌯',
        price: {
          'Regular': 300,
          'Bigroll': 400,
          'Jumboroll': 500
        },
        customizations: [SAUCES]
      },
      {
        id: 'shawarma-combo',
        name: 'Shawarma Combo',
        icon: '🥤',
        description: 'Served with chips and soda',
        price: {
          'Regular + Chips + 350ml Soda': 500,
          'Bigroll + Big Chips + 500ml Soda': 620,
          'Jumboroll + Big Chips + 500ml Soda': 760
        },
        customizations: [SAUCES]
      }
    ]
  },
  {
    id: 'pizza',
    title: 'Pizza Corner',
    description: 'Flavors: BBQ Beef, BBQ Chicken, Chicken Tikka, Periperi Beef/Chicken, Chicken & Mushroom, Vegetable Tikka, Nyama Feast, Veg Feast, Chicken Feast, Chicken & Beef Pepperoni, Meat Deluxe, Chicken Bacon, Chicken/Beef Hawaiian',
    items: [
      {
        id: 'classic-pizza',
        name: 'Classic Pizza',
        icon: '🍕',
        price: {
          'Regular': 650,
          'Medium': 950,
          'Large': 1200,
          'Mega': 1350
        },
        customizations: [PIZZA_FLAVORS]
      },
      {
        id: 'supreme-pizza',
        name: 'Supreme Pizza',
        icon: '🍕',
        price: {
          'Regular': 730,
          'Medium': 1090,
          'Large': 1390,
          'Mega': 1750
        },
        customizations: [PIZZA_FLAVORS]
      },
      {
        id: 'extra-toppings',
        name: 'Extra Toppings',
        icon: '🧀',
        price: {
          'Cheese': 150,
          'Meat': 100,
          'Sauce': 80,
          'Bacon': 150
        }
      }
    ]
  },
  {
    id: 'burgers-sandwiches',
    title: 'Burgers & Sandwiches',
    description: 'All served with fries',
    subcategories: [
      {
        title: 'Burgers',
        items: [
          { id: 'special-burger', name: 'Special Burger + Fries', icon: '🍔', price: 800, customizations: [SAUCES] },
          { id: 'messy-burger', name: 'Messy Burger + Fries', icon: '🍔', price: 900, customizations: [SAUCES] },
          { id: 'cheese-burger', name: 'Cheese Burger + Fries', icon: '🧀', price: 850, customizations: [SAUCES] },
          { id: 'bbq-chicken-burger', name: 'BBQ Chicken Burger + Fries', icon: '🍗', price: 800, customizations: [SAUCES] },
          { id: 'grilled-chicken-burger', name: 'Grilled Chicken Burger + Fries', icon: '🔥', price: 900, customizations: [SAUCES] },
          { id: 'crispy-chicken-burger', name: 'Crispy Chicken Burger + Fries', icon: '🍗', price: 750, customizations: [SAUCES] },
        ]
      },
      {
        title: 'Sandwiches',
        items: [
          { id: 'chicken-cheese-sandwich', name: 'Chicken & Cheese Sandwich + Fries', icon: '🥪', price: 650, customizations: [SAUCES] },
          { id: 'grilled-chicken-sandwich', name: 'Grilled Chicken Sandwich + Fries', icon: '🥪', price: 700, customizations: [SAUCES] },
          { id: 'club-sandwich', name: 'Club Sandwich + Fries', icon: '🥪', price: 750, customizations: [SAUCES] },
          { id: 'grilled-cheese-sandwich', name: 'Grilled Cheese Sandwich + Fries', icon: '🥪', price: 600, customizations: [SAUCES] }
        ]
      }
    ]
  },
  {
    id: 'wings',
    title: 'Wings Corner',
    items: [
      { id: 'grilled-wings', name: '8 Grilled Wings + Fries', icon: '🍗', price: 700 },
      { id: 'crispy-wings', name: '8 Crispy Wings + Fries', icon: '🍗', price: 700 },
      { id: 'bbq-wings', name: '8 BBQ Wings + Fries', icon: '🍗', price: 750 },
      { id: 'sticky-wings', name: '8 Sticky Wings + Fries', icon: '🍗', price: 750 },
      { id: 'sweet-sour-wings', name: '8 Sweet & Sour Wings', icon: '🍗', price: 750 },
      { id: 'wings-combo', name: 'Combo Flavour of Choice + Chips + Soda', icon: '🥤', price: 850, customizations: [WING_FLAVORS] }
    ]
  },
  {
    id: 'fried-chicken',
    title: 'Fried Chicken',
    items: [
      { id: '1-piece', name: '1 Piece Only', icon: '🍗', price: 250 },
      { id: '1-piece-fries', name: '1 Piece + Fries', icon: '🍟', price: 400 },
      { id: '2-piece-fries', name: '2 Piece + Fries', icon: '🍟', price: 500 },
      { id: '3-piece-fries', name: '3 Piece + Fries', icon: '🍟', price: 700 },
      { id: '4-piece-fries', name: '4 Piece + Fries', icon: '🍟', price: 900 },
      { id: '5-piece-fries', name: '5 Piece + Fries', icon: '🍟', price: 1100 },
      { id: '2-piece-combo', name: '2 Piece Combo (Fries + Soda)', icon: '🥤', price: 550 },
      { id: '3-piece-combo', name: '3 Piece Combo (Fries + Soda)', icon: '🥤', price: 750 }
    ]
  },
  {
    id: 'hot-grill',
    title: 'Hot Grill',
    subcategories: [
      {
        title: 'Chicken',
        items: [
          { id: 'charcoal-grilled', name: 'Charcoal Grilled + Chips', icon: '🔥', price: 850 },
          { id: 'chicken-tikka', name: 'Chicken Tikka + Chips', icon: '🍗', price: 700 },
          { id: 'honey-glazed-chicken', name: 'Honey Glazed Chicken Breast + Fries', icon: '🍯', price: 750 },
          { id: 'periperi-chicken', name: 'Grilled Periperi Chicken + Fries', icon: '🌶️', price: 750 },
          { id: 'wings-6pcs', name: 'Chicken Wings + Fries (6pcs)', icon: '🍗', price: 700 },
          { id: 'wings-12pcs', name: 'Chicken Wings + Fries (12pcs)', icon: '🍗', price: 1400 }
        ]
      },
      {
        title: 'Beef',
        items: [
          { id: 'steak', name: 'Steak & Fries', icon: '🥩', price: 1200 },
          { id: 'beef-tenderloin', name: 'Beef Tenderloin + Fries', icon: '🥩', price: 950 },
          { id: 'ribs', name: '6 Ribs + Chips', icon: '🍖', price: 1000 },
        ]
      },
      {
        title: 'Other',
        items: [
          { id: 'mutura', name: 'Mutura + Chips', icon: '🍢', price: 400 },
        ]
      }
    ]
  },
  {
    id: 'local-corners',
    title: 'Chicken, Beef & Fish',
    description: 'Served with accompaniment of choice plus Greens (Ugali/Rice/Chapo/Chips)',
    subcategories: [
      {
        title: 'Chicken',
        items: [
          { id: 'chicken-wet-fry', name: 'Chicken Wet Fry', icon: '🥘', price: 550, customizations: [ACCOMPANIMENTS] },
          { id: 'chicken-dry-fry', name: 'Chicken Dry Fry', icon: '🍗', price: 550, customizations: [ACCOMPANIMENTS] },
          { id: 'chicken-deep-fry', name: 'Chicken Deep Fry', icon: '🍗', price: 500, customizations: [ACCOMPANIMENTS] },
          { id: 'stir-fried-chicken', name: 'Stir Fried Chicken', icon: '🥘', price: 650, customizations: [ACCOMPANIMENTS] },
          { id: 'chicken-fried-rice', name: 'Chicken Fried Rice', icon: '🍚', price: 600 },
        ]
      },
      {
        title: 'Beef',
        items: [
          { id: 'beef-stir-fried', name: 'Beef Stir Fried', icon: '🥘', price: 600, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-wet-fry', name: 'Beef Wet Fry', icon: '🥘', price: 550, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-dry-fry', name: 'Beef Dry Fry', icon: '🥩', price: 550, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-fillet', name: 'Beef Fillet', icon: '🥩', price: 650, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-skewers', name: 'Beef Skewers', icon: '🍢', price: 450, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-mushroom', name: 'Beef in Mushroom Sauce', icon: '🍄', price: 600, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-ribs', name: 'Short Beef Ribs', icon: '🍖', price: 750, customizations: [ACCOMPANIMENTS] },
        ]
      },
      {
        title: 'Fish',
        items: [
          {
            id: 'fish-small',
            name: 'Whole Fish Small',
            icon: '🐟',
            price: { 'Dry': 450, 'Wet': 500, 'Coconut': 550 },
            customizations: [ACCOMPANIMENTS]
          },
          {
            id: 'fish-medium',
            name: 'Whole Fish Medium',
            icon: '🐟',
            price: { 'Dry': 500, 'Wet': 550, 'Coconut': 650 },
            customizations: [ACCOMPANIMENTS]
          },
          {
            id: 'fish-big',
            name: 'Whole Fish Big',
            icon: '🐟',
            price: { 'Dry': 550, 'Wet': 600, 'Coconut': 700 },
            customizations: [ACCOMPANIMENTS]
          },
          {
            id: 'fish-fillet',
            name: 'Fish Fillet',
            icon: '🐟',
            price: { 'Dry': 600, 'Wet': 650, 'Coconut': 750 },
            customizations: [ACCOMPANIMENTS]
          }
        ]
      },
      {
        title: 'Goat',
        items: [
          { id: 'goat-meat', name: 'Goat Meat', icon: '🍖', price: 800, customizations: [ACCOMPANIMENTS] },
        ]
      }
    ]
  },
  {
    id: 'loaded-fries',
    title: 'Loaded Fries',
    items: [
      { id: 'loaded-crispy-chicken', name: 'Crispy Chicken Loaded Fries', icon: '🍟', price: 800 },
      { id: 'loaded-chicken-bacon', name: 'Chicken Bacon Loaded Fries', icon: '🍟', price: 900 },
      { id: 'loaded-beef', name: 'Beef Loaded Fries', icon: '🍟', price: 850 },
      { id: 'loaded-beef-bacon', name: 'Beef Bacon Loaded Fries', icon: '🍟', price: 900 },
      { id: 'loaded-sausage', name: 'Sausage (Beef/Chicken) Loaded Fries', icon: '🍟', price: 850 }
    ]
  },
  {
    id: 'platters',
    title: 'Mixed Grill Platters',
    description: 'All come with complimentary fresh cocktails',
    items: [
      {
        id: 'mixed-grill-platter',
        name: 'Mixed Grill Platter',
        icon: '🍖',
        description: 'Skewers, Grilled Chicken, Ribs, Chips, and Chips Masala',
        price: {
          '2 People': 1300,
          '4 People': 2400,
          '6 People': 3600,
          '8 People': 4800
        }
      },
      {
        id: 'mixed-grill-african-platter',
        name: 'Mixed Grill African Platter',
        icon: '🥘',
        description: 'Mbuzi, Chicken, Fried Rice, Ugali, Greens and Kachumbari',
        price: {
          '2 People': 1350,
          '4 People': 2700,
          '6 People': 3900,
          '8 People': 5100
        }
      }
    ]
  },
  {
    id: 'sides',
    title: 'Sides & Extras',
    items: [
      { id: 'chips', name: 'Chips', icon: '🍟', price: 200 },
      { id: 'chips-masala', name: 'Chips Masala', icon: '🍟', price: 300 },
      { id: 'pousin-chips', name: 'Pousin Chips', icon: '🍟', price: 250 },
      { id: 'plantain', name: 'Plantain', icon: '🍌', price: 300 },
      { id: 'spicy-fries', name: 'Spicy Fries', icon: '🍟', price: 250 },
      { id: 'bajia', name: 'Bajia', icon: '🥔', price: 300 },
      { id: 'viazi-karai', name: 'Viazi Karai', icon: '🥔', price: 250 },
      { id: 'veg-rice', name: 'Vegetable Rice', icon: '🍚', price: 300 },
      { id: 'lyonnaise-potatoes', name: 'Lyonnaise Potatoes', icon: '🥔', price: 300 },
      { id: 'mashed-potatoes', name: 'Mashed Potatoes', icon: '🥔', price: 300 },
      { id: 'ugali', name: 'Ugali', icon: '🥣', price: 100 },
      { id: 'mukimo', name: 'Mukimo', icon: '🥣', price: 300 },
      { id: 'githeri', name: 'Githeri', icon: '🥣', price: 350 },
      { id: 'managu', name: 'Managu', icon: '🥬', price: 200 },
      { id: 'rice', name: 'Rice', icon: '🍚', price: 250 },
      { id: 'biryani', name: 'Biryani', icon: '🍚', price: 650 },
      { id: 'pilau', name: 'Pilau', icon: '🍚', price: 650 },
      { id: 'chicken-kienyeji', name: 'Chicken Kienyeji', icon: '🍗', price: 900 }
    ]
  },
  {
    id: 'kids',
    title: 'Kids Corner',
    items: [
      { id: 'kids-lollipops', name: 'Chicken 3pcs Lollipops + Fries', icon: '🍭', price: 500 },
      { id: 'kids-fingers', name: 'Chicken Fingers / Fish Fingers', icon: '🍗', price: 550 },
      { id: 'kids-burger', name: 'Mini Burger + Chips', icon: '🍔', price: 500 },
      { id: 'kids-sausage', name: 'Choma Sausage + Chips', icon: '🌭', price: 500 }
    ]
  }
];
