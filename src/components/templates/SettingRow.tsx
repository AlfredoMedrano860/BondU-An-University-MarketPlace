import { ChevronRight } from "lucide-react";
// En proceso, hay que descomponer

interface SettingRowProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  border?: boolean;
  danger?: boolean;
  right?: React.ReactNode;
}

export function SettingRow({ icon: Icon, label, onClick, border = true, danger = false, right }: SettingRowProps) {
  const textClass = danger ? "text-red-400" : "text-black";
  const iconClass = danger ? "text-red-400" : "text-black";

  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-5 py-4 ${border ? "border-b border-beige" : ""}`}>
      <div className="flex items-center gap-3">
        <Icon size={22} className={iconClass} />
        <span className={`text-sm font-medium ${textClass}`}>{label}</span>
      </div>
      {right ?? <ChevronRight size={18} className="text-gray-400" />}
    </button>
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

export function Toggle({ value, onToggle }: ToggleProps) {
  return (
    <button onClick={onToggle} className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${value ? "bg-primary" : "bg-gray-300"}`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}