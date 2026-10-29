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

- Keep the institutional site as a single page with section-anchor navigation and the quote assistant as a separate component, so presentation changes do not alter quotation logic.
- Define all visual roles in the global stylesheet and use the shared Button component for actions, so the light sections and inverse branded sections stay consistent.
- Keep mobile quotation shortcuts in a safe-area-aware fixed bar and reserve matching page space, so quote access stays visible without hiding the final page content.
