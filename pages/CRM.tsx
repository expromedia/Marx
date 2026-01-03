
import React from 'react';
import { Users, Mail, Star, Phone, MapPin, Search } from 'lucide-react';

const CRM: React.FC = () => {
  const guests = [
    { id: 'g1', name: 'John Wick', email: 'john@continental.com', stays: 12, rating: 5, spent: '$12,400', location: 'New York, USA' },
    { id: 'g2', name: 'Diana Prince', email: 'diana@themyscira.gov', stays: 4, rating: 5, spent: '$8,200', location: 'London, UK' },
    { id: 'g3', name: 'Arthur Curry', email: 'king@atlantis.org', stays: 2, rating: 4, spent: '$3,100', location: 'Amnesty Bay, ME' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Guest Relationship Management</h2>
          <p className="text-slate-500">Monitor guest preferences and loyalty metrics.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search guests..." 
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-80 outline-none focus:ring-2 focus:ring-[#5B8FB1]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {guests.map(guest => (
          <div key={guest.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#5B8FB1]/10 text-[#5B8FB1] rounded-2xl flex items-center justify-center font-bold text-xl mr-4 border border-[#5B8FB1]/20">
                  {guest.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{guest.name}</h3>
                  <div className="flex items-center text-slate-500 text-xs mt-1 font-medium">
                    <Mail size={12} className="mr-1 text-[#5B8FB1]" />
                    {guest.email}
                  </div>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < guest.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Stays</p>
                <p className="text-lg font-bold text-slate-900">{guest.stays}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Spend</p>
                <p className="text-lg font-bold text-[#5B8FB1]">{guest.spent}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center text-xs text-slate-500 font-medium">
                <MapPin size={14} className="mr-1 text-[#5B8FB1]" />
                {guest.location}
              </div>
              <button className="text-[#5B8FB1] hover:text-[#4a7a99] font-bold text-xs">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRM;
