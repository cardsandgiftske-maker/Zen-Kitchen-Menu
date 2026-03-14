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
        description: '2 Shawarma Rolls, 2 Fries portions, 5 Chicken Wings, and Cocktail Sauce',
        price: 950,
        tags: ['Best Seller', 'Value'],
        customizations: [SAUCES]
      },
      {
        id: 'offer-2',
        name: 'Sizzling Wings Deal',
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
          { id: 'special-burger', name: 'Special Burger + Fries', price: 800, customizations: [SAUCES] },
          { id: 'messy-burger', name: 'Messy Burger + Fries', price: 900, customizations: [SAUCES] },
          { id: 'cheese-burger', name: 'Cheese Burger + Fries', price: 850, customizations: [SAUCES] },
          { id: 'bbq-chicken-burger', name: 'BBQ Chicken Burger + Fries', price: 800, customizations: [SAUCES] },
          { id: 'grilled-chicken-burger', name: 'Grilled Chicken Burger + Fries', price: 900, customizations: [SAUCES] },
          { id: 'crispy-chicken-burger', name: 'Crispy Chicken Burger + Fries', price: 750, customizations: [SAUCES] },
        ]
      },
      {
        title: 'Sandwiches',
        items: [
          { id: 'chicken-cheese-sandwich', name: 'Chicken & Cheese Sandwich + Fries', price: 650, customizations: [SAUCES] },
          { id: 'grilled-chicken-sandwich', name: 'Grilled Chicken Sandwich + Fries', price: 700, customizations: [SAUCES] },
          { id: 'club-sandwich', name: 'Club Sandwich + Fries', price: 750, customizations: [SAUCES] },
          { id: 'grilled-cheese-sandwich', name: 'Grilled Cheese Sandwich + Fries', price: 600, customizations: [SAUCES] }
        ]
      }
    ]
  },
  {
    id: 'wings',
    title: 'Wings Corner',
    items: [
      { id: 'grilled-wings', name: '8 Grilled Wings + Fries', price: 700 },
      { id: 'crispy-wings', name: '8 Crispy Wings + Fries', price: 700 },
      { id: 'bbq-wings', name: '8 BBQ Wings + Fries', price: 750 },
      { id: 'sticky-wings', name: '8 Sticky Wings + Fries', price: 750 },
      { id: 'sweet-sour-wings', name: '8 Sweet & Sour Wings', price: 750 },
      { id: 'wings-combo', name: 'Combo Flavour of Choice + Chips + Soda', price: 850, customizations: [WING_FLAVORS] }
    ]
  },
  {
    id: 'fried-chicken',
    title: 'Fried Chicken',
    items: [
      { id: '1-piece', name: '1 Piece Only', price: 250 },
      { id: '1-piece-fries', name: '1 Piece + Fries', price: 400 },
      { id: '2-piece-fries', name: '2 Piece + Fries', price: 500 },
      { id: '3-piece-fries', name: '3 Piece + Fries', price: 700 },
      { id: '4-piece-fries', name: '4 Piece + Fries', price: 900 },
      { id: '5-piece-fries', name: '5 Piece + Fries', price: 1100 },
      { id: '2-piece-combo', name: '2 Piece Combo (Fries + Soda)', price: 550 },
      { id: '3-piece-combo', name: '3 Piece Combo (Fries + Soda)', price: 750 }
    ]
  },
  {
    id: 'hot-grill',
    title: 'Hot Grill',
    subcategories: [
      {
        title: 'Chicken',
        items: [
          { id: 'charcoal-grilled', name: 'Charcoal Grilled + Chips', price: 850 },
          { id: 'chicken-tikka', name: 'Chicken Tikka + Chips', price: 700 },
          { id: 'honey-glazed-chicken', name: 'Honey Glazed Chicken Breast + Fries', price: 750 },
          { id: 'periperi-chicken', name: 'Grilled Periperi Chicken + Fries', price: 750 },
          { id: 'wings-6pcs', name: 'Chicken Wings + Fries (6pcs)', price: 700 },
          { id: 'wings-12pcs', name: 'Chicken Wings + Fries (12pcs)', price: 1400 }
        ]
      },
      {
        title: 'Beef',
        items: [
          { id: 'steak', name: 'Steak & Fries', price: 1200 },
          { id: 'beef-tenderloin', name: 'Beef Tenderloin + Fries', price: 950 },
          { id: 'ribs', name: '6 Ribs + Chips', price: 1000 },
        ]
      },
      {
        title: 'Other',
        items: [
          { id: 'mutura', name: 'Mutura + Chips', price: 400 },
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
          { id: 'chicken-wet-fry', name: 'Chicken Wet Fry', price: 550, customizations: [ACCOMPANIMENTS] },
          { id: 'chicken-dry-fry', name: 'Chicken Dry Fry', price: 550, customizations: [ACCOMPANIMENTS] },
          { id: 'chicken-deep-fry', name: 'Chicken Deep Fry', price: 500, customizations: [ACCOMPANIMENTS] },
          { id: 'stir-fried-chicken', name: 'Stir Fried Chicken', price: 650, customizations: [ACCOMPANIMENTS] },
          { id: 'chicken-fried-rice', name: 'Chicken Fried Rice', price: 600 },
        ]
      },
      {
        title: 'Beef',
        items: [
          { id: 'beef-stir-fried', name: 'Beef Stir Fried', price: 600, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-wet-fry', name: 'Beef Wet Fry', price: 550, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-dry-fry', name: 'Beef Dry Fry', price: 550, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-fillet', name: 'Beef Fillet', price: 650, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-skewers', name: 'Beef Skewers', price: 450, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-mushroom', name: 'Beef in Mushroom Sauce', price: 600, customizations: [ACCOMPANIMENTS] },
          { id: 'beef-ribs', name: 'Short Beef Ribs', price: 750, customizations: [ACCOMPANIMENTS] },
        ]
      },
      {
        title: 'Fish',
        items: [
          {
            id: 'fish-small',
            name: 'Whole Fish Small',
            price: { 'Dry': 450, 'Wet': 500, 'Coconut': 550 },
            customizations: [ACCOMPANIMENTS]
          },
          {
            id: 'fish-medium',
            name: 'Whole Fish Medium',
            price: { 'Dry': 500, 'Wet': 550, 'Coconut': 650 },
            customizations: [ACCOMPANIMENTS]
          },
          {
            id: 'fish-big',
            name: 'Whole Fish Big',
            price: { 'Dry': 550, 'Wet': 600, 'Coconut': 700 },
            customizations: [ACCOMPANIMENTS]
          },
          {
            id: 'fish-fillet',
            name: 'Fish Fillet',
            price: { 'Dry': 600, 'Wet': 650, 'Coconut': 750 },
            customizations: [ACCOMPANIMENTS]
          }
        ]
      },
      {
        title: 'Goat',
        items: [
          { id: 'goat-meat', name: 'Goat Meat', price: 800, customizations: [ACCOMPANIMENTS] },
        ]
      }
    ]
  },
  {
    id: 'loaded-fries',
    title: 'Loaded Fries',
    items: [
      { id: 'loaded-crispy-chicken', name: 'Crispy Chicken Loaded Fries', price: 800 },
      { id: 'loaded-chicken-bacon', name: 'Chicken Bacon Loaded Fries', price: 900 },
      { id: 'loaded-beef', name: 'Beef Loaded Fries', price: 850 },
      { id: 'loaded-beef-bacon', name: 'Beef Bacon Loaded Fries', price: 900 },
      { id: 'loaded-sausage', name: 'Sausage (Beef/Chicken) Loaded Fries', price: 850 }
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
      { id: 'chips', name: 'Chips', price: 200 },
      { id: 'chips-masala', name: 'Chips Masala', price: 300 },
      { id: 'pousin-chips', name: 'Pousin Chips', price: 250 },
      { id: 'plantain', name: 'Plantain', price: 300 },
      { id: 'spicy-fries', name: 'Spicy Fries', price: 250 },
      { id: 'bajia', name: 'Bajia', price: 300 },
      { id: 'viazi-karai', name: 'Viazi Karai', price: 250 },
      { id: 'veg-rice', name: 'Vegetable Rice', price: 300 },
      { id: 'lyonnaise-potatoes', name: 'Lyonnaise Potatoes', price: 300 },
      { id: 'mashed-potatoes', name: 'Mashed Potatoes', price: 300 },
      { id: 'ugali', name: 'Ugali', price: 100 },
      { id: 'mukimo', name: 'Mukimo', price: 300 },
      { id: 'githeri', name: 'Githeri', price: 350 },
      { id: 'managu', name: 'Managu', price: 200 },
      { id: 'rice', name: 'Rice', price: 250 },
      { id: 'biryani', name: 'Biryani', price: 650 },
      { id: 'pilau', name: 'Pilau', price: 650 },
      { id: 'chicken-kienyeji', name: 'Chicken Kienyeji', price: 900 }
    ]
  },
  {
    id: 'kids',
    title: 'Kids Corner',
    items: [
      { id: 'kids-lollipops', name: 'Chicken 3pcs Lollipops + Fries', price: 500 },
      { id: 'kids-fingers', name: 'Chicken Fingers / Fish Fingers', price: 550 },
      { id: 'kids-burger', name: 'Mini Burger + Chips', price: 500 },
      { id: 'kids-sausage', name: 'Choma Sausage + Chips', price: 500 }
    ]
  }
];
