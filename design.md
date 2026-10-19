---
version: 1.0.0
name: Senior Developer System
description: A technical but elegant aesthetic leveraging split-reveal typography and interactive terminal components.
colors:
  background: "#F5F5F5"
  surface: "#FFFFFF"
  primary: "#111111"
  secondary: "#555555"
  accent: "#EB3A14"
  line: "#E0E0E0"
  terminal-bg: "#0F0F0F"
  terminal-header: "#151515"
typography:
  display-xl:
    fontFamily: "Inter"
    fontSize: "13vw"
    fontWeight: 600
    lineHeight: "0.9"
  heading-lg:
    fontFamily: "Inter"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: "1.1"
  body-base:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "1.6"
  mono-sm:
    fontFamily: "JetBrains Mono"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "1"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
  section-v: "128px"
rounded:
  none: "0px"
  sm: "2px"
  md: "8px"
  full: "999px"
components:
  nav:
    background: "transparent"
    mixBlend: "difference"
    font: "mono-sm"
  button-primary:
    background: "primary"
    text: "surface"
    rounded: "full"
    padding: "12px 32px"
  project-card:
    imageAspectRatio: "16/10"
    filter: "grayscale(1)"
    hoverScale: "1.03"
  terminal:
    background: "terminal-bg"
    border: "white/10"
    font: "mono-sm"
  status-badge:
    background: "white/40"
    backdrop: "blur-md"
    rounded: "full"
motion:
  duration-base: "0.6s"
  duration-slow: "1.2s"
  easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"
  stagger: "0.1s"
---

## Overview
A visual system designed for software engineering leadership. It balances the raw utility of a command-line terminal with the editorial elegance of high-end design portfolios. The system relies on white space and precise motion to convey technical competence.

## Colors
- Use **Primary (#111111)** for high-impact text and dark backgrounds.
- Use **Accent (#EB3A14)** sparingly for status indicators, hover states, and brand emphasis.
- The **Secondary (#555555)** color is reserved for long-form body text to reduce eye fatigue.
- Deep blacks and dark grays are used exclusively for the interactive AI Terminal to distinguish 'code spaces' from 'design spaces'.

## Typography
- **Display Typography**: Use tight tracking (-0.04em) and uppercase for hero sections.
- **Mono Space**: Use JetBrains Mono for all navigation, tags, and data-driven labels to emphasize the engineering focus.
- **Body Text**: Maintain high legibility using Inter with balanced line heights.

## Spacing
- Implement a generous vertical rhythm (128px+) between major sections.
- Use tight 24px-48px spacing within component groups to maintain visual hierarchy.

## Layout
- Utilize a 12-column grid for project showcases.
- Alternating patterns (Left-Right/Right-Left) for project descriptions help maintain engagement during scrolling.
- Sticky positioning for side-titles in the timeline section keeps context visible during exploration.

## Elevation & Depth
- Avoid box shadows except on floating interactive elements like navigation pills.
- Create depth through **Motion** and **Blur** (Glassmorphism) rather than traditional drop shadows.
- Use high-z-index custom cursors with exclusion blend modes for interactive feedback.

## Shapes
- **Soft Minimalism**: Most containers use a hard edge (0px-2px radius).
- **Contrast**: Buttons and status badges should use full (pill) rounding to stand out against the geometric structure of the layout.

## Components
- **AI Terminal**: A dedicated space for command-line interaction with a header containing 'window controls'.
- **Project Grid**: Grayscale images that saturate and scale slightly on hover.
- **Navigation Pill**: A floating, blurred container for secondary links.
- **Marquee**: A full-width, auto-scrolling skill bar using Primary background.

## Motion
- **Split Reveal**: Animate characters or words from a blur (12px) to focus (0px) while moving up.
- **Magnetic Interaction**: Small UI elements (buttons/icons) should gravitate toward the cursor within a 20px radius.
- **Loading State**: A progressive percentage counter with a linear progress bar.

## Do's and Don'ts
- **Do** use large, uppercase, sans-serif headings for section transitions.
- **Do** apply grayscale filters to project imagery for a unified aesthetic.
- **Don't** use standard browser cursors.
- **Don't** use vibrant gradients outside of the subtle "Wispr Glow" radial background.

## Accessibility
- Maintain a 7:1 contrast ratio for primary text against the light background.
- Ensure terminal outputs remain screen-reader accessible despite the command-line styling.
- Provide a fallback cursor for touch-based devices.
