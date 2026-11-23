# GeoHand: bug reports and release polish

## Why

Before public showings, learners need a way to say something went wrong, and the public site should not carry the developer's gesture test.

## Decided

- **Report a problem** sits in the Stuck? menu under Ask a question. It opens a form in the menu: "What went wrong?" (10 to 1,000 characters).
- Sent with it, and listed under the box: level, mouse or hands, the current view, what was running (explore, lesson, tour, mission, drill-in, intro), browser name and version, screen size. No camera images, screenshots or IP address.
- Reports go through `/api/ask` with `kind: 'bug'`, so they share the origin check, honeypot and rate limit (5 an hour, 20 a day, questions and reports together). They are stored in a separate `bugs` list. `npm run inbox -- --bugs` lists them.
- The `?debug` gesture test loads only in `npm run dev`; the production build leaves it out.
- After a question or report is sent, Send works again; an empty box cannot be sent.
- README: demo link, controls, camera privacy.

## Approaches

1. Reuse `/api/ask` with a kind (chosen): the tested checks apply as they are.
2. A separate endpoint: duplicates those checks.
3. GitHub issues or an email link: the repo is private, learners need accounts, and an email link publishes the address.

## Non-goals

Screenshots, attachments, replies to reporters.
