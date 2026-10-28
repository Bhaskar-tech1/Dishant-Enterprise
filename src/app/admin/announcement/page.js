'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Megaphone, Save } from 'lucide-react';
import {
  ANNOUNCEMENT_BACKGROUNDS,
  ANNOUNCEMENT_TEXT_COLORS,
  DEFAULT_ANNOUNCEMENT,
  getAnnouncementColor,
  normalizeAnnouncement,
} from '@/config/announcement';

export default function AnnouncementAdminPage() {
  const router = useRouter();
  const [settings, setSettings] = useState(DEFAULT_ANNOUNCEMENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  useEffect(() => {
    let active = true;
    async function loadSettings() {
      try {
        const authResponse = await fetch('/api/admin/check', { cache: 'no-store' });
        const auth = await authResponse.json();
        if (!auth.authenticated) {
          router.replace('/admin/login');
          return;
        }
        const response = await fetch('/api/announcement', { cache: 'no-store' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load the announcement settings.');
        if (active) setSettings(normalizeAnnouncement(data));
      } catch (error) {
        if (active) setFeedback({ type: 'error', text: error.message || 'Could not load announcement settings.' });
      } finally {
        if (active) setLoading(false);
      }
    }
    loadSettings();
    return () => { active = false; };
  }, [router]);

  const previewStyle = useMemo(() => ({
    backgroundColor: getAnnouncementColor(ANNOUNCEMENT_BACKGROUNDS, settings.backgroundColor, '#07183d'),
    color: getAnnouncementColor(ANNOUNCEMENT_TEXT_COLORS, settings.textColor, '#fffaf2'),
  }), [settings.backgroundColor, settings.textColor]);

  function updateSetting(key, value) {
    setSettings((current) => ({ ...current, [key]: value }));
    setFeedback({ type: '', text: '' });
  }

  async function saveSettings() {
    setSaving(true);
    setFeedback({ type: '', text: '' });
    try {
      const response = await fetch('/api/announcement', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not save announcement settings.');
      setSettings(normalizeAnnouncement(data));
      setFeedback({ type: 'success', text: 'Announcement saved. It is now ready on your storefront.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Could not save announcement settings.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-root-layout announcement-manager-page">
      <header className="admin-nav-bar">
        <div className="admin-nav-left">
          <Link href="/" className="admin-brand" title="Go to storefront home" aria-label="Go to storefront home">
            <span className="admin-logo-circle">
              <Image src="https://res.cloudinary.com/sdca0kub/image/upload/f_auto,q_auto/v1793200507/dishanth-enterprise/assets/dishanth-logo.png" alt="Dishanth Enterprise" width={38} height={38} priority />
            </span>
            <div className="admin-brand-text">
              <h1 className="admin-brand-title">Dishanth Enterprise</h1>
              <span className="admin-brand-subtitle">Admin Portal</span>
            </div>
          </Link>
        </div>
        <Link href="/admin" className="admin-secondary-btn announcement-manager__back"><ArrowLeft size={16} />Dashboard</Link>
      </header>

      <main className="announcement-manager">
        <section className="announcement-manager__card" aria-busy={loading}>
          <div className="announcement-manager__heading">
            <span className="announcement-manager__icon"><Megaphone size={20} /></span>
            <div>
              <div className="announcement-manager__title-row">
                <h2>Announcement Bar</h2>
                <span className={`announcement-manager__status ${settings.enabled ? 'is-active' : ''}`}><i />{settings.enabled ? 'Active & visible' : 'Hidden'}</span>
              </div>
              <p>Display special offers or alerts at the top of your website.</p>
            </div>
          </div>

          {feedback.text && <p className={`announcement-manager__message is-${feedback.type}`} role="status">{feedback.text}</p>}
          <div className="announcement-manager__divider" />

          <label className="announcement-toggle">
            <input type="checkbox" checked={settings.enabled} onChange={(event) => updateSetting('enabled', event.target.checked)} disabled={loading} />
            <span aria-hidden="true" />
            <strong>Enable announcement bar</strong>
          </label>

          <label className="announcement-field">
            <span>Announcement message</span>
            <textarea value={settings.message} onChange={(event) => updateSetting('message', event.target.value.slice(0, 180))} maxLength={180} rows={2} disabled={loading} placeholder="Share a short update with your customers" />
            <small>{settings.message.length}/180 characters</small>
          </label>

          <div className="announcement-colors">
            <label className="announcement-field">
              <span>Background color</span>
              <select value={settings.backgroundColor} onChange={(event) => updateSetting('backgroundColor', event.target.value)} disabled={loading}>
                {ANNOUNCEMENT_BACKGROUNDS.map((color) => <option key={color.id} value={color.id}>{color.label}</option>)}
              </select>
              <div className="announcement-swatches" aria-label="Background colors">
                {ANNOUNCEMENT_BACKGROUNDS.map((color) => <button key={color.id} type="button" className={settings.backgroundColor === color.id ? 'is-selected' : ''} style={{ backgroundColor: color.value }} onClick={() => updateSetting('backgroundColor', color.id)} disabled={loading} aria-label={`Use ${color.label}`}>{settings.backgroundColor === color.id && <Check size={12} strokeWidth={2.5} />}</button>)}
              </div>
            </label>
            <label className="announcement-field">
              <span>Text color</span>
              <select value={settings.textColor} onChange={(event) => updateSetting('textColor', event.target.value)} disabled={loading}>
                {ANNOUNCEMENT_TEXT_COLORS.map((color) => <option key={color.id} value={color.id}>{color.label}</option>)}
              </select>
              <div className="announcement-swatches" aria-label="Text colors">
                {ANNOUNCEMENT_TEXT_COLORS.map((color) => <button key={color.id} type="button" className={settings.textColor === color.id ? 'is-selected' : ''} style={{ backgroundColor: color.value }} onClick={() => updateSetting('textColor', color.id)} disabled={loading} aria-label={`Use ${color.label}`}>{settings.textColor === color.id && <Check size={12} strokeWidth={2.5} />}</button>)}
              </div>
            </label>
          </div>

          <div className="announcement-preview">
            <span>Live preview</span>
            <div className="announcement-preview__bar" style={previewStyle}><Megaphone size={15} /><strong>{settings.message || DEFAULT_ANNOUNCEMENT.message}</strong></div>
          </div>

          <div className="announcement-manager__footer">
            <p><i />Updates are applied to the website header when you save.</p>
            <button type="button" className="announcement-save" onClick={saveSettings} disabled={saving || loading}><Save size={15} />{saving ? 'Saving…' : 'Save announcement'}</button>
          </div>
        </section>
      </main>
    </div>
  );
}
