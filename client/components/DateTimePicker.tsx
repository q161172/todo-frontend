import React from "react";
import ReactDatePicker from "react-datepicker";
import { vi } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  small?: boolean;
};

// Convert HTML datetime-local string -> Date
function parseInput(value: string): Date | null {
  if (!value) return null;
  // value like "2025-10-13T14:30"
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

// Convert Date -> ISO string to store/send
function formatOutput(date: Date | null): string {
  return date ? date.toISOString() : "";
}

export default function DateTimePicker({ value, onChange, className = "", inputClassName = "", placeholder = "Chọn ngày giờ...", small = false }: Props) {
  const selected = React.useMemo(() => {
    // Accept both ISO and datetime-local string
    const maybe = parseInput(value) || (value ? new Date(value) : null);
    return maybe && !isNaN(maybe.getTime()) ? maybe : null;
  }, [value]);

  return (
    <ReactDatePicker
      selected={selected}
      onChange={(date: Date | null) => onChange(formatOutput(date))}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="dd/MM/yyyy HH:mm"
      timeCaption="Giờ"
      locale={vi}
      placeholderText={placeholder}
      className={`${small ? "h-9 px-2" : "h-11 px-3"} w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputClassName}`}
      calendarClassName="!bg-white dark:!bg-slate-800"
      popperClassName="z-50"
      wrapperClassName={className}
    />
  );
}


