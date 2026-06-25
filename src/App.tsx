import { useState, useEffect } from 'react';
import { Client, Booking, Coupon, Review, DailyStat, ServiceStat } from './types';
import {
  INITIAL_CLIENTS,
  INITIAL_BOOKINGS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  DAILY_ANALYTICS,
  SERVICE_POPULARITY
} from './data';
import AdminLogin from './components/AdminLogin';
import AnalyticsTab from './components/AnalyticsTab';
import BookingsTab from './components/BookingsTab';
import UsersTab from './components/UsersTab';
import CouponsTab from './components/CouponsTab';
import ReviewsTab from './components/ReviewsTab';
import {
  Sparkles,
  LayoutDashboard,
  Calendar,
  Users,
  Tag,
  Star,
  LogOut,
  Menu,
  X,
  User,
  Heart,
  Briefcase,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('Lady Genevieve');

  // Core collections state
  const [clients, setClients] = useState<Client[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Analytics timeline references (static but customizable)
  const [dailyAnalytics, setDailyAnalytics] = useState<DailyStat[]>(DAILY_ANALYTICS);
  const [servicePopularity, setServicePopularity] = useState<ServiceStat[]>(SERVICE_POPULARITY);

  // Tab Navigation state
  const [activeTab, setActiveTab] = useState<'analytics' | 'bookings' | 'clients' | 'coupons' | 'reviews'>('analytics');
  
  // Mobile UI controls
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load state from local storage on mount
  useEffect(() => {
    try {
      const savedClients = localStorage.getItem('auraluxe_clients');
      const savedBookings = localStorage.getItem('auraluxe_bookings');
      const savedCoupons = localStorage.getItem('auraluxe_coupons');
      const savedReviews = localStorage.getItem('auraluxe_reviews');
      const savedAdminName = localStorage.getItem('auraluxe_admin_name');
      const savedIsLoggedIn = localStorage.getItem('auraluxe_is_logged_in');

      if (savedClients) setClients(JSON.parse(savedClients));
      else {
        setClients(INITIAL_CLIENTS);
        localStorage.setItem('auraluxe_clients', JSON.stringify(INITIAL_CLIENTS));
      }

      if (savedBookings) setBookings(JSON.parse(savedBookings));
      else {
        setBookings(INITIAL_BOOKINGS);
        localStorage.setItem('auraluxe_bookings', JSON.stringify(INITIAL_BOOKINGS));
      }

      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));
      else {
        setCoupons(INITIAL_COUPONS);
        localStorage.setItem('auraluxe_coupons', JSON.stringify(INITIAL_COUPONS));
      }

      if (savedReviews) setReviews(JSON.parse(savedReviews));
      else {
        setReviews(INITIAL_REVIEWS);
        localStorage.setItem('auraluxe_reviews', JSON.stringify(INITIAL_REVIEWS));
      }

      if (savedAdminName) setAdminName(savedAdminName);
      if (savedIsLoggedIn === 'true') setIsAdminLoggedIn(true);

    } catch (e) {
      console.error('Error seeding initial luxury state', e);
      // Fallbacks
      setClients(INITIAL_CLIENTS);
      setBookings(INITIAL_BOOKINGS);
      setCoupons(INITIAL_COUPONS);
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  // Helper sync triggers
  const syncClients = (newClients: Client[]) => {
    setClients(newClients);
    localStorage.setItem('auraluxe_clients', JSON.stringify(newClients));
  };

  const syncBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('auraluxe_bookings', JSON.stringify(newBookings));
    
    // Also recalculate daily analytics metrics if new bookings are added
    const updatedDailyStats = [...DAILY_ANALYTICS];
    // Find matching date and update
    newBookings.forEach(b => {
      // Very simple local distribution mapping
      const dateObj = new Date(b.date);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = days[dateObj.getDay()] || 'Thu';
      const statIndex = updatedDailyStats.findIndex(s => s.day === dayName);
      if (statIndex !== -1 && b.paymentStatus === 'Paid') {
        updatedDailyStats[statIndex] = {
          ...updatedDailyStats[statIndex],
          revenue: updatedDailyStats[statIndex].revenue + b.price,
          bookings: updatedDailyStats[statIndex].bookings + 1
        };
      }
    });
    setDailyAnalytics(updatedDailyStats);
  };

  const syncCoupons = (newCoupons: Coupon[]) => {
    setCoupons(newCoupons);
    localStorage.setItem('auraluxe_coupons', JSON.stringify(newCoupons));
  };

  const syncReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('auraluxe_reviews', JSON.stringify(newReviews));
  };

  // Auth success
  const handleLoginSuccess = (name: string) => {
    setIsAdminLoggedIn(true);
    setAdminName(name);
    localStorage.setItem('auraluxe_admin_name', name);
    localStorage.setItem('auraluxe_is_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('auraluxe_is_logged_in');
  };

  // --- Handlers for list manipulations ---
  
  // Clients Add/Edit/Delete
  const handleAddClient = (newClient: Client) => {
    syncClients([newClient, ...clients]);
  };

  const handleUpdateClientTier = (id: string, tier: Client['tier']) => {
    const updated = clients.map(c => c.id === id ? { ...c, tier } : c);
    syncClients(updated);
  };

  const handleDeleteClient = (id: string) => {
    const updated = clients.filter(c => c.id !== id);
    syncClients(updated);
  };

  // Bookings Add/Edit/Delete
  const handleAddBooking = (newBooking: Booking) => {
    const updatedBookings = [newBooking, ...bookings];
    syncBookings(updatedBookings);

    // If client is already in registry, increase total spent and total visits
    const updatedClients = clients.map(client => {
      if (client.name.toLowerCase() === newBooking.clientName.toLowerCase() || client.email.toLowerCase() === newBooking.clientEmail.toLowerCase()) {
        const isPaid = newBooking.paymentStatus === 'Paid';
        return {
          ...client,
          totalVisits: client.totalVisits + 1,
          totalSpent: isPaid ? client.totalSpent + newBooking.price : client.totalSpent
        };
      }
      return client;
    });
    syncClients(updatedClients);
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    syncBookings(updated);
  };

  const handleUpdatePaymentStatus = (id: string, paymentStatus: Booking['paymentStatus']) => {
    const bookingToUpdate = bookings.find(b => b.id === id);
    const prevPaymentStatus = bookingToUpdate?.paymentStatus;
    
    const updatedBookings = bookings.map(b => b.id === id ? { ...b, paymentStatus } : b);
    syncBookings(updatedBookings);

    // If marked Paid, increase client's total spent
    if (bookingToUpdate && paymentStatus === 'Paid' && prevPaymentStatus !== 'Paid') {
      const updatedClients = clients.map(client => {
        if (client.name.toLowerCase() === bookingToUpdate.clientName.toLowerCase()) {
          return { ...client, totalSpent: client.totalSpent + bookingToUpdate.price };
        }
        return client;
      });
      syncClients(updatedClients);
    }
  };

  // Coupons Add/Edit/Delete
  const handleAddCoupon = (newCoupon: Coupon) => {
    syncCoupons([newCoupon, ...coupons]);
  };

  const handleToggleCouponActive = (id: string) => {
    const updated = coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c);
    syncCoupons(updated);
  };

  const handleDeleteCoupon = (id: string) => {
    const updated = coupons.filter(c => c.id !== id);
    syncCoupons(updated);
  };

  // Reviews Add/Edit/Delete
  const handleApproveReview = (id: string) => {
    const updated = reviews.map(r => r.id === id ? { ...r, status: 'Approved' as const } : r);
    syncReviews(updated);
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    syncReviews(updated);
  };

  // Render Login overlay if unauthenticated
  if (!isAdminLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Sidebar Menu Entries
  const MENU_ITEMS = [
    { id: 'analytics', label: 'Analytics', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#E5D3B3] flex font-sans antialiased relative overflow-x-hidden">
      {/* Decorative Golden Orbs for entire app */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[200px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#AA7C11] rounded-full blur-[200px] opacity-[0.02] pointer-events-none" />

      {/* --- SIDEBAR PANEL (Desktop) --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#111113] border-r border-[#D4AF37]/15 h-screen sticky top-0 shrink-0 z-30">
        {/* Branding header */}
        <div className="p-6 border-b border-[#D4AF37]/15 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-[#1C1C1F] flex items-center justify-center text-[#D4AF37] mb-2.5 shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-xl tracking-[0.2em] text-[#E5D3B3] uppercase font-light">
            Aura Luxe
          </h1>
          <p className="text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase font-mono mt-0.5">
            Admin Sanctuary
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 group ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#AA7C11]/15 to-[#D4AF37]/5 border border-[#D4AF37]/30 text-[#D4AF37] font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-[#1C1C1F]/40'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isSelected ? 'text-[#D4AF37]' : 'text-gray-500 group-hover:text-gray-300'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-[#D4AF37]/10 bg-[#18181B]/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#1C1C1F] border border-[#D4AF37]/30 flex items-center justify-center text-xs font-serif text-[#D4AF37]">
              {adminName.slice(0, 2)}
            </div>
            <div className="truncate">
              <p className="text-xs font-serif text-white truncate">{adminName}</p>
              <p className="text-[9px] text-gray-500 uppercase font-mono">Regisseur</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-[#1C1C1F] hover:bg-red-950/20 hover:text-red-400 border border-zinc-800 text-gray-400 py-2.5 rounded-lg text-xs tracking-widest uppercase font-mono flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Leave Sanctuary</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE DRAWER MENU --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="relative flex flex-col w-72 max-w-[80%] bg-[#111113] border-r border-[#D4AF37]/20 p-6 z-50 h-full animate-fadeIn">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-[#D4AF37] border border-zinc-800 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo */}
            <div className="mb-8 text-center pt-4">
              <span className="text-[10px] text-[#D4AF37] tracking-[0.25em] uppercase font-mono">Aura Luxe</span>
              <h2 className="font-serif text-2xl tracking-[0.1em] text-white uppercase mt-0.5">Sanctuary</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#AA7C11]/15 to-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="border-t border-zinc-800 pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-[#D4AF37]/20 flex items-center justify-center text-xs text-[#D4AF37]">
                  {adminName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-white">{adminName}</p>
                  <p className="text-[9px] text-gray-500 uppercase font-mono">ADMIN PROFILE</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-[#1C1C1F] hover:bg-red-950/20 text-gray-400 text-xs py-2.5 rounded-lg tracking-widest uppercase font-mono flex items-center justify-center gap-2 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN CORE PANEL --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[#D4AF37]/10 bg-[#0F0F11]/80 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-25">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-[#D4AF37] border border-zinc-800 rounded-lg"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Studio active info */}
            <div className="hidden sm:block">
              <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Aura Luxe Salon Sanctuary Live
              </span>
            </div>
          </div>

          {/* Quick Stats overview widgets in header */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-xs border-r border-[#D4AF37]/10 pr-6">
              <div>
                <p className="text-[9px] text-gray-500 uppercase font-mono">Today's Slate</p>
                <p className="text-white font-serif font-medium">{bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length} appointments</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase font-mono">Average Rating</p>
                <p className="text-[#D4AF37] font-serif font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  4.9
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1F] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xs font-serif shadow-md">
                {adminName.slice(0, 1)}
              </div>
              <span className="text-xs text-gray-300 font-medium font-mono hidden sm:inline">{adminName}</span>
            </div>
          </div>
        </header>

        {/* Page Inner Container */}
        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
          {/* Analytics tab layout view */}
          {activeTab === 'analytics' && (
            <AnalyticsTab
              clients={clients}
              bookings={bookings}
              coupons={coupons}
              reviews={reviews}
              dailyAnalytics={dailyAnalytics}
              servicePopularity={servicePopularity}
            />
          )}

          {/* Bookings Tab layout view */}
          {activeTab === 'bookings' && (
            <BookingsTab
              bookings={bookings}
              clients={clients}
              onAddBooking={handleAddBooking}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onUpdatePaymentStatus={handleUpdatePaymentStatus}
            />
          )}

          {/* Client directory tab layout view */}
          {activeTab === 'clients' && (
            <UsersTab
              clients={clients}
              onAddClient={handleAddClient}
              onUpdateClientTier={handleUpdateClientTier}
              onDeleteClient={handleDeleteClient}
            />
          )}

          {/* Coupons / Promo Codes tab layout view */}
          {activeTab === 'coupons' && (
            <CouponsTab
              coupons={coupons}
              onAddCoupon={handleAddCoupon}
              onToggleCouponActive={handleToggleCouponActive}
              onDeleteCoupon={handleDeleteCoupon}
            />
          )}

          {/* Review moderation tab layout view */}
          {activeTab === 'reviews' && (
            <ReviewsTab
              reviews={reviews}
              onApproveReview={handleApproveReview}
              onDeleteReview={handleDeleteReview}
            />
          )}
        </main>
      </div>
    </div>
  );
}
