# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: hiring managers, team leads and HR at local Uzbek companies (Tashkent tech companies, agencies, startups) evaluating Izzatjon Akbarov as a frontend developer hire. They arrive from a CV, LinkedIn, Telegram or a referral link, often on a phone, and need to judge quickly whether he can ship real product UI and whether to reach out.

## Product Purpose
A personal portfolio site for Izzatjon Akbarov, Frontend Developer based in Tashkent. It exists to turn a curious visitor into a conversation. Success is the visitor contacting him (contact form, Telegram, email or phone).

## Positioning
A frontend developer who has shipped role-based ERP and LMS dashboards used by real language centers (Forward School ERP, EduCoin LMS, live at educoinapp.uz), now also teaches and mentors (Habsida Academy). His proof is working, multi-role product UI rather than demo sites, and he brings endurance-athlete discipline (1st place 5km New Uzbekistan Run, Big Chimgan summit) to the work.

## Operating Context
- Visitors read in English, Uzbek or Russian; all three locales are served (`/en`, `/uz`, `/ru`) via next-intl, with copy in `messages/*.json`.
- Contact form posts to `/api/contact`; phone with country code is optional.
- Direct channels: Telegram t.me/akbrvi, email iadevcdr@gmail.com, phone +998 77 354 35 50.
- Profiles: GitHub IzzatjonAkbarov, LinkedIn, LeetCode izzatjonakbarov.
- CV PDF at `/cv/Izzatjon_Akbarov_CV.pdf`.
- An embedded AI customer agent (Make Agent Fast) sits bottom-right on every page.

## Capabilities and Constraints
- Stack: Next.js 16 (App Router, `[locale]` segment), React 19, Tailwind CSS 4, framer-motion, shadcn/base-ui components, next-themes, Vemetric analytics.
- Must keep: three languages with a switcher; light and dark themes with a toggle (system default); the Passions section (races and summits with photos, stats and a full-story modal); the AI agent embed.
- Sections: Hero, About (bio, tech stack, spoken languages), Experience (work timeline + education), Projects (EduCoin LMS, Chatty), Passions, Contact, Footer.
- Copy must work across EN/UZ/RU lengths; Russian and Uzbek strings run longer.

## Evidence on Hand
- Photos: `public/images/profile.jpg`, `public/images/hero-portrait.jpg`, `public/images/activities/*.jpg` (New Uzbekistan Run x2, Bukhara Night Race, Big Chimgan, Begiztash).
- Live projects: educoinapp.uz, chat-app-vert-sigma-96.vercel.app.
- Achievements: New Uzbekistan Annual Run 2026 1st place 5km (<20 min); Bukhara Night Race 10km finisher; Big Chimgan 3,309m and Begiztash 2,025m summits; IELTS 6.5.
- No testimonials, client logos, metrics on project usage, or project screenshots exist yet; do not fabricate them.

## Product Principles
1. Every screen should move a local hiring manager one step closer to contacting him.
2. Show shipped product work concretely; specifics beat adjectives.
3. Equal quality in all three languages; no locale is a second-class translation.
4. The person behind the code (teacher, runner, climber) is part of the case, not a distraction from it.
