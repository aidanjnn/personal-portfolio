import type { ReactNode } from "react";
import Image from "next/image";
import { intro, type IntroSpan, type IntroStyle } from "@/content/intro";
import { getUpdatedLabel } from "@/content/updated";

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

const styleClass: Record<Exclude<IntroStyle, "plain">, string> = {
  strong: "font-semibold",
  emphasis: "font-semibold italic",
  accent: "font-semibold text-accent",
  highlight: "font-semibold underline decoration-faint underline-offset-2",
};

function IntroText({ span }: { span: IntroSpan }) {
  const accent = span.style === "accent";
  const content = span.logo ? (
    <>
      <Image
        src={span.logo}
        alt=""
        width={16}
        height={16}
        unoptimized
        className="mr-1.5 inline-block size-[1em] rounded-[3px] object-contain align-[-0.15em]"
      />
      {span.text}
    </>
  ) : (
    span.text
  );

  // An accent link takes its styling from TextLink, not a wrapper span.
  const styled =
    span.style === "plain" || (accent && span.url) ? (
      content
    ) : (
      <span className={styleClass[span.style]}>{content}</span>
    );

  return span.url ? (
    <TextLink href={span.url} accent={accent}>
      {styled}
    </TextLink>
  ) : (
    styled
  );
}

export async function HomeIntro() {
  const updatedLabel = await getUpdatedLabel();

  return (
    <div className="flex flex-1 flex-col">
      {updatedLabel ? (
        <p className="mb-8 text-[12.5px] text-date">{updatedLabel}</p>
      ) : null}
      <div className="space-y-8 text-[15px] leading-[1.75] text-mute">
        {intro.map((paragraph, p) => (
          <p key={p}>
            {paragraph.map((span, s) => (
              <IntroText key={s} span={span} />
            ))}
          </p>
        ))}
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
