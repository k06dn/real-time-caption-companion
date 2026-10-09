# Caption+ redesign
- [x] Build editorial homepage and paper-like feature cards.
- [x] Add interactive lecture/code/slides demo and transcript export.
- [x] Connect waitlist links to the existing Caption+ website, without claiming new signup storage.
- [x] Verify desktop/mobile layout, playback, scene switches, and transcript download.

## Calm, minimal revision
- [x] Remove all eyebrows and simplify the page into a clear introduction, demo, benefits, story, and waitlist.
- [x] Use the supplied Ensaio serif, retain green accents, and add meaningful icons. Supplied fonts are trial editions; publishing license must be checked by the owner.
- [x] Show multiple scripted speakers with initials portraits, without green status lights.
- [x] Verify desktop/mobile layout, font loading, all three speaker selections, playback controls, scene changes, and transcript export; no runtime errors or mobile overflow.

## Founder and typography refinement
- [x] Use Medium headings with tighter spacing, darker sans text, and text-only branding.
- [x] Add Nishit's portrait, improved founder narrative, prominent pilot/supporter details, and clear DSA-in-progress copy.
- [x] Add legal and privacy information pages without inventing unapproved policies or business details.
- [x] Verify desktop/mobile presentation, loaded Medium font and portrait, no overflow/runtime errors, and legal navigation with unique page titles.
- [ ] Publish full privacy policy and terms: blocked on Nishit's legal operator/contact details, approved data-handling facts, and policy text approval.

## Accessibility and clarity
- [x] Enlarge sans-serif text and touch targets, improve focus visibility, and keep the demo link visibly styled.
- [x] Improve demo playback and accessible transcript controls; verified playback, pause, speaker switching, scene panels, export, and focus return.
- [x] Move UAL pilot information above the demo, format the founder quote with attribution, capitalise Deaf, enlarge Supported by, and replace waitlist copy.
- [x] Check layout at 1280/845/390/320px, keyboard access, and existing policy page metadata; no overflow, runtime errors, or automated WCAG A/AA findings in the tested homepage state.

## Demo controls and caption motif
- [x] Remove the browser microphone experience and its related copy.
- [x] Add keyboard-accessible caption size, contrast, and playback controls.
- [x] Redesign the Memory management slide as a clear allocate-use-release flow.
- [x] Add a subtle, static halftone cascade motif across key page transitions.
- [x] Verify controls, keyboard flow, reduced motion, transcript actions, and desktop/mobile layouts.

## Visual cleanup
- [x] Remove all halftone-dot decoration, including the demo slide pattern.
- [x] Simplify the founder story into a clearer portrait, quote, and concise context.
- [x] Verify the cleaned homepage at desktop and mobile widths and recheck demo controls.

## Virtual-call slide and typography
- [x] Make only the Slides demo view resemble a virtual call with shared learning material; keep Lecture and Code unchanged.
- [x] Collapse caption accessibility controls behind the supplied person icon.
- [x] Enlarge and rearrange the founder story so the quotation reads more distinctly.
- [x] Standardise the page around two or three clear font sizes.
- [x] Verify the revised interactions and desktop/mobile layouts.
- [x] Make the demo speaker avatars slightly smaller with more even spacing; verified the selection ring stays clear of neighbours at 1280/390/320px.
## Beta waitlist form
- [x] Replace the external waitlist link with an on-site form in a green band: heading and DSA note on the left, form card on the right.
- [x] Store signups in a new beta_waitlist table (name, email, role) with insert-only access for visitors; duplicate emails get a friendly "already on the list" message.
- [x] Verified submission end-to-end in the preview and confirmed the stored row, then deleted the test row. Owner email notifications are still to be arranged.
- [x] Make the form more informative: name, email, optional university or organisation, and a role choice; the optional field is stored alongside the rest.
- [x] Replace the ragged left-aligned role bubbles with one neat option row aligned to the inputs and submit button; verified single-line options, one-line labels, and no overflow at 1280/900/390/320px.

## FAQ presentation
- [x] Widen the FAQ to the full page container so questions, answers, and divider lines all span edge to edge; verified at 1280/845/390px with no overflow.
