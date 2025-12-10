import { Appointment } from '../types';

const STORAGE_KEY = 'bashircare_appointments';

export const getAppointments = (): Appointment[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load appointments", e);
    return [];
  }
};

export const saveAppointment = (appointment: Appointment): void => {
  const current = getAppointments();
  const updated = [...current, appointment];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const updateAppointmentStatus = (id: string, status: Appointment['status']): Appointment[] => {
  const current = getAppointments();
  const updated = current.map(appt => 
    appt.id === id ? { ...appt, status } : appt
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const rescheduleAppointment = (id: string, newDate: string, newTimeSlot: string): Appointment[] => {
  const current = getAppointments();
  const updated = current.map(appt => 
    appt.id === id ? { ...appt, date: newDate, timeSlot: newTimeSlot, status: 'confirmed' as const } : appt
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const cancelAppointment = (id: string): Appointment[] => {
  return updateAppointmentStatus(id, 'cancelled');
};