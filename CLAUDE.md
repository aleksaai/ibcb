# IBCB

Internes/Aleksa-eigenes Projekt. Repo: `aleksaai/ibcb`.

## Team Context

- `/Users/destinypraktika/Desktop/claude-team/CLAUDE.md`
- `/Users/destinypraktika/Desktop/claude-team/ai-team/projects/ibcb/SUMMARY.md`
- `/Users/destinypraktika/Desktop/claude-team/ai-team/projects/ibcb/LESSONS.md`

## Wichtige Lesson

**Netlify env-var Silent-Override:** bei diesem Projekt hat Netlify mal alte `VITE_SUPABASE_*` env-vars behalten und die neuen ignoriert. Seitdem Regel für alle IBCB-ähnlichen Projekte: Supabase-URL + Anon-Key in `src/lib/supabase.ts` hardcoden (Anon-Key ist public JWT, safe zu committen).

Bei Fragen: `/marcus`.
