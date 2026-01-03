
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Staff Tasks</h2>
          <p className="text-slate-500">Current cleaning and maintenance requirements.</p>
        </div>
        <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <RefreshCcw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(room => (
          <div key={room.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${room.status === RoomStatus.MAINTENANCE ? 'bg-rose-500' : 'bg-sky-500'}`}></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Room {room.number}</h3>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mt-1">{room.type}</p>
              </div>
              <div className={`p-3 rounded-xl ${room.status === RoomStatus.MAINTENANCE ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20' : 'bg-sky-50 text-sky-600 dark:bg-sky-900/20'}`}>
                {room.status === RoomStatus.MAINTENANCE ? <Wrench size={24} /> : <Sparkles size={24} />}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400">
                <ClipboardList size={16} className="mr-2" />
                <span>Priority: <span className="text-rose-500">High</span></span>
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400">
                <CheckSquare size={16} className="mr-2" />
                <span>Assignee: Unassigned</span>
              </div>
            </div>

            <button className={`w-full mt-8 py-2.5 rounded-xl font-bold transition-all ${
              room.status === RoomStatus.MAINTENANCE 
                ? 'bg-slate-900 text-white hover:bg-slate-800' 
                : 'bg-sky-500 text-white hover:bg-sky-600'
            }`}>
              {room.status === RoomStatus.MAINTENANCE ? 'Update Maintenance' : 'Mark as Cleaned'}
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <div className="text-sky-500 mb-4 inline-block"><CheckSquare size={48} /></div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Clear!</h3>
            <p className="text-slate-500">No rooms currently require cleaning or maintenance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Housekeeping;
