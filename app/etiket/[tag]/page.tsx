"use client"

import { notFound } from "next/navigation"
import { ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"
import type { Event } from "@/types/event"
import eventsData from "@/data/data.json"
import Link from "next/link"

interface TagPageProps {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: TagPageProps) {
  const events: Event[] = eventsData

  // Slug'dan tag'i geri çevir
  const tagSlug = params.tag
  const tagName = tagSlug
    .replace(/-/g, " ")
    .replace(/g/g, "ğ")
    .replace(/u/g, "ü")
    .replace(/s/g, "ş")
    .replace(/i/g, "ı")
    .replace(/o/g, "ö")
    .replace(/c/g, "ç")

  // Bu etikete sahip olayları bul
  const taggedEvents = events.filter((event) =>
    event.tags.some((tag) => {
      const eventTagSlug = tag
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      return eventTagSlug === tagSlug
    }),
  )

  // Eğer bu etikete sahip olay yoksa 404
  if (taggedEvents.length === 0) {
    notFound()
  }

  // Tarihe göre sırala (en yeni önce)
  const sortedEvents = taggedEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Gerçek tag ismini bul
  const realTagName = events
    .flatMap((event) => event.tags)
    .find((tag) => {
      const eventTagSlug = tag
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      return eventTagSlug === tagSlug
    })

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/">
                <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ana Sayfaya Dön
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <Tag className="w-8 h-8 text-red-500" />
                <h1 className="text-4xl font-bold text-white font-serif">{realTagName || tagName}</h1>
              </div>
              <p className="text-slate-400 text-lg">
                Bu etikete sahip <span className="text-red-400 font-semibold">{sortedEvents.length}</span> olay bulundu
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Events */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sortedEvents.map((event, index) => (
              <div key={`${event.date}-${index}`} className="relative">
                {index > 0 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
                )}
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
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
