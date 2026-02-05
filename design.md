Blockchain Wallet Landing Page (Black / Grey Edition)
1. Design Philosophy

Keywords:
Minimal · Monochrome · Premium · Technical · Confident

This design should feel like:

A financial instrument, not a “crypto toy”

Built for serious users

Calm, controlled, and quietly powerful

No loud colors.
No gradients screaming for attention.
Everything earns its place.

2. Color System (Strictly Monochrome)
Core Palette
Role	Color	Usage
Primary Background	#0A0A0A	Main page background
Secondary Background	#111111	Sections, containers
Surface / Card	#161616	Feature cards, steps
Border / Divider	#262626	Subtle separation
Primary Text	#F5F5F5	Headlines
Secondary Text	#A1A1A1	Descriptions
Muted Text	#6B6B6B	Labels, metadata
Accent (Neutral)	#FFFFFF	CTAs, highlights

⚠️ Rule:
No color accents except white. Contrast comes from light, spacing, and depth.

3. Background & Depth Treatment

Use layered dark surfaces instead of color variation

Soft shadows:

box-shadow: 0 20px 60px rgba(0,0,0,0.6)


Optional grain/noise overlay (2–4%) for texture

No strong gradients — if needed:

linear-gradient(180deg, #0A0A0A 0%, #0E0E0E 100%)


This gives a cinematic, Apple-meets-Web3 feel.

4. Typography System
Font Stack

Primary Font:

Inter or SF Pro Display

Optional Display Font (Headlines only):

Space Grotesk or Satoshi

Text Hierarchy
Level	Size	Weight	Usage
H1	56–64px	700	Hero headline
H2	40–48px	600	Section titles
H3	20–24px	600	Card titles
Body	16–18px	400	Paragraphs
Caption	12–14px	400	Labels, meta

Letter-spacing:

Headlines: -0.02em

Small text: 0.02em

5. Page Structure & Layout
5.1 Hero Section

Intent: Immediate authority and clarity

Layout

Left: Text

Right: Wallet UI mockup (dark UI, floating cards)

Hero Copy Example

Secure.
Minimal.
On-chain.

A wallet built for people who value control.


CTA Style

Primary: White background, black text

Secondary: Border-only button

Buttons

background: #FFFFFF
color: #000000
border-radius: 10px

5.2 Feature Section

Layout: 3–4 cards in a grid

Card Style

Background: #161616

Border: 1px solid #262626

Rounded: 14–16px

Icon: Monoline white icons only

Example Features

Self-Custody Security

Multi-Chain Support

Gas Optimized Transactions

Portfolio Intelligence

Hover effect:

Slight lift

Border lightens to #3A3A3A

5.3 Wallet Preview / Visual Section

This replaces color with form & motion

Floating UI screens

Subtle blur behind cards

Depth through scale and overlap

No neon.
No glowing edges.
Just confidence.

5.4 How It Works

Style: Linear, calm, instructional

Steps

Create Wallet

Secure Keys

Connect Chains

Transact Confidently

Each step:

Number in large faded grey

Short headline

One-line description

5.5 Trust / Stats Section

Examples

1M+ Wallets Created

$X B Secured On-Chain

Audited Smart Contracts

Typography does the work here — no icons needed.

5.6 Final CTA Section

Background: Slightly lighter dark (#111111)
Copy: Direct, confident

Take ownership of your assets.

Button repeated once. Nothing else.

6. Iconography & Visual Language

Thin stroke icons (1.5–2px)

No filled icons

Consistent geometry

Use SVGs only

Avoid:
❌ Color icons
❌ Emojis
❌ Illustrations with gradients

7. Motion & Interaction

Subtle. Purposeful.

Button hover: brightness + 2%

Cards: translateY(-4px)

Page load: fade + 8px upward motion

No bouncy easing — use ease-out

8. Design Tokens (Final)
--bg-primary: #0A0A0A;
--bg-secondary: #111111;
--surface: #161616;
--border: #262626;

--text-primary: #F5F5F5;
--text-secondary: #A1A1A1;
--text-muted: #6B6B6B;

--accent: #FFFFFF;
