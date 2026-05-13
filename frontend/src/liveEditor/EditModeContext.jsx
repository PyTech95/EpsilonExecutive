import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useAuth } from '../admin/AuthContext';
import { api } from '../admin/api';

const Ctx = createContext(null);

const PARAM_KEY = 'edit';

/**
 * Provider for the live frontend editor.
 *  - editMode is on when admin is logged in AND (toggle is on OR ?edit=true).
 *  - Holds the map of per-element styles (loaded once on mount).
 *  - Exposes save helpers for text/image/style updates that re-fetch nothing
 *    locally beyond the styles map (text/image refresh via SiteContent reload).
 */
export function EditModeProvider({ children }) {
  const { user } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [styles, setStyles] = useState({});
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // URL-driven edit override (?edit=true)
  const urlEdit = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get(PARAM_KEY) === 'true';

  const canEdit = !!user;
  const editMode = canEdit && (toggle || urlEdit);

  useEffect(() => {
    api.getElementStyles().then((s) => { setStyles(s || {}); setStylesLoaded(true); })
      .catch(() => setStylesLoaded(true));
  }, []);

  const refreshContent = useCallback(() => {
    setReloadKey((k) => k + 1);
    // Notify SiteContent to re-fetch
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('epsilon:content-changed'));
    }
  }, []);

  const saveText = useCallback(async (path, value) => {
    await api.patchHome(path, value);
    refreshContent();
  }, [refreshContent]);

  const saveImage = useCallback(async (path, urlValue) => {
    await api.patchHome(path, urlValue);
    refreshContent();
  }, [refreshContent]);

  const uploadAndSaveImage = useCallback(async (path, file) => {
    const res = await api.uploadImage(file);
    await api.patchHome(path, res.url);
    refreshContent();
    return res.url;
  }, [refreshContent]);

  const saveStyle = useCallback(async (path, style) => {
    await api.putElementStyle(path, style);
    setStyles((prev) => {
      const next = { ...prev };
      const cleaned = Object.fromEntries(
        Object.entries(style || {}).filter(([, v]) => v !== '' && v != null && v !== false)
      );
      if (Object.keys(cleaned).length === 0) delete next[path];
      else next[path] = cleaned;
      return next;
    });
  }, []);

  const value = useMemo(() => ({
    canEdit,
    editMode,
    toggle,
    setToggle,
    styles,
    stylesLoaded,
    reloadKey,
    saveText,
    saveImage,
    uploadAndSaveImage,
    saveStyle,
  }), [canEdit, editMode, toggle, styles, stylesLoaded, reloadKey, saveText, saveImage, uploadAndSaveImage, saveStyle]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useEditMode = () => useContext(Ctx) || {
  canEdit: false, editMode: false, styles: {}, stylesLoaded: true, reloadKey: 0,
};
