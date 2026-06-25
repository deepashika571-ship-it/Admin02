import React, { useState } from 'react';
import { Booking, Client } from '../types';
import { SPECIALISTS, SERVICES } from '../data';
import { Calendar, Clock, DollarSign, Search, User, Filter, Plus, Check, X, FileEdit, CheckCircle, HelpCircle } from 'lucide-react';

interface BookingsTabProps {
  bookings: Booking[];
  clients: Client[];
  onAddBooking: (booking: Booking) => void;
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onUpdatePaymentStatus: (id: string, status: Booking['paymentStatus']) => void;
}

export default function BookingsTab({
  bookings,
  clients,
  onAddBooking,
  onUpdateBookingStatus,
  onUpdatePaymentStatus,
}: BookingsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Booking['status']>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Booking State
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES[0].name);
  const [newDate, setNewDate] = useState('2026-06-25');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [selectedSpecialist, setSelectedSpecialist] = useState(SPECIALISTS[0]);
  const [newPaymentStatus, setNewPaymentStatus] = useState<Booking['paymentStatus']>('Unpaid');

  // Handle submit for adding new luxury appointment
  const handleAddBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientEmail) return;

    const serviceObj = SERVICES.find(s => s.name === selectedService);
    const price = serviceObj ? serviceObj.price : 250;

    const newBooking: Booking = {
      id: `B-${Math.floor(100 + Math.random() * 900)}`,
      clientName: newClientName,
      clientEmail: newClientEmail,
      serviceName: selectedService,
      date: newDate,
      time: newTime,
      price,
      status: 'Pending',
      paymentStatus: newPaymentStatus,
      specialist: selectedSpecialist
    };

    onAddBooking(newBooking);
    
    // Reset Form
    setNewClientName('');
    setNewClientEmail('');
    setSelectedService(SERVICES[0].name);
    setSelectedSpecialist(SPECIALISTS[0]);
    setShowAddForm(false);
  };

  // Filter & Search logic
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Tab Header with Golden Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-wider text-[#E5D3B3] uppercase">
            Appointments
          </h2>
          <p className="text-xs text-[#D4AF37] tracking-widest uppercase font-mono mt-1">
            Exquisite Client Booking & Status Orchestration
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="self-start sm:self-auto bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-medium text-xs tracking-wider uppercase px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? 'Cancel Creation' : 'Reserve Appointment'}
        </button>
      </div>

      {/* Slide-down Add Booking Form */}
      {showAddForm && (
        <div className="bg-[#131316] border border-[#D4AF37]/30 rounded-xl p-6 shadow-xl animate-fadeIn">
          <h3 className="font-serif text-lg text-white mb-4 uppercase tracking-widest border-b border-[#D4AF37]/20 pb-2">
            Luxury Reservation Registry
          </h3>
          <form onSubmit={handleAddBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Client Select or Custom Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-2">
                Client Name
              </label>
              <input
                type="text"
                list="client-suggestions"
                value={newClientName}
                onChange={(e) => {
                  setNewClientName(e.target.value);
                  // Auto fill email if exists in directory
                  const matchedClient = clients.find(c => c.name.toLowerCase() === e.target.value.toLowerCase());
                  if (matchedClient) {
                    setNewClientEmail(matchedClient.email);
                  }
                }}
                placeholder="E.g. Charlotte Dubois"
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-3 text-xs text-white outline-none"
                required
              />
              <datalist id="client-suggestions">
                {clients.map(c => (
                  <option key={c.id} value={c.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-2">
                Client Email
              </label>
              <input
                type="email"
                value={newClientEmail}
                onChange={(e) => setNewClientEmail(e.target.value)}
                placeholder="E.g. guest@auraluxe.com"
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-3 text-xs text-white outline-none"
                required
              />
            </div>

            {/* Service catalog */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-2">
                Aura Luxe Service Catalog
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-3 text-xs text-[#E5D3B3] outline-none"
              >
                {SERVICES.map((serv) => (
                  <option key={serv.name} value={serv.name}>
                    {serv.name} (${serv.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-2">
                Appointment Date
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-3 text-xs text-white outline-none"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-2">
                Hour & Period
              </label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-3 text-xs text-[#E5D3B3] outline-none"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:30 PM">05:30 PM</option>
              </select>
            </div>

            {/* Specialist selection */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-2">
                Assigned Specialist
              </label>
              <select
                value={selectedSpecialist}
                onChange={(e) => setSelectedSpecialist(e.target.value)}
                className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-lg p-3 text-xs text-[#E5D3B3] outline-none"
              >
                {SPECIALISTS.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Initial Payment Status */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] mb-2">
                Initial Payment Status
              </label>
              <div className="flex gap-4 mt-1">
                {['Unpaid', 'Paid'].map((payS) => (
                  <button
                    key={payS}
                    type="button"
                    onClick={() => setNewPaymentStatus(payS as Booking['paymentStatus'])}
                    className={`flex-1 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${
                      newPaymentStatus === payS
                        ? 'bg-[#D4AF37] text-black font-semibold'
                        : 'bg-[#1C1C1F] text-gray-400 border border-[#D4AF37]/10'
                    }`}
                  >
                    {payS}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs tracking-wider uppercase px-5 py-3 rounded-lg transition-all"
              >
                Complete Booking Register
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#131316] border border-[#D4AF37]/10 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#D4AF37]/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients or services..."
            className="w-full bg-[#1C1C1F] border border-[#D4AF37]/20 focus:border-[#D4AF37] pl-10 pr-4 py-2 text-xs rounded-lg text-white outline-none"
          />
        </div>

        {/* Status Tab Filters */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto justify-center md:justify-end">
          {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-mono tracking-wider transition-all ${
                statusFilter === status
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-gray-400 hover:text-white bg-[#1C1C1F]/40'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Appointments Table & Mobile Cards */}
      <div className="bg-[#131316] border border-[#D4AF37]/10 rounded-xl overflow-hidden shadow-xl">
        {/* Table View (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-[#D4AF37]/10">
            <thead className="bg-[#1C1C1F]/60 text-[10px] text-[#D4AF37] uppercase tracking-[0.15em] font-mono">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Exquisite Service</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Specialist</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Payment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/5 text-[#E5D3B3]">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-[#1C1C1F]/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-500 font-semibold">{booking.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{booking.clientName}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{booking.clientEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{booking.serviceName}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="flex items-center gap-1.5 text-gray-300">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                          {booking.date}
                        </p>
                        <p className="flex items-center gap-1.5 text-gray-400 font-mono text-[10px]">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                          {booking.time}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{booking.specialist.split(' ')[0]}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block text-[9px] uppercase font-mono px-2.5 py-1 rounded-full border ${
                        booking.status === 'Confirmed' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20' :
                        booking.status === 'Completed' ? 'bg-blue-950/30 text-blue-400 border-blue-500/20' :
                        booking.status === 'Pending' ? 'bg-amber-950/30 text-amber-400 border-amber-500/20' :
                        'bg-red-950/30 text-red-400 border-red-500/20'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block text-[9px] uppercase font-mono px-2 py-0.5 rounded ${
                        booking.paymentStatus === 'Paid' ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-500/20' :
                        booking.paymentStatus === 'Refunded' ? 'bg-purple-900/20 text-purple-400 border border-purple-500/20' :
                        'bg-rose-900/20 text-rose-400 border border-rose-500/20'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        {/* Quick state change button triggers */}
                        {booking.status === 'Pending' && (
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, 'Confirmed')}
                            title="Confirm Booking"
                            className="p-1.5 bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-black rounded transition-all"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {booking.status === 'Confirmed' && (
                          <button
                            onClick={() => {
                              onUpdateBookingStatus(booking.id, 'Completed');
                              onUpdatePaymentStatus(booking.id, 'Paid');
                            }}
                            title="Complete Booking"
                            className="p-1.5 bg-blue-950/40 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white rounded transition-all"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {booking.paymentStatus === 'Unpaid' && (
                          <button
                            onClick={() => onUpdatePaymentStatus(booking.id, 'Paid')}
                            title="Mark Paid"
                            className="p-1.5 bg-amber-950/40 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black rounded transition-all"
                          >
                            <DollarSign className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, 'Cancelled')}
                            title="Cancel Appointment"
                            className="p-1.5 bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white rounded transition-all"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 font-serif">
                    No refined appointments matched your search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid Cards */}
        <div className="md:hidden divide-y divide-[#D4AF37]/10">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 font-semibold">{booking.id}</span>
                    <h4 className="font-semibold text-white">{booking.clientName}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{booking.serviceName}</p>
                  </div>
                  <span className={`text-[9px] uppercase font-mono px-2.5 py-0.5 rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/10' :
                    booking.status === 'Completed' ? 'bg-blue-950/40 text-blue-400 border border-blue-500/10' :
                    booking.status === 'Pending' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/10' :
                    'bg-red-950/40 text-red-400 border border-red-500/10'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 bg-[#1C1C1F]/40 p-3 rounded-lg border border-[#D4AF37]/5">
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono">SCHEDULE</p>
                    <p className="text-gray-200 mt-0.5">{booking.date}</p>
                    <p className="text-gray-400 font-mono text-[10px]">{booking.time}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono">SPECIALIST</p>
                    <p className="text-gray-200 mt-0.5">{booking.specialist.split(' ')[0]}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-[10px] text-gray-500 font-mono">FEE & PAYMENT</p>
                    <p className="text-white mt-0.5 font-bold">${booking.price}</p>
                    <span className={`text-[9px] font-mono uppercase ${
                      booking.paymentStatus === 'Paid' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Mobile action row */}
                <div className="flex gap-2 justify-end">
                  {booking.status === 'Pending' && (
                    <button
                      onClick={() => onUpdateBookingStatus(booking.id, 'Confirmed')}
                      className="text-[10px] font-mono bg-emerald-900/30 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded"
                    >
                      Confirm
                    </button>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button
                      onClick={() => {
                        onUpdateBookingStatus(booking.id, 'Completed');
                        onUpdatePaymentStatus(booking.id, 'Paid');
                      }}
                      className="text-[10px] font-mono bg-blue-900/30 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded"
                    >
                      Complete
                    </button>
                  )}
                  {booking.paymentStatus === 'Unpaid' && (
                    <button
                      onClick={() => onUpdatePaymentStatus(booking.id, 'Paid')}
                      className="text-[10px] font-mono bg-amber-900/30 text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1.5 rounded"
                    >
                      Pay Fee
                    </button>
                  )}
                  {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                    <button
                      onClick={() => onUpdateBookingStatus(booking.id, 'Cancelled')}
                      className="text-[10px] font-mono bg-red-900/30 text-red-400 border border-red-500/20 px-3 py-1.5 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 font-serif text-sm">
              No appointments scheduled.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
