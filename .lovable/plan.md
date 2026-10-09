# Caption+ demo and cascading motif

## What will change

### Make the demo easier to use
- Remove the microphone and “Try your voice” experience entirely for now, including its notices and microphone-specific copy.
- Add a compact, always-visible accessibility toolbar with keyboard-operable controls for:
  - caption size: three clear presets
  - caption contrast: standard and high contrast
  - transcript playback: pause and resume, with state announced clearly
- Keep the existing lecture controls and multi-speaker initials, while avoiding duplicate or confusing pause controls.
- Improve the Memory management slide into a clear visual sequence showing allocation, use, and release, with a small memory-block diagram and concise teaching copy. It will stay legible behind the caption panel on both desktop and mobile.

### Introduce the caption leitmotif
- Add a subtle, static cascade system made from small halftone dots that thin out and drift across selected transitions.
- Use it sparingly: a short trail near the opening area, a quieter bridge around the middle sections, and the fullest—but still restrained—cascade approaching the footer.
- Build the motif from decorative CSS using existing semantic colours, with no meaning conveyed by the dots, no focusable elements, and no animation. Decorative layers will be hidden from assistive technology and kept behind all content.
- Echo the same left-to-right flow in the Memory management diagram, so the motif feels connected to captions progressing naturally rather than added as decoration.

## Accessibility and verification
- Preserve visible focus styles, 44px targets, text contrast, and screen-reader labels/state for every new control.
- Ensure caption-size changes do not overflow or obscure the speaker information.
- Verify keyboard-only operation, pause/resume behaviour, all size and contrast settings, scene switching, transcript opening/export, reduced-motion behaviour, and desktop/mobile layouts.
- Re-run an accessibility-focused code review and confirm the preview has no build, runtime, or console errors.

## Technical notes
- Keep the demo client-side and scripted; removing voice mode does not change the underlying Caption+ product claim.
- Store settings only for the current page visit unless persistence is requested later.
- Implement the halftone motif with CSS masks/background patterns rather than image assets, keeping it crisp and lightweight.
