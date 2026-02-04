Design Document: TrenchesPad UI (The "Cyber-Trench" Adaptation)
Reference: Adapted from Pratham Singh's "Daily UI 32" Structure. Theme: "Terminal Chic" / Cyberpunk / High-Contrast Dark Mode. Goal: A clean, high-conversion crowdfunding interface wrapped in a "hacker" aesthetic.

1. Visual Language & "Vibe"
Instead of the standard clean white background found in most Dribbble shots, we are inverting everything to fit the "Trenches" narrative.

Background: Deep Void Black (#050505) to Slate Grey (#0F172A).

Primary Accent: "Trenches Green" (#00FF41) or "Matrix Green" for success states/buttons.

Secondary Accent: "Alert Orange" (#FF5F1F) for deadlines and "Refund" buttons.

Typography:

Headers: Space Mono or Courier New (Terminal style).

Body: Inter or Roboto (Clean readability).

Borders: Thin, 1px borders everywhere. No soft shadows; use hard neon glows instead.

2. Component Breakdown (The "Daily UI 32" Structure -> Trenches Style)
A. The Hero Section (Top Fold)
Layout: Split screen or Centered Text.

Visuals:

Headline: "FUND THE RESISTANCE" or "DEPLOY CAPITAL" in large, glitched monospace text.

Subtext: "The first Claude-native crowdfunding platform on Base."

Primary Button: "START CAMPAIGN" -> Styled as a terminal command prompt (> INITIATE_PROTOCOL).

Stats Ticker: Scrolling text at the bottom showing "Total ETH Raised" and "Active Trenches".

B. The Campaign Cards ("The Frontlines")
This is the core of the Daily UI 32 design, adapted.

Shape: Rectangular cards with sharp corners (rounded-none).

Image: Grayscale project image that turns full color on hover.

Progress Bar:

Instead of a smooth fill, use a "segmented" block loader (e.g., [|||||||||.....]).

Color changes from Red (low funding) to Green (goal met).

Data Points:

"Supplies": (ETH Raised) displayed in big bold numbers.

"Timer": Countdown clock in red.

Action: "REINFORCE" button (Invest) visible on the card.

C. Project Detail View (Modal or Page)
Layout: Two-column grid. Left side = Terminal/Log (Project Description). Right side = Control Panel (Invest).

"The Terminal": The description text appears as if it's being typed out (typewriter effect).

"Control Panel":

Input box for ETH amount looks like a command line input.

"Diamond Hands" Badge: A holographic sticker that appears if the user has already invested.

3. "Prompt Engineering" for Your UI
Copy this text into your Cursor/Antigravity chat to generate the exact CSS/Tailwind code:

Prompt for Frontend Agent: "I need a design system based on a 'Cyberpunk/Terminal' aesthetic for my crowdfunding DApp.

1. Colors (Tailwind Config):

Background: bg-slate-950

Surface: bg-slate-900 (with border border-green-900)

Primary Text: text-green-400

Accent: text-neon-green (Use a custom hex #00ff41)

2. Components:

Campaign Card: Create a React component that looks like a tactical HUD. It should have a segmented progress bar (green blocks). When hovered, the border should glow green (shadow-[0_0_15px_rgba(0,255,65,0.5)]).

Buttons: All buttons should have sharp edges (rounded-none). The 'Invest' button should have a 'glitch' hover effect.

Typography: Use a Monospace font for all headers (Project Name, ETH Amount) and a clean Sans for the description.

3. Layout:

Replicate a standard crowdfunding grid (3 columns).

Top of page: A 'Stats Ticker' that scrolls horizontally like a stock market ticker, showing live ETH prices and total platform volume."

4. Specific "Trenches" Features to Add
To make this stand out in the hackathon, ask your AI to add these specific UI flourishes:

"The CRT Effect": Add a subtle scanline overlay to the entire website pointer-events-none fixed inset-0 z-50 bg-scanlines opacity-10.

"Live Feed": A small box in the corner updating with "Wallet 0x... just contributed 0.5 ETH" in real-time.