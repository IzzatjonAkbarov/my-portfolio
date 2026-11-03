---
name: Izzatjon Akbarov Portfolio
description: A frontend developer's career drawn as an ascent on a Chatkal-range trail map, rendered as a developer's GIS tool.
colors:
  paper: "#e9ece3"
  paper-raised: "#f3f5ef"
  paper-wash: "#dfe3d8"
  ink: "#1d2420"
  ink-soft: "#4b564e"
  contour: "#8a5a2b"
  trail: "#b8352a"
  trail-ink: "#ffffff"
  water: "#3d6f8e"
  rule: "rgb(29 36 32 / 0.14)"
  survey-grid: "rgb(29 36 32 / 0.05)"
  field-stroke: "rgb(29 36 32 / 0.32)"
  error: "#a8271d"
  night-paper: "#121815"
  night-paper-raised: "#19211d"
  night-paper-wash: "#222b26"
  night-ink: "#e4e8de"
  night-ink-soft: "#a3ada4"
  night-contour: "#c39a66"
  night-trail: "#e0533f"
  night-trail-ink: "#121815"
  night-water: "#79aecd"
  night-rule: "rgb(228 232 222 / 0.14)"
  night-survey-grid: "rgb(228 232 222 / 0.04)"
  night-field-stroke: "rgb(228 232 222 / 0.3)"
  night-error: "#f07a6a"
typography:
  display:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title-small:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "-0.01em"
  panel-head:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.5
  figure:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
  lead:
    fontFamily: "Golos Text, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Golos Text, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Golos Text, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
  data:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
  data-small:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  none: "0px"
  marker: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter: "32px"
  heading-gap: "64px"
  section: "96px"
  section-lg: "128px"
  survey-grid: "96px"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.trail}"
    textColor: "{colors.trail-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "52px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-ink-hover:
    backgroundColor: "{colors.trail}"
    textColor: "{colors.trail-ink}"
  control-square:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "40px"
  control-square-hover:
    backgroundColor: "{colors.paper-wash}"
  field-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.lead}"
    rounded: "{rounded.none}"
    padding: "10px 0"
  record-chip:
    backgroundColor: "{colors.trail}"
    textColor: "{colors.trail-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  terminal-readout:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  legend-panel:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 24px"
  map-tag:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.data-small}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  waypoint-marker:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.marker}"
    size: "14px"
  waypoint-marker-reached:
    backgroundColor: "{colors.trail}"
---

# Design System: Izzatjon Akbarov Portfolio

## Overview

**Creative North Star: "The Survey Sheet in a GIS Tool"**

The whole site is one topographic map sheet of the Chatkal range, opened in a developer's mapping tool. Ground is survey paper (sage-grey by day, spruce ink by night) under a faint 96px survey grid; brown contour linework carries the terrain; one red trail line carries the route and every action; lake blue carries water, focus and code keywords. The career is read as an ascent: an elevation profile is the page spine, sections are waypoints, and Contact is the summit.

Two typographic registers run the map. Unbounded is the map title lettering (names, section titles, big figures). Golos Text is everything read. JetBrains Mono appears only where a GIS tool would print data: coordinates, dates, stack arrays, hosts, scales, the hero's terminal lines. Density is editorial and generous: long single-column runs, 12-column splits, no card grids.

Depth is paper, not glass. Surfaces are flat sheets separated by hairline ink rules and a slightly raised paper tone; the few shadows belong to objects lifted off the sheet. The confirmed anti-reference is the dark-zinc developer hero with a portrait card and a row of equal cards.

**Key Characteristics:**
- Map-sheet ground with a 96px survey grid and neatline frames carrying marginalia (sheet number, coordinates) on the frame line.
- One red trail: route lines, primary actions, active states, summit and waypoint marks, selection.
- Contour fields drawn deterministically in contour brown; index contours heavier, every fifth ring.
- Square corners everywhere; only waypoint markers and the "you are here" dot are round.
- Monospace for data only, always with tabular lining figures.
- Motion that draws the map: trail draws, contours draw outward, the route grows with scroll, figures count up; nothing bounces.

## Colors

A muted survey-map palette: two papers, two inks, and three map hues with fixed cartographic roles. Every color has a night counterpart; the night sheet is the same map read by headlamp, not an inverted theme.

### Primary
- **Trail Red** (`trail`, night `night-trail`): the route itself. The hero elevation line, the experience route line, the docked progress line, primary buttons, active nav underline, summit triangles, the logo, record chips, period dates in the experience timeline, text selection and caret. Text on it is `trail-ink` (white by day, night paper by night).

### Secondary
- **Lake Blue** (`water`, night `night-water`): water and instrumentation. The elevation profile fill (12% opacity), the HUD crosshair (50%), focus outlines and focused field underlines, and keyword tokens (`const`, `~/tashkent`, `stack`) inside data readouts.

### Tertiary
- **Contour Brown** (`contour`, night `night-contour`): terrain. All contour linework (index rings 60% opacity at 1.4px, intermediate rings 32% at 0.8px), string literals in stack arrays, feature bullets, legend symbols, the scrollbar thumb.

### Neutral
- **Survey Paper** (`paper`, night `night-paper`): page ground, header bar, marker fills, label knockouts.
- **Raised Paper** (`paper-raised`, night `night-paper-raised`): alternating section bands (Experience, Passions), legend panels, terminal readout, portrait inset, menus, map tags.
- **Paper Wash** (`paper-wash`, night `night-paper-wash`): hover and selected fill for square controls and menu items.
- **Map Ink** (`ink`, night `night-ink`): headings and body text; at 20 to 40% opacity it is the frame and panel border (`ink/25` neatline, `ink/30` panels and photos, `ink/20` terminal).
- **Soft Ink** (`ink-soft`, night `night-ink-soft`): ledes, roles, secondary labels, inactive nav, marginalia.
- **Rule** (`rule`): hairline dividers, header and section-band borders, dashed elevation gridlines.
- **Survey Grid** (`survey-grid`): the 96px body grid, nothing else.
- **Field Stroke** (`field-stroke`): resting underline of form fields.
- **Error Red** (`error`, night `night-error`): validation text and invalid field underline only.

### Named Rules
**The One Trail Rule.** Red is the route and the way forward. It marks the path, the current position, the summit and the action, and is never used as a decorative fill or a second accent.

**The Cartographic Roles Rule.** Brown is terrain, blue is water and instrumentation, red is the route. A new element takes the hue of the thing it represents on a map, never a hue chosen for variety.

**The Ink Border Rule.** Borders are map ink at reduced opacity or the rule hairline. No independent grey border colors.

## Typography

**Display Font:** Unbounded (500, 700, 800; latin and cyrillic)
**Body Font:** Golos Text (400, 500, 600, 700; latin and cyrillic)
**Label/Mono Font:** JetBrains Mono (400, 500, 700; latin and cyrillic)

**Character:** Unbounded is wide, geometric map-title lettering that holds the name and section titles like place names on a sheet; Golos Text is a calm, highly legible grotesque for reading in three languages. JetBrains Mono is the GIS tool's printout voice.

### Hierarchy
- **Display** (800, clamp 2.75rem to 5.5rem, 0.94): the name in the hero only, broken over two lines.
- **Headline** (700, clamp 2rem to 3.25rem, 1.05): section titles, always preceded by a waypoint ring or (for Contact) a summit triangle in trail red.
- **Title** (700, clamp 1.6rem to 2.25rem): project names. **Title Small** (700, 1.5rem): companies on the route, the lead passion.
- **Panel Head** (700, 1rem, Unbounded): headers of legend panels and the direct-lines list; also the hero role line at 500 in trail red, 1.25 to 1.5rem.
- **Figure** (700, Unbounded, tabular): elevations, distances, times on Passions; counts up on entry.
- **Lead** (400, 1.125rem, 1.625): section ledes and project descriptions, 52 to 62ch. About copy runs at 1.25rem / 1.65, 60ch.
- **Body** (400, 1rem, 1.625): route descriptions and story text, 65 to 68ch.
- **Label** (600, 0.875rem): form labels, chips, button text (buttons at 15 to 16px).
- **Data** (400, 13px mono): terminal lines, stack arrays, dates. **Data Small** (11px mono): map tags, HUD readout, contour elevation labels.

### Named Rules
**The Data-Only Mono Rule.** JetBrains Mono is reserved for what a mapping tool would print: coordinates, dates, periods, stack arrays written as code (`['React', 'Next.js']`), hosts, grid references, scales, the terminal prompt. Prose, labels and navigation never use it.

**The Tabular Figures Rule.** Every elevation, date, coordinate, phone number and stat carries `tabular-nums lining-nums`.

## Layout

A single centered sheet: content sits in an 80rem container with 16px gutters on mobile and 32px from 640px. Sections run 96px vertical padding (128px from 640px) and alternate between the paper ground and raised-paper bands bounded by top and bottom rules. Section headings are followed by a 64px gap before content.

From 1024px, sections split on a 12-column grid, typically 7/5 (hero copy and HUD field, About copy and legend panel, Contact form and direct lines, lead passion and passion list) or 5/7 for projects, which alternate sides. The experience timeline is a single route offset 13rem from the left on desktop, with periods hung in the left margin right-aligned; below 768px the periods stack above each entry.

The header is fixed: a 64px bar, and after the hero a docked elevation strip appears beneath it showing "you are here". `scroll-padding-top` is 6.5rem to clear both. Below 1024px the nav collapses into a vertical route list with waypoint markers on a red line.

## Elevation & Depth

Flat by default. Depth comes from paper tone (raised paper over ground), ink-hairline frames, and contour fields fading out under radial masks. Shadows exist only for objects physically lifted off the sheet: the primary action, the portrait inset, menus and the story modal.

### Shadow Vocabulary
- **Trail lift** (`box-shadow: 0 6px 18px -8px var(--trail)`; hover `0 10px 24px -10px var(--trail)`): primary buttons only, paired with a 2px rise on hover.
- **Inset plate** (`box-shadow: 0 18px 40px -22px rgb(0 0 0 / 0.55)`): the portrait mounted on the hero contour field.
- **Menu** (`box-shadow: 0 12px 30px -14px rgb(0 0 0 / 0.45)`): language, theme and country menus.
- **Modal** (`box-shadow: 0 30px 80px -30px rgb(0 0 0 / 0.7)`): the passion story dialog over a `rgb(10 14 12 / 0.72)` scrim.

### Named Rules
**The Paper Not Glass Rule.** Panels, bands, timelines and photos are flat and bordered. A shadow means the object sits on top of the map; if it is part of the map, it gets a hairline instead.

## Shapes

Square-cornered, like printed map furniture: buttons, panels, chips, fields, menus, photos and the modal all have 0 radius. The only round forms are map symbols: waypoint rings, the "you are here" dot (with a 4px trail-tinted halo) and the timeline markers. The summit is an equilateral-ish triangle (also the logo silhouette, carrying the IA monogram). Frames use corner brackets (HUD viewfinder) and neatlines with tick rulers (a 1px tick every 48px along the hero frame top). Lines are drawn at one stroke weight per symbol family; the hero trail is 3px, the docked trail 2.5px, route lines 2px.

## Components

### Buttons
Decisive and square; they rise, they do not glow.
- **Shape:** square (0px).
- **Primary:** trail red with trail-ink text, 52px tall, 28 to 32px horizontal padding, 16px semibold. Used for Contact in the hero and Send in the form.
- **Hover / Focus:** rises 2px with a deeper trail lift; in the hero an ink wash (15%) sweeps in from the left over 500ms. Focus is a 2px lake-blue outline offset 3px.
- **Ink (secondary):** ink fill with paper text, 44px tall, 20px padding, 15px semibold; turns trail red on hover. Used for "View project".
- **Text link action:** semibold ink text with a 1px underline at 40% ink, underline turns trail on hover; arrow icon nudges toward its direction.

### Chips
- **Record chip:** trail fill, trail-ink bold 14px, square, 6px 12px; states a real record (e.g. "1st place") on a photo or in the story dialog.
- **Map tag:** raised paper at 90%, 11px mono, square, 4px 8px; pinned to map corners for status, grid reference and scale bar.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** raised paper.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px ink at 30%; internal sections divided by the same border.
- **Internal Padding:** 20 to 24px.
- **Legend panel:** the About aside. Each skill is a row with its own map-legend line symbol (solid, dashed, dotted, double, ring, triangle, square, hatch, cross) cycling trail, water and contour.

### Inputs / Fields
- **Style:** underline only: transparent background, 2px bottom stroke in field-stroke, no side or top borders, 18px text, 10px vertical padding. Labels are 14px semibold ink above.
- **Focus:** underline shifts to lake blue.
- **Error:** underline turns error red; message in 14px medium error red with an alert icon below. Disabled submit drops to 70% opacity with a progress cursor.

### Navigation
- **Header:** paper bar, 64px, rule bottom border. Logo and name (Unbounded 15px bold) left; waypoint links center at 15px medium in soft ink, current link in ink with a 2px trail underline that scales in from the left; Contact carries a small summit triangle. Language and theme are 40px square controls with rule borders.
- **Mobile:** a 40px square menu control opens a vertical route: a 2px trail line on the left with ring markers, filled for waypoints already passed.

### Elevation Profile (signature)
The route as a profile. In the hero: a 3px trail line over a 12% lake-blue fill with dashed rule gridlines, drawn left to right once over 2.2s; ring waypoints (14px, 2px trail border, paper fill) and a summit triangle are buttons that scroll to each section, with labels below. Docked: after the hero it collapses into a 28px strip under the header; the route is soft ink, the travelled part redraws in trail, and a trail "you are here" dot rides it with scroll.

### Contour Field and HUD
Deterministic contour rings (no randomness) in contour brown, every fifth ring an index contour with an optional mono elevation label knocked out of the paper. In the hero the field carries a crosshair (lake blue at 50%) that follows the pointer, corner brackets, a live coordinate and elevation readout in 11px mono, and the portrait as a square-cornered map inset. On project plates the rings draw outward on entry and rotate 6 degrees on hover.

### Route Timeline
Experience is one vertical route: a 2px rule track with a trail line that grows with scroll, 16px ring markers (newest filled), periods in 13px mono trail, and stack arrays written as code with brown string literals.

### Motion
One easing for arrivals, `cubic-bezier(0.16, 1, 0.3, 1)`. Content reveals vary per section (rise 28px, blur-in 10px, clip from the left, slide 24px) at 0.8 to 1s; the hero terminal types at 55 to 70ms per character with a blinking block caret; figures count up over 1.4s. With reduced motion every element shows its final state.

## Do's and Don'ts

### Do:
- **Do** put new sections on the route: a waypoint ring (or summit triangle for the final action) before every section title in trail red.
- **Do** give every new element its cartographic hue: red for route and action, blue for water and instrumentation, brown for terrain.
- **Do** write stacks and technical lists as code in JetBrains Mono 13px, with lake-blue keywords and contour-brown string literals.
- **Do** separate surfaces with ink hairlines (20 to 40%) or the rule, and alternate paper and raised-paper bands for long sections.
- **Do** keep corners square; reserve round shapes for waypoint markers and position dots.
- **Do** carry map marginalia (sheet number, coordinates) on frame lines and map corners as mono data.
- **Do** keep every animation's resting state visible and honor reduced motion with the final state.

### Don't:
- **Don't** build the dark-zinc developer hero with a portrait card, or rows of equal cards.
- **Don't** use JetBrains Mono for prose, labels or navigation.
- **Don't** introduce a second accent or use trail red as a decorative fill.
- **Don't** add shadows to panels, bands, timelines or photos; shadows are for objects lifted off the sheet.
- **Don't** let animation bounce or overshoot.
