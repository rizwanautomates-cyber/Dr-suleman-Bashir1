import { DoctorDetails } from './types';

export const DOCTOR_DATA: DoctorDetails = {
  name: "Dr. Suleman Bashir",
  qualification: "MBBS, FCPS Medicine",
  specialization: "Consultant Medical Specialist",
  hospital: "Ikram Hospital",
  address: "Ikram Hospital, Bhimber Road, Gujrat",
  phoneMobile: "0340-6667350",
  phoneLandline: ["053-3605377", "053-3605378", "053-3605379"],
  timings: "Mon - Sat: 9:00 AM - 9:00 PM"
};

export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
];

// In a real app, this would be generated dynamicallly
export const APP_DOWNLOAD_QR = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://bashircare-demo.com";
