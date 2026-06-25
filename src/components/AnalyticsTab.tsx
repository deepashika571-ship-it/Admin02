import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Client, Booking, Coupon, Review, DailyStat, ServiceStat } from '../types';
import { DollarSign, Calendar, Tag, Star, ArrowUpRight, TrendingUp, Users, Heart } from 'lucide-react';

interface AnalyticsTabProps {
  clients: Client[];
  bookings: Booking[];
  coupons: Coupon[];
  reviews: Review[];
  dailyAnalytics: DailyStat[];
  servicePopularity: ServiceStat[];
}

export default function AnalyticsTab({
  clients,
  bookings,
  coupons,
  reviews,
  dailyAnalytics,
  servicePopularity,
}: AnalyticsTabProps) {
  // Compute Key Luxury Metrics
  const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
  const completedBookings = bookings.filter(b => b.status === 'Completed');
  
  // Total Revenue (Completed + Confirmed Bookings)
  const totalRevenue = bookings
    .filter(b => b.status !== 'Cancelled' && b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + b.price, 0);

  const averageBookingValue = bookings.length > 0
    ? Math.round(totalRevenue / bookings.filter(b => b.paymentStatus === 'Paid').length || 1)
    : 0;

  const totalClients = clients.length;
  
  // Calculate Average rating from approved or all reviews
  const approvedReviews = reviews.filter(r => r.status === 'Approved');
  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '4.8';

  // Customize Luxury Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1C1C1F] border border-[#D4AF37]/30 p-3 rounded-lg shadow-xl font-sans text-xs">
          <p className="text-[#E5D3B3] font-medium mb-1">{label}</p>
          <p className="text-[#D4AF37]">
            Revenue: <span className="font-mono font-semibold">${payload[0].value.toLocaleString()}</span>
          </p>
          {payload[1] && (
            <p className="text-[#8E8E93] mt-0.5">
              Appointments: <span className="font-mono">{payload[1].value}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1C1C1F] border border-[#D4AF37]/20 p-2 rounded-lg text-xs font-sans">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-[#D4AF37] font-semibold">{payload[0].value}% Share</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div>
        <h2 className="font-serif text-3xl font-light tracking-wider text-[#E5D3B3] uppercase">
          Studio Analytics
        </h2>
        <p className="text-xs text-[#D4AF37] tracking-widest uppercase font-mono mt-1">
          Aura Luxe Performance & Health Indexes
        </p>
      </div>

      {/* Grid of Key Luxury Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-[#131316] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37]/70">Accumulated Revenue</p>
              <h3 className="text-2xl font-serif font-medium text-white tracking-wide mt-2">
                ${totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="p-2.5 bg-[#1C1C1F] border border-[#D4AF37]/20 rounded-lg text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#D4AF37]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-medium">+14.2%</span>
            <span className="text-gray-500 font-sans ml-1">vs. previous month</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#131316] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37]/70">Total Bookings</p>
              <h3 className="text-2xl font-serif font-medium text-white tracking-wide mt-2">
                {bookings.length}
              </h3>
            </div>
            <div className="p-2.5 bg-[#1C1C1F] border border-[#D4AF37]/20 rounded-lg text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#E5D3B3]">
            <span className="font-mono text-[#D4AF37]">{activeBookings.length}</span>
            <span className="text-gray-500 font-sans">currently scheduled</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#131316] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37]/70">Average Visit Value</p>
              <h3 className="text-2xl font-serif font-medium text-white tracking-wide mt-2">
                ${averageBookingValue}
              </h3>
            </div>
            <div className="p-2.5 bg-[#1C1C1F] border border-[#D4AF37]/20 rounded-lg text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#E5D3B3]">
            <span className="font-medium text-[#D4AF37]">{totalClients}</span>
            <span className="text-gray-500 font-sans">active luxury clients</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#131316] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37]/70">Exquisite Star Index</p>
              <h3 className="text-2xl font-serif font-medium text-white tracking-wide mt-2 flex items-center gap-2">
                {avgRating} <span className="text-xs text-gray-500 font-sans">/ 5.0</span>
              </h3>
            </div>
            <div className="p-2.5 bg-[#1C1C1F] border border-[#D4AF37]/20 rounded-lg text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#E5D3B3]">
            <span className="font-mono text-[#D4AF37]">{approvedReviews.length}</span>
            <span className="text-gray-500 font-sans">luxury testimonials approved</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart: Revenue Trend */}
        <div className="bg-[#131316] border border-[#D4AF37]/10 rounded-xl p-6 lg:col-span-2 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-serif font-medium text-[#E5D3B3] uppercase tracking-wider">Revenue & Service Volume</h4>
              <p className="text-[10px] text-gray-500 font-mono">DAILY DISTRIBUTION ANALYSIS</p>
            </div>
            <span className="text-[10px] bg-[#1C1C1F] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              Live Feed
            </span>
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyAnalytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#252528" vertical={false} />
                <XAxis dataKey="day" stroke="#5E5E62" fontSize={11} tickLine={false} />
                <YAxis stroke="#5E5E62" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#revenueGlow)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Popularity Distribution */}
        <div className="bg-[#131316] border border-[#D4AF37]/10 rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-serif font-medium text-[#E5D3B3] uppercase tracking-wider mb-1">Aesthetic Category Mix</h4>
            <p className="text-[10px] text-gray-500 font-mono mb-4">REVENUE BY DISCIPLINE</p>
          </div>

          <div className="h-[180px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={servicePopularity}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {servicePopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#131316" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">Core</span>
              <p className="font-serif text-xl font-semibold text-white">4 Domains</p>
            </div>
          </div>

          <div className="space-y-2.5 mt-4">
            {servicePopularity.map((entry, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-[#E5D3B3] font-medium">{entry.name}</span>
                </div>
                <span className="font-mono text-gray-400 font-medium">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Daily Booking Volume BarChart & Recent Luxury Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings BarChart */}
        <div className="bg-[#131316] border border-[#D4AF37]/10 rounded-xl p-6 shadow-xl lg:col-span-1">
          <div>
            <h4 className="text-sm font-serif font-medium text-[#E5D3B3] uppercase tracking-wider mb-1">Weekly Booking Volume</h4>
            <p className="text-[10px] text-gray-500 font-mono mb-6">NUMBER OF VISITS COMPLETED & SCHEDULED</p>
          </div>

          <div className="h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyAnalytics} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252528" vertical={false} />
                <XAxis dataKey="day" stroke="#5E5E62" fontSize={11} tickLine={false} />
                <YAxis stroke="#5E5E62" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }} />
                <Bar dataKey="bookings" fill="#D4AF37" radius={[4, 4, 0, 0]} maxBarSize={30}>
                  {dailyAnalytics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#AA7C11' : '#D4AF37'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Luxury Real-time Stream */}
        <div className="bg-[#131316] border border-[#D4AF37]/10 rounded-xl p-6 shadow-xl lg:col-span-2 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-serif font-medium text-[#E5D3B3] uppercase tracking-wider mb-1">Exquisite Feed & Actions</h4>
            <p className="text-[10px] text-gray-500 font-mono mb-4">LATEST ADMINISTRATIVE SYSTEM TRIGGERS</p>
          </div>

          <div className="divide-y divide-[#D4AF37]/10">
            {bookings.slice(0, 4).map((booking) => (
              <div key={booking.id} className="py-3 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <div>
                    <p className="font-semibold text-[#E5D3B3]">{booking.clientName}</p>
                    <p className="text-gray-500 text-[10px] font-mono uppercase mt-0.5">{booking.serviceName} with {booking.specialist.split(' ')[0]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[#D4AF37] font-semibold">${booking.price}</span>
                  <div className="mt-0.5">
                    <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/10' :
                      booking.status === 'Completed' ? 'bg-blue-950/40 text-blue-400 border border-blue-500/10' :
                      booking.status === 'Pending' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/10' :
                      'bg-red-950/40 text-red-400 border border-red-500/10'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#D4AF37]/10 pt-4 flex justify-between items-center text-xs mt-3">
            <span className="text-gray-500 font-mono uppercase">VIP Active Stream Status</span>
            <span className="text-[#D4AF37] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Optimal Performance Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
