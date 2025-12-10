import React, { useEffect, useState } from 'react';
import { Appointment, ViewState } from '../types';
import { getAppointments, cancelAppointment, rescheduleAppointment } from '../services/storageService';
import { TIME_SLOTS } from '../constants';
import { Button } from '../components/Button';
import { Calendar, Clock, AlertCircle, X, Check } from 'lucide-react';

interface Props {
    onNavigate: (view: ViewState) => void;
}

export const MyAppointmentsView: React.FC<Props> = ({ onNavigate }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Reschedule State
  const [isRescheduling, setIsRescheduling] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newSlot, setNewSlot] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  // Update available slots when date changes during rescheduling
  useEffect(() => {
    if (newDate && isRescheduling) {
      const allAppts = getAppointments();
      const taken = allAppts
        .filter(a => a.date === newDate && a.status !== 'cancelled' && a.id !== isRescheduling)
        .map(a => a.timeSlot);
      setBookedSlots(taken);
      setNewSlot(''); // Reset slot selection when date changes
    }
  }, [newDate, isRescheduling]);

  const loadData = () => {
    const all = getAppointments();
    setAppointments(all.sort((a, b) => b.createdAt - a.createdAt));
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(id);
      loadData();
    }
  };

  const startReschedule = (appt: Appointment) => {
    setIsRescheduling(appt.id);
    setNewDate(appt.date);
    setNewSlot(appt.timeSlot);
  };

  const confirmReschedule = () => {
    if (isRescheduling && newDate && newSlot) {
        rescheduleAppointment(isRescheduling, newDate, newSlot);
        setIsRescheduling(null);
        setNewDate('');
        setNewSlot('');
        loadData();
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-slate-50 relative">
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
                        onClick={() => startReschedule(appt)}
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

      {/* Reschedule Modal Overlay */}
      {isRescheduling && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-lg text-slate-800">Reschedule Appointment</h3>
                    <button 
                        onClick={() => setIsRescheduling(null)}
                        className="p-1 rounded-full hover:bg-slate-200 text-slate-500"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Date Picker */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Select New Date</label>
                        <input 
                            type="date" 
                            value={newDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>

                    {/* Time Slots */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Select New Time</label>
                        <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map(slot => {
                            const isTaken = bookedSlots.includes(slot);
                            const isSelected = newSlot === slot;
                            
                            return (
                            <button
                                key={slot}
                                disabled={isTaken}
                                onClick={() => setNewSlot(slot)}
                                className={`
                                py-2 px-1 rounded-lg text-xs font-medium transition-all
                                ${isTaken ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : ''}
                                ${isSelected ? 'bg-primary-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600'}
                                ${!isTaken && !isSelected ? 'hover:border-primary-400' : ''}
                                `}
                            >
                                {slot}
                            </button>
                            );
                        })}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                    <Button 
                        variant="secondary" 
                        fullWidth 
                        onClick={() => setIsRescheduling(null)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        fullWidth 
                        disabled={!newDate || !newSlot}
                        onClick={confirmReschedule}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};