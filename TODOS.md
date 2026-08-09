# TODOS

Deferred work, with the reasoning that produced it. Each entry should carry enough
context that picking it up in three months does not require re-deriving the argument.

---

## Durable lead capture before notification

**What:** Persist every validated lead to a datastore before attempting Telegram, email,
or CRM delivery, so a notification failure is an inconvenience rather than a lost customer.

**Why:** Raised by the Codex outside voice during `/plan-eng-review` on 2026-08-08. Its
argument: honest failure (the fix that shipped) stops the site lying to the customer, but
the phone number is still gone. Durable capture is the only fix that survives every channel
being down at once.

**Current state:** `notifyViaCRM` in `app/api/contact/route.ts` posts to
`crm.hungthanhphat.vn`, which is your own CRM with its own storage. So leads **are** already
durable on the common path. The uncovered case is narrow: the CRM itself failing at the same
moment as Telegram and Resend. After the honest-failure fix, the customer at least sees an
error naming the hotline instead of a false success.

**Where to start:** The May 2026 office-hours design doc
(`~/.gstack/projects/HughMai-Website-HTP/Hugh Mai-main-design-20260521-115222.md`) already
specifies Vercel Postgres and a `customers` / `installs` / `contacts` schema for the CRM
build. A `leads` table belongs there, not bolted onto a design-polish branch. Do it as part
of that project.

**Pros:** No lead is ever lost. Gives you queryable inbound volume for the first time.
**Cons:** New infrastructure and a schema to own. Pulls a v2 architecture decision forward.
**Depends on:** The CRM milestone starting. Not blocked by anything on this branch.

---

## Extract a shared landing-page template (design-review T6)

**What:** Pull the 21 hand-written SEO landing pages onto one shared component.

**Why:** Deferred during `/plan-eng-review` scope reduction on 2026-08-08. The duplication is
real and already drifting: only 3 of 5 district pages matched the expected cross-link block,
and the 10 measured `cua-cuon-*` pages alone total 3,576 lines of near-duplicate JSX.

**Why it was deferred:** It rewrites the entire organic lead surface at once, and at the time
there were zero tests. A dropped JSON-LD block or internal link would be invisible until
rankings moved weeks later.

**Where to start:** The Playwright suite landing in this branch is the prerequisite. Once
landing-page render and metadata assertions exist, this becomes a safe refactor instead of a
gamble. Start from `app/cua-cuon-ninh-kieu/page.tsx` and `app/cua-cuon-binh-thuy/page.tsx` —
they are the closest to identical.

**Pros:** Ends the drift permanently. Makes adding a new district page a data change.
**Cons:** Touches every SEO page. Highest blast radius of anything in the original task list.
**Depends on:** Playwright suite covering landing-page render + metadata. Blocked until then.

---

## Visible breadcrumbs on the 17 pages emitting BreadcrumbList schema

**What:** Render breadcrumb navigation on the pages that already declare it in structured data.

**Why:** Surfaced by a prior design review. Seventeen pages emit `BreadcrumbList` JSON-LD
describing a hierarchy no human can see. Google's guidance is that structured data should
describe visible page content.

**Current state:** Explicitly deferred by Hughie in a prior session. Recorded here so the
mismatch is not rediscovered from scratch a third time.

**Pros:** Aligns schema with reality. Modest UX gain on deep pages.
**Cons:** Adds a UI element to 17 pages for a benefit that is hard to measure.
**Depends on:** Nothing. Would be much cheaper after the T6 template extraction above.

---

## Real rate limiting on /api/contact, if abuse appears

**What:** Replace the honeypot with `@upstash/ratelimit` backed by Vercel KV.

**Why:** The honeypot plus timing check shipped on 2026-08-08 stops naive bots for zero
infrastructure. It does not stop anyone who reads the page source. Codex correctly noted that
a honeypot is not a rate limit.

**Trigger to act:** First sign of real abuse. Telegram flooding, Resend quota warnings, or
CRM entries with junk names. Do not build it before then; the endpoint currently serves a
business doing roughly five leads a week.

**Pros:** An actual ceiling that protects the Resend quota real leads depend on.
**Cons:** An external service and a second set of credentials on a deliberately single-platform stack.
**Depends on:** Nothing technical. Gated on evidence.
