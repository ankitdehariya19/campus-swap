import { useState, useRef, useEffect } from "react";

interface Option {
  key: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  className = "",
  placeholder = "Select an option",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.key === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex h-11 w-full items-center justify-between gap-2.5 rounded-xl border px-3.5 
          text-sm font-medium transition-all duration-150 outline-none
          ${isOpen 
            ? "border-gray-600 ring-2 ring-white/10 bg-[#171717]" 
            : "border-[#262626] bg-[#171717] text-gray-400 hover:border-gray-500 hover:text-white"
          }
        `}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 text-gray-500 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-full min-w-[160px] overflow-hidden rounded-xl border border-[#262626] bg-[#171717] shadow-xl animate-in fade-in zoom-in duration-150">
          <div className="p-1.5 flex flex-col gap-0.5">
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  onChange(option.key);
                  setIsOpen(false);
                }}
                className={`
                  flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg 
                  transition-colors text-left
                  ${value === option.key
                    ? "bg-white text-black"
                    : "text-gray-400 hover:bg-[#262626] hover:text-white"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
