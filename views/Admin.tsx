import React, { useState } from 'react';
import { getAppointments, updateAppointmentStatus } from '../services/storageService';
import { Appointment, ViewState } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Check, X } from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const AdminView: React.FC<Props> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(getAppointments());

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const updateStatus = (id: string, status: Appointment['status']) => {
    const updated = updateAppointmentStatus(id, status);
    setAppointments(updated);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
        <input 
          type="password" 
          placeholder="Enter Admin Password" 
          className="w-full p-3 border rounded-xl mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} fullWidth>Login</Button>
        <button onClick={() => onNavigate(ViewState.HOME)} className="mt-4 text-slate-500">Back Home</button>
      </div>
    );
  }

  const sortedAppts = [...appointments].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => onNavigate(ViewState.HOME)} className="p-2 -ml-2 text-slate-500">
           <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900">Admin Dashboard</h2>
      </div>

      <div className="space-y-4">
        {sortedAppts.map(appt => (
          <div key={appt.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between mb-2">
               <span className="font-bold">{appt.patientName}</span>
               <span className="text-sm text-slate-500">{appt.date} {appt.timeSlot}</span>
            </div>
            <div className="text-sm text-slate-600 mb-2">Phone: {appt.patientPhone}</div>
            {appt.notes && <div className="text-sm bg-slate-50 p-2 rounded mb-3 italic">"{appt.notes}"</div>}
            
            <div className="flex gap-2 border-t pt-3">
                {appt.status !== 'visited' && appt.status !== 'cancelled' && (
                    <button 
                       onClick={() => updateStatus(appt.id, 'visited')}
                       className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium flex justify-center items-center gap-1"
                    >
                        <Check size={16} /> Mark Visited
                    </button>
                )}
                 {appt.status !== 'cancelled' && (
                    <button 
                        onClick={() => updateStatus(appt.id, 'cancelled')}
                        className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg text-sm font-medium flex justify-center items-center gap-1"
                    >
                        <X size={16} /> Cancel
                    </button>
                 )}
            </div>
            <div className="text-xs text-center mt-2 text-slate-400 uppercase tracking-widest">{appt.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};