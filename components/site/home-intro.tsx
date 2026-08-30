import type { ReactNode } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { getUpdatedLabel } from "@/content/updated";
import { currentWork } from "@/content/work";

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

export async function HomeIntro() {
  const work = currentWork();
  const updatedLabel = await getUpdatedLabel();

  return (
    <div className="flex flex-1 flex-col">
      {updatedLabel ? (
        <p className="mb-6 text-[12.5px] text-date">{updatedLabel}</p>
      ) : null}
      <div className="space-y-[18px] text-[15px] leading-[1.6] text-mute">
        <p>
          I&apos;m a{" "}
          <TextLink href={site.softwareEngineering}>
            Software Engineering
          </TextLink>{" "}
          student at the{" "}
          <span className="font-semibold italic">University of Waterloo</span>
          , focused on agent infrastructure and dabbling into physical AI.
        </p>
        <p>
          Most recently built agents for regulated finance, changing the mortgage
          industry with{" "}
          <TextLink href={work.url} accent>
            <Image
              src={work.logo}
              alt=""
              width={16}
              height={16}
              unoptimized
              className="mr-1.5 inline-block size-[1em] rounded-[3px] object-contain align-[-0.15em]"
            />
            {work.company}
          </TextLink>{" "}
          in SF with great people!
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
          You can find me on <TextLink href={site.social.x.href}>X</TextLink>,{" "}
          <TextLink href={site.social.linkedin.href}>LinkedIn</TextLink>,{" "}
          <TextLink href={site.social.github.href}>GitHub</TextLink>, or reach me via{" "}
          <TextLink href={site.social.email.href}>email</TextLink>.
        </p>
      </div>
      <p className="flex flex-1 items-center justify-center text-[15px] leading-snug text-faint">
        <span aria-hidden="true" className="mr-2">
          ↳
        </span>
        A TUI portfolio is coming!
      </p>
    </div>
  );
}
