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

## Relationships

- The **Site** has many **Work** and many **Projects**
- **Work** is not a **Project**
- **Work** is ordered current-first; the first **Work** is the current role
- A **Project** has a page at `/projects/{slug}`
- Lists reach a **Project** through the Project module: its `url` when it has one, otherwise its page

## Example dialogue

> **Dev:** "Should the home page have its own copy, or does it use the **Site** tagline?"
> **Domain expert:** "Home uses the **Site** identity. Copperlane's url lives on **Work**, not on **Site** — home asks for the current **Work**."

> **Dev:** "Does every **Project** link to `/projects/{slug}`?"
> **Domain expert:** "It always has that page. The list uses the Project module's destination, which is the external url when the **Project** has one."
