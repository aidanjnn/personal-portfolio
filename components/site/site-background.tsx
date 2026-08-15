import Image from "next/image";
import birds from "@/public/images/birds.jpg";

export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-[5vw] z-0 w-[min(60vw,560px)] select-none"
    >
      <Image
        src={birds}
        alt=""
        fill
        priority
        sizes="(max-width: 640px) 60vw, 560px"
        className="object-contain object-right opacity-25 mix-blend-multiply"
      />
    </div>
  );
}
