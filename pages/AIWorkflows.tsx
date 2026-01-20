
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Play, CheckCircle2, Loader2, Mail, FileText, Send } from 'lucide-react';

const AIWorkflows: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<{title: string, content: string} | null>(null);

  const triggerCheckInAutomation = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a high-end, welcoming pre-arrival email for a guest named "John Wick" staying at Marx Hotel & Suites. 
      Include hotel features (Infinity Pool, Michelin Star Dining, Spa), check-in details (starts at 3 PM), and a call-to-action link for pre-check-in.
      Keep it professional but warm. Use modern formatting.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setOutput({
        title: 'Pre-arrival Email Generated (Automation Active)',
        content: response.text || 'Error generating email.'
      });
    } catch (e) {
      console.error(e);
      setOutput({
        title: 'Error',
        content: 'Failed to run AI workflow. Please check your API configuration.'
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerCheckOutAutomation = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a professional invoice summary and thank-you email for a guest named "Diana Prince" who just checked out of Marx Hotel & Suites.
      Include a polite request for feedback through a survey link. Ensure the tone is elegant and grateful.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setOutput({
        title: 'Check-out Summary & Feedback Request Generated',
        content: response.text || 'Error generating content.'
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center transition-colors">
          <Sparkles className="mr-2 text-[#5B8FB1]" />
          AI Workflow Automations
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Intelligent triggers to enhance guest experience and streamline operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B8FB1]/5 dark:bg-[#5B8FB1]/10 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-[#5B8FB1]/10 dark:bg-[#5B8FB1]/20 text-[#5B8FB1] rounded-2xl flex items-center justify-center mb-6 transition-colors">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Pre-arrival Automation</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Automatically triggers when a reservation status changes to 'Confirmed'. Sends personalized emails with hotel info and a pre-check-in link.
            </p>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6 transition-colors">
              <CheckCircle2 size={14} />
              <span>Status: Active</span>
            </div>
            <button 
              onClick={triggerCheckInAutomation}
              disabled={loading}
              className="w-full py-3 bg-[#5B8FB1] text-white rounded-xl font-bold flex items-center justify-center hover:bg-[#4a7a99] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Play className="mr-2" size={18} />}
              Test Run Automation
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B8FB1]/5 dark:bg-[#5B8FB1]/10 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-[#5B8FB1]/10 dark:bg-[#5B8FB1]/20 text-[#5B8FB1] rounded-2xl flex items-center justify-center mb-6 transition-colors">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Check-out Intelligence</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Triggers upon guest departure. Generates final invoice summary and sends a survey link to capture guest satisfaction in real-time.
            </p>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6 transition-colors">
              <CheckCircle2 size={14} />
              <span>Status: Active</span>
            </div>
            <button 
              onClick={triggerCheckOutAutomation}
              disabled={loading}
              className="w-full py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Send className="mr-2" size={18} />}
              Execute Workflow
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-[#5B8FB1]/20 dark:border-[#5B8FB1]/40 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
          <div className="bg-[#5B8FB1]/5 dark:bg-[#5B8FB1]/10 px-8 py-4 border-b border-[#5B8FB1]/10 dark:border-[#5B8FB1]/20 flex items-center justify-between transition-colors">
            <h4 className="font-bold text-[#5B8FB1]">{output.title}</h4>
            <button onClick={() => setOutput(null)} className="text-[#5B8FB1]/60 hover:text-[#5B8FB1] transition-colors">
              Dismiss
            </button>
          </div>
          <div className="p-8">
            <pre className="whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {output.content}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIWorkflows;
