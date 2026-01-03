
export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF'
}

export enum RoomType {
  SINGLE = 'Single',
  DOUBLE = 'Double',
  SUITE = 'Suite',
  DELUXE = 'Deluxe'
}

export enum RoomStatus {
  AVAILABLE = 'Available',
  OCCUPIED = 'Occupied',
  CLEANING = 'Cleaning',
  MAINTENANCE = 'Maintenance'
}

export enum FeedbackCategory {
  ROOM = 'Room',
  SERVICE = 'Service',
  STAFF = 'Staff',
  AMENITIES = 'Amenities'
}

export interface User {
  username: string;
  displayName: string;
  role: UserRole;
}

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  price: number;
  status: RoomStatus;
  amenities: string[];
  image: string;
}

export interface Reservation {
  id: string;
  guestName: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Pending' | 'Checked-Out' | 'Cancelled';
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minThreshold: number;
  category: string;
}

export interface AIWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Failed';
  lastRun: string;
}

export interface Feedback {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  category: FeedbackCategory;
  date: string;
  roomNumber?: string;
  staffName?: string;
  status: 'New' | 'Reviewed' | 'Resolved';
}
