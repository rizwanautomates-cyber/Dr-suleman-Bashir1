import React from 'react';
import { ViewState } from '../types';
import { Home, Calendar, Phone, User, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: ViewState.HOME, label: 'Home', icon: Home },
    { view: ViewState.BOOKING, label: 'Book', icon: Calendar },
    { view: ViewState.APPOINTMENTS, label: 'My Appts', icon: User },
    { view: ViewState.CONTACT, label: 'Contact', icon: Phone },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe pt-2 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
