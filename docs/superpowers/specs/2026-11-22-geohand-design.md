# GeoHand: design

A hand-gesture (and mouse) 3D tool for learning geology, built as a separate project from HoloHand.

## Why

HoloHand proved that the gesture controls can be made reliable and private: the live debug runs passed 9/9 and the security checks were done live. Its Earth's Interior model showed that the exploded-view format suits geology. That model, though, gets one sentence per part.

This project turns the format into a real teaching tool for geology only:
- every part comes with depth suited to the learner's level
- every number and shape is drawn from published research with full citations
- learners can say exactly what they don't understand and get an answer

## Who it's for

Anyone curious about geology: students, the public, people arriving from the owner's portfolio. This is **not a school curriculum tool**. Learners choose a difficulty on the start screen, labelled **A-level**, **Undergraduate** or **Postgraduate**. The labels mean relative depth and difficulty only. They do not follow any exam board or course specification. Learners can switch at any time without losing their place.

## Goals

1. **Two modes on the same models.**
   - **Lesson:** a guided sequence of steps.
   - **Explore:** free aim, grab and pull apart, as in HoloHand.
2. **Levels change three things.**
   - **The words:** plain language with terms defined at A-level, standard terms and processes for undergraduates, evidence and debates at postgraduate level.
   - **The numbers:** rounded at A-level, then key physical properties such as density and seismic velocity, then reference values with uncertainty and source.
   - **The model itself:** higher levels split parts into more structure. At A-level the mantle is one part; at postgraduate level it splits at the 410 and 660 km boundaries and D″ appears.
3. **Full citations.** Every quantitative claim and every model geometry traces to a published source: authors, year, title, journal or publisher, and DOI or URL. Every simplification is stated in the panel, for example "crust drawn about 6× thicker so it is visible".
4. **"I don't get this".** A learner points (gesture) or clicks (mouse) at a part or a boundary between parts. The panel then shows that spot's explanation and its bank of pre-written questions for the current level.
5. **Question bank and search.** A large pre-written bank per part, boundary and level, plus a search box over the bank.
6. **Ask a new question.** If search finds nothing, the learner can send the question to a private inbox. The owner answers it with citations and adds the answer to the bank.
7. **Live updates in the README.** A section listing each answer added after a visitor asked, with date, level and part. It is generated from the content files, never written by hand.
8. **Keep HoloHand's guarantees.**
   - **Tested gestures:** the gesture reliability is kept, along with the self-test and `?debug` guided test.
   - **Privacy:** camera frames never leave the device.
   - **Security headers:** the security headers are kept.

## Non-goals (for the first milestone)

- **AI tutor:** it can be added later only if it answers strictly from the app's own cited content.
- **Accounts and logins:** no visitor accounts and no admin login page.
- **No public questions:** visitor questions are never shown publicly until the owner has answered them.
- **Other models:** none beyond Earth's interior. Later candidates: subduction zone, mid-ocean ridge, river-valley cross-section tied to the owner's Trishuli work.

## Anti-goals (failure even if it works)

- **No unverifiable citations.** A citation that has not been checked, with its DOI resolving and the figure or value confirmed, is not allowed in.
- **No collection beyond the question.** The site must never collect anything except the words a visitor types and sends, and only when they press send. That means no camera data, no IP addresses stored, and no tracking.
- **No breaking the tested gestures.** Changes must not break the gesture reliability already tested. Any gesture change must pass `npm test` and a live `?debug` run.
- **Content must fit its level.** Postgraduate jargon at A-level, or A-level simplifications presented as fact at postgraduate level, counts as a failure. The owner reviews each level's text before release; no automated test can check this.

## Constraints

- **Separate repo and Vercel project.** HoloHand stays untouched.
- **Credit:**
  - Tuba Khan (tubakhxn, MIT) is credited for the gesture, tracking and scene base this reuses.
  - The MIT notice is kept.
  - No AI attribution goes in commits or published files.
  - No local file paths go in anything published.
- **Public, citable sources only.** These are research papers, reference Earth models and textbooks. No contacting agencies.
- **Stack:** plain JavaScript, Three.js 0.170, MediaPipe Tasks Vision 0.10.14, Vite 5. No UI framework.
- **Dependencies:** no new runtime dependency for things that take a few lines. The inbox's storage client is the expected exception.

## Approaches considered

1. **Plain JavaScript on the proven HoloHand code (chosen).** Copy the tested modules into a new repo and build the teaching layer around them.
   - It keeps every tested gesture behaviour and the security setup.
   - The cost is hand-building the panel, lessons and search without a framework.
2. **React with a 3D library.**
   - The interface would be faster to build.
   - But the scene and gesture code would be rewritten, so all certification would have to be redone. Rejected.
3. **New section inside the HoloHand repo.** Rejected: the owner wants a separate project, and mixing them would muddle both.

For the "ask a question" route:
- **Pre-filled GitHub issue:** rejected, because it needs a GitHub account and most A-level students lack one.
- **Private inbox on the same site:** chosen.
- **AI tutor:** rejected for now. It brings cost, sends data off the device, and can invent citations.

## Design

### Reused from HoloHand (copied, credited)

- **`handTracking.js`:** self-hosted WASM and model, GPU→CPU fallback, world landmarks.
- **`gestureEngine.js`:** hysteresis thresholds, stabilisation, metrics.
- **`scene.js`:**
  - point-cloud shader with per-part explode offsets, up to 24 parts per model
  - `pick` and `chooseSticky`
- **`main.js` interaction logic:** the main file is reused but restructured. Kept:
  - aim-then-grab
  - pinch grabs the locked part
  - the two-hand hold
  - the still-peace trigger
- **`debugTest.js` and `scripts/gesture-selftest.mjs`.**
- **`vercel.json` security headers.** `connect-src 'self'` already permits the site's own `/api`.
- **Model helpers in `models/shapes.js`** and the `P/I/Cloud` part format.

### Levels

- **Choosing a level:**
  - The level is chosen on the start screen and can be changed from the panel.
  - It is remembered in `localStorage` as a convenience. The page must work if storage is blocked.
- **A model per level:**
  - Each model's build function takes the level and returns that level's parts.
  - Switching level rebuilds the model using the existing scatter transition.
  - The view angle and explode state are kept across the switch.
- **Boundaries are parts.** Each boundary is a thin pickable shell or ring on the cross-section, which reuses the existing pick and highlight code. It counts toward the 24-part cap and does not fly apart when the model explodes.
- **Earth's interior, first draft of parts per level:**
  - **A-level:**
    - crust, mantle, outer core and inner core
    - lithosphere and asthenosphere if they read clearly at this depth
    - boundaries: Moho and core–mantle boundary
  - **Undergraduate:**
    - continental crust, oceanic crust, lithospheric mantle, asthenosphere, mantle transition zone, lower mantle, outer core, inner core
    - boundaries: Moho, lithosphere–asthenosphere boundary, 410, 660, core–mantle boundary, inner-core boundary
  - **Postgraduate:**
    - everything at undergraduate level, plus D″
    - candidates where the sources support them: the large low-velocity provinces as blobs, and the innermost inner core
  - **Rule:** the final list is set by what the cited sources support.

### Content

- **Format:**
  - Content is written as JavaScript modules, so it needs no parser.
  - Layout: `content/<model>/<level>.js` and a shared `content/references.js`.
- **Per part or boundary, at each level:**
  - title
  - short explanation
  - longer explanation
  - key numbers, each with a reference id
  - a simplification note
  - question bank: `{ q, a, refs: [ids], added?: 'YYYY-MM-DD', fromVisitor?: true }`
- **Lessons:** `content/<model>/lessons.js`, one lesson per level. A step is:
  - the part or boundary to focus on
  - the explode state
  - the view angle
  - text
  - reference ids
- **References:** full entries with a DOI or URL, plus a `checked` date. The content test fails on any reference with no `checked` date.
- **Text is plain:**
  - It is rendered with `textContent` and DOM nodes, never `innerHTML`.
  - Formatting such as sub/superscript and italics uses a tiny fixed markup that is turned into DOM nodes.

### Modes

- **Explore:** HoloHand behaviour. Point up to aim, pinch to grab and drag, two hands to zoom, open and fist to explode and collapse.
- **Lesson:**
  - **Steps:** each step sets the explode state and view and highlights its part.
  - **Next:** peace (still), the on-screen Next button, or the → key.
  - **Back:** the on-screen Back button or the ← key, since there is no back gesture.
  - **Free look:** learners can still aim and grab during a step, then return to the step.
- **"I don't get this":** a toggle, or simply aiming or clicking, selects a part or boundary. The panel then shows:
  - the explanation
  - the numbers with citations
  - "Common questions" for the current level
  - the search box

### Search

- **Where it runs:** client-side over the current level's bank first, then other levels, labelled by level.
- **How it matches:** simple word-overlap ranking. No dependency.
- **No match:** shows "Send this question".

### Question inbox

- **Endpoint:** a Vercel Function, `POST /api/ask`.
- **Storage:** Upstash Redis via the Vercel Marketplace, free tier. Exact store is the builder's call; it must be private and server-only.
- **Validation:**
  - Accept JSON only, with a request body of 2 KB or less.
  - Fields:
    - `question`: 5–500 characters
    - `level`: must be one of the three levels
    - `model` and `part`: must be ids from a server-side list
  - Control characters are stripped.
  - Requests whose `Origin` is not the site's own are rejected.
  - A hidden honeypot field catches simple bots.
- **What is stored:** `{ question, level, model, part, receivedAt }`. Nothing else.
- **Rate limit:**
  - 5 per hour and 20 per day per visitor.
  - The visitor is keyed by a hash of IP plus a daily-rotating secret.
  - The key expires with its window, and no raw IP is ever stored.
- **No public display:** questions are never shown to other visitors.
- **Reading the inbox:**
  - There is no admin page.
  - The owner reads with `npm run inbox`, using a token from a local `.env` that is git-ignored, or with the storage provider's dashboard.
  - Answered or junk items are deleted.
- **Responses:**
  - On success: "Thanks, your question was sent".
  - On failure: a plain message, with no internals revealed.
- **Privacy section wording:** "Only the words you type, only when you press Send. Never camera data. No IP address is stored."

### Live updates

- `npm run updates` regenerates the README section between `<!-- live-updates:start -->` and `<!-- live-updates:end -->`.
- It draws from all bank entries with `fromVisitor: true`, newest first, listing date, level, part and the question.
- The test fails if the README section is out of date.

### Testing

- **Kept from HoloHand:** `npm test` gesture self-test, and the `?debug` live guided test.
- **New content test:**
  - every part and boundary has full content at each level where it appears
  - every reference id exists and has a `checked` date
  - every question has an answer and at least one reference
  - part count is 24 or fewer per level
- **New inbox tests:** validation and rate-limit cases, including oversize, wrong origin, bad level, unknown part, honeypot and burst.
- **New security check:** a live CSP check repeated after deployment, as done for HoloHand, now including the `/api/ask` path.

### Decisions made by Claude after the builder check

- **Changing level keeps your place, as follows:**
  - Every part and boundary has a stable id. Parts that split at higher levels list a `parent`; for example, `upper-mantle.parent = 'mantle'`.
  - On a level switch, the selected part maps to its parent or first child.
  - A lesson in progress jumps to the first step of the new level's lesson that covers that part. If none does, it starts at step 1.
  - The parent map is part of the content format from the start.
- **Peace gesture:**
  - In Lessons, a still peace sign means Next.
  - In Explore it does nothing until a second model exists, and then it switches models as in HoloHand.
  - The gesture engine itself is not changed. The `?debug` PEACE step changes from "model switched" to "peace fired".
  - Because that changes the test, the owner does one live `?debug` run before release.
- **Inbox origins:** the inbox accepts requests from:
  - the production domain
  - the project's own Vercel preview domains, matched against an exact pattern for this project
  
  Preview and production use separate stores, set through per-environment variables, so testing never mixes with real questions.
- **Licences:**
  - Code: MIT, keeping Tuba Khan's notice.
  - Written content: CC BY 4.0.
  - The Send screen says that questions may be published anonymously in the README once answered.

### Content sourcing (owner's answers)

1. Claude provides a source list with verified bibliographic details (`docs/sources.md`).
2. The owner marks which papers they can access and supplies them.
3. Claude drafts the content only from the supplied papers, plus open-access ones, quoting the page, table or figure each value comes from.
4. The owner checks the values against the papers. A reference gets its `checked` date only after this check.
5. What the available papers support sets the postgraduate parts.

**Launch target:** 6–8 questions per part per level, roughly 250–300 in total, growing from the inbox after launch.

## First milestone

The first milestone covers Earth's interior at all three levels. That means:
- lesson and explore modes
- the "I don't get this" picker with boundaries
- the question bank and search
- the inbox
- the live updates section
- a README in the owner's trishuli/ECG style
- deployment to a new Vercel project

## Left to the builder

- **Layout:** panel layout and styling, consistent with HoloHand's look.
- **Boundaries:** how boundary shells are drawn so they stay pickable but don't clutter the view.
- **Search ranking:** the exact search ranking.
- **Inbox storage:** the exact storage product within the rules above.
- **Earth model:** how to reuse or rewrite HoloHand's Earth model per level.
