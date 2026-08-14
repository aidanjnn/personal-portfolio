"use client";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-foreground/70">
        {error.digest
          ? `An unexpected error occurred. Reference: ${error.digest}`
          : "An unexpected error occurred."}
      </p>
      <p>
        <button
          type="button"
          onClick={() => retry()}
          className="font-medium hover:underline"
        >
          Try again
        </button>
      </p>
    </div>
  );
}
