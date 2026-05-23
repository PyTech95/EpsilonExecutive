import React, { useEffect, useState } from 'react';
import { Mail, Send, Save, CheckCircle2, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { api } from './api';

const DEFAULTS = {
  enabled: false,
  smtpHost: 'smtp.gmail.com',
  smtpPort: 587,
  senderEmail: '',
  appPassword: '',
  fromName: 'Epsilon Executive Education',
  recipients: '',
};

export default function EmailSettings() {
  const [form, setForm] = useState(DEFAULTS);
  const [passwordSet, setPasswordSet] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.getEmailSettings()
      .then((d) => {
        setForm({
          enabled: !!d.enabled,
          smtpHost: d.smtpHost || DEFAULTS.smtpHost,
          smtpPort: d.smtpPort || DEFAULTS.smtpPort,
          senderEmail: d.senderEmail || '',
          appPassword: '',
          fromName: d.fromName || DEFAULTS.fromName,
          recipients: d.recipients || '',
        });
        setPasswordSet(!!d.appPasswordSet);
      })
      .finally(() => setLoading(false));
  }, []);

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked
      : (e.target.type === 'number' ? Number(e.target.value) : e.target.value);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const flash = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  };

  const onSave = async () => {
    setSaving(true);
    try {
      await api.putEmailSettings({
        enabled: form.enabled,
        smtpHost: form.smtpHost,
        smtpPort: Number(form.smtpPort) || 587,
        senderEmail: form.senderEmail.trim(),
        appPassword: form.appPassword, // empty preserves existing
        fromName: form.fromName,
        recipients: form.recipients,
      });
      // After save, clear the typed password and assume it's set
      if (form.appPassword) setPasswordSet(true);
      setForm((f) => ({ ...f, appPassword: '' }));
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
      flash('error', e?.response?.data?.detail || 'Test failed — check credentials & SMTP port.');
    } finally {
      setTesting(false);
    }
  };

  if (loading) return <p className="font-editorial text-navy/60 py-10 text-center">Loading…</p>;

  const inputCls = 'w-full border border-navy/15 px-3 py-2.5 font-sans text-sm focus:border-gold outline-none bg-white';
  const labelCls = 'block font-caps text-[0.6rem] tracking-[0.24em] text-navy/75 mb-2';
  const helpCls = 'font-sans text-xs text-navy/55 mt-1.5';

  return (
    <div className="space-y-8" data-testid="email-settings-page">
      <header>
        <div className="flex items-center gap-3">
          <Mail className="text-gold" size={26} />
          <h1 className="font-display text-navy text-[2rem]">Email Notifications</h1>
        </div>
        <p className="font-editorial text-navy/70 mt-2 max-w-2xl">
          Configure SMTP and choose where every form submission (Apply, Contact, Brochure, Schedule, Corporate, Subscribe, Popup) is emailed.
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
        {/* Enable toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={set('enabled')}
            className="w-4 h-4 accent-gold"
            data-testid="email-enabled-toggle"
          />
          <span className="font-display text-navy text-[1.1rem]">Enable email notifications</span>
        </label>

        {/* SMTP server */}
        <div className="border-t border-navy/10 pt-6">
          <p className="font-caps text-[0.65rem] tracking-[0.24em] text-gold mb-4">SMTP Server</p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-4">
            <div>
              <label className={labelCls}>SMTP Host</label>
              <input
                type="text"
                value={form.smtpHost}
                onChange={set('smtpHost')}
                placeholder="smtp.gmail.com"
                className={inputCls}
                data-testid="email-smtp-host"
              />
              <p className={helpCls}>e.g. <code>smtp.gmail.com</code>, <code>smtp.zoho.com</code>, <code>smtp.sendgrid.net</code></p>
            </div>
            <div>
              <label className={labelCls}>SMTP Port</label>
              <input
                type="number"
                value={form.smtpPort}
                onChange={set('smtpPort')}
                placeholder="587"
                className={inputCls}
                data-testid="email-smtp-port"
              />
              <p className={helpCls}>587 (TLS) or 465 (SSL)</p>
            </div>
          </div>
        </div>

        {/* Sender identity */}
        <div className="border-t border-navy/10 pt-6">
          <p className="font-caps text-[0.65rem] tracking-[0.24em] text-gold mb-4">Sender Account</p>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Sender Email</label>
              <input
                type="email"
                value={form.senderEmail}
                onChange={set('senderEmail')}
                placeholder="admissions@yourdomain.com"
                className={inputCls}
                autoComplete="off"
                data-testid="email-sender"
              />
              <p className={helpCls}>The Gmail / Workspace account that will send the notifications.</p>
            </div>
            <div>
              <label className={labelCls}>
                App Password
                {passwordSet && !form.appPassword && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[0.55rem] text-green-700 normal-case tracking-normal">
                    <ShieldCheck size={11} /> saved · leave blank to keep current
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.appPassword}
                  onChange={set('appPassword')}
                  placeholder={passwordSet ? '••••••••••••' : 'Paste your 16-char Gmail App Password'}
                  className={`${inputCls} pr-12`}
                  autoComplete="new-password"
                  data-testid="email-app-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-navy/45 hover:text-gold"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                  data-testid="email-app-password-toggle"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className={helpCls}>
                Generate at{' '}
                <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-gold underline">
                  myaccount.google.com/apppasswords
                </a>
                . 2-Step Verification must be enabled on the Google account.
              </p>
            </div>
            <div>
              <label className={labelCls}>From Name</label>
              <input
                type="text"
                value={form.fromName}
                onChange={set('fromName')}
                placeholder="Epsilon Executive Education"
                className={inputCls}
                data-testid="email-from-name"
              />
              <p className={helpCls}>Shown as the sender name in the recipient's inbox.</p>
            </div>
          </div>
        </div>

        {/* Recipients */}
        <div className="border-t border-navy/10 pt-6">
          <p className="font-caps text-[0.65rem] tracking-[0.24em] text-gold mb-4">Recipients</p>
          <label className={labelCls}>Recipient Email IDs</label>
          <textarea
            rows={3}
            value={form.recipients}
            onChange={set('recipients')}
            placeholder="admissions@epsilonexec.com, sales@epsilonexec.com"
            className={`${inputCls} resize-none`}
            data-testid="email-recipients-input"
          />
          <p className={helpCls}>Where notifications are sent. Separate multiple emails with commas.</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-navy/10">
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
          <li>Every new submission (Apply, Contact, Brochure, Schedule, Corporate, Subscribe, <strong>Popup</strong>) triggers an email to the recipients above.</li>
          <li>The email contains all submitted fields, formatted as a readable summary.</li>
          <li>If a send fails, the submission is still saved — your data is never lost. Open Submissions Inbox to retrieve it.</li>
          <li>For Gmail: enable 2-Step Verification on the sender account, then generate an App Password and paste it above.</li>
          <li>If your host blocks port 587, try 465 (SSL) or switch to a provider like SendGrid / Brevo / Zoho.</li>
        </ul>
      </div>
    </div>
  );
}
