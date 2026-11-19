import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Play, 
  X
} from 'lucide-react';
import { WatercolorBackdrop } from './WatercolorBackdrop';

// Role-tailored headline, isolated Atlas folder, search placeholder, and authentic operational items
const roleData = {
  user: {
    tagline: 'Staff & wholesale orders. Perfected.',
    atlasFolder: 'user_folder',
    searchPlaceholder: 'Search SKUs, wholesale orders, dispatch...',
    items: [
      { id: '1', emblem: 'SKU', name: 'Product Catalogue Matrix', type: 'Standard Wholesale Tier', styles: '42 SKUs Live', active: true, tag: 'Live' },
      { id: '2', emblem: 'ORD', name: 'Fast Cart & Order Entry', type: 'GST 5% Tax Rules', styles: 'Automated Discount Engine', active: true, tag: 'Ready' },
      { id: '3', emblem: 'B26', name: 'FIFO Warehouse Dispatch', type: 'Waybill Generator', styles: '100% On-Time Allocation', active: true, tag: 'B26' },
      { id: '4', emblem: 'ATL', name: 'Isolated User Vault', type: 'AES-256 Encrypted Session', styles: 'MongoDB: user_folder', active: true, tag: 'Atlas' },
      { id: '5', emblem: 'SSO', name: 'Google OAuth SSO', type: 'Role Invariant JWT', styles: 'Credential Verified Token', active: true, tag: 'OAuth' },
    ]
  },
  admin: {
    tagline: 'Master recipe governance. Perfected.',
    atlasFolder: 'admin_folder',
    searchPlaceholder: 'Search recipes, audit vault, access rules...',
    items: [
      { id: '1', emblem: 'BOM', name: 'Master Formula v2.4', type: 'Standard Butter Cookies', styles: 'Gram Precision Bill-of-Materials', active: true, tag: 'Approved' },
      { id: '2', emblem: 'ADM', name: 'Multi-Role User Governance', type: '6 Isolated Security Folders', styles: 'MongoDB: admin_folder', active: true, tag: 'Atlas' },
      { id: '3', emblem: 'LED', name: 'Cryptographic Stock Ledger', type: 'FR-1.5 Derived Stock Math', styles: 'Integer Paise Accounting', active: true, tag: 'Ledger' },
      { id: '4', emblem: 'VLT', name: 'Immutable Audit Vault', type: '3-Node Tamper-Evident Cluster', styles: 'Append-Only Archive', active: true, tag: 'Secured' },
      { id: '5', emblem: 'TOL', name: 'Batch Tolerance Thresholds', type: 'Root Admin Enforcement', styles: '±0.5% Variance Limit', active: true, tag: 'Rules' },
    ]
  },
  salesman: {
    tagline: 'Field sales & territory. Perfected.',
    atlasFolder: 'salesman_folder',
    searchPlaceholder: 'Search stores, routes, van manifests...',
    items: [
      { id: '1', emblem: 'RTE', name: 'Retail Store Route', type: 'Sector 4 North Beat', styles: '48 Stores Covered', active: true, tag: 'Route 1' },
      { id: '2', emblem: 'CTN', name: 'Wholesale Carton Booking', type: '₹1,85,400 Booked Today', styles: '340 Cartons Target', active: true, tag: 'Daily' },
      { id: '3', emblem: 'CRD', name: 'Credit Limit & Outstandings', type: 'Zero Overdue Delivery Hold', styles: 'MongoDB: salesman_folder', active: true, tag: 'Cleared' },
      { id: '4', emblem: 'VAN', name: 'Van Delivery Manifest', type: 'FIFO Trip Sheet Generated', styles: '99.4% On-Time Delivery', active: true, tag: 'Dispatch' },
      { id: '5', emblem: 'DSC', name: 'Retail Trade Discounts', type: 'Cash & UPI Real-time Sync', styles: 'Standard Wholesale Tier', active: true, tag: 'Active' },
    ]
  },
  production: {
    tagline: 'Batch mixing & oven curves. Perfected.',
    atlasFolder: 'production_folder',
    searchPlaceholder: 'Search batch scaling, mixing, oven zones...',
    items: [
      { id: '1', emblem: 'SCL', name: 'Ingredient Scaling & Prep', type: '150.0 kg Loaded (FIFO Check)', styles: 'Flour, Sugar & Butter Scale', active: true, tag: 'Weighed' },
      { id: '2', emblem: 'MIX', name: 'Industrial Dough Mixing', type: 'Planetary Mixer Cycle (8 min)', styles: '1,250 kg Dough Batch', active: true, tag: 'Batch 1' },
      { id: '3', emblem: 'QA', name: 'Sensory & Moisture QA', type: '±0.8g Finished Weight Tolerance', styles: '4.2% Target Moisture Content', active: true, tag: 'Pass' },
      { id: '4', emblem: 'PCK', name: 'Flow-Wrap Pouch Packing', type: '4,800 Packs Sealed & Barcoded', styles: 'MongoDB: production_folder', active: true, tag: 'Pack line' },
      { id: '5', emblem: 'OVN', name: 'Thermodynamic Oven Curves', type: 'Continuous Tunnel Baking Profile', styles: '185°C / 190°C Zones', active: true, tag: 'Optimal' },
    ]
  },
  auditor: {
    tagline: 'Cryptographic audit ledger. Perfected.',
    atlasFolder: 'auditor_folder',
    searchPlaceholder: 'Search hash proofs, stock reconciliation, GST...',
    items: [
      { id: '1', emblem: 'REC', name: 'Stock Reconciliation Check', type: 'Derived Stock Equation Math', styles: '0.00 kg Discrepancy', active: true, tag: 'Zero Diff' },
      { id: '2', emblem: 'SHA', name: 'SHA-256 Hash Chain Proof', type: 'Cryptographically Sealed Ledger', styles: 'MongoDB: auditor_folder', active: true, tag: 'Immutable' },
      { id: '3', emblem: 'GST', name: 'Integer Paise Accounting', type: 'Zero Rounding Discrepancies', styles: 'CGST 2.5% + SGST 2.5%', active: true, tag: 'Paise' },
      { id: '4', emblem: 'RPT', name: 'Read-Only Auditor Report', type: 'Clean Opinion Certification', styles: 'NIT Winter 2026 SRS Standard', active: true, tag: 'Statutory' },
      { id: '5', emblem: 'SEC', name: 'Immutable Access Protocol', type: 'Zero Unauthorized Mutations', styles: 'Strict Read-Only Enforcement', active: true, tag: 'Audited' },
    ]
  },
  owner: {
    tagline: 'Plant throughput & profitability. Perfected.',
    atlasFolder: 'owner_folder',
    searchPlaceholder: 'Search revenue, OEE throughput, working capital...',
    items: [
      { id: '1', emblem: 'REV', name: 'Revenue & Gross Margin', type: '38.2% Factory Gross Margin', styles: '₹48.6 Lakhs Monthly Turnover', active: true, tag: 'Surge' },
      { id: '2', emblem: 'OEE', name: 'Plant Capacity Throughput', type: '2,450 kg Processed Daily', styles: '92.4% Overall Equipment Eff.', active: true, tag: 'Optimal' },
      { id: '3', emblem: 'CAP', name: 'Working Capital Buffer', type: '14 Days Lean Inventory Stock', styles: 'MongoDB: owner_folder', active: true, tag: 'Buffer' },
      { id: '4', emblem: 'NET', name: 'Retail Reach & Expansion', type: '+24.5% Volume Growth YoY', styles: '240 Active Outlets', active: true, tag: 'Growth' },
      { id: '5', emblem: 'ROI', name: 'Plant Thermodynamic ROI', type: 'Zero Cashflow Crunch Guarantee', styles: '31.8% Annualized Plant ROI', active: true, tag: 'Strong' },
    ]
  }
};

export const LoginHeroBanner = ({ role = 'user' }) => {
  const current = roleData[role] || roleData.user;
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(current.items);
  const [isPlaying, setIsPlaying] = useState(false);

  // Synchronize when role changes
  useEffect(() => {
    const data = roleData[role] || roleData.user;
    setItems(data.items);
    setSearch('');
  }, [role]);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, active: !it.active } : it))
    );
  };

  const filteredItems = items.filter(
    (it) =>
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      it.type.toLowerCase().includes(search.toLowerCase()) ||
      it.styles.toLowerCase().includes(search.toLowerCase()) ||
      (it.tag && it.tag.toLowerCase().includes(search.toLowerCase()))
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
              placeholder={current.searchPlaceholder || 'Search pipeline stages...'}
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

          {/* Section Header with Atlas Folder Binding */}
          <div className="untitled-modal-subheader">
            <span>Atlas: {current.atlasFolder}</span>
            <span>All entries ({filteredItems.length})</span>
          </div>

          {/* Items List or Empty State */}
          <div className="untitled-items-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="untitled-item-row">
                  <div className="untitled-item-left">
                    <div className="untitled-font-emblem">{item.emblem || 'Ag'}</div>
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
              /* Untitled UI Empty State */
              <div className="untitled-empty-state">
                <div className="untitled-stacked-icons">
                  <div className="stacked-icon card-3">{current.items[2]?.emblem || 'Ag'}</div>
                  <div className="stacked-icon card-2">{current.items[1]?.emblem || 'Ag'}</div>
                  <div className="stacked-icon card-1">{current.items[0]?.emblem || 'Ag'}</div>
                </div>
                <h4 className="untitled-empty-heading">No entries found</h4>
                <p className="untitled-empty-desc">
                  There are no operational entries matching "{search}".
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
                    onClick={() => setSearch('')}
                  >
                    Show all
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
