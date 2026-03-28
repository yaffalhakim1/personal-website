const site = {
  // --- Site Metadata ---
  meta: {
    title: "Muhammad Yafi Alhakim",
    description:
      "Fullstack Engineer from Indonesia. Notes on web dev, deployment, and the occasional rabbit hole.",
    author: "Muhammad Yafi Alhakim",
    logo: "/logo.svg",
    ogImage: "/og-image.png",
    // HTML lang attribute, affects page language and date formatting
    // Options: "zh-CN", "en", "ja", etc.
    lang: "en",
  },

  // --- Navigation ---
  // subtitle: decorative label shown below the name (uppercase, small text)
  navigation: [
    { name: "Home", subtitle: "Index", href: "/" },
    { name: "Writing", subtitle: "Blog", href: "/posts" },
    { name: "Projects", subtitle: "Works", href: "/projects" },
    // { name: "Friends", subtitle: "Links", href: "/friends" },
    { name: "About", subtitle: "Me", href: "/about" },
  ],

  // --- Social Links ---
  social: [
    {
      name: "GitHub",
      href: "https://github.com/yaffalhakim1",
      icon: "mdi:github",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/yafialhakim/",
      icon: "mdi:linkedin",
    },
    {
      name: "Email",
      href: "mailto:yafialhakim64@gmail.com",
      icon: "mdi:email",
    },
  ],

  // --- Homepage Hero ---
  hero: {
    greeting: "Hi, I'm Yafi",
    // Supports HTML. Use <span class="font-medium text-foreground underline decoration-primary/30"> to highlight keywords
    description:
      'Fullstack Engineer from <span class="font-medium text-foreground underline decoration-primary/30">Indonesia</span>, dedicated to crafting beautiful, performance-optimized web applications. Currently working at <span class="font-medium text-foreground underline decoration-primary/30">MySkill.id</span>.',
    cards: [
      {
        icon: "mdi:briefcase",
        label: "Role",
        value: "Frontend Engineer @ MySkill.id",
      },
      { icon: "mdi:location", label: "Location", value: "Jakarta, Indonesia" },
    ],
  },

  // --- Footer ---
  footer: {
    copyright: "© 2025 Muhammad Yafi Alhakim",
    builtWith: "Built with Astro",
  },

  // --- Comments ---
  comments: {
    enabled: false,
    provider: "artalk" as const,
    artalk: {
      server: "https://your-artalk-server.com",
    },
  },

  // --- Feature Toggles ---
  features: {
    search: true,
    rss: true,
    // Auto-mark posts as "new" if published within this many days (0 to disable)
    newPostDays: 7,
  },

  // --- Tools Page Data ---
  tools: [
    {
      name: "development",
      items: [
        {
          name: "VS Code",
          link: "https://code.visualstudio.com",
          icon: "mdi:microsoft-visual-studio-code",
        },
        { name: "Terminal", icon: "mdi:terminal" },
        { name: "Git", link: "https://git-scm.com", icon: "mdi:git" },
        { name: "Docker", link: "https://www.docker.com", icon: "mdi:docker" },
        { name: "Postman", link: "https://www.postman.com", icon: "mdi:api" },
      ],
    },
    {
      name: "frontend",
      items: [
        { name: "React", link: "https://react.dev", icon: "mdi:react" },
        { name: "Next.js", link: "https://nextjs.org", icon: "mdi:nodejs" },
        {
          name: "TypeScript",
          link: "https://www.typescriptlang.org",
          icon: "mdi:language-typescript",
        },
        {
          name: "Tailwind CSS",
          link: "https://tailwindcss.com",
          icon: "mdi:tailwind",
        },
        {
          name: "Astro",
          link: "https://astro.build",
          icon: "mdi:rocket-launch",
        },
      ],
    },
    {
      name: "backend & infra",
      items: [
        {
          name: "Supabase",
          link: "https://supabase.com",
          icon: "mdi:database",
        },
        {
          name: "Vercel",
          link: "https://vercel.com",
          icon: "mdi:cloud-upload",
        },
        { name: "Netlify", link: "https://www.netlify.com", icon: "mdi:web" },
        { name: "cPanel", icon: "mdi:server" },
      ],
    },
    {
      name: "productivity",
      items: [
        { name: "Notion", link: "https://www.notion.so", icon: "mdi:notebook" },
        {
          name: "Figma",
          link: "https://www.figma.com",
          icon: "mdi:vector-polygon",
        },
        {
          name: "Linear",
          link: "https://linear.app",
          icon: "mdi:chart-timeline-variant",
        },
      ],
    },
  ],

  // --- UI Labels ---
  // Customize these values to change the text displayed on pages
  labels: {
    postsTitle: "Writing",
    postsDescription: "Notes, thoughts, and technical musings",
    projectsTitle: "Projects",
    projectsDescription: "Small tools built for fun or to solve real problems.",
    friendsTitle: "Friends",
    friendsDescription: "Like-minded folks around the web.",
    toolsTitle: "Stack",
    aboutTitle: "About",
    aboutDescription: "About this site and its author",
    backToPosts: "Back to posts",
    goHome: "Go Home",
    notFoundTitle: "Page not found",
    notFoundDescription:
      "The page you're looking for may have been removed or the link is broken.",
    endOfPost: "End of Post",
    tableOfContents: "Table of Contents",
    searchPlaceholder: "Search posts, tags, or commands...",
    searchNavigate: "Navigate",
    commentSuccess: "Comment submitted",
  },

  ogImage: "/og-image.png",
} as const;

export default site;
