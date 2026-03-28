# Muhammad Yafi Alhakim — Personal Site

Personal website and blog of **Muhammad Yafi Alhakim**, a Fullstack Engineer from Jakarta, Indonesia.
Currently working at [MySkill.id](https://myskill.id) building fast, scalable, and user-friendly web applications.

**Live site:** [yafialhakim.netlify.app](https://yafialhakim.netlify.app)

## About

- **Role:** Frontend Engineer @ MySkill.id
- **Location:** Jakarta, Indonesia
- **GitHub:** [yaffalhakim1](https://github.com/yaffalhakim1)
- **LinkedIn:** [yafialhakim](https://www.linkedin.com/in/yafialhakim/)
- **Email:** yafialhakim64@gmail.com
- **CV:** [self.so/yafialhakim](https://self.so/yafialhakim)

## Stack

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Astro
- **Backend & Infra:** Supabase, Docker, Vercel, Netlify, cPanel
- **Tools:** VS Code, Git, Postman, Figma, Notion

## Projects

| Project           | Tech                             | Demo                                                 |
| ----------------- | -------------------------------- | ---------------------------------------------------- |
| Anonymous Message | Next.js, TypeScript, Supabase    | [Live](https://anonymous-website-message.vercel.app) |
| Pokeredux         | React, TypeScript, Redux Toolkit | [Live](https://pokredux.vercel.app)                  |
| Chill Out         | React, TypeScript                | [Live](https://chill-out.vercel.app)                 |
| Movies            | Next.js, TypeScript, TMDB API    | [Live](https://movies-13.vercel.app)                 |
| Simple E-commerce | Next.js, TypeScript, RSC         | [Live](https://simple-ecommerce-appdir.vercel.app)   |
| Sumz              | React, TypeScript, OpenAI API    | [Live](https://summarizer-drab.vercel.app)           |
| Todo List         | React, TypeScript, Supabase      | [Live](https://todo-supabasev2.vercel.app)           |

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Site Configuration

All site configuration is in `src/config/site.ts`.

| Section      | Description                               |
| ------------ | ----------------------------------------- |
| `meta`       | Site title, description, author, language |
| `navigation` | Navigation menu items                     |
| `social`     | Social links (GitHub, LinkedIn, Email)    |
| `hero`       | Homepage greeting and description         |
| `footer`     | Copyright text                            |
| `comments`   | Artalk comments (currently disabled)      |
| `features`   | Toggle search, RSS                        |
| `tools`      | Tools/Stack page data                     |

Also update `astro.config.mjs` to set the `site` URL.

## Blog

Posts are loaded from [Hashnode](https://hashnode.com) via GraphQL at build time.
Set `HASHNODE_PUBLICATION_ID` in `.env` to connect your Hashnode publication.

Local `.md` files in `src/content/posts/` can also be used as fallback or standalone posts.

## Analytics (Umami)

1. Copy `.env.example` to `.env`
2. Set `UMAMI_URL` and `UMAMI_WEBSITE_ID`

## Deploy

Deployed on [Netlify](https://netlify.com). Compatible with Vercel, Cloudflare Pages, or any static host.

```bash
pnpm build
# Output is in dist/
```

---

## Credits

This site is built on top of [Breeze](https://github.com/aozora-bg/astro-theme-breeze) — a minimal, clean Astro theme for personal websites and blogs, built with [Astro 5](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and TypeScript.

## License

MIT
