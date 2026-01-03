
import React from 'react';
import { MOCK_ROOMS } from '../constants';
import { RoomStatus } from '../types';
import { ClipboardList, CheckSquare, Wrench, Sparkles, RefreshCcw } from 'lucide-react';

const Housekeeping: React.FC = () => {
  const tasks = MOCK_ROOMS.filter(r => r.status === RoomStatus.CLEANING || r.status === RoomStatus.MAINTENANCE);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Staff Tasks</h2>
          <p className="text-slate-500">Current cleaning and maintenance requirements.</p>
        </div>
        <button className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
          <RefreshCcw size={20} className="text-[#5B8FB1]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(room => (
          <div key={room.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${room.status === RoomStatus.MAINTENANCE ? 'bg-rose-500' : 'bg-[#5B8FB1]'}`}></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Room {room.number}</h3>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mt-1">{room.type}</p>
              </div>
              <div className={`p-3 rounded-xl ${room.status === RoomStatus.MAINTENANCE ? 'bg-rose-50 text-rose-600' : 'bg-[#5B8FB1]/10 text-[#5B8FB1]'}`}>
                {room.status === RoomStatus.MAINTENANCE ? <Wrench size={24} /> : <Sparkles size={24} />}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-sm font-medium text-slate-600">
                <ClipboardList size={16} className="mr-2 text-[#5B8FB1]" />
                <span>Priority: <span className="text-rose-500">High</span></span>
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600">
                <CheckSquare size={16} className="mr-2 text-[#5B8FB1]" />
                <span>Assignee: Unassigned</span>
              </div>
            </div>

            <button className={`w-full mt-8 py-2.5 rounded-xl font-bold transition-all ${
              room.status === RoomStatus.MAINTENANCE 
                ? 'bg-slate-900 text-white hover:bg-slate-800' 
                : 'bg-[#5B8FB1] text-white hover:bg-[#4a7a99]'
            }`}>
              {room.status === RoomStatus.MAINTENANCE ? 'Update Maintenance' : 'Mark as Cleaned'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Housekeeping;
