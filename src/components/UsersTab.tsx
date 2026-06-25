import React, { useState } from 'react';
import { Client } from '../types';
import { Search, UserPlus, Star, Mail, Phone, Calendar, ArrowUpRight, Award, Trash, Edit } from 'lucide-react';

interface UsersTabProps {
  clients: Client[];
  onAddClient: (client: Client) => void;
  onUpdateClientTier: (id: string, tier: Client['tier']) => void;
  onDeleteClient: (id: string) => void;
}

export default function UsersTab({
  clients,
  onAddClient,
  onUpdateClientTier,
  onDeleteClient,
}: UsersTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | Client['tier']>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Client Form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTier, setNewTier] = useState<Client['tier']>('Regular');

  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const luxuryAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    ];
    
    // Pick avatar randomly or default
    const randomAvatar = luxuryAvatars[Math.floor(Math.random() * luxuryAvatars.length)];

    const newClient: Client = {
      id: `C-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      email: newEmail,
      phone: newPhone || '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      tier: newTier,
      totalSpent: 0,
      totalVisits: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: randomAvatar
    };

    onAddClient(newClient);

    // Reset Form
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewTier('Regular');
    setShowAddForm(false);
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    const matchesTier = tierFilter === 'All' || client.tier === tierFilter;

    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Tab Header with Golden Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-wider text-[#E5D3B3] uppercase">
            Client Directory
          </h2>
          <p className="text-xs text-[#D4AF37] tracking-widest uppercase font-mono mt-1">
            Elite Members, VIPs & Registered Patrons of Aura Luxe
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="self-start sm:self-auto bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-medium text-xs tracking-wider uppercase px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <UserPlus className="w-4 h-4" />
          {showAddForm ? 'Cancel Form' : 'Register New Patron'}
        </button>
      </div>

      {/* Add Client slide form */}
      {showAddForm && (
        <form onSubmit={handleAddClientSubmit} className="bg-[#131316] border border-[#D4AF37]/30 rounded-xl p-6 shadow-xl space-y-4 animate-fadeIn">
          <h3 className="font-serif text-lg text-white mb-2 uppercase tracking-wider pb-2 border-b border-[#D4AF37]/10">
            Aura Luxe Patron Register
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="E.g. Vivienne Westwood"
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Luxury Email Key
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="E.g. vivienne@haute.com"
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Contact Phone
              </label>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="E.g. +1 (555) 123-4567"
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-1.5">
                Elite Lounge Tier
              </label>
              <select
                value={newTier}
                onChange={(e) => setNewTier(e.target.value as Client['tier'])}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-[#E5D3B3] outline-none"
              >
                <option value="Regular">Regular Member</option>
                <option value="Gold Member">Gold Member Lounge</option>
                <option value="Elite VIP">Elite VIP Sanctuary</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all"
            >
              Complete Registration
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Box */}
      <div className="bg-[#131316] border border-[#D4AF37]/10 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#D4AF37]/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patron directory..."
            className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] pl-10 pr-4 py-2 text-xs rounded-lg text-white outline-none"
          />
        </div>

        {/* Tier Filters */}
        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto justify-center md:justify-end">
          {(['All', 'Elite VIP', 'Gold Member', 'Regular'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3.5 py-1.5 rounded-md text-[10px] uppercase font-mono tracking-wider transition-all whitespace-nowrap ${
                tierFilter === tier
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-gray-400 hover:text-white bg-[#1C1C1F]/40'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Patron Directory Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-[#131316] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all duration-300 rounded-xl p-5 shadow-lg relative overflow-hidden group flex flex-col justify-between"
          >
            {/* Top-right subtle visual accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_50%)] pointer-events-none" />
            
            <div>
              {/* Header: Name, Avatar, Tier Badge */}
              <div className="flex items-start gap-4">
                <img
                  src={client.avatar}
                  alt={client.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/30 group-hover:scale-105 transition-transform"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-base text-white tracking-wide font-medium">{client.name}</h3>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[9px] uppercase font-mono px-2 py-0.5 rounded-full border ${
                    client.tier === 'Elite VIP' ? 'bg-[#AA7C11]/20 text-[#D4AF37] border-[#D4AF37]/30 font-semibold' :
                    client.tier === 'Gold Member' ? 'bg-amber-950/20 text-amber-300 border-amber-500/10' :
                    'bg-zinc-800/40 text-gray-400 border-zinc-700/20'
                  }`}>
                    <Award className="w-2.5 h-2.5" />
                    {client.tier}
                  </span>
                </div>
              </div>

              {/* Client statistics */}
              <div className="grid grid-cols-2 gap-2 my-5 p-3 bg-[#1C1C1F]/40 rounded-lg border border-[#D4AF37]/5">
                <div>
                  <span className="text-[9px] uppercase font-mono text-gray-500 block">Invested Spent</span>
                  <span className="text-sm font-mono text-[#D4AF37] font-semibold">${client.totalSpent.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono text-gray-500 block">Total Bookings</span>
                  <span className="text-sm font-mono text-white font-medium">{client.totalVisits} visits</span>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-2 text-xs text-gray-400">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                  <span className="truncate">{client.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                  <span>{client.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                  <span>Registry: {client.joinedDate}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions at Bottom */}
            <div className="border-t border-[#D4AF37]/10 pt-4 mt-4 flex items-center justify-between">
              {/* Upgrade Tier Select dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase font-mono text-gray-500">Tier:</span>
                <select
                  value={client.tier}
                  onChange={(e) => onUpdateClientTier(client.id, e.target.value as Client['tier'])}
                  className="bg-[#1C1C1F] border border-[#D4AF37]/20 text-[10px] text-[#D4AF37] rounded px-1.5 py-1 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Regular">Regular</option>
                  <option value="Gold Member">Gold Member</option>
                  <option value="Elite VIP">Elite VIP</option>
                </select>
              </div>

              <button
                onClick={() => {
                  if (confirm(`Remove ${client.name} from directory permanently?`)) {
                    onDeleteClient(client.id);
                  }
                }}
                className="text-gray-500 hover:text-red-400 p-1.5 transition-colors"
                title="Remove Patron"
              >
                <Trash className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
