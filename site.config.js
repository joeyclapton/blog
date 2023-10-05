const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Joey Clapton",
    image: "/avatar.webp", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Front-End Developer",
    bio: "",
    email: "joeyclapton42@gmail.com",
    linkedin: "joeyclapton",
    github: "joeyclapton",
    instagram: "",
  },
  projects: [
    {
      name: `Bookmark Generator`,
      href: "https://github.com/joeyclapton/bookmarks-generator",
    },
    {
      name: `PiP Chrome Extension`,
      href: "https://github.com/joeyclapton/pip-video",
    },
    {
      name: `Web Scraping and PDF Generator`,
      href: "https://github.com/joeyclapton/pdf-generator-library-search",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Joey Clapton",
    description: "welcome to my personal blog! 🔥",
    theme: "auto", // ['light', 'dark', 'auto']
  },

  // CONFIG configration (required)
  link: "https://joeyclapton.vercel.app",
  since: 2023, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash
  seo: {
    keywords: ["Blog", "Website", "Notion", "Software Engineer", "Front End", "Tech", "Philosophy"],
  },

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "joeyclapton/blog",
      "issue-term": "og:title",
      label: "💬 Utterances"
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: process.env.CUSDIS_APP_ID || "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}

module.exports = { CONFIG }