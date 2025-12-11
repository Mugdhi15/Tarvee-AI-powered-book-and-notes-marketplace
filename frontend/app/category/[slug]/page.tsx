import { BookFeed } from "@/components/books/book-feed";
import { CATEGORIES } from "@/lib/constants";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Category: <span className="text-primary">{category.name}</span>
        </h1>
      </section>
      <section>
        <BookFeed category={params.slug} />
      </section>
    </div>
  );
}
