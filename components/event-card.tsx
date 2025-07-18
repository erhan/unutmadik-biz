"use client"

import { ExternalLink, Calendar, Tag, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/types/event"
import Link from "next/link"

interface EventCardProps {
  event: Event
  isDetailPage?: boolean
}

export default function EventCard({ event, isDetailPage = false }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTagColor = () => {
    return "bg-slate-600/30 text-slate-300 border-slate-500/30 hover:bg-slate-500/40 transition-colors"
  }

  const createSlug = (title: string) => {
    return title
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
  }

  const createTagSlug = (tag: string) => {
    return tag
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
  }

  const shareOnTwitter = () => {
    const eventUrl = `https://unutmadik.biz/olay/${createSlug(event.title)}`
    const text = `${event.title} - ${event.description.slice(0, 100)}... #Unutmadık`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(eventUrl)}`
    window.open(url, "_blank")
  }

  if (isDetailPage) {
    return (
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white leading-tight font-serif">{event.title}</h1>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">{formatDate(event.date)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Link key={index} href={`/etiket/${createTagSlug(tag)}`}>
                      <Badge variant="outline" className={getTagColor()}>
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed">{event.description}</p>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-slate-700">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Unutulmadı
                  </span>
                  <button
                    onClick={shareOnTwitter}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
                    title="Twitter'da paylaş"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Paylaş
                  </button>
                </div>
                <Button
                  variant="outline"
                  className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-200"
                  onClick={() => window.open(event.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Kaynağı Oku
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-500/30">
      <CardHeader className="pb-4">
        <div className="space-y-4">
          <Link href={`/olay/${createSlug(event.title)}`}>
            <h2 className="text-2xl font-bold text-white leading-tight hover:text-red-400 transition-colors cursor-pointer font-serif">
              {event.title}
            </h2>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <Link key={index} href={`/etiket/${createTagSlug(tag)}`}>
                  <Badge variant="outline" className={getTagColor()}>
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-slate-300 text-base leading-relaxed">{event.description}</p>

        <div className="flex justify-between items-center pt-4 border-t border-slate-700">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-sm text-slate-500">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Unutulmadı
            </span>
            <button
              onClick={shareOnTwitter}
              className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-400 transition-colors"
              title="Twitter'da paylaş"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Paylaş
            </button>
          </div>
          <Button
            variant="outline"
            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-200"
            onClick={() => window.open(event.url, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Kaynağı Oku
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
