/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Pizza, 
  Beef, 
  Flame, 
  Fish, 
  Baby, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Phone,
  Search,
  Menu as MenuIcon,
  X,
  Check,
  ArrowUp,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { MENU_DATA } from './data';
import { MenuCategory, MenuItem } from './types';

const CategoryIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'offers': return <Flame className="w-5 h-5 text-orange-500" />;
    case 'pizza': return <Pizza className="w-5 h-5" />;
    case 'burgers-sandwiches': return <Beef className="w-5 h-5" />;
    case 'hot-grill': return <Flame className="w-5 h-5" />;
    case 'local-corners': return <Fish className="w-5 h-5" />;
    case 'kids': return <Baby className="w-5 h-5" />;
    default: return <Utensils className="w-5 h-5" />;
  }
};

const PriceDisplay = ({ price }: { price: number | Record<string, number> }) => {
  if (typeof price === 'number') {
    return <span className="text-gold font-bold">Ksh {price.toLocaleString()}</span>;
  }

  return (
    <div className="space-y-1">
      {Object.entries(price).map(([size, p]) => (
        <div key={size} className="flex justify-between text-sm">
          <span className="text-white/60">{size}</span>
          <span className="text-gold font-semibold">Ksh {p.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    size?: string;
    customizations: Record<string, string>;
  }>({ customizations: {} });
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Update active category based on scroll position
      const scrollPosition = window.scrollY + 200;
      for (const category of MENU_DATA) {
        const ref = categoryRefs.current[category.id];
        if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
          setActiveCategory(category.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    setIsMenuOpen(false);
    const element = categoryRefs.current[id];
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOrder = (item: MenuItem, options?: { size?: string, customizations?: Record<string, string> }) => {
    const phoneNumber = '254706148182';
    let priceText = '';
    let finalItemName = item.name;

    if (options?.size && typeof item.price !== 'number') {
      const price = item.price[options.size];
      priceText = `Ksh ${price.toLocaleString()}`;
      finalItemName = `${item.name} (${options.size})`;
    } else if (typeof item.price === 'number') {
      priceText = `Ksh ${item.price.toLocaleString()}`;
    } else {
      // If size is required but not provided, open modal
      setCustomizingItem(item);
      setSelectedOptions({ size: undefined, customizations: {} });
      return;
    }

    // Check for required customizations
    if (item.customizations) {
      const missingRequired = item.customizations.some(c => c.required && (!options?.customizations || !options.customizations[c.id]));
      if (missingRequired && !options?.customizations) {
        setCustomizingItem(item);
        setSelectedOptions({ size: options?.size, customizations: {} });
        return;
      }
    }

    let customizationText = '';
    if (options?.customizations) {
      customizationText = Object.entries(options.customizations)
        .map(([id, value]) => {
          const cust = item.customizations?.find(c => c.id === id);
          return `*${cust?.title}:* ${value}`;
        })
        .join('\n');
    }

    const message = `Hello Zen Kitchen! I'd like to order:\n\n*${finalItemName}*\n${item.description ? `_${item.description}_\n` : ''}${customizationText ? `${customizationText}\n` : ''}Price: ${priceText}\n\nPlease let me know the next steps.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setCustomizingItem(null);
  };

  const filteredMenu = MENU_DATA.map(cat => {
    const filteredItems = cat.items?.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const filteredSubcategories = cat.subcategories?.map(sub => ({
      ...sub,
      items: sub.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(sub => sub.items.length > 0) || [];

    return {
      ...cat,
      items: filteredItems,
      subcategories: filteredSubcategories
    };
  }).filter(cat => (cat.items?.length || 0) > 0 || (cat.subcategories?.length || 0) > 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zen-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Zen Kitchen Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if logo.png is not found
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center"><svg class="text-zen-black w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg></div>';
                }}
              />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-gold">ZEN KITCHEN</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Authentic Flavors</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {MENU_DATA.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  activeCategory === cat.id ? 'text-gold' : 'text-white/60'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 w-48 transition-all focus:w-64"
              />
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-gold"
            >
              {isMenuOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zen-black pt-24 px-4 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 w-full text-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {MENU_DATA.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-gold border-gold text-zen-black' 
                        : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    <CategoryIcon id={cat.id} />
                    <span className="font-medium text-sm">{cat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Now featuring Special Offers */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Immersive Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=1920" 
            alt="Shawarma Special Combo" 
            className="w-full h-full object-cover scale-105"
            style={{ animation: 'slowZoom 20s infinite alternate' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zen-black via-zen-black/40 to-zen-black" />
          <div className="absolute inset-0 bg-zen-black/20" />
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slowZoom {
            from { transform: scale(1); }
            to { transform: scale(1.1); }
          }
        `}} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="text-gold font-medium tracking-[0.4em] uppercase text-xs mb-6 block">Exquisite Dining</span>
              <h2 className="font-serif text-6xl md:text-9xl font-bold mb-8 leading-[0.9] tracking-tighter">
                TODAY'S <br />
                <span className="text-gold italic">SIZZLING</span> <br />
                OFFERS
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-xl mb-10 leading-relaxed">
                Experience the ultimate **Shawarma Special Combo**. Our signature rolls, crispy wings, and golden fries are prepared with passion just for you.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => scrollToCategory('offers')}
                  className="bg-gold text-zen-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl shadow-gold/20"
                >
                  Claim Your Deal
                </button>
                <button 
                  onClick={() => scrollToCategory('pizza')}
                  className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
                >
                  Explore Menu
                </button>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MENU_DATA.find(c => c.id === 'offers')?.items.map((offer, idx) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.2 }}
                className="relative group cursor-pointer"
                onClick={() => handleOrder(offer)}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-gold to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-zen-gray/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-gold/20 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {offer.tags?.[0] || 'Special'}
                    </div>
                    <div className="text-3xl font-bold text-gold">Ksh {offer.price.toLocaleString()}</div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-gold transition-colors flex items-center gap-3">
                    {offer.icon && <span>{offer.icon}</span>}
                    {offer.name}
                  </h3>
                  <p className="text-white/60 text-lg mb-8 leading-relaxed flex-grow">
                    {offer.description}
                  </p>
                  <button className="w-full py-4 bg-gold text-zen-black font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                    Order on WhatsApp <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <button 
              onClick={() => scrollToCategory('shawarma')}
              className="text-white/40 hover:text-gold transition-colors flex items-center gap-2 mx-auto text-sm uppercase tracking-widest font-bold"
            >
              Explore Full Menu <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        {filteredMenu.map((category) => (
          <section 
            key={category.id} 
            id={category.id}
            ref={el => categoryRefs.current[category.id] = el}
            className="mb-24 scroll-mt-32"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h3 className="section-title">{category.title}</h3>
                {category.description && (
                  <p className="text-white/40 max-w-2xl text-sm italic mt-2">
                    {category.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-white/20 text-xs uppercase tracking-widest font-bold">
                <CategoryIcon id={category.id} />
                <span>Category</span>
              </div>
            </div>

            <div className="space-y-16">
              {category.items && category.items.length > 0 && (
                <div className="menu-grid">
                  {category.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="glass-card group cursor-pointer"
                      onClick={() => handleOrder(item)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-semibold group-hover:text-gold transition-colors flex items-center gap-2">
                          {item.icon && <span className="text-2xl">{item.icon}</span>}
                          {item.name}
                        </h4>
                        <div className="p-2 bg-gold/10 rounded-lg">
                          <ChevronRight className="w-4 h-4 text-gold" />
                        </div>
                      </div>
                      
                      {item.description && (
                        <p className="text-white/50 text-sm mb-6 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                        <PriceDisplay price={item.price} />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrder(item);
                          }}
                          className="w-full py-3 bg-gold/10 hover:bg-gold text-gold hover:text-zen-black border border-gold/20 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                        >
                          Order on WhatsApp <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {category.subcategories && category.subcategories.map((sub) => (
                <div key={sub.title} className="space-y-8">
                  <h4 className="text-gold font-serif text-xl font-medium border-b border-white/5 pb-4 flex items-center gap-3">
                    <span className="w-2 h-2 bg-moss rounded-full"></span>
                    {sub.title}
                  </h4>
                  <div className="menu-grid">
                    {sub.items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card group cursor-pointer"
                        onClick={() => handleOrder(item)}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-xl font-semibold group-hover:text-gold transition-colors flex items-center gap-2">
                            {item.icon && <span className="text-2xl">{item.icon}</span>}
                            {item.name}
                          </h4>
                          <div className="p-2 bg-gold/10 rounded-lg">
                            <ChevronRight className="w-4 h-4 text-gold" />
                          </div>
                        </div>
                        
                        {item.description && (
                          <p className="text-white/50 text-sm mb-6 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                          <PriceDisplay price={item.price} />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrder(item);
                            }}
                            className="w-full py-3 bg-gold/10 hover:bg-gold text-gold hover:text-zen-black border border-gold/20 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                          >
                            Order on WhatsApp <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredMenu.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-white/40">No items found matching your search</h3>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-gold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zen-gray py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            {/* Column 1: Logo & Description */}
            <div className="flex flex-col items-start space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden bg-white/5 rounded-2xl p-2">
                  <img 
                    src="/logo.png" 
                    alt="Zen Kitchen Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="w-12 h-12 bg-gold rounded-full flex items-center justify-center"><svg class="text-zen-black w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg></div>';
                    }}
                  />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gold tracking-tight">ZEN KITCHEN</h2>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-moss font-bold">Authentic Flavors</p>
                </div>
              </div>
              <p className="text-white/40 leading-relaxed max-w-xs">
                Dedicated to providing an unforgettable dining experience through our passion for food and commitment to quality.
              </p>
            </div>

            {/* Column 2: Location & Contact */}
            <div className="space-y-8">
              <h4 className="font-serif text-xl font-semibold text-gold relative inline-block pb-2">
                Find Us
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-moss"></span>
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-white/60 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-moss/20 transition-colors">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-white/30 mb-1">Location</span>
                    <span className="text-sm leading-relaxed">Hazina Trade Center Building, Floor M1<br/>(near Jeevanjee Gardens), Nairobi</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-white/60 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-moss/20 transition-colors">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-white/30 mb-1">WhatsApp / Call</span>
                    <a href="https://wa.me/254706148182" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold transition-colors">0706 148 182</a>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-white/60 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-moss/20 transition-colors">
                    <Instagram className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-white/30 mb-1">Follow Us</span>
                    <span className="text-sm">@zenkitchenke</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Opening Hours */}
            <div className="space-y-8">
              <h4 className="font-serif text-xl font-semibold text-gold relative inline-block pb-2">
                Opening Hours
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-moss"></span>
              </h4>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span className="text-white/60">Monday - Sunday</span>
                    <span className="text-gold font-medium">8:00 AM - 9:00 PM</span>
                  </li>
                  <li className="pt-4 border-t border-white/5">
                    <p className="text-xs text-white/30 italic">
                      * Open on all public holidays unless stated otherwise.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs uppercase tracking-widest">
            <p>© 2026 Zen Kitchen. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gold text-zen-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Customization Modal */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingItem(null)}
              className="absolute inset-0 bg-zen-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-zen-gray border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif text-gold">{customizingItem.name}</h3>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Customize your order</p>
                </div>
                <button 
                  onClick={() => setCustomizingItem(null)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white/40" />
                </button>
              </div>

              <div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {/* Size Selection */}
                {typeof customizingItem.price !== 'number' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Select Size</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(customizingItem.price).map(([size, price]) => (
                        <button
                          key={size}
                          onClick={() => setSelectedOptions(prev => ({ ...prev, size }))}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                            selectedOptions.size === size 
                              ? 'bg-gold/10 border-gold text-gold' 
                              : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                          }`}
                        >
                          <span className="font-medium">{size}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm">Ksh {price.toLocaleString()}</span>
                            {selectedOptions.size === size && <Check className="w-4 h-4" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customizations */}
                {customizingItem.customizations?.map((cust) => (
                  <div key={cust.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">{cust.title}</h4>
                      {cust.required && <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full uppercase font-bold">Required</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {cust.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedOptions(prev => ({
                            ...prev,
                            customizations: { ...prev.customizations, [cust.id]: opt }
                          }))}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                            selectedOptions.customizations[cust.id] === opt 
                              ? 'bg-gold/10 border-gold text-gold' 
                              : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                          }`}
                        >
                          <span className="text-sm font-medium">{opt}</span>
                          {selectedOptions.customizations[cust.id] === opt && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white/5 border-t border-white/5">
                <button
                  disabled={
                    (typeof customizingItem.price !== 'number' && !selectedOptions.size) ||
                    (customizingItem.customizations?.some(c => c.required && !selectedOptions.customizations[c.id]))
                  }
                  onClick={() => handleOrder(customizingItem, selectedOptions)}
                  className="w-full py-4 bg-gold text-zen-black rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  Confirm & Order <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
