import React, { useState } from 'react';
import { ViewState } from './types';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/Home';
import { BookingView } from './views/Booking';
import { MyAppointmentsView } from './views/MyAppointments';
import { ContactView } from './views/Contact';
import { AdminView } from './views/Admin';
import { AIAssistantView } from './views/AIAssistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomeView onNavigate={setCurrentView} />;
      case ViewState.BOOKING:
        return <BookingView onNavigate={setCurrentView} />;
      case ViewState.APPOINTMENTS:
        return <MyAppointmentsView onNavigate={setCurrentView} />;
      case ViewState.CONTACT:
        return <ContactView />;
      case ViewState.ADMIN:
        return <AdminView onNavigate={setCurrentView} />;
      case ViewState.AI_CHAT:
        return <AIAssistantView onNavigate={setCurrentView} />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl relative">
        {renderView()}
      </main>
      
      {/* Hide bottom nav on specific screens like Chat or Admin login if needed, but keeping it consistent for now */}
      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

export default App;