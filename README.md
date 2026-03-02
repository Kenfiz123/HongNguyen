# 💕 Love Page 8/3 — Trang web tình yêu cho ngày 8/3

## ✨ Tính năng

- 🌟 **Canvas animation** — Tim & sao trôi nổi trên nền đêm huyền ảo
- 💬 **Typewriter effect** — Chữ xuất hiện dần từng ký tự lãng mạn
- 🖱️ **Cursor trail** — Tim nhỏ theo dấu con trỏ chuột
- 💌 **Love letter** — Thư tình với hiệu ứng tiết lộ khi cuộn
- 📷 **Photo gallery** — Lưới ảnh với lightbox & hiệu ứng hover
- 🃏 **Flip cards** — Thẻ 3D lật để khám phá "Lý do anh yêu em"
- 🎵 **Music player** — Trình phát nhạc nổi với vinyl quay
- 🎊 **Fireworks** — Pháo hoa confetti khi bấm nút chúc mừng
- 📱 **Responsive** — Đẹp trên mọi thiết bị

---

## 🛠️ Cách tuỳ chỉnh

### 1. Thay tên & nội dung
- **`components/HeroSection.tsx`** — Thay `HER_NAME`, `MESSAGE`, `SUB_MESSAGE`
- **`components/LoveLetterSection.tsx`** — Sửa `LETTER_PARAGRAPHS[]` & `SENDER_NAME`
- **`components/ReasonsSection.tsx`** — Sửa mảng `REASONS[]`
- **`components/FinalSection.tsx`** — Sửa `FINAL_TITLE`, `FINAL_MESSAGE`, `LOVE_DECLARATION`

### 2. Thêm ảnh của bạn
1. Đặt ảnh vào thư mục `public/images/`
2. Mở `components/GallerySection.tsx`
3. Cập nhật mảng `PHOTOS[]`:
```ts
const PHOTOS = [
  {
    src: '/images/anh-cua-ban.jpg',   // Đường dẫn ảnh
    caption: 'Mô tả khoảnh khắc...',  // Caption
    width: 600, height: 800,          // Kích thước ảnh
  },
  // ...
]
```

### 3. Thêm nhạc nền
1. Đặt file nhạc vào `public/music/background.mp3`
2. Hoặc thay URL trong `components/MusicPlayer.tsx`:
```ts
const MUSIC_SRC = '/music/background.mp3'
const SONG_TITLE = 'Tên bài hát'
const SONG_ARTIST = 'Tên ca sĩ'
```

---

## 🚀 Deploy lên Vercel

### Cách 1: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Cách 2: GitHub + Vercel (khuyến nghị)
1. Push code lên GitHub:
```bash
git init
git add .
git commit -m "🎉 Love page 8/3"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/love-8-3.git
git push -u origin main
```

2. Vào [vercel.com](https://vercel.com) → **New Project** → chọn repo → **Deploy**

3. Sau vài giây bạn sẽ có URL như: `https://love-8-3.vercel.app`

---

## 💻 Chạy cục bộ

```bash
npm install
npm run dev
# Mở http://localhost:3000
```

---

Made with ❤️ · Next.js 15 · Framer Motion · Tailwind CSS
