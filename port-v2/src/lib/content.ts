/**
 * Single source of truth for every piece of copy on the site.
 * Edit here — no component holds hard-coded content.
 */

export const site = {
  name: "Satwik Rudra",
  wordmark: "SATWIK",
  role: "Full-Stack Developer",
  location: "Dallas, TX",
  email: "rudra.satwik1999@gmail.com",
  title: "Satwik Rudra — Full-Stack Developer | Web & Mobile",
  description:
    "Full-stack developer with 5+ years building web and mobile products with React, React Native, and Node.js. Currently at SevenTablets in Dallas.",
  url: "https://ssyo5540.github.io/satwik-rudra-portfolio",
};

/** TODO: swap these for your real profiles before launch. */
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/satwikrudra" },
  { label: "GitHub", href: "https://github.com/SatwikRudra" },
  { label: "Email", href: `mailto:${site.email}` },
];

export const nav = [
  { label: "Home", href: "#hero" },
  { label: "About Me", href: "#about" },
  { label: "Experience", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "What I Do", href: "#capabilities" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  headline: ["Web & Mobile,", "Built to", "Perform."],
  intro:
    "Working closely with product teams to deliver React and React Native builds that merge clean engineering, real performance, and long-term value.",
  /** Small mark in the lower-left corner. */
  tagline: {
    lead: "One engineer, every layer.",
    sub: "Web, mobile, and the API between.",
  },
  stats: [{ value: 5, suffix: "+", label: "Years of experience" }],
  /** Attribute chips in the right-hand card. */
  badges: [
    { label: "Full-Stack", glyph: "◐" },
    { label: "Reliable", glyph: "✦" },
    { label: "Pragmatic", glyph: "▲" },
    { label: "Builder", glyph: "✚" },
    { label: "Fast", glyph: "✳" },
  ],
  buttons: [
    { label: "Get in Touch", href: `mailto:${site.email}` },
    { label: "About Me", href: "#about" },
  ],
  /** Primary action in the phone top bar. */
  mobileCta: { label: "Get in Touch", href: `mailto:${site.email}` },
};

export const statement = {
  lead: "One engineer, every layer.",
  emphasis: "Web, mobile, and the API between.",
};

export const about = {
  eyebrow: "Start small, grow big",
  heading: ["About Me (&)", "My Journey"],
  intro:
    "Five years, four teams, two countries, and one app of my own. Here's how it went.",
  timeline: [
    {
      year: "'19",
      title: "Where it started",
      body: "I started as a Java developer intern at Akbar Travels in Mumbai, writing Spring Boot services and fixing front-end bugs. It was the first time code I wrote went somewhere real, and that was enough to decide the rest.",
      tag: "Akbar Travels · Mumbai",
    },
    {
      year: "'20",
      title: "Into the stack",
      body: "At MobillionLabs in Hyderabad I worked across the MEAN stack on SmartWinnr — Angular on the front, Node and MongoDB behind it. I also took the UI/UX Design Specialization from CalArts, which changed how I look at every interface I build.",
      tag: "MobillionLabs · Hyderabad",
    },
    {
      year: "'21",
      title: "A new country",
      body: "I moved to Kansas City for a Master's in Computer Science at UMKC. New timezone, new expectations, and a lot of late nights learning to work the way American product teams do.",
      tag: "UMKC · Kansas City",
    },
    {
      year: "'22",
      title: "Mobile at scale",
      body: "Copart put me on their mobile app with React Native and MobX. Performance work I did there made the app roughly 20% faster and cut crashes by about 30% — the first time I saw optimization measured in real user numbers.",
      tag: "Copart · Dallas",
    },
    {
      year: "'23",
      title: "Full-stack, end to end",
      body: "At SevenTablets I stopped picking sides. React and React Native on the client, Node and Express behind them, React Query holding the middle. Figma files in, shipped products out.",
      tag: "SevenTablets · Dallas",
    },
    {
      year: "'26",
      title: "Building my own",
      body: "Atelier AI went live on the App Store and Google Play. Designed it, built it, shipped it, and now maintain it — the whole thing, start to finish, on my own.",
      tag: "Atelier AI · App Store & Google Play",
    },
  ],
};

export const work = {
  heading: ["Built to Ship,", "Made to Last"],
  intro:
    "Over five years I've worked across auctions, enterprise sales enablement, and travel — turning product requirements into applications that hold up in production. Here's some of that work.",
  items: [
    {
      company: "SevenTablets",
      role: "Full Stack Developer",
      period: "Aug 2023 — Present",
      place: "Dallas, TX",
      body: "Building responsive React web apps and cross-platform React Native applications, backed by scalable Node and Express APIs. Introduced React Query with optimistic updates to cut redundant network calls and make the UI feel instant.",
      tags: ["React", "React Native", "Node.js", "React Query"],
      accent: "#FFFF23",
    },
    {
      company: "Copart",
      role: "Software Engineer Intern",
      period: "Jun 2022 — Jul 2023",
      place: "Dallas, TX",
      body: "Worked on the Copart mobile app in React Native with MobX state management. Performance and stability work delivered a ~20% faster app and ~30% fewer crashes, alongside a 40% drop in user-reported bugs.",
      tags: ["React Native", "MobX", "Performance"],
      accent: "#E0DFC5",
    },
    {
      company: "MobillionLabs",
      role: "Junior Software Developer",
      period: "Jul 2020 — Aug 2021",
      place: "Hyderabad, India",
      body: "Developed the SmartWinnr platform on the MEAN stack. Built configurable Angular component libraries shared across applications, and RESTful services on Node, Express, and MongoDB.",
      tags: ["Angular", "Node.js", "MongoDB", "RxJS"],
      accent: "#FFFF23",
    },
    {
      company: "Akbar Travels",
      role: "Java Developer Intern",
      period: "Jun 2019 — Nov 2019",
      place: "Mumbai, India",
      body: "Built and tested web applications and microservices with Java and Spring Boot, integrating REST APIs with MySQL and MongoDB and securing them with Spring Security.",
      tags: ["Java", "Spring Boot", "REST"],
      accent: "#E0DFC5",
    },
  ],
};

export const projects = {
  eyebrow: "Personal & Freelance",
  heading: ["Things I Build", "Outside the Day Job"],
  intro:
    "Products I design, build, and ship on my own, plus freelance work for other people. Live projects first, in-progress below.",
  items: [
    {
      slug: "atelier-ai",
      name: "Atelier AI",
      tagline: "Smart Wardrobe",
      kind: "Personal",
      year: "2026",
      status: "Live",
      shotStyle: "phone" as const,
      body: "An AI stylist for the clothes you already own. Catalogue your wardrobe in seconds, then chat with an assistant that builds real outfits from your own pieces based on the occasion and the weather. Designed, built, and shipped solo to both stores.",
      role: "Design, Engineering, Release",
      tags: ["React Native", "AI", "iOS", "Android"],
      icon: "/assets/atelier/icon.png",
      shots: [
        "/assets/atelier/shot-01.png",
        "/assets/atelier/shot-02.png",
        "/assets/atelier/shot-03.png",
        "/assets/atelier/shot-04.png",
        "/assets/atelier/shot-05.png",
        "/assets/atelier/shot-06.png",
        "/assets/atelier/shot-07.png",
      ],
      links: [
        {
          label: "App Store",
          href: "https://apps.apple.com/us/app/atelier-ai-smart-wardrobe/id6761736308",
        },
        // Tester opt-in URL: it redirects to a Google sign-in rather than a
        // public listing, so the label says Beta.
        {
          label: "Google Play Beta",
          href: "https://play.google.com/apps/testing/com.atelieraidev.app",
        },
      ],
    },
    {
      slug: "botu",
      name: "BOTU",
      tagline: "AI DevOps Automation",
      kind: "Freelance",
      year: "2026",
      status: "Live",
      shotStyle: "web" as const,
      body: "An autonomous DevOps platform that predicts failures and applies safe fixes. I built the product UI, an AI chatbot for support automation, the conversational DevOps copilot integration, and a React Flow canvas that renders cloud service architectures as an explorable graph.",
      role: "Frontend Engineering, AI Integration",
      tags: ["React", "React Flow", "AI Copilot", "UI"],
      icon: null,
      shots: [
        "/assets/botu/shot-01.png",
        "/assets/botu/shot-02.png",
        "/assets/botu/shot-03.png",
        "/assets/botu/shot-04.png",
        "/assets/botu/shot-05.png",
      ],
      links: [{ label: "Visit Site", href: "https://usebotu.com/" }],
    },
    {
      slug: "santosh-vemula",
      name: "Santosh Vemula",
      tagline: "Multimedia Artist Portfolio",
      kind: "Freelance",
      year: "2017",
      status: "Live",
      shotStyle: "web" as const,
      body: "A portfolio site for a multimedia artist — illustration, film, and photography work presented on a dark, high-contrast canvas with custom illustrated artwork. One of my earliest freelance builds, still live.",
      role: "Design Implementation, Frontend",
      tags: ["HTML", "CSS", "JavaScript", "Portfolio"],
      icon: null,
      shots: [
        "/assets/santosh/shot-01.png",
        "/assets/santosh/shot-02.png",
        "/assets/santosh/shot-03.png",
      ],
      links: [{ label: "Visit Site", href: "https://santoshvemula.com/" }],
    },
    {
      slug: "syllabee",
      name: "Syllabee",
      tagline: "AI Reading Tutor for Kids",
      kind: "Personal",
      year: "2026",
      status: "In Progress",
      shotStyle: "phone" as const,
      body: "An AI reading tutor for children aged three to seven. Two surfaces in one product: a child view built icon-first with oversized touch targets, where kids read aloud and the model analyses their pronunciation in real time, and a parent view that tracks how their child is progressing. Currently in active development.",
      role: "Design, Engineering",
      tags: ["React", "AI", "Speech", "EdTech"],
      icon: null,
      // Design screens exported from the product design file — the live URL is a
      // sign-in wall, so there are no shipped screens to capture yet.
      shots: [
        "/assets/syllabee/shot-01.png",
        "/assets/syllabee/shot-02.png",
        "/assets/syllabee/shot-03.png",
        "/assets/syllabee/shot-04.png",
      ],
      links: [{ label: "Visit Site", href: "https://syllabee.up.railway.app/" }],
    },
  ],
};

/**
 * Live counts for the hero card, derived from `projects` so they stay in sync
 * whenever a project is added or its status changes.
 */
export const projectStats = {
  total: projects.items.length,
  live: projects.items.filter((p) => p.status === "Live").length,
  ongoing: projects.items.filter((p) => p.status !== "Live").length,
};

export const capabilities = {
  heading: ["What", "I Do?"],
  subheading: "Capabilities Overview",
  intro:
    "Interface, logic, and delivery combined — turning a product requirement into something people can actually use, on whichever screen they're holding.",
  items: [
    {
      title: "Frontend Engineering",
      body: "React and Next.js with TypeScript. Reusable component systems, pixel-accurate builds from Figma, and responsive layouts that hold together everywhere.",
    },
    {
      title: "Mobile Development",
      body: "Cross-platform iOS and Android with React Native — native modules, push notifications, in-app purchases, and the full path to TestFlight and Google Play.",
    },
    {
      title: "Backend & APIs",
      body: "Node.js, Express, Spring Boot, and Django. RESTful services, JWT authentication with custom middleware, and real-time features over Socket.io.",
    },
    {
      title: "State & Data",
      body: "React Query, MobX, and Context. Optimistic updates, cache strategy, and data fetching that keeps interfaces responsive under real load.",
    },
    {
      title: "Performance & Delivery",
      body: "Profiling and optimization, efficient SQL and NoSQL access, Jest test coverage, and CI/CD pipelines that get work in front of users.",
    },
  ],
};

export const stack = [
  "React",
  "React Native",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "Angular",
  "Spring Boot",
  "Django",
  "React Query",
  "MobX",
  "Tailwind CSS",
  "shadcn/ui",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Socket.io",
  "Jest",
  "Git",
];

export const cta = {
  heading: "Have something in mind?",
  emphasis: "Let's talk.",
  body: "Whether it's a product that needs building, an app that needs fixing, or a team that needs another pair of hands — I'm easy to reach.",
};

export const faq = {
  heading: "Got any questions?",
  items: [
    {
      q: "What do you work with day to day?",
      a: "React and TypeScript on the web, React Native for mobile, and Node with Express behind both. React Query handles server state, Tailwind and shadcn/ui handle the surface. I'm comfortable dropping into Angular, Spring Boot, or Django when a project already lives there.",
    },
    {
      q: "Web or mobile — which is the stronger side?",
      a: "Both, genuinely. React Native means the same mental model carries across, so I've spent five years moving between a browser and a phone without switching languages. Most of my recent work ships to all three targets at once.",
    },
    {
      q: "Are you open to freelance or contract work?",
      a: "I'm full-time at SevenTablets, but I'm always happy to hear about interesting work. Send me the details and I'll tell you honestly whether I have the room to do it well.",
    },
    {
      q: "What does working with you actually look like?",
      a: "A conversation about what you're trying to build, then a scope we both agree on. I share progress in stages rather than disappearing for three weeks, so feedback lands while it's still cheap to act on.",
    },
    {
      q: "Do you handle design as well as development?",
      a: "Development is the core strength, but I've got a UI/UX Design Specialization from CalArts and I work directly from Figma every day. I'll push back on a design that won't survive contact with real data, and I built Atelier AI's interface myself.",
    },
    {
      q: "Where are you based?",
      a: "Dallas, Texas. I've worked with distributed teams across timezones since 2020, so remote collaboration is the default rather than the exception.",
    },
  ],
};

export const footer = {
  line: "Building for the web and everything in your pocket.",
  copyright: `© ${new Date().getFullYear()} Satwik Rudra. All rights reserved.`,
};
