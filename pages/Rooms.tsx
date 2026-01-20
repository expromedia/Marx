
import React, { useState, useMemo } from 'react';
import { MOCK_ROOMS } from '../constants';
import { RoomType, RoomStatus } from '../types';
import { Search, Filter, Bed, Tag, Star, Activity } from 'lucide-react';

const Rooms: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => {
      const matchesSearch = room.number.includes(searchTerm) || room.amenities.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = selectedType === 'All' || room.type === selectedType;
      const matchesStatus = selectedStatus === 'All' || room.status === selectedStatus;
      const matchesPrice = room.price <= maxPrice;
      return matchesSearch && matchesType && matchesStatus && matchesPrice;
    });
  }, [searchTerm, selectedType, selectedStatus, maxPrice]);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-slate-950 dark:text-white tracking-tight transition-colors">Room Inventory</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by room number or amenities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#5B8FB1] outline-none transition-all text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Room Type</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-[#5B8FB1] text-sm font-medium text-slate-900 dark:text-white transition-colors"
            >
              <option value="All">All Types</option>
              {Object.values(RoomType).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-[#5B8FB1] text-sm font-medium text-slate-900 dark:text-white transition-colors"
            >
              <option value="All">All Status</option>
              {Object.values(RoomStatus).map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>

          <div className="space-y-1.5 w-full md:w-48">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Max Price</label>
              <span className="text-xs font-bold text-[#5B8FB1]">${maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="1000" 
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5B8FB1]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img src={room.image} alt={`Room ${room.number}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                  room.status === RoomStatus.AVAILABLE ? 'bg-emerald-500 text-white' :
                  room.status === RoomStatus.OCCUPIED ? 'bg-amber-500 text-white' :
                  'bg-slate-500 text-white'
                }`}>
                  {room.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">Room {room.number}</h3>
                <span className="text-[#5B8FB1] font-bold text-lg">${room.price}<span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/night</span></span>
              </div>
              
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-4 space-x-4">
                <div className="flex items-center">
                  <Bed size={16} className="mr-1.5 text-[#5B8FB1]" />
                  {room.type}
                </div>
                <div className="flex items-center">
                  <Activity size={16} className="mr-1.5 text-[#5B8FB1]" />
                  Floor {room.number.charAt(0)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {room.amenities.map(amenity => (
                  <span key={amenity} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase rounded tracking-wider">
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex space-x-2">
                <button className="flex-1 py-2.5 text-sm font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-900 dark:text-white">Details</button>
                <button className="flex-1 py-2.5 text-sm font-bold bg-[#5B8FB1] text-white hover:bg-[#4a7a99] rounded-lg transition-colors">Manage</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
