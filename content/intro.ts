import { site } from "./site";
import { currentWork } from "./work";

export type IntroStyle = "plain" | "strong" | "emphasis" | "accent" | "highlight";

export type IntroSpan = {
  text: string;
  style: IntroStyle;
  url?: string;
};

export type IntroParagraph = readonly IntroSpan[];

const work = currentWork();

export const intro: readonly IntroParagraph[] = [
  [
    { text: "I'm a ", style: "plain" },
    { text: "Software Engineering", style: "plain", url: site.softwareEngineering },
    { text: " student at the ", style: "plain" },
    { text: "University of Waterloo", style: "emphasis" },
    {
      text: ", focused on agent infrastructure and dabbling into physical AI.",
      style: "plain",
    },
  ],
  [
    {
      text: "Most recently built agents for regulated finance, changing the mortgage industry with ",
      style: "plain",
    },
    { text: work.company, style: "accent", url: work.url },
    { text: " in SF with great people!", style: "plain" },
  ],
  [
    {
      text: "Previously, I was the youngest ever engineering intern (15) at Vancouver's largest hospital. In this stage of my life, I ",
      style: "plain",
    },
    { text: "seek to achieve greatness", style: "highlight" },
    { text: " in every single thing I touch!", style: "plain" },
  ],
  [
    {
      text: "I split my time across SF, Toronto, and Vancouver. Outside of work, I like long walks, football, and finding sunset views.",
      style: "plain",
    },
  ],
  [
    {
      text: "Open to internships + full-time roles. You can find me on ",
      style: "plain",
    },
    { text: site.social.x.label, style: "plain", url: site.social.x.href },
    { text: ", ", style: "plain" },
    { text: site.social.linkedin.label, style: "plain", url: site.social.linkedin.href },
    { text: ", ", style: "plain" },
    { text: site.social.github.label, style: "plain", url: site.social.github.href },
    { text: ", or reach me via ", style: "plain" },
    { text: site.social.email.label, style: "plain", url: site.social.email.href },
    { text: ".", style: "plain" },
  ],
];
