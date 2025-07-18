# Unutmadık.biz

**Bizi Unutanlar İçin Hatırlatıyoruz**

Bu platform, son 25 yılda yaşanan trajik olayları unutmamak ve gelecek nesillere aktarmak amacıyla oluşturulmuştur.

🌐 **Website**: [unutmadik.biz](https://unutmadik.biz)

## 🛠️ Teknolojiler

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Deployment**: Vercel

## 🤝 Katkıda Bulunma

### Yeni Olay Ekleme

`data/data.json` dosyasını düzenleyerek yeni olay ekleyebilirsiniz:

\`\`\`json
{
  "date": "YYYY-MM-DD",
  "title": "Olay Başlığı",
  "description": "Detaylı ve objektif açıklama. Sadece gerçekleri içermeli.",
  "url": "https://güvenilir-haber-kaynağı.com",
  "tags": ["uygun", "etiketler"]
}
\`\`\`

### Veri Ekleme Kuralları
⚠️  PR göndermeden önce eklemek istediğiniz olayın zaten mevcut olmadığından emin olun
#### 📅 **Tarih (date)**
- Format: `YYYY-MM-DD`
- Örnek: `"2023-02-06"`

#### 📝 **Başlık (title)**
- Kısa ve açıklayıcı
- Objektif dil kullanın

#### 📖 **Açıklama (description)**
- Detaylı ama öz
- Objektif ve tarafsız
- Yorum içermemeli, sadece gerçekler

#### 🔗 **Kaynak URL (url)**
- Güvenilir haber kaynakları
- Resmi kurumların açıklamaları
- Wikipedia linkleri kabul edilir

### Pull Request Süreci

1. Repository'yi fork edin
2. **Mevcut olayları kontrol edin** (site üzerinde arama yapın)
3. `data/data.json` dosyasını düzenleyin
4. Pull Request oluşturun

---

*"Geçmişi hatırlamayanlar onu tekrarlamaya mahkumdur."*
