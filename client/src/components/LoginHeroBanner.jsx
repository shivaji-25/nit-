import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  Factory, 
  PackageCheck, 
  ShieldCheck, 
  Activity, 
  CheckCircle, 
  Database,
  TrendingUp,
  DollarSign,
  BarChart3,
  Users,
  KeyRound,
  FileSpreadsheet,
  Lock,
  ShoppingBag,
  Store,
  CreditCard,
  Truck,
  Layers,
  Sparkles
} from 'lucide-react';

// Customized data pipeline tailored strictly to each role portal
const rolePipelines = {
  // USER PORTAL (/login)
  user: {
    portalName: 'Staff & Order Flow',
    atlasFolder: 'user_folder',
    ticker: [
      { icon: Activity, label: 'Demand', val: '1,840 packs' },
      { icon: Database, label: 'Atlas', val: 'user_folder' },
      { icon: ShieldCheck, label: 'Security', val: 'AES-256 JWT' },
    ],
    stages: [
      {
        id: 'catalogue',
        number: '01',
        tabLabel: 'Catalogue',
        icon: ShoppingBag,
        title: 'Product Catalogue & Inventory',
        desc: 'Real-time stock availability check and price tier calculation.',
        metric1: { label: 'SKU Availability', value: '42 SKUs Active', pct: 95, color: '#3b82f6' },
        metric2: { label: 'Min Order Qty', value: '10 units / order', pct: 100, color: '#10b981' },
        metric3: { label: 'Unit Pricing', value: 'Standard Wholesale', pct: 85, color: '#f59e0b' },
        status: 'Inventory Live-Synced • Zero Backorders',
      },
      {
        id: 'booking',
        number: '02',
        tabLabel: 'Order Entry',
        icon: Layers,
        title: 'Fast Order Processing',
        desc: 'Instant cart validation, payment terms, and delivery address verification.',
        metric1: { label: 'Validation Check', value: 'Automated Rules Passed', pct: 100, color: '#10b981' },
        metric2: { label: 'Tax Calculation', value: 'GST 5% Formatted', pct: 100, color: '#6366f1' },
        metric3: { label: 'Payment Terms', value: 'Net 15 Days', pct: 75, color: '#3b82f6' },
        status: 'Order Placed • Queued for Warehouse Dispatch',
      },
      {
        id: 'dispatch',
        number: '03',
        tabLabel: 'Dispatch',
        icon: Truck,
        title: 'FIFO Warehouse Dispatch',
        desc: 'Strict First-In First-Out dispatch ensuring freshest batch shelf-life.',
        metric1: { label: 'Dispatch Batch', value: '#B26-098 Ready', pct: 100, color: '#10b981' },
        metric2: { label: 'Transit Time', value: 'Same Day Dispatch', pct: 90, color: '#3b82f6' },
        metric3: { label: 'Courier Partner', value: 'Tracked & Insured', pct: 100, color: '#8b5cf6' },
        status: 'Shipment Waybill Generated & Transmitted',
      },
      {
        id: 'account',
        number: '04',
        tabLabel: 'Account',
        icon: Database,
        title: 'Isolated User Account',
        desc: 'Account credentials & order records strictly isolated in user_folder.',
        metric1: { label: 'Atlas Collection', value: 'user_folder Only', pct: 100, color: '#10b981' },
        metric2: { label: 'Cross-Role Boundary', value: 'Strict 403 Enforcement', pct: 100, color: '#6366f1' },
        metric3: { label: 'Google OAuth', value: 'Credential Verified', pct: 100, color: '#3b82f6' },
        status: 'Secure Staff Account • Role Invariant Enforced',
      },
    ],
  },

  // ADMIN PORTAL (/admin)
  admin: {
    portalName: 'Admin Master Control',
    atlasFolder: 'admin_folder',
    ticker: [
      { icon: Users, label: 'Staff', val: '18 Active' },
      { icon: Database, label: 'Atlas', val: 'admin_folder' },
      { icon: ShieldCheck, label: 'Control', val: 'Root Admin' },
    ],
    stages: [
      {
        id: 'formulas',
        number: '01',
        tabLabel: 'Master Recipes',
        icon: ChefHat,
        title: 'Master Recipe Configurations',
        desc: 'Centralized food formula management with gram-level precision.',
        metric1: { label: 'Standard Formula', value: 'Butter Cookies v2.4', pct: 100, color: '#3b82f6' },
        metric2: { label: 'Target Yield Rate', value: '98.5% Minimum', pct: 98, color: '#10b981' },
        metric3: { label: 'Tolerance Range', value: '±0.5% Allowed', pct: 90, color: '#f59e0b' },
        status: 'Approved by Food Quality Manager',
      },
      {
        id: 'access',
        number: '02',
        tabLabel: 'Staff Roles',
        icon: KeyRound,
        title: 'Multi-Role User Governance',
        desc: 'Strict collection-folder separation across 6 role boundaries.',
        metric1: { label: 'Admin Accounts', value: 'admin_folder Guarded', pct: 100, color: '#6366f1' },
        metric2: { label: 'Role Segregation', value: '6 Independent Folders', pct: 100, color: '#10b981' },
        metric3: { label: 'JWT Lifetime', value: '7 Days Auto-Expiry', pct: 100, color: '#3b82f6' },
        status: 'Zero Privilege Escalation Anomaly',
      },
      {
        id: 'ledgers',
        number: '03',
        tabLabel: 'Stock Ledger',
        icon: FileSpreadsheet,
        title: 'Cryptographic Stock Balances',
        desc: 'Inventory derived strictly via ledger entries — zero manual edits.',
        metric1: { label: 'Audit Invariant', value: 'FR-1.5 Enforced', pct: 100, color: '#10b981' },
        metric2: { label: 'Unit Precision', value: 'Base Units (g, ml, pcs)', pct: 100, color: '#6366f1' },
        metric3: { label: 'Money Precision', value: 'Integer Paise Storage', pct: 100, color: '#3b82f6' },
        status: 'Strict Financial & Quantity Integrity Confirmed',
      },
      {
        id: 'vault',
        number: '04',
        tabLabel: 'Audit Vault',
        icon: Lock,
        title: 'System Audit Logs & Backups',
        desc: 'Immutable append-only system activity and security log archive.',
        metric1: { label: 'Log Security', value: 'Append-Only Write Locked', pct: 100, color: '#10b981' },
        metric2: { label: 'Atlas Replication', value: '3-Node Cluster Active', pct: 100, color: '#3b82f6' },
        metric3: { label: 'Backup Health', value: '100% Verified Clean', pct: 100, color: '#10b981' },
        status: 'System Audit Archive Certified Ready',
      },
    ],
  },

  // SALESMAN PORTAL (/salesman)
  salesman: {
    portalName: 'Field Sales & Dispatch',
    atlasFolder: 'salesman_folder',
    ticker: [
      { icon: DollarSign, label: 'Target', val: '₹1.85L / ₹2.0L' },
      { icon: Database, label: 'Atlas', val: 'salesman_folder' },
      { icon: Store, label: 'Route', val: 'Sector 4 North' },
    ],
    stages: [
      {
        id: 'outlets',
        number: '01',
        tabLabel: 'Retail Stores',
        icon: Store,
        title: 'Retail Store Territory Mapping',
        desc: 'Live retailer outlet route planning with order history analytics.',
        metric1: { label: 'Assigned Outlets', value: '48 Stores Covered', pct: 92, color: '#10b981' },
        metric2: { label: 'Visit Completion', value: '42 of 48 Visited', pct: 88, color: '#3b82f6' },
        metric3: { label: 'Stock Demand', value: 'High Retailer Pull', pct: 95, color: '#f59e0b' },
        status: 'Route Optimization Active • GPS Verified',
      },
      {
        id: 'orders',
        number: '02',
        tabLabel: 'Order Booking',
        icon: ShoppingBag,
        title: 'Instant Wholesale Booking',
        desc: 'Book retail carton quantities with automated trade discount calculation.',
        metric1: { label: 'Cartons Booked', value: '340 Cartons Today', pct: 85, color: '#10b981' },
        metric2: { label: 'Turnover Value', value: '₹1,85,400 Booked', pct: 92, color: '#3b82f6' },
        metric3: { label: 'Average Ticket', value: '₹4,410 / Outlet', pct: 80, color: '#6366f1' },
        status: 'Direct Push to Production Floor Queue',
      },
      {
        id: 'credit',
        number: '03',
        tabLabel: 'Credit Limit',
        icon: CreditCard,
        title: 'Credit Limit & Outstandings',
        desc: 'Automated credit validation preventing overdue delivery dispatch.',
        metric1: { label: 'Credit Health', value: 'Zero High-Risk Outlets', pct: 100, color: '#10b981' },
        metric2: { label: 'Collections Today', value: '₹84,200 Collected', pct: 84, color: '#3b82f6' },
        metric3: { label: 'Credit Lock Rule', value: 'Strict Enforce (>30d)', pct: 100, color: '#10b981' },
        status: 'Customer Credit Cleared for Next Day Dispatch',
      },
      {
        id: 'dispatch',
        number: '04',
        tabLabel: 'Dispatch Sync',
        icon: Truck,
        title: 'Van Loading & Delivery Manifest',
        desc: 'Automated loading manifest with driver digital signature verification.',
        metric1: { label: 'Van Capacity', value: '92% Volume Utilized', pct: 92, color: '#3b82f6' },
        metric2: { label: 'Delivery Window', value: '06:00 AM - 11:30 AM', pct: 100, color: '#10b981' },
        metric3: { label: 'Fulfillment Rate', value: '99.4% On-Time Delivery', pct: 99, color: '#10b981' },
        status: 'All Invoices Printed & Stock Relieved',
      },
    ],
  },

  // PRODUCTION PORTAL (/production)
  production: {
    portalName: 'Production Floor Supervisor',
    atlasFolder: 'production_folder',
    ticker: [
      { icon: Activity, label: 'Output', val: '2,450 kg/day' },
      { icon: Database, label: 'Atlas', val: 'production_folder' },
      { icon: CheckCircle, label: 'Yield', val: '98.6% Target' },
    ],
    stages: [
      {
        id: 'scale',
        number: '01',
        tabLabel: 'Formulas',
        icon: ChefHat,
        title: 'Ingredient Scaling & Prep',
        desc: 'Automated raw material requisition for daily scheduled batches.',
        metric1: { label: 'Flour (Batch 1)', value: '150.0 kg Loaded', pct: 100, color: '#3b82f6' },
        metric2: { label: 'Sugar & Butter', value: '62.5 kg Blended', pct: 100, color: '#f59e0b' },
        metric3: { label: 'Lot Traceability', value: 'All Lots Scanned', pct: 100, color: '#10b981' },
        status: 'Raw Ingredients Weighed & FIFO Verified',
      },
      {
        id: 'mixing',
        number: '02',
        tabLabel: 'Mixing',
        icon: Factory,
        title: 'Industrial Dough Mixing',
        desc: 'Continuous dual-arm planetary mixer with live moisture control.',
        metric1: { label: 'Mix Duration', value: '18 mins (Complete)', pct: 100, color: '#10b981' },
        metric2: { label: 'Oven Zone 1-3', value: '185°C / 190°C / 175°C', pct: 92, color: '#ef4444' },
        metric3: { label: 'Batch Output', value: '1,250 kg Dough', pct: 96, color: '#3b82f6' },
        status: 'Baking Curve Matches Optimal Master Profile',
      },
      {
        id: 'quality',
        number: '03',
        tabLabel: 'Quality',
        icon: Sparkles,
        title: 'Sensory & Moisture QA Check',
        desc: 'In-line weight check, moisture content testing, and visual inspection.',
        metric1: { label: 'Moisture Rate', value: '4.2% (Target < 4.5%)', pct: 92, color: '#10b981' },
        metric2: { label: 'Weight Variance', value: '±0.8g (Compliant)', pct: 98, color: '#10b981' },
        metric3: { label: 'Scrap Waste', value: '1.4% (Threshold < 2%)', pct: 70, color: '#f59e0b' },
        status: 'QA Batch Release Certificate Issued',
      },
      {
        id: 'packing',
        number: '04',
        tabLabel: 'Packing',
        icon: PackageCheck,
        title: 'High-Speed Flow-Wrap Packing',
        desc: 'Automated pouch packing with nitrogen flush and barcode stamping.',
        metric1: { label: 'Pack Count', value: '4,800 Packs Sealed', pct: 96, color: '#10b981' },
        metric2: { label: 'Line Speed', value: '120 packs / minute', pct: 90, color: '#3b82f6' },
        metric3: { label: 'Carton Stacking', value: '200 Cartons Ready', pct: 100, color: '#8b5cf6' },
        status: 'Finished Stock Credited to Warehouse Ledger',
      },
    ],
  },

  // AUDITOR & ACCOUNTS PORTAL (/auditor)
  auditor: {
    portalName: 'Auditor & Accounts Ledger',
    atlasFolder: 'auditor_folder',
    ticker: [
      { icon: ShieldCheck, label: 'Divergence', val: '0.00% Zero' },
      { icon: Database, label: 'Atlas', val: 'auditor_folder' },
      { icon: CheckCircle, label: 'Ledger', val: '100% Synced' },
    ],
    stages: [
      {
        id: 'reconcile',
        number: '01',
        tabLabel: 'Stock Audit',
        icon: FileSpreadsheet,
        title: 'Physical vs Ledger Stock Check',
        desc: 'Mathematical reconciliation of raw materials, WIP, and finished stock.',
        metric1: { label: 'Stock Variance', value: '0.00 kg Divergence', pct: 100, color: '#10b981' },
        metric2: { label: 'Stock Balance', value: 'Derived via Ledger Only', pct: 100, color: '#3b82f6' },
        metric3: { label: 'Base Unit Scale', value: 'Exact g, ml, pcs Precision', pct: 100, color: '#6366f1' },
        status: 'SRS Invariant Confirmed • Zero Discrepancy',
      },
      {
        id: 'proof',
        number: '02',
        tabLabel: 'Proof Hash',
        icon: Lock,
        title: 'Cryptographic Integrity Verification',
        desc: 'SHA-256 block chain verification of all warehouse stock movements.',
        metric1: { label: 'Block Integrity', value: 'Valid Hash Chain', pct: 100, color: '#10b981' },
        metric2: { label: 'Audit Sign-off', value: 'Immutable Timestamp', pct: 100, color: '#6366f1' },
        metric3: { label: 'Tamper Alarm', value: '0 Warnings Triggered', pct: 100, color: '#10b981' },
        status: 'Ledger Hashes Cryptographically Sealed',
      },
      {
        id: 'invoicing',
        number: '03',
        tabLabel: 'Invoicing',
        icon: DollarSign,
        title: 'Integer Paise Accounting',
        desc: 'Financial calculations executed strictly in integer paise (FR-1.5).',
        metric1: { label: 'Rounding Errors', value: '0 Paise Deviation', pct: 100, color: '#10b981' },
        metric2: { label: 'GST Tax Filings', value: 'CGST 2.5% + SGST 2.5%', pct: 100, color: '#3b82f6' },
        metric3: { label: 'Invoice Match', value: '100% Waybill-Linked', pct: 100, color: '#10b981' },
        status: 'Accounts Ready for Statutory Filing',
      },
      {
        id: 'audit',
        number: '04',
        tabLabel: 'Audit Sign',
        icon: ShieldCheck,
        title: 'Read-Only Auditor Report',
        desc: 'Certified audit sign-off for statutory compliance and banking scrutiny.',
        metric1: { label: 'Audit Protocol', value: 'Read-Only Access Level', pct: 100, color: '#10b981' },
        metric2: { label: 'NIT Compliance', value: 'Winter 2026 SRS Ready', pct: 100, color: '#8b5cf6' },
        metric3: { label: 'Audit Certificate', value: 'Clean Opinion Generated', pct: 100, color: '#10b981' },
        status: 'Certified Clean Audit Report Stored in Atlas',
      },
    ],
  },

  // OWNER PORTAL (/owner)
  owner: {
    portalName: 'Executive Factory Dashboard',
    atlasFolder: 'owner_folder',
    ticker: [
      { icon: TrendingUp, label: 'Margin', val: '28.4% Net' },
      { icon: Database, label: 'Atlas', val: 'owner_folder' },
      { icon: BarChart3, label: 'Plant ROI', val: '31.8% p.a.' },
    ],
    stages: [
      {
        id: 'revenue',
        number: '01',
        tabLabel: 'Revenue',
        icon: DollarSign,
        title: 'Revenue & Gross Profitability',
        desc: 'Real-time sales turnover, contribution margins, and SKU profitability.',
        metric1: { label: 'Monthly Turnover', value: '₹48.6 Lakhs (112% Target)', pct: 95, color: '#10b981' },
        metric2: { label: 'Gross Margin', value: '38.2% on Biscuits', pct: 88, color: '#3b82f6' },
        metric3: { label: 'Net Profit Margin', value: '28.4% After All Costs', pct: 92, color: '#f59e0b' },
        status: 'Financial Performance Outperforming Annual Budget',
      },
      {
        id: 'throughput',
        number: '02',
        tabLabel: 'Throughput',
        icon: Factory,
        title: 'Plant Capacity Utilization',
        desc: 'Comprehensive manufacturing throughput, machine uptime, and yield rates.',
        metric1: { label: 'Line Utilization', value: '92.4% Full Capacity', pct: 92, color: '#3b82f6' },
        metric2: { label: 'Oven Downtime', value: '0.4% (World Class)', pct: 98, color: '#10b981' },
        metric3: { label: 'Daily Output', value: '2,450 kg Processed', pct: 96, color: '#10b981' },
        status: 'Plant Operating at Peak Thermodynamic Efficiency',
      },
      {
        id: 'capital',
        number: '03',
        tabLabel: 'Capital',
        icon: BarChart3,
        title: 'Working Capital & Inventory Days',
        desc: 'Cash conversion cycle tracking and raw material stock turnaround days.',
        metric1: { label: 'Raw Stock Days', value: '14 Days (Lean Buffer)', pct: 85, color: '#10b981' },
        metric2: { label: 'Debtor Outstandings', value: '21 Days Collection Avg', pct: 90, color: '#3b82f6' },
        metric3: { label: 'Operating Cash', value: 'Positive Reserve', pct: 100, color: '#10b981' },
        status: 'Zero Cashflow Crunch • Supplier Discounts Captured',
      },
      {
        id: 'growth',
        number: '04',
        tabLabel: 'Growth',
        icon: TrendingUp,
        title: 'Expansion & Strategic Milestones',
        desc: 'Retail expansion roadmap and automated packaging line commissioning.',
        metric1: { label: 'Retail Reach', value: '240 Active Outlets', pct: 85, color: '#8b5cf6' },
        metric2: { label: 'YoY Volume Growth', value: '+24.5% Volume Surge', pct: 95, color: '#10b981' },
        metric3: { label: 'Capital Return', value: '31.8% Plant ROI', pct: 98, color: '#10b981' },
        status: 'Expansion Plan on Schedule • Owner Atlas Verified',
      },
    ],
  },
};

export const LoginHeroBanner = ({ role = 'user' }) => {
  const currentPipeline = rolePipelines[role] || rolePipelines.user;
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  // Auto-progress stages every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % currentPipeline.stages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPipeline]);

  const stage = currentPipeline.stages[activeStageIdx] || currentPipeline.stages[0];
  const StageIcon = stage.icon;

  return (
    <div className={`auth-hero-panel ${role}-hero`}>
      <div className="auth-hero-glass-card">
        {/* Top Header with Live System Node */}
        <div className="flow-live-header">
          <div className="flow-live-indicator">
            <span className="live-pulsing-node"></span>
            <span className="live-status-title">{currentPipeline.portalName}</span>
          </div>
          <span className="live-stage-badge">Stage {stage.number} of 04</span>
        </div>

        {/* 4-Stage Navigation Tabs (Balanced width, no truncation) */}
        <div className="pipeline-nav-bar">
          {currentPipeline.stages.map((stg, idx) => {
            const Icon = stg.icon;
            const isActive = idx === activeStageIdx;
            return (
              <button
                key={stg.id}
                type="button"
                className={`pipeline-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStageIdx(idx)}
                title={stg.title}
              >
                <Icon size={13} />
                <span>{stg.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Showcase Card (Translucent Frosted Glass) */}
        <div className="pipeline-stage-card">
          <div className="stage-top-row">
            <div className="stage-icon-circle">
              <StageIcon size={22} color="#ffffff" />
            </div>
            <div className="stage-title-group">
              <h3 className="stage-title">{stage.title}</h3>
              <p className="stage-desc">{stage.desc}</p>
            </div>
          </div>

          {/* Real-time Dynamic Metric Gauges */}
          <div className="stage-metrics-grid">
            <div className="metric-box">
              <div className="metric-header">
                <span className="metric-label">{stage.metric1.label}</span>
                <span className="metric-val" style={{ color: stage.metric1.color }}>
                  {stage.metric1.value}
                </span>
              </div>
              <div className="metric-progress-bg">
                <div
                  className="metric-progress-fill"
                  style={{
                    width: `${stage.metric1.pct}%`,
                    backgroundColor: stage.metric1.color,
                  }}
                ></div>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-header">
                <span className="metric-label">{stage.metric2.label}</span>
                <span className="metric-val" style={{ color: stage.metric2.color }}>
                  {stage.metric2.value}
                </span>
              </div>
              <div className="metric-progress-bg">
                <div
                  className="metric-progress-fill"
                  style={{
                    width: `${stage.metric2.pct}%`,
                    backgroundColor: stage.metric2.color,
                  }}
                ></div>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-header">
                <span className="metric-label">{stage.metric3.label}</span>
                <span className="metric-val" style={{ color: stage.metric3.color }}>
                  {stage.metric3.value}
                </span>
              </div>
              <div className="metric-progress-bg">
                <div
                  className="metric-progress-fill"
                  style={{
                    width: `${stage.metric3.pct}%`,
                    backgroundColor: stage.metric3.color,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className="stage-status-strip">
            <CheckCircle size={13} color="#22c55e" />
            <span>{stage.status}</span>
          </div>
        </div>

        {/* Real System Architecture Ticker Tailored to Role */}
        <div className="pipeline-stats-footer">
          {currentPipeline.ticker.map((item, idx) => {
            const TickerIcon = item.icon;
            return (
              <div key={idx} className="stat-pill">
                <TickerIcon size={12} color="#ffffff" />
                <span>{item.label}: <strong>{item.val}</strong></span>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="auth-carousel-dots">
          {currentPipeline.stages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`carousel-dot ${idx === activeStageIdx ? 'active' : ''}`}
              onClick={() => setActiveStageIdx(idx)}
              aria-label={`Go to stage ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
