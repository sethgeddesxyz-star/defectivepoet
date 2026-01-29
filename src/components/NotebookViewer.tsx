"use client";

import { useState, useRef, useCallback, useEffect, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import type { PoemCollection } from "@/data/poems";
import TableOfContents from "./TableOfContents";

interface NotebookViewerProps {
  collection: PoemCollection;
}

interface PageProps {
  pageNum: number;
  folderName: string;
  title: string;
  onZoom: (idx: number) => void;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ pageNum, folderName, title, onZoom }, ref) => {
    return (
      <div
        ref={ref}
        className="page bg-memorial-surface/5 flex items-center justify-center relative cursor-pointer"
        onClick={() => onZoom(pageNum - 1)}
      >
        <img
          src={`/gallery/poems/${folderName}/${pageNum}.jpg`}
          alt={`${title} - Page ${pageNum}`}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 bg-memorial-bg/80 text-gold-500 text-xs px-2 py-0.5 rounded">
          {pageNum}
        </span>
      </div>
    );
  }
);
Page.displayName = "Page";

export default function NotebookViewer({ collection }: NotebookViewerProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<any>(null);

  const pages = Array.from({ length: collection.pageCount }, (_, i) => i + 1);

  const lightboxSlides = pages.map((n) => ({
    src: `/gallery/poems/${collection.folderName}/${n}-large.jpg`,
    alt: `${collection.title} - Page ${n}`,
  }));

  const handleNavigate = useCallback((pageNum: number) => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().turnToPage(pageNum - 1);
    }
  }, []);

  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const goToPrevPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    } else {
      setCurrentPage((p) => Math.max(0, p - 1));
    }
  }, []);

  const goToNextPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    } else {
      setCurrentPage((p) => Math.min(collection.pageCount - 1, p + 1));
    }
  }, [collection.pageCount]);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex >= 0) return; // lightbox handles its own keys
      if (e.key === "ArrowLeft") goToPrevPage();
      if (e.key === "ArrowRight") goToNextPage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goToPrevPage, goToNextPage]);

  return (
    <div>
      {/* Table of contents - horizontal dropdown at top */}
      <TableOfContents
        entries={collection.tableOfContents}
        onNavigate={handleNavigate}
      />

      {/* Flip book - full width */}
      <div className="relative">
        {/* Large side arrows */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 flex items-center justify-center bg-memorial-bg/90 text-gold-400 rounded-r-lg hover:bg-gold-900/60 hover:text-gold-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg"
          aria-label="Previous page"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= collection.pageCount - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 flex items-center justify-center bg-memorial-bg/90 text-gold-400 rounded-l-lg hover:bg-gold-900/60 hover:text-gold-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg"
          aria-label="Next page"
        >
          <ChevronRight size={32} />
        </button>

        {/* Desktop: Flip book — full width, taller */}
        <div className="hidden md:flex justify-center py-4 px-16">
          <HTMLFlipBook
            ref={flipBookRef}
            width={550}
            height={700}
            size="stretch"
            minWidth={400}
            maxWidth={700}
            minHeight={500}
            maxHeight={900}
            showCover={true}
            mobileScrollSupport={false}
            onFlip={handleFlip}
            className="shadow-2xl"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={600}
            usePortrait={false}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            disableFlipByClick={true}
            swipeDistance={30}
            clickEventForward={true}
            useMouseEvents={true}
          >
            {pages.map((n) => (
              <Page
                key={n}
                pageNum={n}
                folderName={collection.folderName}
                title={collection.title}
                onZoom={setLightboxIndex}
              />
            ))}
          </HTMLFlipBook>
        </div>

        {/* Mobile: single page with tap-to-zoom */}
        <div className="md:hidden px-14">
          <div
            className="relative aspect-[3/4] bg-memorial-surface/5 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setLightboxIndex(currentPage)}
          >
            <img
              src={`/gallery/poems/${collection.folderName}/${currentPage + 1}.jpg`}
              alt={`${collection.title} - Page ${currentPage + 1}`}
              className="w-full h-full object-contain"
            />
            <span className="absolute bottom-2 right-2 bg-memorial-bg/80 text-gold-500 text-xs px-2 py-0.5 rounded">
              {currentPage + 1} / {collection.pageCount}
            </span>
          </div>
        </div>
      </div>

      {/* Page indicator */}
      <div className="text-center mt-4 text-gold-600 text-sm">
        Page {currentPage + 1} of {collection.pageCount}
      </div>
      <p className="text-center mt-1 text-gold-700 text-xs">
        Click a page to zoom in. Use arrows or keyboard to flip.
      </p>

      {/* Lightbox with prominent back button */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          iconClose: () => null,
        }}
        toolbar={{
          buttons: [
            <button
              key="back"
              type="button"
              onClick={() => setLightboxIndex(-1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg"
              aria-label="Back to notebook"
            >
              <ArrowLeft size={18} />
              Back to Notebook
            </button>,
          ],
        }}
        styles={{
          container: { backgroundColor: "rgba(10, 10, 10, 0.95)" },
        }}
      />
    </div>
  );
}
