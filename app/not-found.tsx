import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="text-foreground/70">That page does not exist.</p>
      <p>
        <Link href="/" className="font-medium hover:underline">
          Back home
        </Link>
      </p>
    </div>
  );
}
