# Retouch Pro – Technical Kanban

This document contains epics and user stories for the Retouch Pro application. It is the implementation-facing tracker separate from the business plan.

## Epics & User Stories

Copy of the user stories, acceptance criteria, tasks, and descriptions from the plan, organized for execution by engineering. If something is missing here that exists in `plan.md`, prefer the version in this file for technical execution.

---

## EPIC 1: Landing Page & Marketing Funnel

### User Story 1.1: View Landing Page Hero Section

Acceptance Criteria:

- Hero displays headline and CTA “PICK YOUR PICTURES”
- Upload limit info visible (up to 24 photos)
- Link to examples
- Responsive and clear on mobile

Checklist:

- [x] Implement responsive hero component (T8 design system)
- [x] Integrate file picker CTA
- [x] Add hover micro-animations
- [x] Add analytics tracking (hero CTA)

Description: Primary conversion point with dashed border area, image icon, strong copy, and green CTA.

### User Story 1.2: View Before/After Examples

Acceptance Criteria:

- At least 3 before/after comparisons
- Smooth slider/transition
- Optimized and lazy-loaded
- Mobile touch support

Checklist:

- [x] Before/after component
- [x] Transitions + touch gestures
- [x] Source 6–9 quality examples

### User Story 1.3: View Pricing Plans

Acceptance Criteria:

- Three tiers: Quick Fix ($60), Growth Accelerator ($100), Free Trial ($0)
- Show price/photo, totals, turnaround, revisions
- Emphasize Growth Accelerator; CTA buttons per plan

Checklist:

- [x] Pricing card + responsive grid
- [x] Icons for tiers; hover/animations
- [x] Link CTAs to flows; currency formatting
- [x] Analytics tracking for selection

### User Story 1.4: Download Free E-book

Acceptance Criteria:

- Book mockup, form (Name, Email), validation
- Email with PDF attachment/link; lead captured

Checklist:

- [x] Section UI + form validation
- [x] API endpoint + template + Nodemailer
- [x] Lead capture; rate limiting; analytics
- [x] Create PDF content/design

### User Story 1.5: Trust Indicators & Social Proof

Acceptance Criteria:

- Footer badges, hours, contact, social, consistent icons
- Visible on every page

Checklist:

- [x] Footer with icons, layout, links
- [x] Include in all layouts; hover effects

---

## EPIC 2: Photo Upload & Selection Flow

### User Story 2.1: Upload Photos from Device

Acceptance Criteria:

- Multi-select up to 24 JPG/JPEG/PNG/HEIC
- Thumbnails, size validation (<= 10MB)
- Loading, error messages
- Persist in IndexedDB

Checklist:

- [x] File input + handlers; validations
- [x] Thumbnail previews; IndexedDB storage
- [x] Loading indicator; DnD; mobile optimization
- [x] Analytics for upload start

### User Story 2.2: Manage Selected Photos

Acceptance Criteria:

- Card with thumbnail, filename, remove
- Counter; add more; enforce 24 max
- Responsive grid/list; empty state
- Pricing updates on change

Checklist:

- [x] Photo card/grid; remove & confirm
- [x] Counter; add more; validation messaging
- [x] Responsive layout; pricing recalculation

### User Story 2.3: View Dynamic Package Pricing

Acceptance Criteria:

- Auto-select package by count
- Real-time updates; comparison view
- Discount display; currency formatting

Checklist:

- [x] Pricing calc service + selection logic
- [x] Package display; updates on change
- [x] Comparison modal/accordion; highlighting
- [x] Analytics for auto-selection

---

## EPIC 3: Free Trial Flow

### User Story 3.1: Start Free Trial

Acceptance Criteria:

- Single photo upload; form (Name, Email, Phone, Business Name)
- Validations; submit button; mobile friendly

Checklist:

- [x] Trial page + single-photo UI
- [x] Field validations incl. phone formatting
- [x] Submission handler, loading, errors, analytics

### User Story 3.2: Submit Free Trial Request

Acceptance Criteria:

- Upload to Drive; internal and customer emails
- Redirect to success; DB record “pending”

Checklist:

- [x] API endpoint; Drive foldering
- [x] Email templates (internal/customer); Nodemailer
- [x] Success redirect; DB record; retries/logging

### User Story 3.3: View Free Trial Success Page

Acceptance Criteria:

- Confirmation, next steps, download placeholder
- Branding, footer, PT/EN versions

Checklist:

- [x] Success page; i18n; analytics
- [x] Reminder system for pending trials

---

## EPIC 4: Paid Checkout Flow

### User Story 4.1: Enter Contact Information

Acceptance Criteria:

- Required: Name, Email; Optional: Phone, Business
- Live validation; IndexedDB auto-save/restore

Checklist:

- [x] Form + validation + IndexedDB persistence
- [x] Accessibility + mobile inputs

### User Story 4.2: Process Stripe Payment

Acceptance Criteria:

- Checkout session with correct amounts, metadata
- Success/cancel URLs; methods incl. Amazon Pay
- Webhook confirms payment

Checklist:

- [x] Checkout session API; metadata
- [x] Success/cancel; webhook with signature verification
- [x] Handle success/failure/pending; retries/logging

### User Story 4.3: Upload Photos After Payment

Acceptance Criteria:

- On success, upload photos to Drive folder
- Internal/customer notifications; retries; cleanup

Checklist:

- [x] Webhook handler; IndexedDB retrieval pattern
- [x] Drive folder naming; batch upload; progress
- [x] Retry logic; email templates; cleanup

### User Story 4.4: Receive Order Confirmation

Acceptance Criteria:

- Thank you page with expectations, social, footer, i18n

Checklist:

- [x] Thank you page (EN/PT), details, analytics
- [x] Resend confirmation; post-purchase FAQ

---

## EPIC 5: Backend Integrations

### User Story 5.1: Google Drive Service Account

Acceptance Criteria:

- Service account auth via env; parent folder permissions
- Error logging; rate limiting

Checklist:

- [x] GCP setup; auth helpers; Drive wrapper
- [x] Retry/backoff; monitoring

### User Story 5.2: Email Service

Acceptance Criteria:

- SMTP via env; Handlebars templates (EN/PT)
- Retry, logging, rate limiting, unsubscribe where needed

Checklist:

- [x] Transport init; templates; sending service
- [x] Rendering, attachments, queue/backoff

### User Story 5.3: Stripe Integration

Acceptance Criteria:

- Keys/products/prices; webhook with signing secret
- Test/live modes; refund docs; fraud rules

Checklist:

- [x] Products/prices; webhook URL/events
- [x] Payment intents/checkout; refunds; tests

---

## EPIC 6: Application Infrastructure

### User Story 6.1: Monorepo Structure

Acceptance Criteria:

- @t8pro/design-system; shared ts/eslint; turbo scripts
- Node >= 18

### User Story 6.2: App Router Architecture

Acceptance Criteria:

- Next.js 15 App Router; routes and APIs listed
- Loading/error boundaries; SEO metadata

### User Story 6.3: State Management

Acceptance Criteria:

- IndexedDB for photos; persistence across flows
- Cleanup on completion; no sensitive data stored

---

## EPIC 7: Quality Assurance & Monitoring

### User Story 7.1: Error Tracking

Acceptance Criteria:

- Server/client capture; contextual logs; alerts

Checklist:

- [] Sentry setup; dashboards; recovery patterns

### User Story 7.2: Analytics Tracking

Acceptance Criteria:

- Page views + key events; funnels; A/B; privacy compliance

Checklist:

- [] GA4/Mixpanel setup; events; consent; dashboards

---

## API Endpoint Specs (Technical)

- POST `/api/ebook/download` – deliver e-book and capture lead
- POST `/api/payment-intent` – create Stripe Payment Intent
- POST `/api/webhooks/stripe` – handle Stripe webhooks
- POST `/api/upload-photos` – upload multiple photos to Drive
- POST `/api/upload-single-photo` – upload a single photo
- POST `/api/google-drive/upload` – internal Drive upload helper
- POST `/api/upload-free/submit` – submit free-trial upload
- POST `/api/upload-free/verify` – verify free-trial submission
- POST `/api/send-order-email` – send order confirmation email

Refer to `plan.md` Appendix B for request/response shapes.
