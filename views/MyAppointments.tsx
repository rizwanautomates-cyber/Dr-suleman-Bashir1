import React, { useEffect, useState } from 'react';
import { Appointment, ViewState } from '../types';
import { getAppointments, cancelAppointment } from '../services/storageService';
import { Button } from '../components/Button';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface Props {
    onNavigate: (view: ViewState) => void;
}

export const MyAppointmentsView: React.FC<Props> = ({ onNavigate }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // In a real app, this would filter by the logged-in user ID
    // For demo, we show all "Active" local appointments
    const all = getAppointments();
    setAppointments(all.sort((a, b) => b.createdAt - a.createdAt));
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(id);
      loadData();
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-slate-50">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center text-slate-400">
          <Calendar size={64} strokeWidth={1} className="mb-4 text-slate-300" />
          <p>No appointment history found.</p>
          <div className="mt-6">
              <Button variant="outline" onClick={() => onNavigate(ViewState.BOOKING)}>Book Now</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div 
              key={appt.id} 
              className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
                  appt.status === 'confirmed' ? 'border-l-primary-500' : 
                  appt.status === 'cancelled' ? 'border-l-red-400 opacity-75' : 'border-l-slate-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                   <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                       appt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                       appt.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                   }`}>
                       {appt.status}
                   </span>
                </div>
                <div className="text-xs text-slate-400">ID: #{appt.id.slice(-4)}</div>
              </div>

              <h3 className="font-bold text-lg text-slate-800 mb-1">{appt.patientName}</h3>
              
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                <div className="flex items-center gap-1">
                   <Calendar size={14} className="text-primary-500"/> {appt.date}
                </div>
                <div className="flex items-center gap-1">
                   <Clock size={14} className="text-primary-500"/> {appt.timeSlot}
                </div>
              </div>

              {appt.status === 'confirmed' && (
                <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <Button 
                        variant="secondary" 
                        className="flex-1 text-sm py-2"
                        onClick={() => alert("Reschedule feature requires calling the clinic in this demo.")}
                    >
                        Reschedule
                    </Button>
                    <button 
                        onClick={() => handleCancel(appt.id)}
                        className="text-red-500 text-sm font-medium px-4 hover:bg-red-50 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};