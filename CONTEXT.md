# Personal portfolio

A public site for Aidan Jeon's work. Visitors read; nothing is authenticated.

## Language

**Site**:
The public identity of the portfolio: name, tagline, bio, and navigation.
_Avoid_: config, settings, brand

**Project**:
A piece of work shown on the site, identified by a slug.
_Avoid_: case study, post, item, card (a card is UI)

## Relationships

- The **Site** has many **Projects**
- A **Project** is reachable at `/projects/{slug}`

## Example dialogue

> **Dev:** "Should the home page have its own copy, or does it use the **Site** tagline?"
> **Domain expert:** "Home uses the **Site** identity. A **Project** only gets its own page when it has a slug."
