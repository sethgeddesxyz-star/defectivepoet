import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { poemCollections, getCollection } from "@/data/poems";
import NotebookViewer from "@/components/NotebookViewer";

export function generateStaticParams() {
  return poemCollections.map((c) => ({ collection: c.id }));
}

export function generateMetadata({ params }: { params: { collection: string } }) {
  const collection = getCollection(params.collection);
  if (!collection) return { title: "Not Found" };
  return {
    title: collection.title,
    description: `Browse ${collection.pageCount} pages of handwritten poetry from Zach Geddes' ${collection.title}.`,
  };
}

export default function PoemCollectionPage({
  params,
}: {
  params: { collection: string };
}) {
  const collection = getCollection(params.collection);

  if (!collection) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/poems"
        className="inline-flex items-center gap-1.5 text-gold-600 hover:text-gold-400 text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Poems
      </Link>

      <h1 className="text-3xl sm:text-4xl font-heading text-gold-400 mb-2">
        {collection.title}
      </h1>
      <p className="text-gold-600 text-sm mb-8">
        {collection.pageCount} pages &middot;{" "}
        {collection.tableOfContents.length} poems
      </p>

      <NotebookViewer collection={collection} />
    </div>
  );
}
