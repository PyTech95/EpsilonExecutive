import React, { useEffect, useState } from 'react';
import { Mail, Send, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from './api';

export default function EmailSettings() {
  const [enabled, setEnabled] = useState(false);
  const [recipients, setRecipients] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [toast, setToast] = useState(null);
  const [fullCfg, setFullCfg] = useState(null);

  useEffect(() => {
    api.getEmailSettings()
      .then((d) => {
        setEnabled(!!d.enabled);
        setRecipients(d.recipients || '');
        setFullCfg(d);
      })
      .finally(() => setLoading(false));
  }, []);

  const flash = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const onSave = async () => {
    setSaving(true);
    try {
      await api.putEmailSettings({
        enabled,
        recipients,
        smtpHost: fullCfg?.smtpHost || 'smtp.gmail.com',
        smtpPort: fullCfg?.smtpPort || 587,
        senderEmail: fullCfg?.senderEmail || '',
        appPassword: '', // empty preserves existing in backend
        fromName: fullCfg?.fromName || 'Epsilon Executive Education',
      });
      flash('success', 'Email notifications updated.');
    } catch (e) {
      flash('error', e?.response?.data?.detail || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const onTest = async () => {
    setTesting(true);
    try {
      const r = await api.testEmail();
      flash('success', `Test email sent to ${(r.to || []).join(', ')}.`);
    } catch (e) {
      flash('error', e?.response?.data?.detail || 'Test failed');
    } finally {
      setTesting(false);
    }
  };

  if (loading) return <p className="font-editorial text-navy/60 py-10 text-center">Loading…</p>;

  return (
    <div className="space-y-8" data-testid="email-settings-page">
      <header>
        <div className="flex items-center gap-3">
          <Mail className="text-gold" size={26} />
          <h1 className="font-display text-navy text-[2rem]">Email Notifications</h1>
        </div>
        <p className="font-editorial text-navy/70 mt-2 max-w-2xl">
          Receive every form submission (Apply, Contact, Brochure, Schedule, Corporate) on the email addresses below.
        </p>
      </header>

      {toast && (
        <div
          className={`flex items-start gap-3 p-4 border ${
            toast.type === 'success'
              ? 'bg-green-50 border-green-300 text-green-900'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
          data-testid="email-settings-toast"
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm">{toast.msg}</span>
        </div>
      )}

      <div className="bg-white border border-navy/10 p-8 space-y-6">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-4 h-4 accent-gold"
            data-testid="email-enabled-toggle"
          />
          <span className="font-display text-navy text-[1.1rem]">Enable email notifications</span>
        </label>

        <div>
          <label className="block font-caps text-[0.6rem] tracking-[0.24em] text-navy/75 mb-2">
            Recipient email IDs
          </label>
          <textarea
            rows={3}
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="admissions@epsilonexec.com, sales@epsilonexec.com"
            className="w-full border border-navy/15 px-3 py-2.5 font-sans text-sm focus:border-gold outline-none resize-none"
            data-testid="email-recipients-input"
          />
          <p className="font-sans text-xs text-navy/55 mt-1.5">
            Where notifications are sent. Separate multiple emails with commas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-navy/10">
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 bg-navy text-cream px-6 py-3 font-caps text-[0.7rem] tracking-[0.24em] hover:bg-navy-deep disabled:opacity-50"
            data-testid="email-save-btn"
          >
            <Save size={14} /> {saving ? 'Saving…' : 'Save Settings'}
          </button>
          <button
            onClick={onTest}
            disabled={testing}
            className="inline-flex items-center justify-center gap-2 border border-gold text-gold px-6 py-3 font-caps text-[0.7rem] tracking-[0.24em] hover:bg-gold hover:text-navy disabled:opacity-50"
            data-testid="email-test-btn"
          >
            <Send size={14} /> {testing ? 'Sending…' : 'Send Test Email'}
          </button>
        </div>
      </div>

      <div className="bg-bone border border-navy/10 p-6 text-sm text-navy/75 font-editorial leading-relaxed">
        <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold mb-3">How it works</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Every new submission (Apply, Contact, Brochure, Schedule, Corporate, Subscribe) triggers an email to the recipients above.</li>
          <li>The email contains all submitted fields, formatted as a readable summary.</li>
          <li>If a send fails, the submission is still saved — your data is never lost.</li>
        </ul>
      </div>
    </div>
  );
}
