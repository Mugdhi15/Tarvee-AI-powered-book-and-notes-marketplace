import Image from "next/image";
import type { Book } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(book.price);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
            <Image
                src={book.imageUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint="book cover"
            />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold leading-tight mb-1 truncate" title={book.title}>
          {book.title}
        </CardTitle>
        <CardDescription className="text-primary font-bold text-base">
          {formattedPrice}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant={book.condition === 'new' ? 'default' : 'secondary'} className="capitalize bg-accent text-accent-foreground">
          {book.condition.replace('-', ' ')}
        </Badge>
      </CardFooter>
    </Card>
  );
}
