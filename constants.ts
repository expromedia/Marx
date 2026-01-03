
import { RoomType, RoomStatus, Room, InventoryItem, Feedback, FeedbackCategory } from './types';

export const THEME_COLOR = '#5B8FB1'; // Updated to Primary color
export const SECONDARY_COLOR = '#66A9D4'; // Secondary color for charts/graphs

export const MOCK_ROOMS: Room[] = [
  { id: '1', number: '101', type: RoomType.SINGLE, price: 150, status: RoomStatus.AVAILABLE, amenities: ['Wifi', 'TV', 'Coffee Maker'], image: 'https://picsum.photos/400/300?random=1' },
  { id: '2', number: '102', type: RoomType.DOUBLE, price: 250, status: RoomStatus.OCCUPIED, amenities: ['Wifi', 'TV', 'Mini Bar'], image: 'https://picsum.photos/400/300?random=2' },
  { id: '3', number: '201', type: RoomType.SUITE, price: 500, status: RoomStatus.AVAILABLE, amenities: ['Sea View', 'Balcony', 'King Bed'], image: 'https://picsum.photos/400/300?random=3' },
  { id: '4', number: '202', type: RoomType.DELUXE, price: 350, status: RoomStatus.CLEANING, amenities: ['Sea View', 'Wifi', 'Breakfast'], image: 'https://picsum.photos/400/300?random=4' },
  { id: '5', number: '301', type: RoomType.SUITE, price: 600, status: RoomStatus.MAINTENANCE, amenities: ['Balcony', 'Kitchen', 'King Bed'], image: 'https://picsum.photos/400/300?random=5' },
  { id: '6', number: '103', type: RoomType.SINGLE, price: 180, status: RoomStatus.AVAILABLE, amenities: ['Wifi', 'Garden View'], image: 'https://picsum.photos/400/300?random=6' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Towels', quantity: 150, minThreshold: 50, category: 'Linens' },
  { id: 'i2', name: 'Soap Bars', quantity: 200, minThreshold: 100, category: 'Toiletries' },
  { id: 'i3', name: 'Bedsheets', quantity: 80, minThreshold: 40, category: 'Linens' },
  { id: 'i4', name: 'Mini Bar Water', quantity: 300, minThreshold: 100, category: 'Food & Beverage' },
];

export const MOCK_RESERVATIONS = [
  { id: 'r1', guestName: 'Alice Johnson', roomId: '102', checkIn: '2024-05-10', checkOut: '2024-05-15', status: 'Confirmed' },
  { id: 'r2', guestName: 'Bob Smith', roomId: '202', checkIn: '2024-05-12', checkOut: '2024-05-14', status: 'Pending' },
  { id: 'r3', guestName: 'Charlie Davis', roomId: '301', checkIn: '2024-05-08', checkOut: '2024-05-10', status: 'Checked-Out' },
];

export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: 'f1',
    guestName: 'John Wick',
    rating: 5,
    comment: 'Exceptional service and the sea view room was breathtaking. Will definitely return!',
    category: FeedbackCategory.ROOM,
    date: '2024-04-15',
    roomNumber: '201',
    status: 'Reviewed'
  },
  {
    id: 'f2',
    guestName: 'Diana Prince',
    rating: 4,
    comment: 'The spa facilities are top-notch. Staff was very helpful with my luggage.',
    category: FeedbackCategory.SERVICE,
    date: '2024-04-18',
    status: 'New'
  },
  {
    id: 'f3',
    guestName: 'Arthur Curry',
    rating: 3,
    comment: 'The AC in room 102 was a bit noisy during the night.',
    category: FeedbackCategory.ROOM,
    date: '2024-04-20',
    roomNumber: '102',
    status: 'Resolved'
  },
  {
    id: 'f4',
    guestName: 'Bruce Wayne',
    rating: 5,
    comment: 'Concierge handled my late-night requests with absolute professional discretion. Highly commendable.',
    category: FeedbackCategory.STAFF,
    date: '2024-04-22',
    staffName: 'Alfred',
    status: 'New'
  }
];
