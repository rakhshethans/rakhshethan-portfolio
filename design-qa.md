# Local portfolio presentation QA

## 2026-10-19: identical video frames with letterboxing

At the user's request, the stacked carousel now gives both recordings a shared1280/900 frame, matching the taller narration recording. The finance recording uses black top/bottom bars with object-fit:contain, retaining all footage without stretching or cropping. Shared frame sizing is also used in the viewport width budget; equal outer cards, grey borders, row alignment and shared section margins remain. Source video assets and default split layout are unchanged.

Refreshed and visually verified desktop1280×947 and mobile390×844. Desktop outer cards both589×749px, player frames both547.4×384.89px, object-fit:contain. Pinning remains active; native scrolling reached x30.4px with Projects at top0. Mobile cards both312×697px and players both278×196px; GitHub and first detail dividers remain exactly aligned, with no page overflow and normal unpinned reading flow. Evidence: ../work/carousel-matched-frames-desktop.png and ../work/carousel-matched-frames-mobile.png. Viewport override reset; local preview retained. No deployment configuration changed.

## 2026-10-18: aligned card links and disclosures

Stacked cards now share measured row heights for category/title/intro/technologies/media/GitHub, plus a common minimum context height so the first disclosure dividers align. Media is top-aligned in its reserved row, without altering either native recording ratio or cropping. Extra height appears below the shorter media figure, not inside the video. Outer equal sizing and shared section margins remain. Rows are cleared before natural remeasurement and rounded upward to avoid subpixel disclosure misalignment.

Refreshed and visually checked1280×947 and390×844. Desktop both cards749px high; GitHub tops741.5px and first details802.4px in both, with pinning active. Mobile GitHub tops661.1px and first details749px in both, no page overflow, original video ratios retained. Build details expand normally. JS syntax passes. Evidence: ../work/carousel-aligned-rows-desktop.png and ../work/carousel-aligned-rows-mobile.png. Viewport override reset; local preview retained. Nothing published.

## 2026-10-18: matching outer cards with native-ratio videos

User selected equal outer cards, not cropped/matched video frames. Stacked cards now share the tighter calculated width and the tallest natural card height. Height is remeasured after expanding/collapsing details rather than clipping content. Added a thin theme-grey border,16px corners, white surface and20px inset (16px mobile). Videos keep1280/900 and1728/1080 native proportions and remain uncropped. Shared section margins and default split layout are unchanged.

Refreshed and visually inspected desktop1280×947 and mobile390×844. Desktop cards both589×746px, thin grey borders/16px corners, with pinning active; native scrolling reached x16px while Projects remained at top0. Mobile cards both312×674px, no horizontal page overflow, unpinned; expanding narration details made both939px tall, then closing restored the compact layout. No media assets changed. JS syntax passes. Evidence: ../work/carousel-equal-cards-desktop.png and ../work/carousel-equal-cards-mobile.png. Temporary viewport reset; preview left open. Local only, nothing published.

## 2026-10-18: native recording aspect ratios

Video stages now match their source recordings: narration 1280×900 and Opportunity Cost Engine 1728×1080. Removed forced stacked stage heights and generic aspect ratios. Original video assets remain untouched, contained and uncropped. Desktop stacked slides are narrowed individually according to available height and their recording ratio, with a 320px readable minimum and safe unpinned fallback for short screens. Shared section margins and multiple-visible-project presentation remain.

Refreshed and visually verified at 1280×947 and 390×844. Desktop slides607px/696px; stages report source aspect ratios and fit within the screen (bottom895.27px/867.69px). Pinning remains active; native scroll moved x113.6px with Projects top0. Mobile players312×219px/312×195px match native ratios with border rounding, no page overflow, and ordinary unpinned reading flow. Evidence: ../work/carousel-native-ratios-desktop.png and ../work/carousel-native-ratios-mobile.png. JS syntax passes. Temporary viewport reset; local only, nothing published.

## 2026-10-18: multiple visible projects, shared margins

Clarification supersedes the full-width single-slide experiment below. Restored the common container margins; optional stacked slides now occupy 68% of the track on desktop, 80% on narrower laptops, and 92% on phones. One complete project and part of the next are visible on desktop. All slide children use their slide width. Scrolling anchors, controls, current indicator and pin travel now clamp to actual horizontal overflow, so the final slide ends flush at the right edge without empty trailing travel. Visibility still uses true slide bounds, keeping both visible projects interactive. Default split layout remains unchanged.

Refreshed and visually verified desktop 1280×947 and mobile 390×844. Desktop Projects and navigation share left 52.4px and width 1160px; slides are 789px wide. Native scrolling reached x226.4px with section top0. Next reached x449.6px of 450px, with last-right and track-right both1212.4px. Further scrolling released Projects to top−237px and brought Background to710.2px. Mobile is unpinned, slide312px/track339px, without page overflow. JS syntax passes. Evidence: ../work/carousel-multiple-desktop.png, ../work/carousel-multiple-end.png, ../work/carousel-multiple-mobile.png. Viewport reset; local only, nothing published.

## 2026-10-18: full-width stacked carousel

Removed the optional stacked variant's container cap and 840px child cap. Projects now spans the viewport minus responsive edge gutters (40px each on wide screens; 18px on phones). Default split layout, copy, recordings and scrolling logic are unchanged. Videos retain contain sizing and the measured height budget rather than stretching/cropping.

Refreshed and visually inspected at 2048×1070 and 390×844. Wide carousel width 1952.8px with no horizontal page overflow; pinning remains active, native scrolling moves horizontally, and Next reaches the second project (bottom 956.24px within 1070px). Both collapsed slides fit. Mobile remains unpinned, 339.2px wide with 18px edge gutters and no page overflow. Evidence: ../work/stacked-wide-desktop.png, ../work/stacked-wide-second.png, ../work/stacked-wide-mobile.png. Viewport override reset; local preview left open. Nothing published.

Latest stacked-fit result: desktop, laptop and mobile browser verification complete; local only.

## 2026-10-18: stacked one-screen fit and pin verification

Tightened only the optional stacked variant's wide-screen section/row spacing and added a measured demo-height allocation: remaining viewport height after actual text/caption/control measurements, with an unstretched contained video and a 160px minimum. Text is not scaled down. Default split layout and mobile styling remain unchanged. The existing readability fallback still unpins if content cannot fit.

JavaScript syntax passes. Restored the localhost server and confirmed HTTP 200 serving project-stacked-fit-29 CSS and project-stacked-fit-11 JavaScript. The user refreshed the browser, resolving the connection-error handoff.

Visually verified both projects with disclosures collapsed at 1280×947 and 735×650. At desktop size the first project's bottom was 895.49px and the second 859.09px; at laptop size they were 598.30px and 562.10px. Native forward scrolling moved the track from 0 to 284px while Projects stayed at top 0; reverse scrolling also retained top 0. At the last slide, continued scrolling released the section and brought Background into view. Expanding narration build details on the laptop disabled pinning rather than clipping the 605px slide plus section chrome. Closing details restores the compact layout.

Mobile 390×844 remains unpinned with normal vertical reading flow, usable carousel controls and no horizontal page overflow. Both project views were inspected. Both videos reached readyState 4 without media errors. An initially blank Opportunity video frame cleared after reloading; the decoded dashboard frame was then visually confirmed at both desktop and laptop sizes. No captured console warnings/errors. The default URL retains its original two-column layout (660.51px / 459.49px) and active pinning. Temporary viewport overrides reset; stacked preview shown and left open. Nothing published or pushed.

Evidence: ../work/stacked-fit-first-desktop.png, ../work/stacked-fit-second-desktop.png, ../work/stacked-fit-first-laptop.png, ../work/stacked-fit-second-laptop.png, ../work/stacked-fit-mobile.png and ../work/stacked-fit-second-mobile.png. Supersedes the earlier stacked comparison's height/pinning limitation below.

## 2026-10-18: optional stacked comparison

Added a comparison-only variant at ?layout=stacked. The default remains the centred, side-by-side pinned carousel. In the variant, category/title/summary/technologies precede a wide contained demo, followed by GitHub and existing context/disclosures. Content is centred to a maximum 840px column. Demo figure is moved within the existing copy wrapper only in this variant so DOM/keyboard/screen-reader order matches its visual order. All wording, URLs, recordings, credits and team attribution are unchanged. No persistent setting or publication.

The stacked slides are taller (first desktop slide 834.33px before section chrome), so existing height-based fallback disables pinning where necessary; normal vertical reading scroll remains available. Existing horizontal carousel controls still switch projects.

Visually verified at 1280×947 and 390×844. Both stacked projects render correctly, next switches to 2/2, mobile build details expand/collapse and both videos reach readyState 4 without errors. No horizontal page overflow or captured console warnings/errors. Also reloaded the default URL: no layout attribute, unchanged two columns (660.51px/459.49px) and pinning active. JS syntax passes. Evidence: ../work/projects-stacked-desktop.png, ../work/projects-stacked-second.png and ../work/projects-stacked-mobile.png. Viewport reset; comparison preview left open. Local only.

## 2026-10-18: vertically balanced pinned content

The pinned Projects panel now uses a full-viewport flex column, retaining the heading's top position and centring the demo/text track in its remaining space via equal automatic block margins. Both projects share the same track position; unpinned/mobile layouts are unaffected. No copy, assets or scrolling logic changed.

Refreshed and visually verified at 1280×947 and 390×844. Free space above/below the track (excluding the existing heading gap and panel bottom padding) measured 90.15px on both sides. Track top stayed 318.97px while pinned and 318.63px at the final project boundary (0.33px viewport rounding). Direct last-project navigation and pinned horizontal scrolling still work. Mobile remained unpinned with no horizontal overflow; no captured console warnings/errors. Evidence: ../work/carousel-centred-desktop.png, ../work/carousel-centred-second.png and ../work/carousel-centred-mobile.png. Temporary viewport reset. Local only; nothing published.

## 2026-10-18: pinned Projects scene with natural Background release

Projects now sits in a CSS-sticky scroll scene. Native vertical page scroll maps to horizontal carousel progress with the existing short easing; no wheel prevention, scroll lock, timed snapping or forced slide completion remains. Scene travel equals the actual horizontal distance, so after the last project the section unpins and Background follows in normal flow. Reverse scrolling retraces the scene. Controls, keyboard and project hashes map to the corresponding page-scroll position when pinned; manual horizontal input keeps the page progress aligned. Visible slides remain interactive and offscreen videos pause.

Pinning is enabled only above 600px when every project's current content fits the viewport and reduced motion is not requested. The pinned panel fills the viewport, keeping Background out of view until horizontal travel is complete. Mobile, short screens and tall expanded details use ordinary vertical flow and the unsnapped horizontal carousel. ResizeObserver/font/viewport changes recalculate scene dimensions. Removed the now-unused ScrollTrigger script and global refresh callbacks, preserving the GSAP hero intro. An initial run unexpectedly jumped to page top; after removing the obsolete refresh path, repeated forward/reverse runs over both header/demo areas completed without recurrence.

Refreshed and visually verified 1280×947, 735×650 and 390×844. Desktop page Y 1307.11 → 1591.56 → 2064.89 drove horizontal offsets 257.78 → 541.78 → 1015.56 while Projects top stayed 0 and heading top stayed 64px. At page Y 2301.78 the horizontal position reached 1191.56px (1192px travel), Projects released to top −60.78px and Background entered at 886.33px. Continued scrolling brought Background to 413px. Reverse returned to the pinned section; Previous mapped back to page Y 1049.33px and horizontal offset ~0. Expanded narration details exceeded viewport height (952px panel), correctly disabling the pin without clipping. At 735×650 the section pinned at top 0 with 1354px scene height; mobile had no pin/extra scene height, normal reading scroll, and no horizontal overflow. Background navigation reached #experience at top 26px. No captured warnings/errors; JS syntax passes. Viewport reset; local only, nothing published.

Evidence: ../work/carousel-pinned-first.png, ../work/carousel-pinned-mid.png, ../work/carousel-pinned-release.png, ../work/carousel-pinned-background.png, ../work/carousel-pinned-tablet.png, ../work/carousel-pinned-expanded.png and ../work/carousel-pinned-mobile.png. Supersedes older scoped wheel-navigation descriptions.

## 2026-10-18: direct scrolling without snap-on-stop

Removed both the idle timer's forced slide completion and CSS scroll snapping. Wheel distance now maps 1:1 to horizontal distance with a short 60ms easing time constant; it rests at the actual input-derived position rather than choosing a slide after input stops. Native touch/horizontal scrolling also stays unsnapped. Explicit arrows/keyboard controls still select complete project anchors, including when starting between them. Partly visible slides remain interactive and accessible; height fits all visible content and controls use actual scroll boundaries rather than the nearest project index. Offscreen demos still pause.

Refreshed and visually verified desktop 1280×947 and mobile 390×844. A short desktop down-scroll settled at 212.89px and stayed at exactly that position across five observations; a second scroll continued to 425.78px, then up-scroll returned to 213.33px without choosing either project. Page Y remained 1023.11px. Mobile horizontal input settled at 80px out of 371px with scroll-snap-type none and no horizontal page overflow. Native pointer activation of Previous returned from that partial mobile position to 0. No captured warnings/errors; JS syntax passes. Evidence: ../work/carousel-direct-desktop.png, ../work/carousel-direct-mobile.png and ../work/carousel-direct-0.png through ../work/carousel-direct-4.png. Viewport reset; local only, nothing published. Supersedes all prior snap-on-stop descriptions.

## 2026-10-18: continuous eased wheel motion

Replaced the single-gesture whole-slide trigger with wheel-distance-driven motion (1.4× normalized input), frame-rate-independent easing and a smooth settle after 180ms without wheel input. Native snapping is temporarily disabled during interpolation and restored at rest. A deliberate short gesture completes the adjacent slide; reversing input changes the target. Height stays stable during movement. Controls, pointer interaction and resizing cancel the wheel animation cleanly. Reduced motion uses immediate positioning rather than interpolation. Boundary release and mobile vertical reading behaviour remain.

Refreshed and visually checked desktop 1280×947 and mobile 390×844. Captured forward positions 48.44, 900, 1080, 1148.44, 1176, 1189.78 and 1192px, with page Y fixed at 1023.11px and animation class cleared at rest. Reverse captured 1143.56, 350.22, 135.11, 60, 22.67 and 6.22px, then returned to 0 with animation stopped. Outward wheel at slide 2 advanced page Y to 1198.67px. Fixed a near-end rounding stall found during verification by ensuring a minimum one-CSS-pixel interpolation step. Mobile fits with no overflow; no captured warnings/errors. JS syntax passes. Evidence: ../work/carousel-smooth-final-0.png through ../work/carousel-smooth-final-6.png and ../work/carousel-smooth-mobile.png. Local only; nothing published.

## 2026-10-18: vertical wheel navigation

Added scoped vertical-wheel gestures over Projects: down advances right and up returns left when the whole project panel fits in view above 600px. One gesture selects one slide; a 220ms quiet period absorbs momentum. Modified/zoom and horizontal gestures remain native. At either endpoint the next outward gesture scrolls the page normally. Mobile and tall expanded panels retain vertical reading scroll; arrows, keyboard and horizontal swipe remain available. This supersedes the prior no-vertical-wheel mapping note.

Refreshed local preview and visually inspected desktop 1280×947 and mobile 390×844. Native down-wheel changed 1/2 to 2/2 at horizontal offset 1192px with page Y unchanged at 1023.11px; up-wheel returned to 1/2 at the same Y. Outward up-wheel at slide 1 moved page Y to 847.56px. Direct pointer selection of slide 2 followed by outward down-wheel moved Y from 1023.11px to 1198.67px while remaining on 2/2. An earlier locator-based boundary check repositioned the page during its automatic scrolling and was discarded; the final check used native pointer input. Mobile down-wheel kept 1/2 while page Y increased from 906.22px to 1026.67px, with no horizontal overflow. Evidence: ../work/carousel-wheel-next.png and ../work/carousel-wheel-mobile.png. JS syntax passes. Temporary viewport reset; local only, nothing published.

## 2026-10-18: horizontal project window and hero spacing

Projects now progressively enhance into a native horizontal scroll-snap carousel: one full-width project per slide, previous/next Phosphor arrow controls and live position. Existing alternating video/copy order remains side by side above 600px; narrow phones stack readable content inside each slide. No automatic slide rotation or vertical-wheel hijacking. Arrow/Home/End keys operate when the carousel itself has focus, without stealing video/disclosure keys. Inactive slides are inert/hidden to accessibility and their videos pause. Hash navigation can select either project. Without JavaScript, both ordinary project rows remain available.

Active-slide height follows its content and expanded details, avoiding a fixed-height crop or blank space reserved by the other project. Removed the former vertical scale-on-scroll effect from carousel media, leaving demos stationary within the sliding window. Original demos, copy, disclosures, destinations, footage credit and four-person team attribution remain unchanged.

The annotation's hero gap was caused by the <=740px column breakpoint: CV/GitHub occupied a separate lower row. The hero stays side by side down to 601px, with text and buttons bottom-aligned. At 735×650 their bottoms both measured 626.22px; narrower phones use a compact 12px gap and right-aligned buttons.

Browser verification: refreshed and visually inspected 1280×947, 735×650, 390×844 and 320×740. Desktop/tablet slides show complete video/copy columns; phones have no page overflow or clipped controls (320px controls right edge 286.89px within 305px client width). Previous/next, keyboard End/ArrowLeft and native horizontal scrolling changed projects correctly. Pointer next-click kept vertical scroll unchanged at 1023.11px. Inactive slide was inert, narration playback paused after switching, both videos reached readyState 4 without errors. Expanded mobile narration grew the slide to 1004px and viewport to 1022px, without clipping; contribution/team details expand correctly. No captured console warnings/errors; design.js syntax passes.

Evidence: ../work/carousel-first-desktop.png, ../work/carousel-second-desktop.png, ../work/carousel-expanded-desktop.png, ../work/carousel-hero-tablet.png, ../work/carousel-second-tablet.png, ../work/carousel-first-mobile.png, ../work/carousel-second-mobile.png, ../work/carousel-expanded-mobile.png and ../work/carousel-narrow.png. Temporary viewport reset. Local only; nothing published or pushed.

## 2026-10-18: increased navigation border sensitivity

Increased only Projects/Background/LinkedIn spotlight radius from 26px to 38px (about 46% wider), preserving the 2px blur, two-axis tracking, transparent resting borders and immediate exit hiding. Hero buttons are unchanged. Refreshed and visually inspected desktop 1280×947 and mobile 390×844; hover screenshot shows a broader localized border segment, all three pseudo-element opacities are 0 after exit, and mobile has no horizontal overflow. Evidence: ../work/nav-sensitivity-hover.png and ../work/nav-sensitivity-mobile.png. Local only; nothing published.

## 2026-10-18: approved hero wording and button placement

Applied the approved bottom-left introduction: “Second-year Computer Science student at the University of Warwick.” Removed the separate top-right university label; retained the internship line. Hero grid now has two content rows instead of reserving a metadata row. CV/GitHub stay bottom-right on desktop and right-align below the introduction on narrow screens, with their existing glow and destinations unchanged.

Refreshed the local preview and visually inspected 1280×947 and 390×844 screenshots. Neither viewport overflows horizontally; buttons fit within the hero and align to its right edge. Evidence: ../work/hero-intro-placement-desktop.png and ../work/hero-intro-placement-mobile.png. Nothing published. This supersedes the pending-wording note below.

## 2026-10-18: concise copy, compact glow and hero cleanup

Local-only changes: removed the duplicate visible name next to the rs. monogram (accessible full-name label remains), removed the hero bottom border/rounding and the 28px gap before the technology banner. Hero-to-banner gap is 0px and hero bottom border is 0px on desktop and mobile. The central name stays unchanged. The hero introduction and separate top-right Warwick label are intentionally unchanged pending the user's wording decision.

Navigation spotlight radius is now 26px with 2px blur; hero buttons retain their larger glow. Both pointer axes update on entry/movement. Background entry from above produced y=5.14px and entry from below y=29.14px, with visibly different top/bottom border segments. Projects and LinkedIn horizontal tracking also passed. All three nav glows return opacity 0 on exit with 0s transition and retain their last coordinates, avoiding the old recenter/fade flash. Keyboard focus retains a solid accessible outline. Evidence: ../work/glow-vertical-comparison.png (top entry, bottom entry, then exit).

The Humanizer copy pass removed repeated hero/section labels, shortened the narration introduction and caption, and consolidated technical/recording explanations into their disclosures. Limitations, footage licence/credit, team attribution, destinations, demos and CV remain. The two 17-item technology groups and banner animation are retained. Intro wording is excluded from this pass at the user's request.

Refreshed and visually inspected at 1280×947 and 390×844: no horizontal overflow, readable expanded disclosures, intact desktop/mobile hero and project layout. Both video elements reached readyState 4 without errors. No captured console warnings/errors. JavaScript syntax checks passed. Local server was restored on 127.0.0.1:8032 after an unreachable preview; HTTP status 200 confirmed. Nothing published or pushed.

Evidence: ../work/compact-glow-hero-desktop.png, ../work/compact-glow-hero-mobile.png, ../work/seamless-banner-desktop.png, ../work/seamless-banner-mobile.png, ../work/concise-details-desktop.png and ../work/concise-details-mobile.png. Browser captures are native-scaled; the screenshot called concise-background-mobile.png was recaptured after smooth scrolling settled.

## Latest annotation correction

Latest navigation refinement: resting borders on Projects, Background and LinkedIn are now fully transparent. Existing pointer-following hover glows and accessible keyboard-focus outlines remain. Verified all three links have transparent computed borders and zero glow opacity at rest; hovered Projects has glow opacity 1 and updates its pointer coordinate. Desktop 1280 × 947 and mobile 390 × 844 were visually checked with no overflow. Evidence: ../work/nav-hover-only-idle.png, ../work/nav-hover-only-active.png and ../work/nav-hover-only-mobile.png. No copy or other styling changes. Local only; nothing published.

Latest project ordering: Opportunity Cost Engine is now text-left/video-right on desktop, alternating with the unchanged narration row. Mirrored .8fr/1.15fr columns keep both demos the same width (655.79px at 1280px viewport). The HTML reading/focus order follows copy then video for this row; on mobile it stacks text above the recording. Exact copy word multiset is preserved. Verified at 1280 × 947 and 390 × 844 with no overflow, readyState 4 on the recording, and My contribution expanding/collapsing correctly with all collaborator attribution. Evidence: ../work/opportunity-reversed-desktop.png and ../work/opportunity-reversed-mobile.png. Other sections, links and effects unchanged. Local only; nothing published.

Latest top-navigation preview: Projects, Background and LinkedIn now have subtle orange rounded outlines and share the existing pointer-following spotlight logic with View CV/GitHub (five scoped links total). Hero pills remain unchanged; navigation uses 10px corners. Links and labels are unchanged; other links/cards remain unaffected. Hover tracking was tested separately on all three top links: Projects x=19.20px, Background x=46.20px, LinkedIn x=53.60px, with inactive links resetting. Keyboard focus retains a full outline, reduced-motion tracking fallback and touch behaviour remain. An initial 320px check exposed overflow; adjusted only the <=380px navigation font/gap/padding, then recaptured with no overflow. Also reduced navigation focus offset to avoid neighbouring outline overlap. Final desktop 1280 × 947, mobile 390 × 844 and narrow 320 × 740 views were visually checked. Background navigation reaches #experience with section top ~25.7px. No captured warnings/errors; JS syntax passes. Evidence: ../work/navigation-glow-desktop.png, ../work/navigation-glow-mobile.png and ../work/navigation-glow-narrow.png. Local only; nothing published.

Latest copy clarification: hero summary now reads “Second-year Computer Science student building software and exploring applied machine learning.” No other copy or styling changes. Visually verified text wrapping at 1280 × 947 and 390 × 844; no horizontal overflow. Evidence: ../work/cs-student-desktop.png and ../work/cs-student-mobile.png. Local only; nothing published.

Latest hero background: adapted the user-supplied Velaris WebGL/simplex-noise component to the static site, scoped only to the opening. Charcoal/burnt-orange colours replace the snippet's default green to retain the chosen brand family. Existing lettering, hero content, pill links and orange pointer glows remain; hero text and button fills are adjusted for dark-surface contrast. Projects and Background chapters are unchanged. The shader's reversed-edge smoothstep was corrected to a defined inverse smoothstep. No React/Tailwind migration, stock imagery, new icon family or external dependency.

Performance/accessibility: decorative canvas ignores input and is hidden from assistive technology; render cap 30fps, resolution capped at 1600px wide and DPR 1.25. Pauses when off-screen or document-hidden, supports reduced-motion still rendering, includes a Phosphor pause/resume control and solid CSS fallback for unavailable/lost WebGL. GPU resources and observers are disposed on non-cached page exit; context restoration rebuilds rendering resources. Reduced-motion and context-loss branches were code-reviewed, not separately browser-emulated.

Browser verification: shader rendered successfully at 1280 × 947 and 390 × 844; no overflow or captured warnings/errors. Pause changed accessible label/state to Resume/paused; resume restored Pause/animated. In a fixed 120 × 120 background crop, paused screenshots had mean pixel difference 0.0000 while moving screenshots differed by 9.6899 channel values, confirming real movement and a stationary pause. Navigating to Projects paused the off-screen hero; both original videos stayed readyState 4 without errors. Supporting text was brightened after a conservative shader-brightness contrast check (approximately 4.8:1 against the calculated upper background bound); the large name remains legible over decorative lettering. Initial lettering blending showed a rectangular dark backing; removed the nested isolation and recaptured a seamless result. Evidence: ../work/velaris-desktop.png, ../work/velaris-mobile.png, ../work/velaris-paused-a.png, ../work/velaris-paused-b.png, ../work/velaris-moving-a.png and ../work/velaris-moving-b.png. JS syntax checks pass. Local only; nothing published.

Latest hero-button enhancement: adapted the supplied React GlowCard pointer-following spotlight effect to the existing static site's View CV and GitHub anchors only. No React/Tailwind/shadcn migration or dependencies; no card sizing, Unsplash assets or Lucide icons added. Original destinations, labels, Phosphor arrows and pill shape remain. Uses orange/peach highlights to preserve the chosen palette, local pointer coordinates, pointerleave reset, keyboard-focus glow and reduced-motion tracking/transition fallback. Touch scrolling remains auto. During QA the inherited generic focus rule squared the pill corners and clipped the right focus ring; fixed with a scoped 999px focus radius and 10px right clearance, then recaptured. Both hover targets were visually checked; GitHub local pointer x changed from 79.60px to 19.60px as the pointer moved, and the inactive button reset. Exactly two elements have the effect. Desktop 1280 × 947 and mobile 390 × 844 show no overflow. Both hrefs unchanged; JS syntax passes and no captured browser warnings/errors. Reduced-motion fallback reviewed in code, not OS-emulated. Evidence: ../work/hero-spotlight-desktop.png and ../work/hero-spotlight-mobile.png. Local only; nothing published.

Latest colour update: Education now blends into Background with a #211e1c surface, #3d3733 border/divider, #f5f2ed primary text and #b7b1ac secondary text. No layout or content changes. Desktop (1280 × 947) and mobile (390 × 844) were visually inspected; computed colours confirmed and no horizontal overflow found. Evidence: ../work/dark-education-desktop.png and ../work/dark-education-mobile.png. This supersedes the light Education inset palette below. Local only; nothing published.

Current layout update: renamed Experience to Background (including navigation) and moved the existing Education content into the previously empty left column below the heading. The separate Education band is removed; its warm-neutral palette is retained as a compact rounded inset within the charcoal Background section. Education now uses a subordinate h3 and h4 degree headings, while the Background h2 retains Projects typography. All school/course/date/subject/grade details and internship copy remain unchanged. Existing #experience and #education anchors remain valid and unique. Visually verified at 1280 × 947, 942 × 947 and 390 × 844; no overflow or text collisions. Mobile stacks education before the timeline. Evidence: ../work/background-education-desktop.png, ../work/background-education-tablet.png, ../work/background-education-mobile.png and ../work/background-timeline-mobile.png. Local only; nothing published. This supersedes earlier descriptions of a separate Education section.

Latest accent update: removed the decorative orange line under Experience, including its mobile spacing rule. Marigold now shares Hexa's orange company/location/date and Phosphor timeline marker (#ff7858). Browser-computed metadata and marker colours match for both entries; heading ::after content is none. Visually checked at 1280 × 947 and 390 × 844 with no horizontal overflow. Evidence: ../work/experience-accents-desktop.png and ../work/experience-accents-mobile.png. Text, demos and other sections are unchanged. No publication.

Follow-up: Experience and Education now share the Projects typography rule: clamp(36px, 5.2vw, 72px), weight 600, line-height 1.05, letter-spacing -.055em and uppercase. Education's desktop heading column now matches Experience's proportions to accommodate the larger label; mobile stays stacked. Existing colours, copy and demos remain unchanged. Browser-computed typography is identical across all three headings at 1280px (66.56px font) and 390px (36px font). Both views were visually inspected with no horizontal overflow. Evidence: ../work/matching-headings-desktop.png, ../work/matching-headings-mobile-experience.png and ../work/matching-headings-mobile-education.png. Local only, no publication.

Clarification: the user wanted the original label, not the older styling. Confirmed “Projects” in the 2026-10-15 portfolio-source snapshot (index.html line 39) and earlier local preview (line 41). Changed the label to “Projects” and retained the large uppercase editorial styling. No other content changed. Visually verified at 1280 × 947 and 390 × 844 with no horizontal overflow. Evidence: ../work/projects-label-desktop.png and ../work/projects-label-mobile.png. This supersedes the preceding small-heading correction. Local only; nothing published.

## Scope

The selected visual truth is the user's supplied Kyriakos Michael screenshots: wide demo-left/copy-right project rows, a dark technology strip, and a two-column career timeline. The AI-assistant screenshot is palette inspiration only; no assistant is implemented. This is a structural adaptation, not a pixel clone. Existing wording, links, demos, student background and team attribution take precedence over the reference's sample content.

The latest brief supersedes the previous equal-card and covering-hero implementation: the decorative Selected work thumbnail and covering-sheet effect have been removed. The full-height opening remains in ordinary document flow.

## Evidence and normalization

Source images:
- Projects: C:/Users/rakhs/AppData/Local/Temp/codex-clipboard-513f1c72-58f7-4d14-a49f-17c428083a15.png (1721 × 935).
- Banner: C:/Users/rakhs/AppData/Local/Temp/codex-clipboard-9d1de7c2-f42e-4e69-9342-4c684c90b5dc.png (1738 × 252).
- Timeline: C:/Users/rakhs/AppData/Local/Temp/codex-clipboard-85a19b54-95b9-43aa-8a73-9616d3a3cfb4.png (1672 × 960).
- Dark palette inspiration: C:/Users/rakhs/AppData/Local/Temp/codex-clipboard-b2cca205-a1f2-4520-a2d2-da1398387c34.png.

Browser-rendered implementation:
- ../work/project-reference-viewport.png: CSS viewport 1720 × 935, native capture 1705 × 927.
- ../work/timeline-reference-viewport.png: CSS viewport 1672 × 960, native capture 1657 × 951.
- ../work/project-rows-desktop.png and ../work/skills-banner-desktop.png: CSS viewport 1280 × 947, capture 1265 × 936.
- ../work/project-rows-mobile.png and ../work/timeline-mobile.png: CSS viewport 390 × 844, native capture 375 × 811.
- ../work/timeline-desktop.png: normal desktop viewport, focused readable timeline view.

Combined source-left/implementation-right comparisons were generated and opened in the same image input:
- ../work/projects-comparison.png
- ../work/timeline-comparison.png
- ../work/banner-comparison.png

Comparisons downsample each image to 800px wide, preserving proportions, separated by a 16px gutter; no upscaling or stretching. Browser capture uses native raster scaling, recorded above rather than claiming device-scale 1. The full viewport comparisons assess structure. Focused 1280px project/banner and 942px timeline views plus mobile screenshots were inspected for readable text, controls, spacing and icons. The banner comparison includes surrounding hero/projects context; only the strip is the matching target. Source content, available job count, exact typeface and selected section colours intentionally differ.

State: project disclosures collapsed, videos paused at first frame for main captures. Playback, expanded contribution and banner pause/resume were tested separately. One initial timeline capture landed in the projects region; it was discarded and recaptured after explicitly framing Experience. Browser screenshot failures on the old tab were resolved with a fresh preview tab; final evidence is from the working tab.

## Required fidelity surfaces

- Typography: existing Inter and JetBrains Mono retained. Uppercase editorial section headings, smaller mono categories, prominent project/job titles and readable body copy follow the source hierarchy. Titles are real text with no truncation. Mobile project titles wrap normally; the long Marigold title occupies two lines.
- Layout rhythm: projects use one row each with 1.15fr/.8fr demo/copy tracks, balanced spacing and separators. The existing centered content width is retained rather than copying the reference's near-edge-to-edge width. Demos have matching 16:10 stages and 10px corners; their native aspect ratios are contained, not stretched. Mobile becomes one column. Experience has a heading rail on the left and connected job markers on the right; mobile places the heading above the timeline. Education stays separate to preserve existing content.
- Colour: light grey Projects #f5f5f5, warm charcoal Experience #1b1918, warm-neutral Education #f1eee8. The original orange identity remains. Dark-section orange is lightened to #ff7858 for legibility, not replaced with an unrelated accent. Computed contrast against charcoal: off-white 15.69:1, muted text 8.26:1, accent 6.74:1. These pass normal-text AA.
- Images and icons: both original MP4 demos, captions, footage credit and generated hero lettering remain. No reference personal artwork or sample project logo is copied. All authored icons use official Phosphor regular assets, including squares-four, circle, pause/play and arrows. Browser video controls remain native.
- Copy: project word multisets and exact titles/subtitles match the pre-change HTML; Experience and Education word multisets also match. The 17 unique banner technologies come from the CV already linked on the website. No screenshot-only skills, senior roles, years-of-experience claims or invented achievements were added. CV itself is unchanged.

## Findings and comparison history

No actionable P0/P1/P2 issues remain within the requested structural adaptation.

Intentional differences: own videos replace the reference's branded placeholder; original descriptions/disclosures remain; fewer timeline entries and concise copy reduce section height; current centered container, rounded video frames, fonts and orange identity are preserved. The reference is not a mobile specification, so the responsive stack is an adaptation.

The previous cover/equal-card QA report is superseded by this report. No source-fidelity defect required a second implementation iteration in this pass. The old tiny decorative heading image is removed, and the user-requested cover removal is verified.

## Interaction and resilience checks

- Both videos played with advancing time (audio demo 3.007s; opportunity-cost demo 4.203s), readyState 4, no media errors; both paused afterwards.
- My contribution opens and closes; all individual-work text and collaborator names remain visible and unclipped.
- Technology banner has equal-width repeat groups, a working pause/resume button, updated accessible labels and Phosphor pause/play icons. Paused computed state confirmed; resumed transform advanced between observations.
- Reduced-motion CSS removes automatic marquee movement, hides the duplicate/button and allows manual horizontal scrolling. OS reduced-motion preference was not separately emulated.
- No horizontal overflow at 1720, 1672, 1280 and 390 CSS pixels.
- Experience rail has no transform, no scripted pin spacers; static on mobile and native sticky on wide desktop.
- Opening position is relative and its top decreases with document scroll; no covering panel or focus-forced jump remains.
- Browser fonts loaded; no captured warnings/errors in the final tab.
- JavaScript syntax, local references, preserved content and icon checks pass.

## Implementation checklist

- [x] Demo-left/copy-right project rows; mobile stack.
- [x] CV-backed technology strip with pause and reduced-motion fallback.
- [x] Timeline presentation, charcoal chapter and neutral Education.
- [x] Original wording, demos, links and accurate team attribution.
- [x] Removed tiny heading thumbnail and hero-cover effect.
- [x] Desktop/mobile visual browser verification and combined reference comparison.
- [x] Local only: no GitHub, deployment or public-site changes.

Residual test gaps: OS-level reduced-motion emulation and exhaustive browser/assistive-technology testing were not performed.
