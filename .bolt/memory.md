# Project memory

## Product intent & audience

- **YIU** — an AI chat assistant that answers using a user-uploaded knowledge base and connects to free AI providers (e.g., OpenRouter) via user-supplied API keys.
- Audience: individual users who want a personal, knowledge-grounded AI assistant without server-side storage.
- Core surfaces: Chat, Knowledge Base upload, Settings (API keys / model selection).
- Repository was essentially empty at start (license, gitignore, empty package-lock.json); YIU is being built from scratch.

## Brand personality & voice

- Tone: direct, capable, "Godspeed" energy — efficient and unceremonious.
- UX copy should use plain-language error messages and friendly placeholders; avoid technical jargon in user-facing text.

## Visual design & UX direction

- Clean, modern aesthetic; consistent color theme (specific palette TBD — pending user preference).
- Layout: sidebar navigation + main content area; three switchable views (Chat, Knowledge Base, Settings).
- Responsive: works on phone and desktop.
- Chat: distinct visual treatment for user vs. YIU messages; bottom input box with send button; typing/loading indicator.
- Knowledge Base: drag-and-drop upload zone; document list with names + remove action; status indicator of loaded knowledge volume.
- Settings: labeled API key field, model picker (short list of free OpenRouter options), test-connection button, connected/ready on/off indicator.
- Include empty states, loading states, and friendly placeholders across views.

## Decisions, constraints & rationale

- **No database attached** to the project yet → knowledge base and API keys stored locally in the browser (persist between visits, never sent anywhere except the chosen AI provider).
- **Self-contained browser app**; no backend required for MVP.
- Knowledge base files: text-based formats planned (.txt, .md, .pdf, .csv) — pending confirmation.
- API key stored on-device only; sent solely to the selected AI provider.
- Chat automatically attaches relevant knowledge-base content as context to each message.
- Graceful error handling for missing/bad key, network issues — surfaced in-chat.

## Open questions & assumptions

- **What exactly is YIU?** Assumed AI chat assistant with KB + free providers; not yet confirmed by user.
- **Knowledge base format:** file upload (.txt/.md/.pdf/.csv) assumed; alternatives (Q&A pairs, website URL) not ruled out.
- **Look and feel:** no preference stated yet; options offered — dark/futuristic, clean/minimal, warm/friendly, or specific color.
- Assumption: local browser storage is acceptable until/unless a database is added later.
- Assumption: OpenRouter is the primary provider; "free API keys" may include other providers beyond OpenRouter.