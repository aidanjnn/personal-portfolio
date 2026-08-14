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
      <h1 className="text-[26px] font-bold tracking-[-0.01em] text-ink">
        Something went wrong
      </h1>
      <p className="text-[15px] leading-[1.6] text-mute">
        {error.digest
          ? `An unexpected error occurred. Reference: ${error.digest}`
          : "An unexpected error occurred."}
      </p>
      <p>
        <button
          type="button"
          onClick={() => retry()}
          className="underline decoration-decoration underline-offset-2 hover:decoration-faint"
        >
          Try again
        </button>
      </p>
    </div>
  );
}
