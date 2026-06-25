import React, { useState } from 'react';
import { Coupon } from '../types';
import { Ticket, Plus, Calendar, ToggleLeft, ToggleRight, Trash2, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';

interface CouponsTabProps {
  coupons: Coupon[];
  onAddCoupon: (coupon: Coupon) => void;
  onToggleCouponActive: (id: string) => void;
  onDeleteCoupon: (id: string) => void;
}

export default function CouponsTab({
  coupons,
  onAddCoupon,
  onToggleCouponActive,
  onDeleteCoupon,
}: CouponsTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  // New Coupon Form State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<Coupon['discountType']>('Percentage');
  const [value, setValue] = useState(15);
  const [minSpend, setMinSpend] = useState(150);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newCoupon: Coupon = {
      id: `CP-${Math.floor(10 + Math.random() * 90)}`,
      code: code.trim().toUpperCase(),
      discountType,
      value: Number(value),
      minSpend: Number(minSpend),
      expiryDate,
      isActive: true,
      timesUsed: 0
    };

    onAddCoupon(newCoupon);

    // Reset fields
    setCode('');
    setValue(15);
    setMinSpend(150);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Header with Luxury Invitation button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-wider text-[#E5D3B3] uppercase">
            Golden Coupons
          </h2>
          <p className="text-xs text-[#D4AF37] tracking-widest uppercase font-mono mt-1">
            Luxury Promotional Keys, Comp Certificates & Gifting Systems
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="self-start sm:self-auto bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-medium text-xs tracking-wider uppercase px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? 'Cancel Creation' : 'Mint Promo Code'}
        </button>
      </div>

      {/* Mint coupon slide form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-[#131316] border border-[#D4AF37]/30 rounded-xl p-6 shadow-xl space-y-4 animate-fadeIn">
          <h3 className="font-serif text-lg text-white mb-2 uppercase tracking-wider pb-2 border-b border-[#D4AF37]/10">
            Mint New Exquisite Certificate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Promo Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="E.g. AURA50"
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white uppercase outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Valuation System
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as Coupon['discountType'])}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-[#E5D3B3] outline-none"
              >
                <option value="Percentage">Percentage (%)</option>
                <option value="Fixed Amount">Fixed Flat Amount ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Discount Worth
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                placeholder="Worth"
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white outline-none"
                required
                min={1}
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Min Spend Barrier ($)
              </label>
              <input
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(Number(e.target.value))}
                placeholder="Spend barrier"
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Expiry Date
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white outline-none font-mono"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all"
            >
              Issue Voucher Key
            </button>
          </div>
        </form>
      )}

      {/* Grid of luxury Gold Foil Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`relative rounded-xl border p-6 bg-[#131316] hover:shadow-xl transition-all duration-300 ${
              coupon.isActive
                ? 'border-[#D4AF37]/35 shadow-[0_5px_15px_rgba(212,175,55,0.05)]'
                : 'border-zinc-800 opacity-60'
            }`}
          >
            {/* Decors */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_50%)] pointer-events-none" />

            {/* Left/Right luxury cutout dots mimicking physical tickets */}
            <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-6 bg-[#0B0B0C] border-r border-zinc-800 rounded-r-full" />
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-6 bg-[#0B0B0C] border-l border-zinc-800 rounded-l-full" />

            {/* Content layout */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-gray-500 font-mono tracking-widest block mb-1">ID: {coupon.id}</span>
                <h3 className="font-mono text-xl text-white font-bold tracking-widest bg-[#1C1C1F] border border-[#D4AF37]/20 px-3 py-1.5 rounded inline-block">
                  {coupon.code}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase font-mono text-[#D4AF37] tracking-widest block">Value</span>
                <p className="font-serif text-2xl font-bold text-white">
                  {coupon.discountType === 'Percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                </p>
                <p className="text-[9px] text-gray-500 uppercase font-mono mt-0.5">Off Total</p>
              </div>
            </div>

            {/* Mid Stats bar */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-[#D4AF37]/10 py-4 my-4">
              <div>
                <span className="text-[9px] uppercase font-mono text-gray-500 block">Min Spend Gate</span>
                <p className="text-sm font-semibold font-mono text-[#E5D3B3]">${coupon.minSpend}</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase font-mono text-gray-500 block">Volume Redeemed</span>
                <p className="text-sm font-semibold font-mono text-white flex items-center justify-end gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {coupon.timesUsed} times
                </p>
              </div>
            </div>

            {/* Foot info & Status controllers */}
            <div className="flex justify-between items-center text-xs">
              <p className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]/50" />
                Expiry: <span className="font-mono text-gray-300">{coupon.expiryDate}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleCouponActive(coupon.id)}
                  title={coupon.isActive ? 'Suspend' : 'Activate'}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {coupon.isActive ? (
                    <ToggleRight className="w-8 h-8 text-[#D4AF37]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-600" />
                  )}
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Dissolve promo certificate ${coupon.code}?`)) {
                      onDeleteCoupon(coupon.id);
                    }
                  }}
                  className="p-1.5 hover:bg-red-950/20 rounded hover:text-red-400 text-gray-500 transition-colors"
                  title="Dissolve"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
