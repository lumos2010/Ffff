# Bhadranee — Tech + Retro Mobile-First Site

Mobile-first, retro-futurist microsite for Bhadranee that drives in-store contact via call, Instagram DM, or WhatsApp. No online booking, no forms, and no payments.

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production bundle outputs to `dist/`.

## Update brand assets

- **Logo**: Replace the logo treatment in `src/App.jsx` (header) with your provided SVG/PNG.
- **Contact links**: Update in `src/App.jsx`:
  - `contactLinks.call`
  - `contactLinks.instagram`
  - `contactLinks.whatsapp`

## Low graphics + 2D fallback

The **Low Graphics** toggle sets `data-low-graphics` on `body`. You can tune this in `src/styles.css` to disable heavier effects and reduce glows. This toggle is designed as the 2D fallback mode for older devices.

## Audio cues

Audio cues are **muted by default**. The **Audio** toggle enables a subtle Web Audio click. Swap for provided audio files by adding audio elements and triggering them in `useClickSound`.

## Content requirements checklist

- “Screen & Battery and many more parts” appears in the Service Detail section.
- “Book a Service” scrolls to Contact (no booking flow).
- Exchange & Upgrade includes a retro meter visual with a **Next** CTA that scrolls to Contact.
- Contact section contains only three large buttons: Call, Instagram, WhatsApp.
- No gambling or slot visuals are used.

## Analytics (GA4)

Add GA4 by loading your `gtag.js` snippet in `index.html` and attach event tracking to CTA clicks. Suggested event names:

- `cta_call`
- `cta_instagram`
- `cta_whatsapp`

## Deployment

Recommended: Vercel, Netlify, or GitHub Pages. Steps:

1. `npm install`
2. `npm run build`
3. Deploy the `dist/` directory.

## QA checklist

- Verify mobile performance on a mid-range Android device.
- Run a screen reader pass for all interactive elements (ensure ARIA labels read clearly).
- Confirm contact buttons open the correct call/Instagram/WhatsApp destinations.
- Validate the Low Graphics toggle removes glows/extra effects for older devices.

## Design system

- **Palette**: deep charcoal, teal primary, warm yellow accent, soft magenta secondary, neutral gray copy.
- **Typography**: Barlow Condensed (headline) + Inter (body).
- **Motion**: minimal, tactile micro-interactions; no autoplay sound.

## Figma deliverable

Provide the Figma file separately alongside this repo for handoff.
