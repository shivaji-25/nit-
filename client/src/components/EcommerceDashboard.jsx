import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Minus, 
  Trash2, 
  Search, 
  Moon, 
  Sun, 
  Package, 
  Clock, 
  Star, 
  X, 
  Check, 
  Activity, 
  BarChart3, 
  ChevronRight, 
  Lock,
  Layers,
  Award
} from 'lucide-react';

// Gourmet Food Manufacturing Products (FR-1.5 Integer Paise Compliant)
const INITIAL_PRODUCTS = [
  {
    id: 'prod-01',
    sku: '#BF-101',
    name: 'Artisanal Belgian Truffle Cookies',
    category: 'Artisanal Cookies',
    tag: 'Best Seller',
    tagColor: '#8b5cf6',
    pricePaise: 42000, // ₹420.00
    displayPrice: '₹420',
    weight: '150g x 24 packs',
    rating: 4.9,
    reviews: 142,
    stockPct: 98,
    stockBatch: 'Batch #B26-091',
    shelfLife: '9 Months',
    desc: 'Crafted with 72% Belgian dark cocoa and European grass-fed butter, baked to crispy perfection.',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    accentColor: '#8b5cf6'
  },
  {
    id: 'prod-02',
    sku: '#SC-204',
    name: 'Salted Caramel Butter Crisps',
    category: 'Artisanal Cookies',
    tag: 'Trending',
    tagColor: '#00d4ff',
    pricePaise: 38000, // ₹380.00
    displayPrice: '₹380',
    weight: '120g x 24 packs',
    rating: 4.8,
    reviews: 98,
    stockPct: 92,
    stockBatch: 'Batch #B26-094',
    shelfLife: '6 Months',
    desc: 'Rich caramel drizzle balanced with pink Himalayan salt flakes. Pure indulgence in every bite.',
    gradient: 'linear-gradient(135deg, #082f49 0%, #0369a1 100%)',
    accentColor: '#00d4ff'
  },
  {
    id: 'prod-03',
    sku: '#TC-308',
    name: 'Parmesan Truffle Sourdough Crackers',
    category: 'Gourmet Crackers',
    tag: 'Executive Tier',
    tagColor: '#10b981',
    pricePaise: 51000, // ₹510.00
    displayPrice: '₹510',
    weight: '200g x 20 packs',
    rating: 5.0,
    reviews: 76,
    stockPct: 86,
    stockBatch: 'Batch #B26-088',
    shelfLife: '12 Months',
    desc: '48-hour slow fermented wild yeast sourdough with 24-month aged Reggiano and black summer truffles.',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
    accentColor: '#10b981'
  },
  {
    id: 'prod-04',
    sku: '#HW-412',
    name: 'Hazelnut Cream Praline Wafers',
    category: 'Organic Wafers',
    tag: 'New Release',
    tagColor: '#f59e0b',
    pricePaise: 29000, // ₹290.00
    displayPrice: '₹290',
    weight: '100g x 30 packs',
    rating: 4.7,
    reviews: 64,
    stockPct: 100,
    stockBatch: 'Batch #B26-102',
    shelfLife: '8 Months',
    desc: 'Quadruple golden wafer layers filled with slow-roasted Piedmont hazelnut ganache.',
    gradient: 'linear-gradient(135deg, #451a03 0%, #9a3412 100%)',
    accentColor: '#f59e0b'
  },
  {
    id: 'prod-05',
    sku: '#DC-515',
    name: 'Dark Chocolate Almond Rounds',
    category: 'Artisanal Cookies',
    tag: 'High Demand',
    tagColor: '#ec4899',
    pricePaise: 46000, // ₹460.00
    displayPrice: '₹460',
    weight: '160g x 24 packs',
    rating: 4.9,
    reviews: 118,
    stockPct: 94,
    stockBatch: 'Batch #B26-099',
    shelfLife: '9 Months',
    desc: 'Whole slow-roasted California almonds drenched in double-conched dark chocolate fudge.',
    gradient: 'linear-gradient(135deg, #500724 0%, #9d174d 100%)',
    accentColor: '#ec4899'
  },
  {
    id: 'prod-06',
    sku: '#HO-620',
    name: 'Honey Oat Multigrain Crunch',
    category: 'Gourmet Crackers',
    tag: 'Organic Health',
    tagColor: '#10b981',
    pricePaise: 32000, // ₹320.00
    displayPrice: '₹320',
    weight: '180g x 24 packs',
    rating: 4.8,
    reviews: 82,
    stockPct: 96,
    stockBatch: 'Batch #B26-105',
    shelfLife: '10 Months',
    desc: 'Rolled Scottish oats infused with wild raw forest honey, chia seeds, and golden flax.',
    gradient: 'linear-gradient(135deg, #14532d 0%, #15803d 100%)',
    accentColor: '#10b981'
  }
];

// Interactive 3D Tilt Card Component
const ProductCard3D = ({ product, onAddToCart, isDark }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    const rotateX = -(y / (card.height / 2)) * 10;
    const rotateY = (x / (card.width / 2)) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleAdd = () => {
    onAddToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      className={`luxury-card-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      <div className="luxury-product-card">
        {/* Glow ambient highlight behind card */}
        <div
          className="card-ambient-glow"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${product.accentColor}33, transparent 70%)`,
            opacity: isHovered ? 1 : 0.4
          }}
        />

        {/* Top Product Header */}
        <div className="card-top-badge-row">
          <span
            className="luxury-sku-pill"
            style={{ borderColor: `${product.accentColor}44`, color: product.accentColor }}
          >
            {product.sku}
          </span>
          <span
            className="luxury-status-badge"
            style={{
              background: `${product.tagColor}1a`,
              color: product.tagColor,
              borderColor: `${product.tagColor}40`
            }}
          >
            <Sparkles size={11} />
            <span>{product.tag}</span>
          </span>
        </div>

        {/* Product Visual Area with Dynamic Gradient */}
        <div className="card-visual-stage" style={{ background: product.gradient }}>
          <div className="card-visual-content">
            <Package size={44} color="#ffffff" className="floating-product-icon" />
            <div className="card-visual-spec-pill">
              <Clock size={11} color="#ffffff" />
              <span>FIFO: {product.shelfLife}</span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="card-body-content">
          <div className="card-title-row">
            <h3 className="card-product-title">{product.name}</h3>
            <div className="card-rating-badge">
              <Star size={12} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="card-desc-text">{product.desc}</p>

          {/* Real-time Inventory Progress Bar */}
          <div className="card-inventory-meter">
            <div className="meter-label-row">
              <span className="meter-status-txt">
                <Activity size={11} color="#10b981" />
                <span>{product.stockBatch}</span>
              </span>
              <span className="meter-pct-txt">{product.stockPct}% Available</span>
            </div>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{
                  width: `${product.stockPct}%`,
                  background: `linear-gradient(90deg, #10b981 0%, ${product.accentColor} 100%)`
                }}
              />
            </div>
          </div>

          {/* Pricing & Packaging Details */}
          <div className="card-pricing-row">
            <div>
              <div className="card-unit-price">{product.displayPrice}</div>
              <div className="card-package-sub">{product.weight}</div>
            </div>

            {/* Qty Stepper */}
            <div className="luxury-qty-stepper">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={12} />
              </button>
              <span className="qty-val">{qty}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Morphing Add-to-Cart Button with Ripple */}
          <button
            type="button"
            className={`luxury-add-btn ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
            style={{
              background: justAdded
                ? '#10b981'
                : `linear-gradient(135deg, ${product.accentColor} 0%, #4f46e5 100%)`
            }}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={15} />
                <span>Add {qty > 1 ? `${qty} Cartons` : 'to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const EcommerceDashboard = () => {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Filtered Products
  const categories = ['All', 'Artisanal Cookies', 'Gourmet Crackers', 'Organic Wafers'];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((prod) => {
      const matchCat = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart Calculations in integer paise
  const cartSubtotalPaise = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.pricePaise * item.qty, 0);
  }, [cart]);

  // GST 5% in paise
  const gstPaise = Math.round(cartSubtotalPaise * 0.05);
  const totalPaise = cartSubtotalPaise + gstPaise;
  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleAddToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((it) => it.product.id === product.id);
      if (existing) {
        return prevCart.map((it) =>
          it.product.id === product.id ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [...prevCart, { product, qty }];
    });
  };

  const handleUpdateQty = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((it) => {
          if (it.product.id === productId) {
            const nextQty = it.qty + delta;
            return nextQty > 0 ? { ...it, qty: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((it) => it.product.id !== productId));
  };

  // Instant AI Copilot Restock Action
  const handleApplyAiRestock = () => {
    handleAddToCart(INITIAL_PRODUCTS[0], 2);
    handleAddToCart(INITIAL_PRODUCTS[1], 1);
    setIsCartOpen(true);
  };

  // Simulated Order Execution with Ledger Hashing
  const handleInstantDispatch = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    setTimeout(() => {
      const orderHash = '0x' + Math.random().toString(16).substring(2, 10).toUpperCase() + '...' + Math.random().toString(16).substring(2, 6).toUpperCase();
      setOrderSuccess({
        id: '#ORD-' + Math.floor(100000 + Math.random() * 900000),
        hash: orderHash,
        cartons: totalCartItems,
        total: (totalPaise / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
      });
      setCart([]);
      setIsCheckingOut(false);
    }, 1200);
  };

  return (
    <div className={`futuristic-ecom-root ${isDark ? 'theme-dark' : 'theme-light'}`}>
      {/* Background Ambient Glows & Dynamic Mesh */}
      <div className="futuristic-ambient-backdrop">
        <div className="ambient-radial-orb orb-1" />
        <div className="ambient-radial-orb orb-2" />
        <div className="ambient-radial-orb orb-3" />
        <div className="ambient-grid-overlay" />
      </div>

      {/* Main Dashboard Container */}
      <div className="futuristic-container">
        {/* TOP BAR / NAVIGATION (Apple / Stripe style) */}
        <header className="futuristic-navbar">
          <div className="nav-brand-group">
            <div className="brand-logo-gem">
              <Zap size={20} color="#00d4ff" />
            </div>
            <div>
              <div className="brand-title-wrap">
                <span className="brand-title-text">FoodFlow Next-Gen</span>
                <span className="brand-badge-live">
                  <span className="live-dot-beacon" />
                  <span>v2.6 Enterprise</span>
                </span>
              </div>
              <div className="brand-status-sub">
                Atlas Folder: <strong>user_folder</strong> • Live Dispatch Node
              </div>
            </div>
          </div>

          {/* Center Search Input */}
          <div className="nav-search-bar">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search gourmet SKUs, batch IDs, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-kbd-shortcut">⌘K</span>
          </div>

          {/* Right Action Controls */}
          <div className="nav-actions-group">
            {/* Dark / Light Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setIsDark((d) => !d)}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#6366f1" />}
            </button>

            {/* Cart Trigger Button with Live Counter Badge */}
            <button
              type="button"
              className="luxury-cart-trigger"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={18} />
              <span className="cart-trigger-label">Cart</span>
              {totalCartItems > 0 && (
                <span className="cart-count-badge">{totalCartItems}</span>
              )}
            </button>

            {/* User Session Pill */}
            <div className="user-session-chip">
              <div className="user-avatar-circle">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="user-chip-text">
                <span className="user-chip-name">{user?.name || 'Staff User'}</span>
                <span className="user-chip-role">STAFF PORTAL</span>
              </div>
            </div>
          </div>
        </header>

        {/* HUD METRICS STRIP (Stripe & Linear Quality) */}
        <section className="futuristic-hud-grid">
          <div className="hud-metric-card">
            <div className="hud-icon-box blue-accent">
              <TrendingUp size={20} color="#00d4ff" />
            </div>
            <div className="hud-metric-data">
              <div className="hud-metric-label">Active Gross Cart</div>
              <div className="hud-metric-val">
                {(totalPaise / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </div>
              <div className="hud-metric-foot positive">
                <CheckCircle2 size={12} />
                <span>Integer Paise Exact (FR-1.5)</span>
              </div>
            </div>
          </div>

          <div className="hud-metric-card">
            <div className="hud-icon-box purple-accent">
              <Layers size={20} color="#8b5cf6" />
            </div>
            <div className="hud-metric-data">
              <div className="hud-metric-label">Factory SKU Availability</div>
              <div className="hud-metric-val">98.4% Available</div>
              <div className="hud-metric-foot">
                <Activity size={12} color="#8b5cf6" />
                <span>FIFO Batches Live-Synced</span>
              </div>
            </div>
          </div>

          <div className="hud-metric-card">
            <div className="hud-icon-box emerald-accent">
              <Sparkles size={20} color="#10b981" />
            </div>
            <div className="hud-metric-data">
              <div className="hud-metric-label">AI Demand Prediction</div>
              <div className="hud-metric-val">+34.2% Weekend Surge</div>
              <div className="hud-metric-foot positive">
                <Sparkles size={12} />
                <span>Predictive Restock Active</span>
              </div>
            </div>
          </div>

          <div className="hud-metric-card">
            <div className="hud-icon-box amber-accent">
              <ShieldCheck size={20} color="#f59e0b" />
            </div>
            <div className="hud-metric-data">
              <div className="hud-metric-label">Isolated Storage Vault</div>
              <div className="hud-metric-val">Atlas: user_folder</div>
              <div className="hud-metric-foot">
                <Lock size={12} color="#f59e0b" />
                <span>Cross-Role 403 Enforced</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI SMART COPILOT BANNER */}
        <section className="ai-copilot-banner">
          <div className="ai-copilot-left">
            <div className="ai-copilot-pulsing-icon">
              <Sparkles size={22} color="#00d4ff" />
            </div>
            <div>
              <div className="ai-copilot-title-row">
                <h4 className="ai-copilot-title">FoodFlow Copilot • Predictive Batch Restock</h4>
                <span className="ai-confidence-badge">99.2% Confidence</span>
              </div>
              <p className="ai-copilot-desc">
                Weekend demand projection predicts stockout on <strong>Artisanal Belgian Truffles</strong> and <strong>Salted Caramel Crisps</strong>. Recommended batch reorder: 3 cartons.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="ai-copilot-action-btn"
            onClick={handleApplyAiRestock}
          >
            <Zap size={15} />
            <span>Apply AI Recommended Batch</span>
            <ArrowRight size={15} />
          </button>
        </section>

        {/* CATEGORY FILTER PILLS & DISPATCH TICKER */}
        <div className="catalog-toolbar-row">
          <div className="category-pills-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <div className="catalog-status-ticker">
            <span className="live-green-dot" />
            <span>Warehouse Dispatch: <strong>Same-Day Air & Road</strong></span>
          </div>
        </div>

        {/* PRODUCT CATALOG GRID WITH 3D TILT CARDS */}
        <section className="luxury-products-grid">
          {filteredProducts.map((product) => (
            <ProductCard3D
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isDark={isDark}
            />
          ))}
        </section>

        {/* WEEKLY DISPATCH & DEMAND VELOCITY CHART (Interactive SVG) */}
        <section className="interactive-analytics-section">
          <div className="analytics-header">
            <div>
              <h3 className="analytics-title">Weekly Dispatch & Production Velocity</h3>
              <p className="analytics-sub">Real-time ledger analytics stored strictly in MongoDB Atlas</p>
            </div>
            <div className="analytics-timeframe-badge">Last 7 Days • FIFO Synchronized</div>
          </div>

          <div className="analytics-chart-container">
            <svg viewBox="0 0 800 200" className="analytics-svg-chart">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="90" x2="800" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="140" x2="800" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />

              {/* Area fill */}
              <path
                d="M 20 160 Q 140 120, 260 90 T 500 60 T 780 30 L 780 180 L 20 180 Z"
                fill="url(#chartGradient)"
              />

              {/* Smooth Spline Curve */}
              <path
                d="M 20 160 Q 140 120, 260 90 T 500 60 T 780 30"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data Node Points */}
              {[
                { x: 20, y: 160, day: 'Mon', val: '1,240 pk' },
                { x: 140, y: 125, day: 'Tue', val: '1,560 pk' },
                { x: 260, y: 90, day: 'Wed', val: '1,840 pk' },
                { x: 380, y: 82, day: 'Thu', val: '1,920 pk' },
                { x: 500, y: 60, day: 'Fri', val: '2,350 pk' },
                { x: 640, y: 45, day: 'Sat', val: '2,680 pk' },
                { x: 780, y: 30, day: 'Sun', val: '2,940 pk' },
              ].map((node, i) => (
                <g key={i} className="chart-node-point">
                  <circle cx={node.x} cy={node.y} r="5.5" fill="#ffffff" stroke="#00d4ff" strokeWidth="3" />
                  <text x={node.x} y="196" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">
                    {node.day}
                  </text>
                  <text x={node.x} y={node.y - 12} textAnchor="middle" fill="#00d4ff" fontSize="10" fontWeight="600">
                    {node.val}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>
      </div>

      {/* CINEMATIC SLIDE-OUT CART DRAWER */}
      {isCartOpen && (
        <div className="luxury-cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="luxury-cart-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-title-group">
                <ShoppingCart size={20} color="#00d4ff" />
                <h3 className="drawer-title">Your Order Cart</h3>
                <span className="drawer-count-chip">{totalCartItems} Cartons</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Line Items */}
            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <ShoppingBag size={48} color="rgba(255, 255, 255, 0.2)" />
                  <h4>Your Cart is Empty</h4>
                  <p>Explore our gourmet food products and add cartons to queue instant dispatch.</p>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item-card">
                      <div className="cart-item-visual" style={{ background: item.product.gradient }}>
                        <Package size={20} color="#ffffff" />
                      </div>
                      <div className="cart-item-details">
                        <div className="cart-item-top">
                          <span className="cart-item-sku">{item.product.sku}</span>
                          <span className="cart-item-price">
                            {((item.product.pricePaise * item.qty) / 100).toLocaleString('en-IN', {
                              style: 'currency',
                              currency: 'INR'
                            })}
                          </span>
                        </div>
                        <h5 className="cart-item-name">{item.product.name}</h5>
                        <div className="cart-item-foot">
                          <div className="cart-qty-ctrls">
                            <button
                              type="button"
                              className="cart-qty-btn"
                              onClick={() => handleUpdateQty(item.product.id, -1)}
                            >
                              <Minus size={11} />
                            </button>
                            <span className="cart-qty-num">{item.qty}</span>
                            <button
                              type="button"
                              className="cart-qty-btn"
                              onClick={() => handleUpdateQty(item.product.id, 1)}
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="cart-remove-btn"
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            title="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Financial Summary & Checkout Foot (Integer Paise Accurate) */}
            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="bill-row">
                  <span className="bill-label">Cart Subtotal</span>
                  <span className="bill-val">
                    {(cartSubtotalPaise / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </span>
                </div>
                <div className="bill-row">
                  <span className="bill-label">GST 5% (CGST 2.5% + SGST 2.5%)</span>
                  <span className="bill-val">
                    {(gstPaise / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </span>
                </div>
                <div className="bill-row total">
                  <span className="bill-label-bold">Order Total (Paise Enforced)</span>
                  <span className="bill-val-bold">
                    {(totalPaise / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isCheckingOut}
                  className="checkout-primary-btn"
                  onClick={handleInstantDispatch}
                >
                  {isCheckingOut ? (
                    <span>Cryptographically Hashing Order...</span>
                  ) : (
                    <>
                      <span>Authorize & Dispatch Order</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                <div className="checkout-security-note">
                  <ShieldCheck size={13} color="#10b981" />
                  <span>Stored strictly in user_folder • FIFO Waybill Auto-Generated</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ORDER DISPATCH SUCCESS MODAL */}
      {orderSuccess && (
        <div className="order-modal-backdrop" onClick={() => setOrderSuccess(null)}>
          <div className="order-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-icon-circle">
              <CheckCircle2 size={40} color="#10b981" />
            </div>
            <h3 className="order-modal-title">Order Queued for Instant Dispatch!</h3>
            <p className="order-modal-sub">
              Your order has been cryptographically recorded into MongoDB Atlas under <strong>user_folder</strong>.
            </p>

            <div className="order-spec-table">
              <div className="order-spec-line">
                <span>Order Identifier:</span>
                <strong>{orderSuccess.id}</strong>
              </div>
              <div className="order-spec-line">
                <span>Total Cartons:</span>
                <strong>{orderSuccess.cartons} Cartons</strong>
              </div>
              <div className="order-spec-line">
                <span>Total Amount:</span>
                <strong style={{ color: '#10b981' }}>{orderSuccess.total}</strong>
              </div>
              <div className="order-spec-line">
                <span>Ledger Hash:</span>
                <code style={{ fontSize: '11px', color: '#00d4ff' }}>{orderSuccess.hash}</code>
              </div>
            </div>

            <button
              type="button"
              className="order-modal-btn"
              onClick={() => setOrderSuccess(null)}
            >
              Continue Browsing Catalogue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
