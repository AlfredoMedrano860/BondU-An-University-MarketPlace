import { ChevronRight } from "lucide-react";
import type { SettingsItem } from "../data/SettingsItem";

interface SettingsGroupProps {
  items: SettingsItem[];
  darkMode?: boolean;
  onToggle?: () => void;
}

function SettingsGroup({ items, darkMode, onToggle }: SettingsGroupProps) {
  return (
    <div className="bg-white-app rounded-3xl overflow-hidden">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === items.length - 1;

        return (
          <div key={item.label} className={`w-full flex items-center justify-between px-5 py-4 ${!isLast ? "border-b border-beige" : ""}`}>
            <div className="flex items-center gap-3">
              <Icon size={22} className="text-black" />
              <span className="text-sm font-medium text-black">{item.label}</span>
            </div>

            {item.toggle ? (
              <button onClick={onToggle} className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${darkMode ? "bg-primary" : "bg-gray-300"}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${darkMode ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            ) : (
              <button onClick={item.onPress}>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SettingsGroup;