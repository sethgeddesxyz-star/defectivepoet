"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { photos } from "@/data/photos";

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const slides = photos.map((p) => ({
    src: `/gallery/photos/${p.filename}`,
    alt: p.alt,
  }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="group cursor-pointer overflow-hidden rounded-lg border border-gold-900/20 hover:border-gold-600/40 transition-colors card-hover gold-focus"
            onClick={() => setLightboxIndex(idx)}
            tabIndex={0}
            role="button"
            aria-label={`View ${photo.alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(idx);
              }
            }}
          >
            <img
              src={`/gallery/photos/${photo.filename}`}
              alt={photo.alt}
              className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </>
  );
}
