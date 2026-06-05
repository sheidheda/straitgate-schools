'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import { General, School } from '@/lib/content';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ContactPageProps {
  general: General;
  schools: School[];
}

export default function ContactPage({ general, schools }: ContactPageProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
      if (!endpoint) {
        window.location.href = `mailto:${general.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
        setStatus('success');
        return;
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <FadeIn direction="left">
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  {status === 'success' && (
                    <p className="text-green-600 text-sm font-medium">Message sent successfully!</p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-600 text-sm font-medium">Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </FadeIn>

            {/* Contact info */}
            <FadeIn direction="right" delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {general?.address && (
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark">Address</h4>
                        <p className="text-gray-600 mt-1">{general.address}</p>
                      </div>
                    </div>
                  )}
                  {general?.phone && (
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <PhoneIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark">Phone</h4>
                        <a href={`tel:+234${general.phone.slice(1)}`} className="text-gray-600 mt-1 hover:text-primary transition-colors">
                          {general.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {general?.email && (
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <EnvelopeIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark">Email</h4>
                        <a href={`mailto:${general.email}`} className="text-gray-600 mt-1 hover:text-primary transition-colors">
                          {general.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Schools */}
                {schools.length > 0 && (
                  <div className="mt-10">
                    <h3 className="font-bold text-dark mb-4">Our Schools</h3>
                    <div className="space-y-3">
                      {schools.map((school) => (
                        <div key={school.id} className="bg-light rounded-xl p-4">
                          <h4 className="font-semibold text-dark text-sm">{school.name}</h4>
                          <p className="text-gray-500 text-xs mt-1">{school.address}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
