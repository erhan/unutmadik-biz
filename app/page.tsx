"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import type { DateRange } from "react-day-picker"
import Header from "@/components/header"
import EventCard from "@/components/event-card"
import type { Event } from "@/types/event"
import eventsData from "@/data/data.json"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2000, 0, 1),
    to: new Date(),
  })
  const [displayCount, setDisplayCount] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const events: Event[] = eventsData

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())

        let matchesDate = true
        if (dateRange?.from || dateRange?.to) {
          const eventDate = new Date(event.date)

          if (dateRange.from && dateRange.to) {
            matchesDate = eventDate >= dateRange.from && eventDate <= dateRange.to
          } else if (dateRange.from) {
            matchesDate = eventDate >= dateRange.from
          } else if (dateRange.to) {
            matchesDate = eventDate <= dateRange.to
          }
        }

        return matchesSearch && matchesDate
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [events, searchTerm, dateRange])

  const displayedEvents = filteredEvents.slice(0, displayCount)
  const hasMore = displayCount < filteredEvents.length

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((prev) => prev + 10)
      setIsLoading(false)
    }, 500)
  }, [isLoading, hasMore])

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMore()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadMore])

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(10)
  }, [searchTerm, dateRange])

  return (
    <div className="min-h-screen bg-slate-900">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-slate-400 text-xl mb-4">Arama kriterlerinize uygun olay bulunamadı.</div>
              <p className="text-slate-500">Farklı arama terimleri veya filtreler deneyebilirsiniz.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <p className="text-slate-400">
                  <span className="text-red-400 font-semibold">{filteredEvents.length}</span> olay bulundu
                  {dateRange?.from && dateRange?.to && (
                    <span className="ml-2 text-slate-500 text-sm">
                      ({dateRange.from.toLocaleDateString("tr-TR")} - {dateRange.to.toLocaleDateString("tr-TR")})
                    </span>
                  )}
                </p>
              </div>

              <div className="space-y-8">
                {displayedEvents.map((event, index) => (
                  <div key={`${event.date}-${index}`} className="relative">
                    {index > 0 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
                    )}
                    <EventCard event={event} />
                  </div>
                ))}
              </div>

              {/* Loading indicator */}
              {isLoading && (
                <div className="text-center mt-12">
                  <div className="inline-flex items-center gap-2 text-slate-400">
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-red-500 rounded-full animate-spin"></div>
                    Yükleniyor...
                  </div>
                </div>
              )}

              {/* End of results */}
              {!hasMore && displayedEvents.length > 0 && (
                <div className="text-center mt-12 py-8 border-t border-slate-700">
                  <p className="text-slate-500">Tüm olaylar gösterildi</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <p className="text-slate-300 font-medium font-serif">Unutmadık.biz</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="text-xs text-slate-500">"Geçmişi hatırlamayanlar onu tekrarlamaya mahkumdur."</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
