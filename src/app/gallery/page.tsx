import PhotoGallery from "@/components/PhotoGallery";

export const metadata = {
  title: "Gallery",
  description: "Photos of Christian Zachary Geddes.",
};

export default function GalleryPage() {
  return (
    <div className="page-container py-10">
      <h1 className="text-3xl sm:text-4xl font-heading text-gold-400 mb-8 animate-fade-in-up">
        Gallery
      </h1>
      <div className="animate-fade-in-up-delayed">
        <PhotoGallery />
      </div>
    </div>
  );
}
