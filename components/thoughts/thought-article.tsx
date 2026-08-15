import type { Thought, ThoughtItem } from "@/content/thoughts";

function ItemText({ item }: { item: ThoughtItem }) {
  if (!item.href) {
    return item.text;
  }

  return (
    <>
      {item.text}{" "}
      <a
        href={item.href}
        className="underline decoration-decoration underline-offset-2 hover:decoration-faint"
        target="_blank"
        rel="noreferrer"
      >
        {item.href.replace(/^https?:\/\//, "")}
      </a>
    </>
  );
}

export function ThoughtArticle({ thought }: { thought: Thought }) {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="text-[12.5px] text-date">{thought.year}</p>
        <h1 className="text-[26px] font-bold tracking-[-0.01em] text-ink">
          {thought.title}
        </h1>
        <p className="text-[15px] leading-[1.6] text-pretty text-mute">
          {thought.subtitle}
        </p>
      </header>
      {thought.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="mb-3 text-[15px] font-semibold text-ink">
            {section.heading}
          </h2>
          <ul className="flex flex-col gap-1.5 pl-5">
            {section.items.map((item) => (
              <li
                key={item.text}
                className="text-[15px] leading-[1.6] text-mute"
              >
                <ItemText item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
