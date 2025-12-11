import type { Book } from "@/lib/types";
import { BookCard } from "./book-card";

type BookGridProps = {
  books: Book[];
};

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

// Add this to tailwind.config.ts if you want the animation
// keyframes: {
//   'fade-in': {
//     '0%': { opacity: '0' },
//     '100%': { opacity: '1' },
//   },
// },
// animation: {
//   'fade-in': 'fade-in 0.5s ease-in-out',
// },
