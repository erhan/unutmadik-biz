import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-500 font-serif">404</h1>
          <h2 className="text-2xl font-semibold text-white">Sayfa Bulunamadı</h2>
          <p className="text-slate-400 max-w-md mx-auto">Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t border-slate-700">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <p className="text-slate-300 font-medium">Unutmadık.biz</p>
          </div>
          <p className="text-slate-500 text-sm mt-2">Bizi Unutanlar İçin Hatırlatıyoruz</p>
        </div>
      </div>
    </div>
  )
}
