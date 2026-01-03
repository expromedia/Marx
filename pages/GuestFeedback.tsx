
import React, { useState, useMemo } from 'react';
import { MOCK_FEEDBACK, MOCK_ROOMS } from '../constants';
import { FeedbackCategory, UserRole, User, Feedback } from '../types';
import { 
  Star, 
  Filter, 
  MessageSquarePlus, 
  Search, 
  User as UserIcon, 
  Bed, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  ShieldCheck,
  X
} from 'lucide-react';

const FeedbackCard: React.FC<{ feedback: Feedback; onStatusChange?: (id: string, status: any) => void; isAdmin: boolean }> = ({ feedback, onStatusChange, isAdmin }) => {
  const getCategoryIcon = (category: FeedbackCategory) => {
    switch (category) {
      case FeedbackCategory.ROOM: return <Bed size={16} />;
      case FeedbackCategory.STAFF: return <UserIcon size={16} />;
      case FeedbackCategory.SERVICE: return <Briefcase size={16} />;
      default: return <MessageSquarePlus size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-sky-100 text-sky-600 dark:bg-sky-900/20';
      case 'Reviewed': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/20';
      case 'Resolved': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-500">
            {feedback.guestName.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{feedback.guestName}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{feedback.date}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < feedback.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
          ))}
        </div>
      </div>

      <div className="mb-4 flex-grow">
        <div className="flex items-center text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-2">
          {getCategoryIcon(feedback.category)}
          <span className="ml-1.5">{feedback.category}</span>
          {feedback.roomNumber && <span className="ml-2 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">Room {feedback.roomNumber}</span>}
          {feedback.staffName && <span className="ml-2 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">Staff: {feedback.staffName}</span>}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
          "{feedback.comment}"
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(feedback.status)}`}>
          {feedback.status}
        </span>
        {isAdmin && feedback.status !== 'Resolved' && (
          <button 
            onClick={() => onStatusChange?.(feedback.id, 'Resolved')}
            className="text-sky-600 hover:text-sky-700 text-xs font-bold flex items-center"
          >
            <CheckCircle size={14} className="mr-1" /> Mark Resolved
          </button>
        )}
      </div>
    </div>
  );
};

const GuestFeedback: React.FC<{ user: User }> = ({ user }) => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(MOCK_FEEDBACK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterRating, setFilterRating] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [newFeedback, setNewFeedback] = useState({
    guestName: '',
    rating: 5,
    category: FeedbackCategory.SERVICE,
    comment: '',
    roomNumber: '',
    staffName: ''
  });

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const feedback: Feedback = {
      ...newFeedback,
      id: `f${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setFeedbackList([feedback, ...feedbackList]);
    setIsModalOpen(false);
    setNewFeedback({ guestName: '', rating: 5, category: FeedbackCategory.SERVICE, comment: '', roomNumber: '', staffName: '' });
  };

  const handleStatusChange = (id: string, status: 'New' | 'Reviewed' | 'Resolved') => {
    setFeedbackList(feedbackList.map(f => f.id === id ? { ...f, status } : f));
  };

  const filteredFeedback = useMemo(() => {
    return feedbackList.filter(f => {
      const matchesCategory = filterCategory === 'All' || f.category === filterCategory;
      const matchesRating = filterRating === 0 || f.rating === filterRating;
      const matchesSearch = f.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || f.comment.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesRating && matchesSearch;
    });
  }, [feedbackList, filterCategory, filterRating, searchTerm]);

  const stats = useMemo(() => {
    const avg = feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length;
    return {
      average: avg.toFixed(1),
      total: feedbackList.length,
      resolved: feedbackList.filter(f => f.status === 'Resolved').length
    };
  }, [feedbackList]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Guest Experiences</h2>
          <p className="text-slate-500">Monitor ratings and feedback to improve Grand Port services.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all shadow-lg shadow-sky-100 dark:shadow-none"
        >
          <MessageSquarePlus className="mr-2" size={20} />
          Submit Guest Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Average Rating</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{stats.average}</span>
            <Star className="text-amber-400 fill-amber-400" size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Reviews</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Resolved Issues</p>
          <p className="text-3xl font-bold text-emerald-500">{stats.resolved}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex-1 space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Reviews</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Guest name or comment keywords..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
        <div className="space-y-2 w-full md:w-48">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">All Categories</option>
            {Object.values(FeedbackCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="space-y-2 w-full md:w-48">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</label>
          <select 
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value={0}>All Ratings</option>
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeedback.map(f => (
          <FeedbackCard 
            key={f.id} 
            feedback={f} 
            isAdmin={user.role === UserRole.ADMIN} 
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-500">No feedback matches your current filters.</p>
        </div>
      )}

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <MessageSquarePlus className="mr-2 text-sky-500" />
                Record Guest Feedback
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddFeedback} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Guest Name</label>
                  <input 
                    required
                    type="text" 
                    value={newFeedback.guestName}
                    onChange={(e) => setNewFeedback({...newFeedback, guestName: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Rating (1-5)</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setNewFeedback({...newFeedback, rating: star})}
                        className={`p-2 rounded-lg transition-all ${newFeedback.rating >= star ? 'text-amber-400' : 'text-slate-200'}`}
                      >
                        <Star size={24} fill={newFeedback.rating >= star ? 'currentColor' : 'transparent'} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Category</label>
                  <select 
                    value={newFeedback.category}
                    onChange={(e) => setNewFeedback({...newFeedback, category: e.target.value as FeedbackCategory})}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {Object.values(FeedbackCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Room # (Opt)</label>
                  <input 
                    type="text" 
                    value={newFeedback.roomNumber}
                    onChange={(e) => setNewFeedback({...newFeedback, roomNumber: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g. 101"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Staff (Opt)</label>
                  <input 
                    type="text" 
                    value={newFeedback.staffName}
                    onChange={(e) => setNewFeedback({...newFeedback, staffName: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Staff name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Review Comments</label>
                <textarea 
                  required
                  rows={4}
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  placeholder="Tell us about the guest's experience..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-100 dark:shadow-none transition-all"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestFeedback;
