"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Liste déroulante entièrement personnalisée (aucune UI native du
 * navigateur) — pattern listbox ARIA : ouverture clavier, navigation
 * flèches / Début / Fin, sélection Entrée ou clic, fermeture Échap /
 * Tab / clic extérieur.
 */

type SelectProps = {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
};

export function Select({
  name,
  label,
  options,
  value,
  onChange,
  placeholder = "Sélectionner",
  error,
  required,
}: SelectProps) {
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
      if (OPEN_KEYS.has(event.key)) {
        event.preventDefault();
        setActiveIndex(Math.max(0, options.indexOf(value)));
        setOpen(true);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }

    const next = applyListKey(event.key, activeIndex, options.length);
    if (next === null) return;
    event.preventDefault();
    if (next === SELECT_ACTION) {
      if (activeIndex >= 0) commit(activeIndex);
    } else {
      setActiveIndex(next);
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
          <Chevron open={open} />
        </button>

        {open ? (
          <SelectList
            listId={listId}
            options={options}
            value={value}
            activeIndex={activeIndex}
            onHover={setActiveIndex}
            onSelect={commit}
            listRef={listRef}
          />
        ) : null}
      </div>

      {error ? <SelectError>{error}</SelectError> : null}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
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
  );
}

function CheckIcon() {
  return (
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
  );
}

function SelectError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-xs text-[#b4432f]">
      {children}
    </p>
  );
}

/* --- Logique clavier pure (testable isolément) --- */

const OPEN_KEYS = new Set(["Enter", " ", "ArrowDown", "ArrowUp"]);

/** Action spéciale : valider l'option active. */
const SELECT_ACTION = "commit";

/** Traduit une touche en nouvel index, en action de sélection, ou rien. */
function applyListKey(
  key: string,
  current: number,
  count: number
): number | "commit" | null {
  switch (key) {
    case "ArrowDown":
      return Math.min(count - 1, current + 1);
    case "ArrowUp":
      return Math.max(0, current - 1);
    case "Home":
      return 0;
    case "End":
      return count - 1;
    case "Enter":
    case " ":
      return SELECT_ACTION;
    default:
      return null;
  }
}


/** Boîte d'options positionnée sous le déclencheur. */
function SelectList({
  listId,
  options,
  value,
  activeIndex,
  onHover,
  onSelect,
  listRef,
}: {
  listId: string;
  options: readonly string[];
  value: string;
  activeIndex: number;
  onHover: (index: number) => void;
  onSelect: (index: number) => void;
  listRef: React.RefObject<HTMLUListElement | null>;
}) {
  return (
    <ul
      ref={listRef}
      id={listId}
      role="listbox"
      aria-labelledby={`${listId}-trigger`}
      className="absolute inset-x-0 top-[calc(100%+0.4rem)] z-30 max-h-60 overflow-auto rounded-xl border border-roasted/15 bg-soft p-1.5 shadow-[0_18px_40px_-12px_rgba(18,13,10,0.35)]"
    >
      {options.map((option, i) => (
        <SelectOption
          key={option}
          id={`${listId}-option-${i}`}
          option={option}
          selected={option === value}
          active={i === activeIndex}
          onHover={() => onHover(i)}
          onSelect={() => onSelect(i)}
        />
      ))}
    </ul>
  );
}

function SelectOption({
  id,
  option,
  active,
  selected,
  onHover,
  onSelect,
}: {
  id: string;
  option: string;
  active: boolean;
  selected: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={selected}
      onMouseEnter={onHover}
      onClick={onSelect}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-sm transition-colors",
        active && "bg-gold/15",
        selected ? "font-semibold text-espresso" : "text-espresso/85"
      )}
    >
      {option}
      {selected ? <CheckIcon /> : null}
    </li>
  );
}
