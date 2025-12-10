export enum ViewState {
  HOME = 'HOME',
  BOOKING = 'BOOKING',
  APPOINTMENTS = 'APPOINTMENTS',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN',
  AI_CHAT = 'AI_CHAT'
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  date: string; // ISO Date string YYYY-MM-DD
  timeSlot: string; // HH:mm
  status: 'confirmed' | 'cancelled' | 'visited';
  notes?: string;
  createdAt: number;
}

export interface DoctorDetails {
  name: string;
  qualification: string;
  specialization: string;
  hospital: string;
  address: string;
  phoneMobile: string;
  phoneLandline: string[];
  timings: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}