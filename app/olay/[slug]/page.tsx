import { notFound } from "next/navigation"
import EventCard from "@/components/event-card"
import eventsData from "@/data/data.json"
import type { Event } from "@/types/event"
import type { Metadata } from "next"

interface EventPageProps {
  params: {
    slug: string
  }
}

function createSlug(title: string) {
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

function findEventBySlug(slug: string): Event | null {
  const events: Event[] = eventsData
  return events.find((event) => createSlug(event.title) === slug) || null
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = findEventBySlug(params.slug)

  if (!event) {
    return {
      title: "Olay Bulunamadı - Unutmadık.biz",
      description: "Aradığınız olay bulunamadı.",
    }
  }

  const eventDate = new Date(event.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return {
    title: `${event.title} - Unutmadık.biz`,
    description: `${event.description.slice(0, 160)}...`,
    keywords: `${event.tags.join(", ")}, unutmadık, trajik olaylar, ${eventDate}`,
    openGraph: {
      title: `${event.title} - Unutmadık.biz`,
      description: event.description,
      type: "article",
      publishedTime: event.date,
      tags: event.tags,
      url: `https://unutmadik.biz/olay/${params.slug}`,
      siteName: "Unutmadık.biz",
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} - Unutmadık.biz`,
      description: event.description,
      site: "@unutmadikbiz",
    },
    alternates: {
      canonical: `https://unutmadik.biz/olay/${params.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const events: Event[] = eventsData
  return events.map((event) => ({
    slug: createSlug(event.title),
  }))
}

export default function EventPage({ params }: EventPageProps) {
  const event = findEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  return <EventCard event={event} isDetailPage={true} />
}
