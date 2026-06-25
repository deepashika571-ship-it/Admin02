/**
 * Aura Luxe Beauty Studio - Type Definitions
 */

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'Elite VIP' | 'Gold Member' | 'Regular';
  totalSpent: number;
  totalVisits: number;
  joinedDate: string;
  avatar: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
  specialist: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'Percentage' | 'Fixed Amount';
  value: number;
  minSpend: number;
  expiryDate: string;
  isActive: boolean;
  timesUsed: number;
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
  status: 'Approved' | 'Pending';
}

export interface DailyStat {
  day: string;
  revenue: number;
  bookings: number;
}

export interface ServiceStat {
  name: string;
  value: number;
  color: string;
}
