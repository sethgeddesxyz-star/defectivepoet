import Link from "next/link";
import type { PoemCollection } from "@/data/poems";

interface CollectionCardProps {
  collection: PoemCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/poems/${collection.id}`}
      className="group block card-hover rounded-lg overflow-hidden bg-memorial-bg border border-gold-900/30 gold-focus"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={collection.coverImage}
          alt={`${collection.title} notebook cover`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-gold-300 text-lg transition-colors duration-300 group-hover:text-gold-200">
          {collection.title}
        </h3>
        <p className="text-gold-600 text-sm mt-1">
          {collection.pageCount} pages &middot; {collection.tableOfContents.length} poems
        </p>
      </div>
    </Link>
  );
}
