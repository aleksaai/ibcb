import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const photos = [
  "/gallery/photo-1.jpg",
  "/gallery/photo-2.jpg",
  "/gallery/photo-3.jpg",
  "/gallery/photo-4.jpg",
  "/gallery/photo-5.jpg",
  "/gallery/photo-6.jpg",
  "/gallery/photo-7.jpg",
  "/gallery/photo-8.jpg",
  "/gallery/photo-9.jpg",
  "/gallery/photo-10.jpg",
  "/gallery/photo-11.jpg",
  "/gallery/photo-12.jpg",
  "/gallery/photo-13.jpg",
  "/gallery/photo-14.jpg",
  "/gallery/photo-15.jpg",
  "/gallery/photo-16.jpg",
  "/gallery/photo-17.jpg",
  "/gallery/photo-18.jpg",
  "/gallery/photo-19.jpg",
  "/gallery/photo-20.jpg",
  "/gallery/photo-21.jpg",
  "/gallery/photo-22.jpg",
];

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="p-1 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Photo Gallery</h1>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-2xl mx-auto px-3 py-4">
        <div className="columns-2 gap-3 space-y-3">
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(src)}
              className="block w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow break-inside-avoid"
            >
              <img
                src={src}
                alt={`Community photo ${i + 1}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 bg-background/95 border-none">
          {selected && (
            <img
              src={selected}
              alt="Gallery photo"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
