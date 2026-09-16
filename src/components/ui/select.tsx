"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Liste déroulante entièrement personnalisée (aucune UI native du
 * navigateur) — pattern listbox ARIA : ouverture clavier, navigation
 * flèches / Début / Fin, sélection Entrée ou clic, fermeture Échap /
 * Tab / clic extérieur, annonce de la sélection.
 */
export function Select({
  name,
  label,
  options,
  value,
  onChange,
  placeholder = "Sélectionner",
  error,
  required,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const listId = `select-${name}-liste`;

  function openList() {
    setActiveIndex(Math.max(0, options.indexOf(value)));
    setOpen(true);
  }

  function commit(index: number) {
    onChange(options[index]);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (activeIndex >= 0) commit(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  // Fermeture au clic extérieur
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Le curseur suit l'option active
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current
      ?.querySelector(`#${CSS.escape(`${listId}-option-${activeIndex}`)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, listId]);

  return (
    <div ref={rootRef} className="flex flex-col gap-1.5">
      <span id={`${listId}-label`} className="text-sm font-medium text-espresso">
        {label}
        {required ? (
          <span className="ml-1 text-caramel" aria-hidden="true">
            *
          </span>
        ) : null}
      </span>

      <div className="relative">
        <button
          ref={triggerRef}
          id={`${listId}-trigger`}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-activedescendant={open ? `${listId}-option-${activeIndex}` : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={handleKeyDown}
          className={cn(
            "field flex items-center justify-between gap-3 text-left",
            !value && "text-roasted/45",
            error && "field-error"
          )}
        >
          <span className="truncate">{value || placeholder}</span>
          <svg
            className={cn(
              "size-4 shrink-0 text-caramel transition-transform duration-200",
              open && "rotate-180"
            )}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>

        {open ? (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={`${listId}-trigger`}
            className="absolute inset-x-0 top-[calc(100%+0.4rem)] z-30 max-h-60 overflow-auto rounded-xl border border-roasted/15 bg-soft p-1.5 shadow-[0_18px_40px_-12px_rgba(18,13,10,0.35)]"
          >
            {options.map((option, i) => {
              const selected = option === value;
              const active = i === activeIndex;
              return (
                <li
                  key={option}
                  id={`${listId}-option-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => commit(i)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-sm transition-colors",
                    active && "bg-gold/15",
                    selected ? "font-semibold text-espresso" : "text-espresso/85"
                  )}
                >
                  {option}
                  {selected ? (
                    <svg
                      className="size-3.5 shrink-0 text-caramel"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 8.5 6.5 12 13 4.5" />
                    </svg>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="text-xs text-[#b4432f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
