import React from 'react';
import { DOCTOR_DATA, APP_DOWNLOAD_QR } from '../constants';
import { Phone, MapPin, Navigation, Share2 } from 'lucide-react';
import { Button } from '../components/Button';

export const ContactView: React.FC = () => {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3343.8166549249053!2d74.07590867568565!3d32.57688229864239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1b0a40000001%3A0x123456789abc!2sIkram%20Hospital!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s";

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Contact & Location</h2>

      {/* Map Section */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        <iframe 
            src={mapSrc} 
            width="100%" 
            height="200" 
            style={{border:0}} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic Location"
        ></iframe>
        <div className="p-4">
            <h3 className="font-bold text-slate-900">{DOCTOR_DATA.hospital}</h3>
            <p className="text-slate-500 text-sm mb-3">{DOCTOR_DATA.address}</p>
            <Button 
                fullWidth 
                variant="outline" 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DOCTOR_DATA.address)}`)}
            >
                <Navigation size={18} /> Get Directions
            </Button>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="space-y-3">
          <h3 className="font-bold text-slate-800 text-lg">Direct Lines</h3>
          <a href={`tel:${DOCTOR_DATA.phoneMobile}`} className="block bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600"><Phone size={20} /></div>
                  <div>
                      <p className="font-medium text-slate-900">Mobile</p>
                      <p className="text-sm text-slate-500">{DOCTOR_DATA.phoneMobile}</p>
                  </div>
              </div>
              <span className="text-primary-600 text-sm font-bold">Call</span>
          </a>

          {DOCTOR_DATA.phoneLandline.map((num, idx) => (
             <a key={idx} href={`tel:${num}`} className="block bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Phone size={20} /></div>
                    <div>
                        <p className="font-medium text-slate-900">Reception {idx + 1}</p>
                        <p className="text-sm text-slate-500">{num}</p>
                    </div>
                </div>
                <span className="text-primary-600 text-sm font-bold">Call</span>
             </a>
          ))}
      </div>

      {/* QR Code Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Share this App</h3>
              <p className="text-slate-300 text-sm mb-4">Let others scan this code to download or book appointments.</p>
              <div className="bg-white p-2 rounded-xl inline-block">
                 <img src={APP_DOWNLOAD_QR} alt="App QR" className="w-32 h-32" />
              </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
              <Share2 size={120} />
          </div>
      </div>
    </div>
  );
};