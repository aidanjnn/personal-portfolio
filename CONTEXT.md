# Personal portfolio

A public site for Aidan Jeon's work. Visitors read; nothing is authenticated.

## Language

**Site**:
The public identity of the portfolio: name, tagline, bio, navigation, and social.
_Avoid_: config, settings, brand

**Work**:
A role at an organization, shown on `/work`. Identified by company and year.
_Avoid_: WorkEntry, entry, experience, job, item

**Project**:
A piece of work shown on the site, identified by a slug.
_Avoid_: case study, post, item, card (a card is UI)

**Thought**:
A written note shown on `/thoughts`, identified by a slug.
_Avoid_: blog, post, article, item

**Intro**:
The opening paragraphs on the home page, written as styled spans so the same copy can be published in the **Portfolio snapshot**. A span may link somewhere.
_Avoid_: home copy, hero, bio (the **Site** bio is separate, shorter copy)

**Portfolio snapshot**:
The Site's public content as one JSON document at `/portfolio.json`, read by the terminal portfolio. Its shape is contract v2, defined by the terminal portfolio: its Rust loader (`Portfolio::from_json`) is the authority, and the JSON Schema at https://raw.githubusercontent.com/aidanjnn/personal-portfolio-ssh/main/content/portfolio.schema.json documents it.
_Avoid_: feed, API, dump

## Relationships

- The **Site** has many **Work**, many **Projects**, and many **Thoughts**
- **Work** is not a **Project**
- **Work** is ordered current-first; the first **Work** is the current role
- A **Project** has a page at `/projects/{slug}`
- Lists reach a **Project** through the Project module: its `url` when it has one, otherwise its page
- A **Thought** has a page at `/thoughts/{slug}`
- The **Portfolio snapshot** is built from the same content the pages render; it is never edited by hand, and every link in it is a full URL

## Example dialogue

> **Dev:** "Should the home page have its own copy, or does it use the **Site** tagline?"
> **Domain expert:** "Home uses the **Site** identity. Copperlane's url lives on **Work**, not on **Site** — home asks for the current **Work**."

> **Dev:** "Does every **Project** link to `/projects/{slug}`?"
> **Domain expert:** "It always has that page. The list uses the Project module's destination, which is the external url when the **Project** has one."

> **Dev:** "Is a **Thought** a **Project**?"
> **Domain expert:** "No. A **Thought** is a written note. It always has a page at `/thoughts/{slug}`."
