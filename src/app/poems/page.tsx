import { poemCollections } from "@/data/poems";
import { poemsIntro } from "@/data/siteContent";
import CollectionCard from "@/components/CollectionCard";

export const metadata = {
  title: "Poems",
  description:
    "Browse Zach Geddes' handwritten poetry collections — six notebooks of raw, unfiltered verse.",
};

export default function PoemsPage() {
  return (
    <div className="page-container py-10">
      <h1 className="text-3xl sm:text-4xl font-heading text-gold-400 mb-6 animate-fade-in-up">
        Poems
      </h1>

      <p className="text-gold-200 leading-relaxed mb-10 max-w-3xl animate-fade-in-up-delayed">
        {poemsIntro}
      </p>

      <p className="text-gold-500 text-sm mb-6 animate-fade-in-up-delayed-2">
        Click on any collection to read and zoom into the original handwritten pages.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up-delayed-3">
        {poemCollections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
