import type { Loader } from "astro/loaders";
import { loadEnv } from "vite";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HashnodeTag {
  id: string;
  name: string;
  slug: string;
}

interface HashnodePost {
  id: string;
  title: string;
  slug: string;
  brief: string;
  content: { html: string };
  publishedAt: string;
  updatedAt: string | null;
  coverImage: { url: string } | null;
  tags: HashnodeTag[];
  series: { id: string; name: string; slug: string } | null;
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface PostsPage {
  edges: { node: HashnodePost }[];
  pageInfo: PageInfo;
}

// ---------------------------------------------------------------------------
// GraphQL query
// ---------------------------------------------------------------------------

const POSTS_QUERY = /* graphql */ `
  query GetPosts($host: String!, $after: String) {
    publication(host: $host) {
      posts(first: 20, after: $after) {
        edges {
          node {
            id
            title
            slug
            brief
            content { html }
            publishedAt
            updatedAt
            coverImage { url }
            tags { id name slug }
            series { id name slug }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Slugify an arbitrary string into a valid collection slug:
 * lowercase letters, digits, and hyphens only.
 */
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchPage(
  host: string,
  after: string | null,
): Promise<PostsPage> {
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: POSTS_QUERY,
      variables: { host, after },
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Hashnode API responded with ${res.status} ${res.statusText}`,
    );
  }

  const json = (await res.json()) as {
    data?: { publication?: { posts: PostsPage } };
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(
      `Hashnode GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`,
    );
  }

  if (!json.data?.publication) {
    throw new Error(
      `No publication found for host "${host}". Check your HASHNODE_PUBLICATION_ID.`,
    );
  }

  return json.data.publication.posts;
}

async function fetchAllPosts(host: string): Promise<HashnodePost[]> {
  const posts: HashnodePost[] = [];
  let cursor: string | null = null;

  do {
    const page = await fetchPage(host, cursor);
    for (const { node } of page.edges) {
      posts.push(node);
    }
    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (cursor !== null);

  return posts;
}

// ---------------------------------------------------------------------------
// Shared fetch cache (both loaders run in the same build — avoid double fetch)
// ---------------------------------------------------------------------------

let _cachedPosts: HashnodePost[] | null = null;

async function getCachedPosts(host: string): Promise<HashnodePost[]> {
  if (!_cachedPosts) {
    _cachedPosts = await fetchAllPosts(host);
  }
  return _cachedPosts;
}

// ---------------------------------------------------------------------------
// Posts loader
// ---------------------------------------------------------------------------

/**
 * Astro content loader that fetches all posts from a Hashnode publication
 * at build time and maps them to the site's `posts` collection schema.
 *
 * Required env var: HASHNODE_PUBLICATION_ID (e.g. "yourname.hashnode.dev")
 */
export function hashnodeLoader(): Loader {
  return {
    name: "hashnode-loader",

    async load({ store, logger, parseData }) {
      const env = loadEnv(
        process.env.NODE_ENV ?? "development",
        process.cwd(),
        "",
      );
      const host =
        env.HASHNODE_PUBLICATION_ID ?? process.env.HASHNODE_PUBLICATION_ID;

      if (!host) {
        logger.warn(
          "HASHNODE_PUBLICATION_ID is not set — skipping Hashnode fetch. No posts will be loaded.",
        );
        return;
      }

      logger.info(`Fetching posts from Hashnode publication: ${host}`);

      const rawPosts = await getCachedPosts(host);

      logger.info(`Fetched ${rawPosts.length} posts from Hashnode.`);

      store.clear();

      for (const post of rawPosts) {
        const tagRefs = post.tags.map((t) => ({
          collection: "tags" as const,
          id: toSlug(t.slug || t.name),
        }));

        const data = await parseData({
          id: post.slug,
          data: {
            title: post.title,
            createdAt: new Date(post.publishedAt),
            updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined,
            // All posts are mapped to the built-in "uncategorized" category.
            // To map by Hashnode series instead, adjust this field.
            category: {
              collection: "categories" as const,
              id: "uncategorized",
            },
            tags: tagRefs,
            summary: post.brief ?? "",
            cover: post.coverImage?.url,
            draft: false,
          },
        });

        store.set({
          id: post.slug,
          data,
          // Store the HTML body so the post page can render it directly.
          body: post.content.html,
          rendered: {
            html: post.content.html,
          },
        });
      }

      logger.info("Hashnode posts loaded into content store.");
    },
  };
}

// ---------------------------------------------------------------------------
// Tags loader
// ---------------------------------------------------------------------------

/**
 * Astro content loader that derives all unique tags from Hashnode posts
 * and injects them into the site's `tags` collection at build time.
 *
 * This replaces the static tags.json file so that any tag used on Hashnode
 * is automatically available for filtering on /tags pages.
 */
export function hashnodeTagsLoader(): Loader {
  return {
    name: "hashnode-tags-loader",

    async load({ store, logger, parseData }) {
      const env = loadEnv(
        process.env.NODE_ENV ?? "development",
        process.cwd(),
        "",
      );
      const host =
        env.HASHNODE_PUBLICATION_ID ?? process.env.HASHNODE_PUBLICATION_ID;

      if (!host) {
        logger.warn(
          "HASHNODE_PUBLICATION_ID is not set — skipping Hashnode tags fetch.",
        );
        return;
      }

      const rawPosts = await getCachedPosts(host);

      // Collect unique tags across all posts
      const seen = new Map<string, HashnodeTag>();
      for (const post of rawPosts) {
        for (const tag of post.tags) {
          const id = toSlug(tag.slug || tag.name);
          if (!seen.has(id)) {
            seen.set(id, tag);
          }
        }
      }

      logger.info(`Derived ${seen.size} unique tags from Hashnode posts.`);

      store.clear();

      for (const [id, tag] of seen) {
        const data = await parseData({
          id,
          data: {
            name: tag.name,
            slug: id,
          },
        });

        store.set({ id, data });
      }
    },
  };
}
