"use client";

import { useMemo } from "react";
import type { Book } from "@/lib/types";
import { BookGrid } from "./book-grid";
import { DUMMY_BOOKS } from "@/lib/dummy-books";

type BookFeedProps = {
  search?: string;
  category?: string;
};

export function BookFeed({ search, category }: BookFeedProps) {
  const books = useMemo(() => {
    let filteredBooks = DUMMY_BOOKS;

    if (category) {
      filteredBooks = filteredBooks.filter(book => book.category === category);
    }
    
    if (search) {
      filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
    }

    return filteredBooks.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
  }, [category, search]);

  if (books.length === 0) {
    return <p className="text-center text-muted-foreground py-12">No books found. Try a different search or category!</p>;
  }

  return <BookGrid books={books} />;
}
