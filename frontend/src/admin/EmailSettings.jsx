import React, { useEffect, useState } from 'react';
import { Mail, Eye, EyeOff, Send, Save, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from './api';

const DEFAULTS = {
  enabled: false,
  smtpHost: 'smtp.gmail.com',
  smtpPort: 587,
  senderEmail: '',
  appPassword: '',
  recipients: '',
  fromName: 'Epsilon Executive Education',
};

export default function EmailSettings() {
  const [cfg, setCfg] = useState(DEFAULTS);
  const [passwordSet, setPasswordSet] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [toast, setToast] = useState(null); // { type, msg }

  useEffect(() => {
    api.getEmailSettings()
      .then((d) => {
        const { appPasswordSet, ...rest } = d;
        setCfg({ ...DEFAULTS, ...rest });
        setPasswordSet(!!appPasswordSet);
      })
      .finally(() => setLoading(false));
  }, []);

  const flash = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const onChange = (k, v) => setCfg((c) => ({ ...c, [k]: v }));

  const onSave = async () => {
    setSaving(true);
    try {
      await api.putEmailSettings(cfg);
      if (cfg.appPassword) setPasswordSet(true);
      setCfg((c) => ({ ...c, appPassword: '' }));
      flash('success', 'Email settings saved.');
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
          Automatically receive every form submission (Apply, Contact, Brochure, Schedule, Corporate) on your email.
          Configure your Gmail account below — use a Google <strong>App Password</strong>, not your regular login password.
        </p>
        <a
          href="https://myaccount.google.com/apppasswords"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 font-caps text-[0.65rem] tracking-[0.24em] text-gold hover:underline"
          data-testid="email-settings-help-link"
        >
          How to generate a Google App Password <ExternalLink size={12} />
        </a>
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
            checked={cfg.enabled}
            onChange={(e) => onChange('enabled', e.target.checked)}
            className="w-4 h-4 accent-gold"
            data-testid="email-enabled-toggle"
          />
          <span className="font-display text-navy text-[1.1rem]">Enable email notifications</span>
        </label>

        <Field label="Sender Gmail address" hint="The Gmail account that will send notifications.">
          <input
            type="email"
            value={cfg.senderEmail}
            onChange={(e) => onChange('senderEmail', e.target.value)}
            placeholder="you@gmail.com"
            className="w-full border border-navy/15 px-3 py-2.5 font-sans text-sm focus:border-gold outline-none"
            data-testid="email-sender-input"
          />
        </Field>

        <Field
          label="Google App Password"
          hint={passwordSet ? 'A password is currently saved. Leave blank to keep it. Enter a new one to replace it.' : '16-character app password from your Google account.'}
        >
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={cfg.appPassword}
              onChange={(e) => onChange('appPassword', e.target.value)}
              placeholder={passwordSet ? '••••••••••••••••' : 'xxxx xxxx xxxx xxxx'}
              className="w-full border border-navy/15 px-3 py-2.5 pr-10 font-sans text-sm focus:border-gold outline-none"
              autoComplete="new-password"
              data-testid="email-password-input"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-navy/60 hover:text-navy"
              data-testid="email-password-toggle"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        <Field label="Recipient email IDs" hint="Where to send the notifications. Separate multiple emails with commas.">
          <textarea
            rows={2}
            value={cfg.recipients}
            onChange={(e) => onChange('recipients', e.target.value)}
            placeholder="admin@epsilon.com, sales@epsilon.com"
            className="w-full border border-navy/15 px-3 py-2.5 font-sans text-sm focus:border-gold outline-none resize-none"
            data-testid="email-recipients-input"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="From name">
            <input
              value={cfg.fromName}
              onChange={(e) => onChange('fromName', e.target.value)}
              className="w-full border border-navy/15 px-3 py-2.5 font-sans text-sm focus:border-gold outline-none"
              data-testid="email-fromname-input"
            />
          </Field>
          <Field label="SMTP host">
            <input
              value={cfg.smtpHost}
              onChange={(e) => onChange('smtpHost', e.target.value)}
              className="w-full border border-navy/15 px-3 py-2.5 font-sans text-sm focus:border-gold outline-none"
              data-testid="email-host-input"
            />
          </Field>
          <Field label="SMTP port">
            <input
              type="number"
              value={cfg.smtpPort}
              onChange={(e) => onChange('smtpPort', parseInt(e.target.value, 10) || 587)}
              className="w-full border border-navy/15 px-3 py-2.5 font-sans text-sm focus:border-gold outline-none"
              data-testid="email-port-input"
            />
          </Field>
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
          <li>Use a dedicated Gmail account if possible. Generate an App Password from your Google account &rsaquo; Security &rsaquo; 2-Step Verification &rsaquo; App passwords.</li>
          <li>If a send fails (wrong password, network), the submission is still saved — your data is never lost.</li>
        </ul>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block font-caps text-[0.6rem] tracking-[0.24em] text-navy/75 mb-2">{label}</label>
      {children}
      {hint && <p className="font-sans text-xs text-navy/55 mt-1.5">{hint}</p>}
    </div>
  );
}
