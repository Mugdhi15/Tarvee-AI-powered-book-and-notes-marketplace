import type { Timestamp } from 'firebase/firestore';

export interface Book {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'pre-loved';
  price: number;
  imageUrl: string;
  ownerId: string;
  createdAt: Timestamp;
}
