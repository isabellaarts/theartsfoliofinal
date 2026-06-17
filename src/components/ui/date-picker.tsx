import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string; // Expecting ISO string or yyyy-MM-dd
  onChange?: (date: string) => void;
}

export function DatePicker({
  name,
  placeholder = "Pick a date",
  required = false,
  className,
  value,
  onChange,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  React.useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    } else {
      setSelectedDate(undefined);
    }
  }, [value]);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (onChange && date) {
      onChange(format(date, "yyyy-MM-dd"));
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-4 py-6 text-sm font-normal text-left text-white/90 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 hover:bg-white/10 transition-colors",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <span>
              {selectedDate ? format(selectedDate, "PPP") : placeholder}
            </span>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-surface-2 border-white/10 shadow-glow rounded-2xl" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {/* Hidden input to submit the selected date inside standard HTML form elements */}
      <input
        type="hidden"
        name={name}
        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
        required={required}
      />
    </div>
  );
}
