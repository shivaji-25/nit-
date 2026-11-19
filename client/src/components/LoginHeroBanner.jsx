import React, { useState, useEffect } from 'react';
import { ChefHat, Factory, PackageCheck, ShieldCheck, ArrowRight, Activity, CheckCircle, Database } from 'lucide-react';

const pipelineStages = [
  {
    id: 'recipe',
    number: '01',
    label: 'Recipe & Stock',
    icon: ChefHat,
    title: 'Precision Recipe Batching',
    desc: 'Automated gram-level ingredient scaling from formula to warehouse requisition.',
    metric1: { label: 'Wheat Flour', value: '50.0 kg', pct: 65, color: '#3b82f6' },
    metric2: { label: 'Cane Sugar', value: '12.5 kg', pct: 20, color: '#f59e0b' },
    metric3: { label: 'Dairy Butter', value: '8.0 kg', pct: 15, color: '#10b981' },
    status: 'Warehouse Stock Reserved • FIFO Validated',
  },
  {
    id: 'production',
    number: '02',
    label: 'Batch Mixing',
    icon: Factory,
    title: 'Industrial Production Floor',
    desc: 'Real-time dough batch mixing, temperature monitoring, and yield tracking.',
    metric1: { label: 'Batch ID', value: '#B26-104', pct: 100, color: '#6366f1' },
    metric2: { label: 'Oven Temp', value: '185°C (Optimal)', pct: 92, color: '#ef4444' },
    metric3: { label: 'Yield Efficiency', value: '98.6%', pct: 98, color: '#10b981' },
    status: 'Mixer Active • Zero Waste Threshold Maintained',
  },
  {
    id: 'packing',
    number: '03',
    label: 'Packing & FIFO',
    icon: PackageCheck,
    title: 'Finished Goods & Dispatch',
    desc: 'Automated packing line with unit-level barcoding and ledger auto-credit.',
    metric1: { label: 'SKU Pack', value: 'Classic Butter 250g', pct: 100, color: '#8b5cf6' },
    metric2: { label: 'Units Sealed', value: '1,200 packs', pct: 85, color: '#3b82f6' },
    metric3: { label: 'Expiry Date', value: '19-Dec-2026', pct: 100, color: '#10b981' },
    status: 'Stock Ledger Credited • Ready for Field Sales',
  },
  {
    id: 'audit',
    number: '04',
    label: 'Cryptographic Audit',
    icon: ShieldCheck,
    title: 'Immutable Audit Trail',
    desc: 'Cryptographic SHA-256 transaction blocks preventing stock divergence.',
    metric1: { label: 'Block Hash', value: 'SHA-256 0x7f4a...8b9c', pct: 100, color: '#10b981' },
    metric2: { label: 'Role Isolation', value: 'Separated Folders', pct: 100, color: '#6366f1' },
    metric3: { label: 'Stock Divergence', value: '0.00% Verified', pct: 100, color: '#10b981' },
    status: 'Tamper-Proof Ledger • Auditor Portal Approved',
  },
];

export const LoginHeroBanner = ({ role = 'user' }) => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  // Auto-advance through the real food manufacturing pipeline every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % pipelineStages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stage = pipelineStages[activeStageIdx];
  const StageIcon = stage.icon;

  return (
    <div className={`auth-hero-panel ${role}-hero`}>
      <div className="auth-hero-glass-card">
        {/* Real-Time Live Header */}
        <div className="flow-live-header">
          <div className="flow-live-indicator">
            <span className="live-pulsing-node"></span>
            <span className="live-status-title">Live Food Manufacturing Pipeline</span>
          </div>
          <span className="live-stage-badge">Stage {stage.number} of 04</span>
        </div>

        {/* 4-Stage Interactive Pipeline Navigation Tabs */}
        <div className="pipeline-nav-bar">
          {pipelineStages.map((stg, idx) => {
            const Icon = stg.icon;
            const isActive = idx === activeStageIdx;
            return (
              <button
                key={stg.id}
                type="button"
                className={`pipeline-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStageIdx(idx)}
              >
                <Icon size={14} />
                <span>{stg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Active Stage Showcase Window */}
        <div className="pipeline-stage-card">
          <div className="stage-top-row">
            <div className="stage-icon-circle">
              <StageIcon size={24} color="#ffffff" />
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
            <CheckCircle size={14} color="#22c55e" />
            <span>{stage.status}</span>
          </div>
        </div>

        {/* Real System Architecture Ticker */}
        <div className="pipeline-stats-footer">
          <div className="stat-pill">
            <Activity size={12} color="#38bdf8" />
            <span>Daily Output: <strong>2,450 kg</strong></span>
          </div>
          <div className="stat-pill">
            <Database size={12} color="#22c55e" />
            <span>Atlas: <strong>user_folder</strong></span>
          </div>
          <div className="stat-pill">
            <ShieldCheck size={12} color="#a855f7" />
            <span>Audit: <strong>100% Synced</strong></span>
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="auth-carousel-dots">
          {pipelineStages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`carousel-dot ${idx === activeStageIdx ? 'active' : ''}`}
              onClick={() => setActiveStageIdx(idx)}
              aria-label={`Go to pipeline stage ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
