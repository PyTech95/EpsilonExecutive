import React from 'react';
import { Pencil, X } from 'lucide-react';
import { useEditMode } from './EditModeContext';

/**
 * Floating bottom-right pill shown to logged-in admins on public pages.
 * Toggles edit mode on/off.
 */
export default function EditModeButton() {
  const { canEdit, editMode, toggle, setToggle } = useEditMode();
  if (!canEdit) return null;

  const onClick = () => setToggle(!toggle);

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="live-editor-toggle-btn"
      title={editMode ? 'Exit edit mode' : 'Edit this page'}
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '90px',
        zIndex: 9998,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '999px',
        background: editMode ? '#0b1733' : '#c9a227',
        color: editMode ? '#f5efe6' : '#0b1733',
        border: '2px solid #c9a227',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        cursor: 'pointer',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {editMode ? <X size={14} /> : <Pencil size={14} />}
      {editMode ? 'Exit Editor' : 'Edit Site'}
    </button>
  );
}
