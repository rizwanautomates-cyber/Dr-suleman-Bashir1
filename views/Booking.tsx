import React, { useState, useEffect } from 'react';
import { TIME_SLOTS } from '../constants';
import { Button } from '../components/Button';
import { Appointment, ViewState } from '../types';
import { getAppointments, saveAppointment } from '../services/storageService';
import { Calendar, Clock, CheckCircle, ArrowLeft } from 'lucide-react';

interface BookingProps {
  onNavigate: (view: ViewState) => void;
}

export const BookingView: React.FC<BookingProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', phone: '', notes: '' });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Initialize date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Fetch taken slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const allAppts = getAppointments();
      const taken = allAppts
        .filter(a => a.date === selectedDate && a.status !== 'cancelled')
        .map(a => a.timeSlot);
      setBookedSlots(taken);
    }
  }, [selectedDate]);

  const handleBooking = () => {
    if (!formData.name || !formData.phone) {
      alert("Please fill in required fields");
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientName: formData.name,
      patientPhone: formData.phone,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes: formData.notes,
      status: 'confirmed',
      createdAt: Date.now()
    };

    saveAppointment(newAppointment);
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
          Your appointment with Dr. Bashir is set for <br/>
          <span className="font-semibold text-slate-800">{selectedDate}</span> at <span className="font-semibold text-slate-800">{selectedSlot}</span>.
        </p>
        <div className="space-y-3 w-full max-w-xs">
            <Button fullWidth onClick={() => onNavigate(ViewState.APPOINTMENTS)}>
            View Ticket
            </Button>
            <Button fullWidth variant="secondary" onClick={() => onNavigate(ViewState.HOME)}>
            Back Home
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-white">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => step === 1 ? onNavigate(ViewState.HOME) : setStep(1)} className="p-2 -ml-2 text-slate-500">
           <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900">
            {step === 1 ? 'Select Time' : 'Patient Details'}
        </h2>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          {/* Date Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
              <Calendar size={16} /> Select Date
            </label>
            <input 
              type="date" 
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          {/* Time Slots */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
              <Clock size={16} /> Available Slots
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map(slot => {
                const isTaken = bookedSlots.includes(slot);
                const isSelected = selectedSlot === slot;
                
                return (
                  <button
                    key={slot}
                    disabled={isTaken}
                    onClick={() => setSelectedSlot(slot)}
                    className={`
                      py-2 px-1 rounded-lg text-sm font-medium transition-all
                      ${isTaken ? 'bg-slate-100 text-slate-300 cursor-not-allowed decoration-slate-300' : ''}
                      ${isSelected ? 'bg-primary-600 text-white shadow-md scale-105' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'}
                      ${!isTaken && !isSelected ? 'hover:bg-slate-50' : ''}
                    `}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="fixed bottom-24 left-0 right-0 p-4 bg-white border-t border-slate-100 z-10 max-w-md mx-auto">
             <Button 
                fullWidth 
                disabled={!selectedSlot || !selectedDate}
                onClick={() => setStep(2)}
             >
                Continue
             </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
           <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 mb-4">
               <p className="text-sm text-primary-800 font-medium text-center">
                   Booking for: {selectedDate} at {selectedSlot}
               </p>
           </div>

           <div className="space-y-1">
               <label className="text-sm font-medium text-slate-700">Full Name</label>
               <input 
                 type="text"
                 placeholder="e.g. Ali Khan"
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
               />
           </div>

           <div className="space-y-1">
               <label className="text-sm font-medium text-slate-700">Mobile Number</label>
               <input 
                 type="tel"
                 placeholder="0300-1234567"
                 value={formData.phone}
                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
                 className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary-500 outline-none"
               />
           </div>

           <div className="space-y-1">
               <label className="text-sm font-medium text-slate-700">Note (Optional)</label>
               <textarea 
                 rows={3}
                 placeholder="Briefly describe your issue..."
                 value={formData.notes}
                 onChange={(e) => setFormData({...formData, notes: e.target.value})}
                 className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary-500 outline-none resize-none"
               />
           </div>

           <div className="pt-6">
               <Button fullWidth onClick={handleBooking}>
                   Confirm Booking
               </Button>
           </div>
        </div>
      )}
    </div>
  );
};