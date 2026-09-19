import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import API from '../services/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');
    try {
      const { data } = await API.post('/contact', formData);
      setSuccessMsg(data.message || 'Thank you! Message submitted successfully.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Get In Touch</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">Contact Kick Home Care</h1>
        <p className="text-xs text-slate-500 mt-2">Have a product query, order question, or dealership request? We are here to help!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><MapPin className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Head Office</h4>
              <p className="text-xs text-slate-500 mt-1">First Floor 1-F Block, Main Gulshan-e-Ravi, Lahore, Pakistan</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Phone className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Phone & WhatsApp</h4>
              <p className="text-xs text-slate-500 mt-1">+92 321 000 9008</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Mail className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Email Address</h4>
              <p className="text-xs text-slate-500 mt-1">info@kickhomecare.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-2">Send Us a Message</h3>

            {successMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
              <textarea rows={4} name="message" value={formData.message} onChange={handleChange} required className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500" />
            </div>

            <button type="submit" disabled={submitting} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all">
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
