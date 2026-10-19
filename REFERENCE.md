# Local visual references

## Current presentation

Responsive canvas (2026-10-19): all major sections now share fluid width with18–96px responsive gutters, removing the old1160px cap. Wide-screen typography, controls and spacing scale within bounded ranges. Stacked cards share available track space equally; when both fit, ordinary page scrolling is used, while overflowing carousels retain pinning when their content fits the screen height. Matching outer cards, contained equal video frames and aligned link/disclosure rows remain. Supersedes older fixed-container descriptions.

Latest media decision (2026-10-19): both stacked carousel video frames now share1280/900 proportions. The shorter finance recording is contained within its frame with black top/bottom bars, without cropping/stretching. Equal outer cards and aligned captions/GitHub/disclosures remain. This supersedes previous independent native-ratio stage descriptions; the recordings themselves are unchanged.

Stacked card rows share measured heights so GitHub links and the first disclosure dividers align across projects, including wrapped mobile text. Native-ratio videos remain top-aligned/uncropped; their height difference becomes a gap below the shorter figure. Shared section margins are unchanged.

Current stacked card treatment: matching outer widths/heights, thin grey borders,16px rounded corners and a white surface. Shared width uses the tighter native-ratio height budget; shared height follows the tallest content, including expanded details. Videos retain their different original ratios and remain uncropped, so unused space is inside the outer card rather than added to the video frame. Supersedes earlier individually sized slide widths.

Current media sizing: native recording ratios (narration1280/900, finance1728/1080), with no extra player letterboxing, stretching or cropping. Stacked slide widths adapt to the height budget rather than forcing mismatched player heights. A readable minimum and unpinned short-screen fallback remain. This supersedes earlier fixed-height/letterboxed stage descriptions below.

Current stacked carousel: shared section/container margins, narrower individual slides (68% desktop, 80% narrow laptop, 92% phone) so the next project is visible alongside the current one on desktop. This supersedes the full-width individual-slide experiment below. Last-slide anchors and pinned travel end at actual overflow, with no trailing blank scroll. Content and recordings are unchanged; default split layout remains unchanged.

Latest stacked-width refinement: the comparison carousel and each slide's children now use the available viewport width with small responsive edge gutters, replacing the earlier container/840px caps. The video remains contained within the one-screen height budget; black letterboxing preserves its original proportions. Default split layout unchanged. Desktop/mobile evidence is recorded in design-qa.md.

Optional comparison: ?layout=stacked shows each project as a centred vertical sequence: title/summary/technologies, wide demo, then GitHub/context/build details. Original content and media are retained, and reading order matches the presentation. Compact spacing and a measured remaining-height allocation for the contained video fit both collapsed projects within desktop and laptop screens (verified at 1280×947 and 735×650), retaining pinned horizontal scrolling and natural release into Background. Text is not scaled down. Expanded details or smaller screens retain the safe unpinned reading fallback; mobile remains ordinary flow. The default URL still uses the existing split layout. Nothing published.

Pinned alignment refinement: the Projects heading retains its top position, while the demo/text row is vertically centred in the space beneath it using a full-viewport flex column and equal automatic track margins. Both project slides share that alignment. Unpinned and mobile layouts remain unchanged.

Current Projects interaction: native vertical scrolling drives a smoothly interpolated horizontal carousel inside a CSS-sticky full-viewport scene. Projects stays in place until the final project, then the page continues normally to Background. There is no snapping on stop, wheel cancellation or scroll lock; reverse scrolling retraces the carousel. Arrows/keyboard/hash links align page and carousel progress. On phones, short viewports, tall expanded content or reduced motion, pinning is disabled so all content remains readable in ordinary flow. This supersedes earlier wheel-only behaviour. The obsolete ScrollTrigger dependency/refresh calls are removed; the GSAP hero intro is retained.

Current scroll behaviour: direct 1:1 wheel-distance mapping with light smoothing, no idle snap or CSS scroll snapping. It stays wherever scrolling stops, including between projects. Both visible projects remain usable at intermediate positions, and arrows/keyboard still select full project anchors explicitly. Mobile horizontal scrolling is also unsnapped. This supersedes the older settling behaviour below.

Latest motion refinement: vertical wheel distance now feeds continuous eased horizontal movement, then smoothly settles onto a complete project after input stops. The previous whole-slide gesture trigger is replaced. Native snapping is suspended during interpolation and restored at rest; pointer/keyboard/resize operations cancel it cleanly. Reduced motion remains immediate; page-scroll boundary release and mobile reading behaviour are preserved.

Latest wheel interaction: on wider screens with the full project panel visible, vertical scroll down advances right and scroll up returns left. Outward scrolling at the first/last slide resumes normal page scrolling; trackpad momentum is limited to one slide per gesture. Mobile/tall panels retain vertical reading scroll. Horizontal scrolling, arrows and keyboard controls are unchanged. This supersedes the earlier wheel behaviour description.

Latest project presentation (2026-10-18): one complete project per horizontal carousel slide, with previous/next arrows, a position indicator, keyboard navigation and native swiping/scrolling. No autoplay. Video and copy remain side by side above 600px, including the previously broken 735px view, and stack within each slide on narrow phones. Alternating project order, demos, copy, disclosures, credits and team attribution are retained. Inactive videos pause; slide height adjusts to expanded content. This supersedes the older vertically stacked project-row presentation below. The hero intro and buttons now share a bottom-aligned row above 600px, removing the annotation's empty space; mobile uses a compact stacked row.

Latest sensitivity adjustment: navigation spotlight radius increased from 26px to 38px at the user's request. Blur remains 2px; idle borders stay invisible, exit hiding remains immediate and hero button effects are unchanged.

Approved hero update (2026-10-18): the bottom-left introduction is now “Second-year Computer Science student at the University of Warwick.” The separate top-right university label is removed. “Seeking software engineering internships.” remains underneath. CV/GitHub are bottom-right, stacking below and aligning right on mobile; their existing effects and destinations remain. Desktop/mobile screenshots are recorded in design-qa.md. This supersedes the pending approval note below.

Latest local refinement (2026-10-18): only the rs. monogram remains in the top-left navigation; the central full name remains. The hero's bottom border/rounding and gap above the technology banner are removed. The introduction and separate top-right Warwick label are still awaiting the user's wording/placement approval and have not been changed in this refinement.

Navigation highlights use a small 26px pointer-centred radius and 2px blur, with both horizontal and vertical tracking. They disappear immediately on exit, without recentering the glow; accessible keyboard focus stays visible. Hero CV/GitHub buttons retain the original larger glow. Repeated section labels and narration explanations were trimmed with the Humanizer guidance, preserving useful limitations, team attribution, credits and destinations. The technology banner and both project recordings are retained unchanged.

The user's Kyriakos Michael screenshots guide the latest project rows, technology banner and internship timeline. The earlier Behance hero adaptation remains, but the Selected work thumbnail and hero-cover/sliding-window interaction are removed. The opening fills the viewport and now scrolls normally.

Projects display one per row with alternating desktop order: narration demo left/copy right, then Opportunity Cost Engine copy left/demo right. All category/title/description/technologies/GitHub/context/disclosures are unchanged. Mobile follows each row's reading order: narration demo then copy; Opportunity Cost Engine copy then demo. Both video stages have matching dimensions without stretching their recordings.

The black sliding banner lists only technologies present in assets/Rakhshethan-Subenthiran-CV.pdf:
Python, TypeScript, JavaScript, Java, SQL, React, Vite, Flask, Tailwind CSS, NumPy, Matplotlib, scikit-learn, Chart.js, Git, GitHub, Vercel and Jira.
The CV was read, not modified. Pause/resume and a reduced-motion/manual-scroll fallback are included.

Background combines the original internship timeline with Education in the open left column beneath the section heading. The navigation label matches. Its warm charcoal #1b1918 background contrasts with light-grey Projects. Education blends into the section with a #211e1c inset, subtle #3d3733 border/divider, off-white #f5f2ed text and muted #b7b1ac metadata. All original school/course/date/subject/grade and internship details remain. Mobile stacks education before the internships. Orange #ff7858 keeps the established identity and readable contrast. Both internships have matching orange metadata and markers; there is no heading underline. The AI-assistant reference inspired only a contrasting dark chapter; there is no AI assistant.

## Existing hero and assets

The user's Velaris React snippet is adapted in velaris.js as a dependency-free WebGL opening background. It retains the noise blending, vignette and grain with charcoal/burnt-orange colours instead of default green. The original lettering blends over the canvas; hero text and pill fills suit the dark surface. Other chapters keep their existing colours. The effect has a Phosphor pause/resume control, reduced-motion still state, off-screen/document-hidden suspension, capped resolution/frame rate and a solid CSS fallback. It is local-only.

The supplied GlowCard React snippet is adapted as dependency-free CSS/JavaScript for the hero View CV/GitHub links and, following the user's later request, the top Projects/Background/LinkedIn links. Hero pills retain their shapes; navigation has fully invisible idle borders and pointer-following hover highlights with 10px corners. Destinations are unchanged; keyboard focus is outlined, touch scrolling is unrestricted, and reduced motion disables tracking/transitions. This does not change the site's framework or add effects to project cards/footer links.

Original hero reference: [UI/UX DESIGN PORTFOLIO 2026 by Nguyen Paxton](https://www.behance.net/gallery/244569769/UIUX-DESIGN-PORTFOLIO-2026).

The static Behance presentation inspired flowing lettering behind the user's smaller name. The chosen grey/black/orange palette and accurate student content remain. This is an adaptation, not a pixel clone.

assets/portfolio-lettering.png is an original AI-generated 1774 × 887 decorative asset, hidden from assistive technology. The name and portfolio information remain real HTML.

Original asset prompt: “Original decorative lettering backdrop for a personal portfolio hero. Wide 2:1 black composition. Only word ‘Portfolio’, huge flowing italic calligraphic editorial lettering, thin hairlines and bold contrasting strokes, dark silver graphite highlights no brighter than #555555, darker middle for HTML name overlay. Flat printed lettering; no person, name, logo, UI, watermark or additional text.”

All authored icons are official Phosphor regular v2.1.1. Native video controls are unchanged. Existing GSAP intro/media motion remains; Experience uses native CSS sticky positioning only on wide layouts.

See design-qa.md for current browser evidence and comparison details. Nothing has been published or pushed.
