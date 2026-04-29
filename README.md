# 📝 React Todo List Uygulaması

Modern, şık ve özellik dolu bir yapılacaklar listesi uygulaması. React 19, Tailwind CSS v4 ve Vite ile geliştirilmiştir.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🚀 Özellikler

### Temel İşlevler
- ✅ **Görev Ekleme** — Metin kutusuna yazıp "Ekle" butonuna tıklayın veya `Enter` tuşuna basın
- 🗑️ **Görev Silme** — Görevin üzerine gelince beliren çöp kutusu ikonuna tıklayın
- ☑️ **Tamamlandı İşaretleme** — Sol taraftaki yuvarlak butona tıklayarak görevi tamamlandı olarak işaretleyin
- ✏️ **Görev Düzenleme** — Görev metnine çift tıklayın veya kalem ikonuna tıklayın; `Enter` ile kaydedin, `Escape` ile iptal edin

### Gelişmiş Özellikler
- 🎯 **Öncelik Seviyeleri** — Her göreve Yüksek 🔴, Orta 🟡 veya Düşük 🟢 öncelik atayın
- 🔍 **Arama** — Görevler arasında anlık arama yapın
- 🗂️ **Filtreleme** — Tümü / Aktif / Tamamlanan sekmeleriyle görevleri filtreleyin
- 📊 **İlerleme Çubuğu** — Tamamlanan görevlerin yüzdesini görsel olarak takip edin
- 🌙 **Karanlık Mod** — Sağ üstteki 🌙/☀️ butonuyla açık/koyu tema arasında geçiş yapın
- 💾 **Yerel Depolama** — Görevler ve tema tercihi tarayıcıda otomatik kaydedilir; sayfa yenilenince kaybolmaz
- 🧹 **Toplu Temizleme** — Tüm tamamlanan görevleri tek tıkla silin

---

## 🛠️ Teknoloji Yığını

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| [React](https://react.dev) | 19 | UI bileşen kütüphanesi |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Utility-first CSS framework |
| [Vite](https://vitejs.dev) | 8 | Hızlı geliştirme sunucusu ve build aracı |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | 4 | Tailwind v4 Vite entegrasyonu |

---

## 📦 Kurulum

### Gereksinimler
- [Node.js](https://nodejs.org) v18 veya üzeri
- npm v9 veya üzeri

### Adımlar

```bash
# 1. Repoyu klonlayın
git clone https://github.com/balimogulkoc/to-do-list.git
cd to-do-list

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:5173](http://localhost:5173) adresini açın.

---

## 📜 Kullanılabilir Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusunu başlatır (hot reload ile) |
| `npm run build` | Üretim için optimize edilmiş build oluşturur |
| `npm run preview` | Build çıktısını yerel olarak önizler |
| `npm run lint` | ESLint ile kod kalitesini kontrol eder |

---

## 📁 Proje Yapısı

```
to-do-list/
├── public/
│   ├── favicon.svg          # Uygulama ikonu
│   └── icons.svg            # SVG ikon seti
├── src/
│   ├── App.jsx              # Ana uygulama bileşeni (tüm mantık burada)
│   ├── index.css            # Tailwind CSS importu + dark mode yapılandırması
│   └── main.jsx             # React uygulama giriş noktası
├── generate_app.py          # App.jsx üretici Python scripti
├── index.html               # HTML şablonu
├── vite.config.js           # Vite yapılandırması
├── eslint.config.js         # ESLint yapılandırması
├── package.json             # Proje bağımlılıkları ve scriptler
└── README.md                # Bu dosya
```

---

## 🎨 Tasarım Detayları

### Renk Paleti
- **Birincil**: Violet / Purple gradient (`violet-600` → `purple-600` → `indigo-600`)
- **Yüksek Öncelik**: Kırmızı (`red-100` / `red-600`)
- **Orta Öncelik**: Amber (`amber-100` / `amber-600`)
- **Düşük Öncelik**: Yeşil (`emerald-100` / `emerald-600`)

### Bileşen Mimarisi

```
App (ana state yönetimi)
├── PriorityBadge (öncelik rozeti)
└── TodoItem (tekil görev kartı)
    ├── Toggle butonu (tamamlandı işareti)
    ├── Düzenlenebilir metin alanı
    ├── PriorityBadge
    └── Aksiyon butonları (düzenle / sil)
```

### State Yönetimi
Uygulama React'ın yerleşik `useState` ve `useEffect` hook'larını kullanır:

| State | Tip | Açıklama |
|-------|-----|----------|
| `todos` | `Array` | Tüm görevlerin listesi (localStorage'dan başlatılır) |
| `inputValue` | `string` | Yeni görev metin kutusu değeri |
| `priority` | `'high' \| 'medium' \| 'low'` | Seçili öncelik seviyesi |
| `filter` | `'all' \| 'active' \| 'completed'` | Aktif filtre sekmesi |
| `search` | `string` | Arama sorgusu |
| `darkMode` | `boolean` | Karanlık mod durumu |

---

## 💡 Kullanım İpuçları

- **Hızlı ekleme**: Görev metnini yazıp `Enter` tuşuna basın
- **Düzenleme**: Görev metnine **çift tıklayın** veya kalem ikonuna tıklayın
- **Düzenlemeyi kaydetme**: `Enter` tuşuna basın veya başka bir yere tıklayın
- **Düzenlemeyi iptal etme**: `Escape` tuşuna basın
- **Önceliğe göre sıralama**: Görevler otomatik olarak Yüksek → Orta → Düşük sırasıyla listelenir
- **Veri kalıcılığı**: Tüm veriler `localStorage`'a kaydedilir; tarayıcıyı kapatıp açsanız bile görevleriniz kaybolmaz

---

## 🔧 Özelleştirme

### Yeni Öncelik Seviyesi Eklemek
`src/App.jsx` dosyasındaki `PRIORITIES` nesnesine yeni bir giriş ekleyin:

```js
const PRIORITIES = {
  // Mevcut seviyeler...
  urgent: {
    label: 'Acil',
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    border: 'border-orange-200',
    dot: 'bg-orange-500'
  },
}
```

### Varsayılan Görevleri Değiştirmek
`defaultTodos` dizisini düzenleyin:

```js
const defaultTodos = [
  { id: 1, text: 'Kendi göreviniz', completed: false, priority: 'high' },
  // ...
]
```

---

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun: `git checkout -b ozellik/yeni-ozellik`
3. Değişikliklerinizi commit edin: `git commit -m 'Yeni özellik eklendi'`
4. Branch'inizi push edin: `git push origin ozellik/yeni-ozellik`
5. Pull Request açın

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---


  React ❤️ Tailwind CSS ile yapıldı