import { useState } from "react";
import { HighlightText } from "@/components/ui/highlight-text";
import { StickerCard } from "@/components/ui/sticker-card";
import { Eye, TrendingUp, Play, Loader2 } from "lucide-react";

const videoItems = [
  {
    id: "7343849809855433990",
    title: "YouNeedMie Viral",
    platform: "TikTok",
  },
  {
    id: "7574276966958877960",
    title: "NiceCoffee Daily",
    platform: "TikTok",
  },
  {
    id: "7548715732658359558",
    title: "NiceCoffee Series",
    platform: "TikTok",
  },
  {
    id: "7546136738557676806",
    title: "NiceCoffee Highlight",
    platform: "TikTok",
  },
  {
    id: "7441972332639374648",
    title: "YouNeedMie Promo",
    platform: "TikTok",
  },
  {
    id: "7569466570603334933",
    title: "YouNeedMie Event",
    platform: "TikTok",
  },
  {
    id: "7440347498767535415",
    title: "YouNeedMie BTS",
    platform: "TikTok",
  },
  {
    id: "7327067387352583429",
    title: "YouNeedMie Launch",
    platform: "TikTok",
  },
];

// Komponen Satuan Video untuk menangani logika Click-to-Load
function TikTokEmbed({ id, title }: { id: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = () => {
    setIsLoading(true);
    setIsPlaying(true);
  };

  return (
    <div className="relative aspect-[9/16] w-full h-full bg-black group cursor-pointer" onClick={!isPlaying ? handlePlay : undefined}>
      
      {!isPlaying ? (
        // --- TAMPILAN AWAL (Placeholder Ringan) ---
        <>
          {/* Background Gradient agar tidak hitam polos */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
          
          {/* Judul Sementara di tengah (Visual Placeholder) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 fill-white text-white ml-1" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground font-mono">Click to Load Video</p>
          </div>

          {/* Badge Watch */}
          <div className="absolute top-2 left-2 pointer-events-none z-10">
            <span className="flex items-center gap-1 px-2 py-1 bg-black/60 text-white border border-white/20 rounded-full text-[10px] font-mono backdrop-blur-md">
              <Eye className="w-3 h-3" />
              Preview
            </span>
          </div>
        </>
      ) : (
        // --- TAMPILAN SETELAH KLIK (Iframe Asli) ---
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-0">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          )}
          <iframe
            src={`https://www.tiktok.com/embed/v2/${id}?autoplay=1`} // autoplay=1 agar pas diklik lgsg jalan
            className="w-full h-full object-cover relative z-10"
            allowFullScreen
            scrolling="no"
            style={{ border: "none" }}
            title={title}
            onLoad={() => setIsLoading(false)}
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
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 bg-quaternary border-2 border-border rounded-full text-sm font-mono shadow-xs mb-6">
            Video Portfolio
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Konten yang <HighlightText variant="pink">viral</HighlightText> & berkesan
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Strategi konten kreatif yang terbukti menghasilkan angka nyata untuk pertumbuhan brand Anda.
          </p>

          {/* STATISTIK VIEW 500M+ */}
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
            <div className="h-8 w-[1px] bg-border mx-2 hidden md:block"></div>
             <div className="hidden md:flex flex-col text-left">
               <span className="text-xs text-muted-foreground">Organic & Ads</span>
               <span className="text-xs font-semibold">Across TikTok & IG</span>
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
              {/* Panggil Komponen Custom Embed di sini */}
              <TikTokEmbed id={video.id} title={video.title} />
              
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