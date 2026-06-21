/** @see {@link https://cva.style/docs class-variance-authority} */
import { cva } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";
import type { PropsWithChildren } from "react";
import { ChevronRight } from "lucide-react";

const settingRow = cva(
  "w-full flex items-center justify-between px-5 py-4 transition-colors duration-150",
  {
    variants: {
      border:      { true: "border-b border-gray-200", false: "" },
      interactive: { true: "cursor-pointer hover:bg-gray-50", false: "" },
    },
    defaultVariants: { border: true, interactive: false },
  }
);

interface SettingRowProps {
  icon: ElementType;
  label: string;
  onClick?: () => void;
  border?: boolean;
  danger?: boolean;
  right?: ReactNode;
}

export function SettingRow({ icon: Icon, label, onClick, border = true, danger = false, right }: SettingRowProps) {
  const colorClass = danger ? "text-red-400" : "text-black";

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      className={settingRow({ border, interactive: !!onClick })}
    >
      <div className="flex items-center gap-3">
        <Icon size={22} className={colorClass} />
        <span className={`text-sm font-medium ${colorClass}`}>{label}</span>
      </div>

      {right ?? <ChevronRight size={18} className="text-gray-400" />}
    </div>
  );
}

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 pt-2">
      {title}
    </p>
  );
}

interface ToggleProps {
  value: boolean;
  onToggle: () => void;
}

export function SettingsSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <>
      <SectionTitle title={title} />
      <div className="bg-white-app rounded-3xl divide-y divide-gray-200">
        {children}
      </div>
    </>
  );
}

export function Toggle({ value, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${value ? "bg-primary" : "bg-gray-300"}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}
