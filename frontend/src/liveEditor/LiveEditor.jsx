import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useEditMode } from './EditModeContext';
import EditToolbar from './EditToolbar';

/**
 * DOM-based live editor overlay.
 *  - Active only when editMode is ON.
 *  - Scans live DOM for [data-cms-path] elements.
 *  - Adds hover outline + click selection.
 *  - Renders <EditToolbar> next to the active element.
 */
export default function LiveEditor() {
  const { editMode, styles } = useEditMode();
  const [active, setActive] = useState(null); // { el, path, type, rect }
  const [hoverRect, setHoverRect] = useState(null);
  const rafRef = useRef(0);

  const computeRect = (el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height };
  };

  const guessType = (el) => {
    if (el.dataset.cmsType) return el.dataset.cmsType;
    if (el.tagName === 'IMG') return 'image';
    return 'text';
  };

  // Re-position rectangles on scroll/resize
  useEffect(() => {
    if (!editMode || !active) return;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setActive((a) => a ? { ...a, rect: computeRect(a.el) } : a);
      });
    };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [editMode, active]);

  // Attach DOM-wide hover + click handlers
  useEffect(() => {
    if (!editMode) {
      setActive(null);
      setHoverRect(null);
      return;
    }

    const findEditable = (target) => {
      let el = target;
      while (el && el !== document.body) {
        if (el.dataset && el.dataset.cmsPath) return el;
        el = el.parentElement;
      }
      return null;
    };

    const onMove = (e) => {
      const el = findEditable(e.target);
      if (!el) { setHoverRect(null); return; }
      if (active && el === active.el) { setHoverRect(null); return; }
      setHoverRect(computeRect(el));
    };

    const onClick = (e) => {
      // Allow clicks inside toolbar to pass through
      if (e.target.closest('[data-live-editor-ui="1"]')) return;
      const el = findEditable(e.target);
      if (!el) { setActive(null); return; }
      // Prevent navigation only when clicking actual editable
      e.preventDefault();
      e.stopPropagation();
      setActive({ el, path: el.dataset.cmsPath, type: guessType(el), rect: computeRect(el) });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick, true);
    };
  }, [editMode, active]);

  // Close on Esc
  useEffect(() => {
    if (!editMode) return;
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [editMode]);

  if (!editMode) return null;

  const currentStyle = active ? (styles[active.path] || {}) : {};

  return (
    <>
      {/* Hover halo */}
      {hoverRect && (
        <div
          data-live-editor-ui="1"
          style={{
            position: 'absolute',
            top: hoverRect.top, left: hoverRect.left,
            width: hoverRect.width, height: hoverRect.height,
            border: '2px dashed rgba(201,162,39,0.85)',
            background: 'rgba(201,162,39,0.06)',
            zIndex: 9990, pointerEvents: 'none',
            transition: 'all 0.08s linear',
          }}
        />
      )}

      {/* Active selection halo */}
      {active && (
        <div
          data-live-editor-ui="1"
          style={{
            position: 'absolute',
            top: active.rect.top - 2, left: active.rect.left - 2,
            width: active.rect.width + 4, height: active.rect.height + 4,
            outline: '2px solid #c9a227',
            outlineOffset: '0px',
            background: 'transparent',
            zIndex: 9991, pointerEvents: 'none',
          }}
        />
      )}

      {active && (
        <EditToolbar
          key={active.path + (active.el === active.el ? '' : '')}
          target={active}
          currentStyle={currentStyle}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
