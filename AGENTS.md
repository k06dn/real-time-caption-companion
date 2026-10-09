<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the Caption+ homepage composed of focused presentation components with semantic visual tokens in src/styles.css, so the editorial design remains consistent.
- The interactive demo runs client-side, using a scripted lecture and optional browser speech recognition; it does not imply the production Caption+ engine or speaker identification.
- Send waitlist registrations to the existing Caption+ website until a registration service is explicitly connected, avoiding false signup confirmations.
- Pre-optimize route-split UI dependencies and reject outdated optimizer requests in Vite, so hot updates cannot combine mismatched React instances.
- Load supplied heading fonts with local @font-face declarations using CDN asset pointers, so typography stays consistent without bundling uploaded binaries.
