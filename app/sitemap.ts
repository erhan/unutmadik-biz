import type { MetadataRoute } from "next"
import eventsData from "@/data/data.json"
import type { Event } from "@/types/event"

const events: Event[] = eventsData

function createSlug(title: string): string {
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

function createTagSlug(tag: string): string {
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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://unutmadik.biz"

  // Ana sayfa
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  // Olay sayfaları
  events.forEach((event) => {
    routes.push({
      url: `${baseUrl}/olay/${createSlug(event.title)}`,
      lastModified: new Date(event.date),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  })

  // Etiket sayfaları
  const uniqueTags = Array.from(new Set(events.flatMap((event) => event.tags)))
  uniqueTags.forEach((tag) => {
    routes.push({
      url: `${baseUrl}/etiket/${createTagSlug(tag)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    })
  })

  return routes
}
