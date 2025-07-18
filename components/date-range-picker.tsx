"use client"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({ dateRange, onDateRangeChange, className }: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-slate-700 border-slate-600 text-white hover:bg-slate-600",
              !dateRange && "text-slate-400",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd MMM yyyy", { locale: tr })} -{" "}
                  {format(dateRange.to, "dd MMM yyyy", { locale: tr })}
                </>
              ) : (
                format(dateRange.from, "dd MMM yyyy", { locale: tr })
              )
            ) : (
              <span>Tarih aralığı seç</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
          <div className="p-3 border-b border-slate-700">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDateRangeChange(undefined)}
                className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
              >
                Temizle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDateRangeChange({ from: new Date(2000, 0, 1), to: new Date() })}
                className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
              >
                Tüm Zamanlar
              </Button>
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            locale={tr}
            className="bg-slate-800 text-white"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
