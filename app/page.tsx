import Link from 'next/link';
import { BookFeed } from '@/components/books/book-feed';
import SearchBar from '@/components/shared/search-bar';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';

type HomePageProps = {
  searchParams: {
    q?: string;
  };
};

export default function Home({ searchParams }: HomePageProps) {
  const searchQuery = searchParams.q || '';

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
          Welcome to Tarvee
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your one-stop marketplace for Computer Science books and notes. Find, buy, and sell educational materials with ease.
        </p>
        <div className="max-w-xl mx-auto pt-4">
          <SearchBar />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button asChild key={category.slug} variant="outline">
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Recently Added Books'}
        </h2>
        <BookFeed search={searchQuery} />
      </section>
    </div>
  );
}
