"use client"; // Wajib karena kita menggunakan useEffect untuk fetch data

import { useState, useEffect } from "react";
import { HighlightText } from "@/components/ui/highlight-text";
import { StickerCard } from "@/components/ui/sticker-card";
import { Eye, TrendingUp, Play, Loader2, Image as ImageIcon } from "lucide-react";

// CUKUP MASUKKAN ID SAJA
// Tidak perlu link gambar manual lagi
const videoItems = [
  { id: "7343849809855433990", title: "YouNeedMie Viral" },
  { id: "7574276966958877960", title: "NiceCoffee Daily" },
  { id: "7548715732658359558", title: "NiceCoffee Series" },
  { id: "7546136738557676806", title: "NiceCoffee Highlight" },
  { id: "7441972332639374648", title: "YouNeedMie Promo" },
  { id: "7569466570603334933", title: "YouNeedMie Event" },
  { id: "7440347498767535415", title: "YouNeedMie BTS" },
  { id: "7327067387352583429", title: "YouNeedMie Launch" },
];

// --- KOMPONEN PINTAR (Fetch Otomatis) ---
function TikTokAutoEmbed({ id, title }: { id: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Efek: Ambil Sampul dari TikTok saat website dibuka
  useEffect(() => {
    async function fetchThumbnail() {
      try {
        // URL Video TikTok
        const tiktokUrl = `https://www.tiktok.com/video/${id}`;
        // API OEmbed TikTok (Resmi)
        const oembedUrl = `https://www.tiktok.com/oembed?url=${tiktokUrl}`;
        
        // Kita pakai Proxy 'AllOrigins' untuk menembus bloking CORS browser
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(oembedUrl)}`;

        const res = await fetch(proxyUrl);
        const data = await res.json();
        
        if (data.contents) {
          const tiktokData = JSON.parse(data.contents);
          setThumbnailUrl(tiktokData.thumbnail_url); // Dapat URL Sampul Otomatis!
        }
      } catch (error) {
        console.error("Gagal ambil sampul:", error);
      } finally {
        setIsImageLoading(false);
      }
    }

    fetchThumbnail();
  }, [id]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div 
      className="relative aspect-[9/16] w-full h-full bg-gray-900 group cursor-pointer overflow-hidden" 
      onClick={!isPlaying ? handlePlay : undefined}
    >
      
      {!isPlaying ? (
        // --- MODE 1: TAMPILKAN SAMPUL ---
        <>
          {/* Tampilkan Sampul jika sudah dapat fetch */}
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 animate-in fade-in duration-500"
            />
          ) : (
            // Skeleton Loading / Fallback jika gagal fetch
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
               {isImageLoading ? (
                 <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
               ) : (
                 <ImageIcon className="w-8 h-8 text-neutral-700" />
               )}
            </div>
          )}

          {/* Overlay Gelap */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          
          {/* Tombol Play */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Play className="w-6 h-6 fill-white text-white ml-1" />
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-widest text-white/80 font-semibold drop-shadow-md">
              Play Video
            </p>
          </div>

          {/* Badge */}
          <div className="absolute top-2 left-2 pointer-events-none z-10">
            <span className="flex items-center gap-1 px-2 py-1 bg-black/60 text-white border border-white/20 rounded-full text-[10px] font-mono backdrop-blur-md">
              <Eye className="w-3 h-3" />
              Preview
            </span>
          </div>
        </>
      ) : (
        // --- MODE 2: LOAD VIDEO (Hanya saat diklik) ---
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-black z-0">
             <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
          <iframe
            src={`https://www.tiktok.com/embed/v2/${id}?autoplay=1`}
            className="w-full h-full object-cover relative z-10"
            allowFullScreen
            scrolling="no"
            style={{ border: "none" }}
            title={title}
          ></iframe>
        </>
      )}
    </div>
  );
}

export function VideoPortfolioSection() {
  return (
    <section id="portofolio" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 bg-quaternary border-2 border-border rounded-full text-sm font-mono shadow-xs mb-6">
            Video Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Konten yang <HighlightText variant="pink">viral</HighlightText> & berkesan
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Strategi konten kreatif yang terbukti menghasilkan angka nyata.
          </p>

          <div className="inline-flex items-center gap-4 bg-white border-2 border-border px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Views</p>
              <p className="text-2xl md:text-3xl font-black font-sans text-foreground">
                500M<span className="text-blue-600">+</span>
              </p>
            </div>
          </div>
        </div>

        {/* Grid Video */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {videoItems.map((video) => (
            <StickerCard
              key={video.id}
              variant="default"
              className="group overflow-hidden p-0 border-2 border-border bg-black"
            >
              {/* Panggil komponen pintar kita */}
              <TikTokAutoEmbed id={video.id} title={video.title} />
              
              <div className="p-3 bg-card border-t border-border relative z-20">
                <h4 className="font-medium text-sm truncate text-center">{video.title}</h4>
              </div>
            </StickerCard>
          ))}
        </div>
      </div>
    </section>
  );
}