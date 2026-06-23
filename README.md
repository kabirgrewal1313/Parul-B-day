# Parul's Story

An interactive anime visual-novel birthday website for Parul's 21st birthday.

## Run The Site

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If `npm` is not available in your terminal, open the project in an environment with Node.js installed and run the same commands there.

## Homepage Section Map

The homepage order is controlled in `src/app/page.tsx`. Move, remove, or reorder sections there.

| Page Order | What You See | File To Edit |
| --- | --- | --- |
| 1 | Opening animation: "21 winters", "21 seasons", Parul title | `src/components/IntroSequence.tsx` |
| 2 | Main anime splash hero | `src/components/HeroSplash.tsx` |
| 3 | Profile chapter with photo and stats | `src/components/ProfileChapter.tsx` |
| 4 | Manga page-turn transition | `src/components/MangaTransition.tsx` |
| 5 | Character form carousel | `src/components/CharacterCarousel.tsx` |
| 6 | Electrical engineering chapter | `src/components/ElectricalChapter.tsx` |
| 7 | Music chapter | `src/components/MusicChapter.tsx` |
| 8 | Memory constellation | `src/components/MemoryConstellation.tsx` |
| 9 | Ice crystal memories | `src/components/IceCrystalMemories.tsx` |
| 10 | Personal letter chapter | `src/components/LetterChapter.tsx` |
| 11 | Secret ending | `src/components/SecretEnding.tsx` |
| 12 | Final chapter | `src/components/FinalChapter.tsx` |

## Shared Content

Most editable names, stats, memories, friend entries, image paths, and letters live in:

```text
src/lib/story-data.ts
```

Change this file when you want to update:

- Parul profile stats
- character carousel cards
- friend names and messages
- memory constellation entries
- letter text
- image paths used across multiple sections

## Images

Image files live in:

```text
public/images/
```

Current key files:

- `public/images/parul-anime-hero.png` controls the main hero foreground art.
- `public/images/anime-placeholder.png` is still used by some character cards.
- `public/images/parul-cafe.jpeg` and `public/images/parul-saree.jpeg` are personal photo assets.
- `public/images/ui-reference.png` is the visual reference image.

After adding a new image, reference it with a path like:

```ts
"/images/my-new-image.png"
```

## Styling Guide

Global styles and animation keyframes live in:

```text
src/app/globals.css
```

Font and theme tokens live in:

```text
tailwind.config.ts
```

Current font hierarchy:

- Hero typography: `Cormorant Garamond`
- Chapter titles: `Cinzel`
- Body/UI text: `Inter`
- Personal letters: `Kalam`
- Manga effects: `Bangers`
- Japanese decorative accents: `Zen Old Mincho`

## Hero Editing Notes

The hero is layered like an anime splash page:

1. bright winter background gradient
2. giant low-opacity background words
3. foreground anime illustration
4. snow, petals, crystals, butterflies, and stars
5. soft foreground bloom

Edit the layer content in `src/components/HeroSplash.tsx`.

Edit sizing, glow, parallax feel, and responsive behavior in `src/app/globals.css` under the `.hero-splash` classes.

## Other Routes

The homepage no longer shows the top navigation menu, but these pages still exist:

- `/memories` from `src/app/memories/page.tsx`
- `/friends` from `src/app/friends/page.tsx`
- `/contribute` from `src/app/contribute/page.tsx`
- `/admin` from `src/app/admin/page.tsx`

## Backend Notes

The contribution and admin flows use Vercel serverless functions under `/api`, backed by **Supabase** (PostgreSQL + Storage).

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Wait for the database to finish provisioning.

### 2. Run the database SQL

1. Open **Supabase Dashboard → SQL Editor → New query**.
2. Paste the contents of `database/schema.sql`.
3. Click **Run**.

This creates the `memories` table, row-level security policies, and the `memory-images` storage bucket.

### 3. Configure environment variables

1. Copy `.env.example` to `.env.local` (or edit the existing `.env.local`).
2. In Supabase, go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret; backend only)
3. Leave `NEXT_PUBLIC_API_BASE=/api` for Vercel and normal Next.js local dev.

### 4. Run the Next.js app

```bash
npm install
npm run dev
```

### 5. Verify everything works

- `http://localhost:3000/api/health` should return `"status":"ok"` with database and storage marked reachable
- `/contribute` submits to `POST /api/memories` (images go to Supabase Storage)
- `/admin` loads `GET /api/admin/memories` and approves via `POST /api/admin/memories/{id}/approve`

### Production On Vercel

- Set `NEXT_PUBLIC_API_BASE=/api`, or leave it unset.
- Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_STORAGE_BUCKET` in Vercel.
- Redeploy after changing env vars.
