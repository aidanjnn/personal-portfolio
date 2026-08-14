import type { ReactNode } from "react";
import { site } from "@/content/site";

function TextLink({
  href,
  children,
  accent = false,
}: {
  href: string;
  children: ReactNode;
  accent?: boolean;
}) {
  const external = !href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`underline decoration-decoration underline-offset-2 transition-colors duration-200 ease-[var(--ease)] hover:decoration-faint ${
        accent ? "font-semibold text-accent" : ""
      }`}
    >
      {children}
    </a>
  );
}

export function HomeIntro() {
  const social = Object.fromEntries(
    site.social.map((item) => [item.label, item.href]),
  );

  return (
    <div>
      <p className="mb-6 text-[12.5px] text-date">{site.updatedLabel}</p>
      <div className="space-y-[18px] text-[15px] leading-[1.6] text-mute">
        <p>
          I&apos;m a{" "}
          <TextLink href={site.links.softwareEngineering}>
            Software Engineering
          </TextLink>{" "}
          student at the{" "}
          <span className="font-semibold italic underline decoration-faint underline-offset-2">
            University of Waterloo
          </span>
          , focused on agent infrastructure and dabbling into physical AI.
        </p>
        <p>
          Currently building agents for regulated finance, changing the mortgage
          industry with{" "}
          <TextLink href={site.links.copperlane} accent>
            Copperlane (YC W26)
          </TextLink>{" "}
          in SF [with the best people, and true freedom of agency!!].
        </p>
        <p>
          Previously, I was the youngest ever engineering intern (15) at
          Vancouver&apos;s largest hospital. In this stage of my life, I{" "}
          <span className="font-semibold underline decoration-faint underline-offset-2">
            seek to achieve greatness
          </span>{" "}
          in every single thing I touch!
        </p>
        <p>
          I split my time across SF, Toronto, and Vancouver. Outside of work, I
          like long walks, football, and finding sunset views.
        </p>
        <p>
          You can find me on <TextLink href={social.X}>X</TextLink>,{" "}
          <TextLink href={social.LinkedIn}>LinkedIn</TextLink>, or reach me via{" "}
          <TextLink href={social.email}>email</TextLink>.
        </p>
      </div>
    </div>
  );
}
