import React from 'react';
import { DOCTOR_DATA } from '../constants';
import { ViewState } from '../types';
import { Button } from '../components/Button';
import { MapPin, Clock, Star, ShieldCheck, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

export const HomeView: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24 pt-6 px-4 space-y-6 max-w-md mx-auto">
      {/* Header Profile */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold border-2 border-white shadow-sm">
          SB
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">Dr. Suleman Bashir</h1>
          <p className="text-primary-600 font-medium text-sm">{DOCTOR_DATA.specialization}</p>
        </div>
      </div>

      {/* Stats/Quick Info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-1">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <ShieldCheck size={20} />
          </div>
          <span className="font-bold text-slate-800 text-sm">FCPS Med.</span>
          <span className="text-xs text-slate-500">Gold Medalist</span>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-1">
          <div className="bg-amber-100 p-2 rounded-full text-amber-600">
            <Star size={20} />
          </div>
          <span className="font-bold text-slate-800 text-sm">4.9/5</span>
          <span className="text-xs text-slate-500">Patient Rating</span>
        </div>
      </div>

      {/* Clinic Card */}
      <div className="bg-white rounded-3xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100">
        <h2 className="font-bold text-lg mb-4 text-slate-800">Clinic Info</h2>
        
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <div className="mt-1 text-slate-400">
              <MapPin size={18} />
            </div>
            <div>
              <p className="font-medium text-slate-900">{DOCTOR_DATA.hospital}</p>
              <p className="text-sm text-slate-500">{DOCTOR_DATA.address}</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <div className="mt-1 text-slate-400">
              <Clock size={18} />
            </div>
            <div>
              <p className="font-medium text-slate-900">Visiting Hours</p>
              <p className="text-sm text-slate-500">{DOCTOR_DATA.timings}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <Button fullWidth onClick={() => onNavigate(ViewState.BOOKING)}>
            Book Appointment
          </Button>
        </div>
      </div>

      {/* Promo/Feature Banner */}
      <div 
        onClick={() => onNavigate(ViewState.AI_CHAT)}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg cursor-pointer relative overflow-hidden group"
      >
        <div className="relative z-10">
          <h3 className="font-bold text-lg">Health Assistant AI</h3>
          <p className="text-indigo-100 text-sm mb-3">Ask questions about symptoms or clinic details.</p>
          <span className="inline-flex items-center text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            Chat Now <ChevronRight size={14} className="ml-1" />
          </span>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:scale-110 transition-transform">
          <ShieldCheck size={120} />
        </div>
      </div>

      <div className="flex justify-center">
        <button 
            onClick={() => onNavigate(ViewState.ADMIN)}
            className="text-xs text-slate-300 hover:text-slate-500"
        >
            Admin Login
        </button>
      </div>
    </div>
  );
};