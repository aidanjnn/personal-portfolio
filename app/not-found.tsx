import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[12.5px] text-date">404</p>
      <h1 className="text-[26px] font-bold tracking-[-0.01em] text-ink">
        Not found
      </h1>
      <p className="text-[15px] leading-[1.6] text-mute">
        That page does not exist.
      </p>
      <p>
        <Link
          href="/"
          className="underline decoration-decoration underline-offset-2 hover:decoration-faint"
        >
          Back home
        </Link>
      </p>
    </div>
  );
}
