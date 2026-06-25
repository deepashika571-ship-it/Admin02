import { Client, Booking, Coupon, Review, DailyStat, ServiceStat } from './types';

// Luxury specialists at Aura Luxe
export const SPECIALISTS = [
  'Elena Rostova (Master Facialist)',
  'Marcus Vane (Hair Artisan)',
  'Aria Sterling (Massage Therapist)',
  'Sienna Brooks (Nail Designer)',
  'Dominic Thorne (Skincare Expert)'
];

// Luxury Services Offered
export const SERVICES = [
  { name: 'Signature Caviar Facial', price: 280, category: 'Skincare' },
  { name: 'Luxe Gold Leaf Massage', price: 350, category: 'Body Therapy' },
  { name: 'Royal Hydrafacial Infusion', price: 220, category: 'Skincare' },
  { name: 'Balayage Couture & Blowout', price: 450, category: 'Hair Artistry' },
  { name: 'Aura Champagne Stone Therapy', price: 190, category: 'Body Therapy' },
  { name: 'Diamond Microdermabrasion', price: 260, category: 'Skincare' }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'C-101',
    name: 'Charlotte Dubois',
    email: 'charlotte.d@vogue.fr',
    phone: '+1 (555) 019-2831',
    tier: 'Elite VIP',
    totalSpent: 2850,
    totalVisits: 12,
    joinedDate: '2025-09-14',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'C-102',
    name: 'Alessandra Moretti',
    email: 'a.moretti@milano.it',
    phone: '+1 (555) 048-1920',
    tier: 'Elite VIP',
    totalSpent: 4200,
    totalVisits: 15,
    joinedDate: '2025-05-20',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'C-103',
    name: 'Isabella Zhang',
    email: 'isabella.z@elite.com',
    phone: '+1 (555) 073-9844',
    tier: 'Gold Member',
    totalSpent: 1840,
    totalVisits: 8,
    joinedDate: '2025-11-02',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'C-104',
    name: 'Victoria Harrington',
    email: 'v.harrington@london.co.uk',
    phone: '+1 (555) 039-1229',
    tier: 'Regular',
    totalSpent: 640,
    totalVisits: 3,
    joinedDate: '2026-02-18',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'C-105',
    name: 'Maximilian Vance',
    email: 'mv@vanceholdings.com',
    phone: '+1 (555) 021-9988',
    tier: 'Gold Member',
    totalSpent: 1250,
    totalVisits: 5,
    joinedDate: '2025-12-10',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'B-901',
    clientName: 'Charlotte Dubois',
    clientEmail: 'charlotte.d@vogue.fr',
    serviceName: 'Signature Caviar Facial',
    date: '2026-06-25',
    time: '10:00 AM',
    price: 280,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialist: 'Elena Rostova (Master Facialist)'
  },
  {
    id: 'B-902',
    clientName: 'Alessandra Moretti',
    clientEmail: 'a.moretti@milano.it',
    serviceName: 'Balayage Couture & Blowout',
    date: '2026-06-25',
    time: '02:00 PM',
    price: 450,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialist: 'Marcus Vane (Hair Artisan)'
  },
  {
    id: 'B-903',
    clientName: 'Maximilian Vance',
    clientEmail: 'mv@vanceholdings.com',
    serviceName: 'Luxe Gold Leaf Massage',
    date: '2026-06-26',
    time: '11:30 AM',
    price: 350,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    specialist: 'Aria Sterling (Massage Therapist)'
  },
  {
    id: 'B-904',
    clientName: 'Victoria Harrington',
    clientEmail: 'v.harrington@london.co.uk',
    serviceName: 'Royal Hydrafacial Infusion',
    date: '2026-06-27',
    time: '04:00 PM',
    price: 220,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    specialist: 'Elena Rostova (Master Facialist)'
  },
  {
    id: 'B-905',
    clientName: 'Isabella Zhang',
    clientEmail: 'isabella.z@elite.com',
    serviceName: 'Aura Champagne Stone Therapy',
    date: '2026-06-23',
    time: '01:00 PM',
    price: 190,
    status: 'Completed',
    paymentStatus: 'Paid',
    specialist: 'Aria Sterling (Massage Therapist)'
  },
  {
    id: 'B-906',
    clientName: 'Charlotte Dubois',
    clientEmail: 'charlotte.d@vogue.fr',
    serviceName: 'Diamond Microdermabrasion',
    date: '2026-06-22',
    time: '09:30 AM',
    price: 260,
    status: 'Completed',
    paymentStatus: 'Paid',
    specialist: 'Dominic Thorne (Skincare Expert)'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'CP-01',
    code: 'AURALUXE50',
    discountType: 'Fixed Amount',
    value: 50,
    minSpend: 200,
    expiryDate: '2026-08-31',
    isActive: true,
    timesUsed: 142
  },
  {
    id: 'CP-02',
    code: 'VIPGOLD15',
    discountType: 'Percentage',
    value: 15,
    minSpend: 300,
    expiryDate: '2026-12-31',
    isActive: true,
    timesUsed: 89
  },
  {
    id: 'CP-03',
    code: 'WELCOME10',
    discountType: 'Percentage',
    value: 10,
    minSpend: 100,
    expiryDate: '2026-07-15',
    isActive: true,
    timesUsed: 310
  },
  {
    id: 'CP-04',
    code: 'SUMMERSPA20',
    discountType: 'Percentage',
    value: 20,
    minSpend: 250,
    expiryDate: '2026-06-30',
    isActive: false,
    timesUsed: 54
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'R-01',
    clientName: 'Charlotte Dubois',
    rating: 5,
    comment: 'The Signature Caviar Facial at Aura Luxe is pure divinity. Elena Rostova possesses magical hands. My skin has never glowed like this before. An exquisite aesthetic haven!',
    date: '2026-06-24',
    serviceName: 'Signature Caviar Facial',
    status: 'Approved'
  },
  {
    id: 'R-02',
    clientName: 'Maximilian Vance',
    rating: 5,
    comment: 'Impeccable service. The Luxe Gold Leaf Massage was incredibly restorative and deep. Perfect tension release. Highly professional team.',
    date: '2026-06-23',
    serviceName: 'Luxe Gold Leaf Massage',
    status: 'Approved'
  },
  {
    id: 'R-03',
    clientName: 'Alessandra Moretti',
    rating: 4,
    comment: 'Absolutely love my balayage by Marcus. The color blend is pure art. Knocking off one star only because the appointment started 10 minutes late, but they made up for it with luxury champagne.',
    date: '2026-06-21',
    serviceName: 'Balayage Couture & Blowout',
    status: 'Approved'
  },
  {
    id: 'R-04',
    clientName: 'Penelope Sterling',
    rating: 5,
    comment: 'Superb atmosphere and detail! From the scent when you walk in to the premium heated massage tables, it is a magnificent sensory escape.',
    date: '2026-06-25',
    serviceName: 'Aura Champagne Stone Therapy',
    status: 'Pending'
  }
];

// Rich analytics timeline
export const DAILY_ANALYTICS: DailyStat[] = [
  { day: 'Mon', revenue: 1450, bookings: 5 },
  { day: 'Tue', revenue: 2100, bookings: 7 },
  { day: 'Wed', revenue: 1850, bookings: 6 },
  { day: 'Thu', revenue: 3400, bookings: 10 },
  { day: 'Fri', revenue: 4200, bookings: 12 },
  { day: 'Sat', revenue: 5800, bookings: 16 },
  { day: 'Sun', revenue: 2900, bookings: 8 }
];

export const SERVICE_POPULARITY: ServiceStat[] = [
  { name: 'Skincare', value: 45, color: '#D4AF37' },        // Champagne Gold
  { name: 'Body Therapy', value: 30, color: '#1C1C1C' },    // Rich Charcoal
  { name: 'Hair Artistry', value: 15, color: '#AA7C11' },   // Dark Gold
  { name: 'Nails & Others', value: 10, color: '#E5D3B3' }   // Soft Cream / Beige
];
