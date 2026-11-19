import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  Sparkles, 
  Check, 
  SlidersHorizontal, 
  Layers, 
  ShieldCheck, 
  Database,
  X
} from 'lucide-react';
import { WatercolorBackdrop } from './WatercolorBackdrop';

// Role-tailored headline and command palette items
const roleData = {
  user: {
    tagline: 'Staff & order flow. Perfected.',
    atlasFolder: 'user_folder',
    initialQuery: 'poppins',
    items: [
      { id: '1', name: 'Poppins Modern', type: 'Primary UI Stack', styles: '18 styles', active: true, tag: 'Default' },
      { id: '2', name: 'Inter Display', type: 'Micro-Interactions', styles: '18 styles', active: true, tag: 'System' },
      { id: '3', name: 'Order Entry Matrix', type: 'Atlas: user_folder', styles: '42 SKUs Active', active: true },
      { id: '4', name: 'FIFO Warehouse Dispatch', type: 'Waybill Generator', styles: '100% On-Time', active: true },
      { id: '5', name: 'Google OAuth SSO', type: 'Verified Credential', styles: 'SHA-256 Secure', active: true },
    ]
  },
  admin: {
    tagline: 'Master recipe governance. Perfected.',
    atlasFolder: 'admin_folder',
    initialQuery: 'recipes',
    items: [
      { id: '1', name: 'Master Formula v2.4', type: 'Gram Precision', styles: 'Standard Formula', active: true, tag: 'Approved' },
      { id: '2', name: 'Staff Role Governance', type: 'Atlas: admin_folder', styles: '6 Isolated Folders', active: true },
      { id: '3', name: 'Cryptographic Ledger', type: 'FR-1.5 Derived', styles: 'Integer Paise', active: true },
      { id: '4', name: 'Audit Log Vault', type: 'Append-Only Archive', styles: 'Write Locked', active: true },
      { id: '5', name: 'Poppins Typography', type: 'Design System', styles: '18 styles', active: true },
    ]
  },
  salesman: {
    tagline: 'Field sales & territory. Perfected.',
    atlasFolder: 'salesman_folder',
    initialQuery: 'territory',
    items: [
      { id: '1', name: 'Retail Store Route', type: 'Sector 4 North', styles: '48 Stores Covered', active: true, tag: 'Route 1' },
      { id: '2', name: 'Wholesale Cartons', type: 'Instant Booking', styles: '340 Cartons Today', active: true },
      { id: '3', name: 'Credit Limit Engine', type: 'Atlas: salesman_folder', styles: 'Cleared for Dispatch', active: true },
      { id: '4', name: 'Van Delivery Manifest', type: 'FIFO Sync', styles: '99.4% On-Time', active: true },
      { id: '5', name: 'Poppins Display', type: 'Mobile Optimized', styles: 'Sans-Serif', active: true },
    ]
  },
  production: {
    tagline: 'Batch mixing & oven curves. Perfected.',
    atlasFolder: 'production_folder',
    initialQuery: 'mixing',
    items: [
      { id: '1', name: 'Ingredient Scaling', type: 'FIFO Verification', styles: '150.0 kg Loaded', active: true, tag: 'Batch 1' },
      { id: '2', name: 'Planetary Dough Mixer', type: 'Live Moisture QA', styles: '1,250 kg Dough', active: true },
      { id: '3', name: 'Oven Zone Curves', type: 'Thermodynamic Optimal', styles: '185°C / 190°C', active: true },
      { id: '4', name: 'Flow-Wrap Packing', type: 'Atlas: production_folder', styles: '4,800 Packs Sealed', active: true },
      { id: '5', name: 'Poppins Clean Text', type: 'Floor Touchscreen', styles: '18 styles', active: true },
    ]
  },
  auditor: {
    tagline: 'Cryptographic audit ledger. Perfected.',
    atlasFolder: 'auditor_folder',
    initialQuery: 'ledger',
    items: [
      { id: '1', name: 'Stock Reconciliation', type: 'Mathematical Zero Divergence', styles: '0.00 kg Variance', active: true, tag: 'Clean' },
      { id: '2', name: 'SHA-256 Hash Chain', type: 'Atlas: auditor_folder', styles: 'Sealed Blocks', active: true },
      { id: '3', name: 'Integer Paise Accounting', type: 'Statutory GST 5%', styles: 'Zero Rounding Err', active: true },
      { id: '4', name: 'Statutory Sign-Off', type: 'NIT Winter 2026 SRS', styles: 'Clean Certificate', active: true },
      { id: '5', name: 'Poppins Typography', type: 'Report Standard', styles: '18 styles', active: true },
    ]
  },
  owner: {
    tagline: 'Plant throughput & profitability. Perfected.',
    atlasFolder: 'owner_folder',
    initialQuery: 'turnover',
    items: [
      { id: '1', name: 'Revenue P&L Horizon', type: 'Gross Margin 38.2%', styles: '₹48.6 Lakhs (112%)', active: true, tag: 'Surge' },
      { id: '2', name: 'Plant Thermodynamic ROI', type: 'Machine Uptime 99.6%', styles: '31.8% Plant ROI', active: true },
      { id: '3', name: 'Working Capital Buffer', type: 'Atlas: owner_folder', styles: '14 Days Lean Stock', active: true },
      { id: '4', name: 'Retail Expansion Map', type: 'Automated Packaging', styles: '240 Active Outlets', active: true },
      { id: '5', name: 'Poppins Executive UI', type: 'Dashboard Font', styles: '18 styles', active: true },
    ]
  }
};

export const LoginHeroBanner = ({ role = 'user' }) => {
  const current = roleData[role] || roleData.user;
  const [search, setSearch] = useState(current.initialQuery);
  const [items, setItems] = useState(current.items);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, active: !it.active } : it))
    );
  };

  const filteredItems = items.filter(
    (it) =>
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      it.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="untitled-hero-panel">
      {/* Background Watercolor Landscape */}
      <WatercolorBackdrop />

      {/* Floating Center Content Container */}
      <div className="untitled-hero-inner">
        {/* Top Tagline */}
        <h2 className="untitled-hero-title">{current.tagline}</h2>

        {/* Floating Dark Command Palette / Modal (Jordan Hughes Untitled UI Design) */}
        <div className="untitled-modal-card">
          {/* Top Search Bar */}
          <div className="untitled-modal-search">
            <Search size={14} className="untitled-search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search typefaces, pipeline stages..."
              className="untitled-modal-input"
            />
            {search ? (
              <button
                type="button"
                className="untitled-clear-btn"
                onClick={() => setSearch('')}
                title="Clear"
              >
                <X size={12} />
              </button>
            ) : (
              <span className="untitled-kbd-badge">⌘K</span>
            )}
          </div>

          {/* Section Header */}
          <div className="untitled-modal-subheader">
            <span>All entries</span>
            <span>Recently used ▾</span>
          </div>

          {/* Items List or Empty State */}
          <div className="untitled-items-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="untitled-item-row">
                  <div className="untitled-item-left">
                    <div className="untitled-font-emblem">Ag</div>
                    <div className="untitled-item-meta">
                      <div className="untitled-item-name-row">
                        <span className="untitled-item-name">{item.name}</span>
                        {item.tag && <span className="untitled-item-pill">{item.tag}</span>}
                      </div>
                      <span className="untitled-item-desc">
                        {item.styles} • {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    className={`untitled-toggle-switch ${item.active ? 'on' : 'off'}`}
                    onClick={() => toggleItem(item.id)}
                    aria-label={`Toggle ${item.name}`}
                  >
                    <span className="untitled-toggle-knob" />
                  </button>
                </div>
              ))
            ) : (
              /* Untitled UI "No typefaces found" State (from Jordan Hughes screenshot) */
              <div className="untitled-empty-state">
                <div className="untitled-stacked-icons">
                  <div className="stacked-icon card-3">Ag</div>
                  <div className="stacked-icon card-2">Ag</div>
                  <div className="stacked-icon card-1">Ag</div>
                </div>
                <h4 className="untitled-empty-heading">No typefaces found</h4>
                <p className="untitled-empty-desc">
                  There are no entries matching your current search.
                </p>
                <div className="untitled-empty-actions">
                  <button
                    type="button"
                    className="untitled-action-btn secondary"
                    onClick={() => setSearch('')}
                  >
                    Clear search
                  </button>
                  <button
                    type="button"
                    className="untitled-action-btn primary"
                    onClick={() => setSearch('poppins')}
                  >
                    Load Poppins
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Command Shortcuts Bar */}
          <div className="untitled-modal-footer">
            <span className="cmd-chip"><code>esc</code> close</span>
            <span className="cmd-chip"><code>#</code> tags</span>
            <span className="cmd-chip"><code>↑↓</code> navigate</span>
            <span className="cmd-chip"><code>↵</code> open</span>
            <span className="cmd-chip"><code>⎋</code> parent</span>
          </div>
        </div>

        {/* Bottom Left Floating Glass Play Button */}
        <button
          type="button"
          className={`untitled-play-pill ${isPlaying ? 'playing' : ''}`}
          onClick={() => setIsPlaying(!isPlaying)}
          title="Play interactive preview"
        >
          <Play size={13} fill={isPlaying ? '#00d4ff' : '#ffffff'} color={isPlaying ? '#00d4ff' : '#ffffff'} />
        </button>
      </div>
    </div>
  );
};
