"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DateRangePicker } from "./date-range-picker"
import type { DateRange } from "react-day-picker"

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
}

export default function Header({ searchTerm, onSearchChange, dateRange, onDateRangeChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Logo ve Slogan */}
          <div className="text-center relative">
            {/* GitHub Link - Sağ Üst */}
            <div className="absolute top-0 right-0">
              <a
                href="https://github.com/erhan/unutmadik-biz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Katkıda Bulun
              </a>
            </div>

            <div className="mb-4">
              <h1 className="text-4xl font-bold text-white font-serif">
                Unutmadık<span className="text-red-500">.biz</span>
              </h1>
              <p className="text-red-400 text-sm font-medium mt-1">Bizi Unutanlar İçin Hatırlatıyoruz</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto w-full">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Olay ara..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 h-12"
              />
            </div>

            {/* Date Range */}
            <div className="md:w-80">
              <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
