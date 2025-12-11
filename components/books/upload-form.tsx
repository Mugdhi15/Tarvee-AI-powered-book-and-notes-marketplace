"use client";

import { useRouter } from "next/navigation";
import { useUser, useFirestore, useAuth, addDocumentNonBlocking } from "@/firebase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CATEGORIES, CONDITIONS } from "@/lib/constants";
import { collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { Card, CardContent } from "../ui/card";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category: z.string({ required_error: "Please select a category." }),
  condition: z.enum(["new", "pre-loved"], {
    required_error: "You need to select a condition.",
  }),
  price: z.coerce.number().min(0.01, "Price must be a positive number."),
  image: z.instanceof(File).refine((file) => file.size > 0, "An image is required."),
});

export function UploadForm() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to sell a book.",
        variant: "destructive",
      });
      router.push("/");
    }
  }, [user, isUserLoading, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    setIsSubmitting(true);
    const storage = getStorage(auth.app);

    try {
      // 1. Upload image to Firebase Storage
      const imageRef = ref(storage, `books/${user.uid}/${Date.now()}_${values.image.name}`);
      const snapshot = await uploadBytes(imageRef, values.image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // 2. Add book data to Firestore
      addDocumentNonBlocking(collection(firestore, "books"), {
        ...values,
        imageUrl,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        image: null, // Don't store the file object in Firestore
      });

      toast({
        title: "Success!",
        description: "Your book has been listed for sale.",
      });
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Upload Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isUserLoading || !user) {
    return <Card className="p-8 text-center"><p className="text-muted-foreground">Loading...</p></Card>;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cracking the Coding Interview" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about the book's content and condition."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.slug} value={cat.slug}>
                            {cat.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                        <Input type="number" step="0.01" placeholder="29.99" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Condition</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-4"
                    >
                      {CONDITIONS.map((cond) => (
                        <FormItem
                          key={cond.value}
                          className="flex items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={cond.value} />
                          </FormControl>
                          <FormLabel className="font-normal">{cond.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    A clear picture of the book's cover works best.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Listing your book..." : "List My Book"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
