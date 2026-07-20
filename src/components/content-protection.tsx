"use client";

import { useEffect } from "react";

/**
 * Soft content deterrents only — not real DRM.
 * Screenshots, DevTools, View Source (menu), and curl still work.
 * Editable fields (chat, forms) stay usable.
 */

const EDITABLE_SELECTOR =
  'input, textarea, select, [contenteditable=""], [contenteditable="true"]';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(EDITABLE_SELECTOR));
}

function isMediaOrProtectedDrag(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("img, video, picture, svg, canvas, a[href], [data-protect-media]"),
  );
}

export function ContentProtection() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("content-protection");

    const onContextMenu = (event: MouseEvent) => {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
    };

    const onCopyOrCut = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
    };

    const onDragStart = (event: DragEvent) => {
      if (isEditableTarget(event.target)) return;
      if (isMediaOrProtectedDrag(event.target)) {
        event.preventDefault();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const key = event.key.toLowerCase();
      const mod = event.metaKey || event.ctrlKey;
      if (!mod) return;

      // Copy / cut / select all / save / print / view-source (incl. ⌥⌘U)
      const blocked = new Set(["c", "x", "a", "s", "p", "u"]);
      if (blocked.has(key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const onBeforePrint = () => {
      root.classList.add("content-protection-print");
    };
    const onAfterPrint = () => {
      root.classList.remove("content-protection-print");
    };

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("copy", onCopyOrCut, true);
    document.addEventListener("cut", onCopyOrCut, true);
    document.addEventListener("dragstart", onDragStart, true);
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);

    return () => {
      root.classList.remove("content-protection", "content-protection-print");
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("copy", onCopyOrCut, true);
      document.removeEventListener("cut", onCopyOrCut, true);
      document.removeEventListener("dragstart", onDragStart, true);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
    };
  }, []);

  return null;
}
