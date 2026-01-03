
import React from 'react';
import { MOCK_RESERVATIONS } from '../constants';
import { Calendar, User, Hash, Clock, CheckCircle, MoreVertical } from 'lucide-react';

const Reservations: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Recent Reservations</h2>
          <p className="text-slate-500">Manage all guest bookings and status.</p>
        </div>
        <button className="bg-[#5B8FB1] hover:bg-[#4a7a99] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#5B8FB1]/10">
          + New Booking
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Guest</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Room</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Dates</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_RESERVATIONS.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#5B8FB1]/10 text-[#5B8FB1] flex items-center justify-center mr-3">
                        <User size={16} />
                      </div>
                      <span className="font-bold text-slate-900">{res.guestName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-slate-600">
                      <Hash size={16} className="mr-1.5 text-[#5B8FB1]" />
                      Room {res.roomId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-slate-500 font-medium">
                        <Calendar size={14} className="mr-1.5 text-[#5B8FB1]" />
                        In: {res.checkIn}
                      </div>
                      <div className="flex items-center text-xs text-slate-500 font-medium">
                        <Clock size={14} className="mr-1.5 text-[#5B8FB1]" />
                        Out: {res.checkOut}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      res.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      res.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
