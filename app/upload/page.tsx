import { UploadForm } from "@/components/books/upload-form";

export default function UploadPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl font-bold">Sell Your Book</h1>
        <p className="text-muted-foreground">
          Fill out the details below to list your book on the marketplace.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}
