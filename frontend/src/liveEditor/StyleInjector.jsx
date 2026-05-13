import React, { useMemo } from 'react';
import { useEditMode } from './EditModeContext';

/** Map of supported style keys -> CSS property. */
const STYLE_MAP = {
  color: 'color',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  textAlign: 'text-align',
  fontStyle: 'font-style',
  letterSpacing: 'letter-spacing',
  lineHeight: 'line-height',
  backgroundColor: 'background-color',
};

function escapeCss(value) {
  return String(value).replace(/"/g, '\\"');
}

function ruleFor(path, style) {
  const decls = Object.entries(style || {})
    .map(([k, v]) => {
      const css = STYLE_MAP[k];
      if (!css || v == null || v === '') return null;
      return `${css}: ${v} !important;`;
    })
    .filter(Boolean)
    .join(' ');
  if (!decls) return '';
  return `[data-cms-path="${escapeCss(path)}"] { ${decls} }`;
}

/**
 * Injects a <style> tag that applies all saved per-element styles via
 * the [data-cms-path="..."] attribute selector. Mounted globally.
 */
export default function StyleInjector() {
  const { styles } = useEditMode();
  const css = useMemo(() => {
    return Object.entries(styles || {})
      .map(([path, style]) => ruleFor(path, style))
      .filter(Boolean)
      .join('\n');
  }, [styles]);
  if (!css) return null;
  return <style data-cms-styles="1">{css}</style>;
}
