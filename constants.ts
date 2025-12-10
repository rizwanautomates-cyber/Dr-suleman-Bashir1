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

// Generate 15-minute intervals from 9:00 AM to 8:45 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 21; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const h = hour < 10 ? `0${hour}` : hour;
      const m = minute === 0 ? '00' : minute;
      slots.push(`${h}:${m}`);
    }
  }
  return slots;
};

export const TIME_SLOTS = generateTimeSlots();

// In a real app, this would be generated dynamicallly
export const APP_DOWNLOAD_QR = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://bashircare-demo.com";