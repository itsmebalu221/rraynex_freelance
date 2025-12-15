import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Blog.css";
import { BLOG_POSTS } from "./blogData";
import { BLOG_METRICS_EVENT, BLOG_METRICS_STORAGE_KEY, getAllMetrics } from "./blogStorage";


const SORTERS = {
  newest: (a, b) => new Date(b.date) - new Date(a.date),
  oldest: (a, b) => new Date(a.date) - new Date(b.date),
  "read-time": (a, b) => a.readTime - b.readTime
};

export default function Blog() {
  const searchTerm = "";
  const [category, setCategory] = useState("All");
  const year = "All";
  const tag = "All";
  const sortOrder = "newest";
  // simplified view: fixed to list/stacked layout
  const [view] = useState("list");
  const [metrics, setMetrics] = useState(() => getAllMetrics());

  const normalize = (val) => (val ?? "").toString().trim().toLowerCase();


  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const postCategory = normalize(post?.category);
      const uiCategory = normalize(category);
      const matchesCategory = category === "All" || postCategory === uiCategory;

      const postYear = new Date(post.date).getFullYear();
      const matchesYear = year === "All" || postYear.toString() === year.toString();

      const postTags = Array.isArray(post?.tags) ? post.tags : [];
      const hasTag = postTags.some((t) => normalize(t) === normalize(tag));
      const matchesTag = tag === "All" || hasTag;

      const haystack = [post.title, post.summary, postTags.join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = searchTerm ? haystack.includes(searchTerm.toLowerCase()) : true;

      return matchesCategory && matchesYear && matchesTag && matchesSearch;
    }).sort(SORTERS[sortOrder]);
  }, [category, year, tag, searchTerm, sortOrder]);

  // filter reset removed (no filter controls shown)

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const syncMetrics = () => {
      setMetrics(getAllMetrics());
    };

    const handleBroadcast = (event) => {
      const detail = event?.detail;
      if (detail && typeof detail === "object") {
        setMetrics(detail);
        return;
      }
      syncMetrics();
    };

    const handleStorage = (event) => {
      if (event.key && event.key !== BLOG_METRICS_STORAGE_KEY) {
        return;
      }
      syncMetrics();
    };

    syncMetrics();

    window.addEventListener("focus", syncMetrics);
    window.addEventListener("storage", handleStorage);
    window.addEventListener(BLOG_METRICS_EVENT, handleBroadcast);

    return () => {
      window.removeEventListener("focus", syncMetrics);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(BLOG_METRICS_EVENT, handleBroadcast);
    };
  }, []);

  const featuredPost = useMemo(() => {
    if (filteredPosts.length === 0) {
      return BLOG_POSTS[0];
    }
    // Show newest post as featured (latest first)
    const sortedByDate = [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate[0];
  }, [filteredPosts]);
  // Show ALL posts in the grid (don't omit featured)
  const remainingPosts = [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const trendingPosts = useMemo(() => {
    const scored = BLOG_POSTS.map((post) => {
      const entry = metrics[post.slug] || {};
      return {
        post,
        score:
          (typeof entry.likes === "number" ? entry.likes : 0) * 2 +
          (typeof entry.shares === "number" ? entry.shares : 0) * 3 +
          (Array.isArray(entry.comments) ? entry.comments.length : 0)
      };
    });

    return scored
      .sort((a, b) => b.score - a.score || new Date(b.post.date) - new Date(a.post.date))
      .slice(0, 4)
      .map((item) => item.post);
  }, [metrics]);

  // searchTerm left empty by default (no search UI shown)

  const featuredImageFor = (post) => post?.featuredImage || post?.image;

  const topCategories = useMemo(() => {
    const map = new Map(); // key -> { label, count }
    for (const post of BLOG_POSTS) {
      const label = post?.category ?? "";
      const key = normalize(label);
      if (!key) continue;
      const current = map.get(key);
      if (current) current.count += 1; else map.set(key, { label, count: 1 });
    }
    return Array.from(map.values())
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, 5);
  }, []);

  return (
    <main className="blog-page" aria-labelledby="blog-heading">
      <Helmet>
        <title>Insights & Stories | Rraynex Blog</title>
        <meta
          name="description"
          content="Read Rraynex perspectives on pharmaceutical innovation, manufacturing excellence, and market access along with news from our innovation labs."
        />
      </Helmet>

      <section className="blog-hero" aria-labelledby="blog-heading">
        <div className="blog-hero__content">
          <p className="blog-kicker">Insights & Stories</p>
          <h1 id="blog-heading">Ideas shaping pharmaceutical ecosystems</h1>
          <p className="blog-lead">
            Weekly perspectives from Rraynex leaders and partners covering advanced manufacturing, responsible market access, and the people engineering future-ready healthcare.
          </p>
          <div className="blog-hero__meta">
            <div className="blog-hero__stat">
              <span className="blog-hero__value">{BLOG_POSTS.length}</span>
              <span className="blog-hero__label">Featured insights</span>
            </div>
            <div className="blog-hero__stat">
              <span className="blog-hero__value">5-7 min</span>
              <span className="blog-hero__label">Average read time</span>
            </div>
            <div className="blog-hero__stat">
              <span className="blog-hero__value">Global</span>
              <span className="blog-hero__label">Regulated markets</span>
            </div>
          </div>
          {featuredPost && (
            <Link className="blog-hero__cta" to={`/blog/${featuredPost.slug}`}>
              Read the latest feature
            </Link>
          )}
        </div>
        {featuredPost && (
          <article className="blog-hero__feature" aria-label="Featured story">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="blog-hero__feature-media"
              aria-label={`Read ${featuredPost.title}`}
            >
              <img src={featuredImageFor(featuredPost)} alt={featuredPost.title} loading="eager" fetchpriority="high" decoding="async" />
              <span className="blog-hero__badge">Featured</span>
            </Link>
            <div className="blog-hero__feature-content">
              <div className="blog-card__meta">
                <span className="blog-card__category">{featuredPost.category}</span>
                <time dateTime={featuredPost.date}>
                  {new Date(featuredPost.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </time>
                <span>{featuredPost.readTime} min read</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.summary}</p>
              <Link to={`/blog/${featuredPost.slug}`} className="blog-hero__feature-link">
                Continue reading →
              </Link>
            </div>
          </article>
        )}
      </section>

      {/* Filters removed for a simplified blog view (no filtering UI shown). */}

      <section className="blog-layout" aria-live="polite">
  <div className={`blog-feed blog-feed--${view}`} id="blog-posts">
          {remainingPosts.length > 0 ? (
            remainingPosts.map((post) => {
              const entry = metrics[post.slug] || {};
              const likeTotal = typeof entry.likes === "number" ? entry.likes : 0;
              const shareTotal = typeof entry.shares === "number" ? entry.shares : 0;
              const commentTotal = Array.isArray(entry.comments) ? entry.comments.length : 0;

              return (
                <article key={post.id} className={`blog-card blog-card--${view}`}>
                  <Link to={`/blog/${post.slug}`} className="blog-card__media">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </Link>

                  <div className="blog-card__body">
                    <header className="blog-card__header">
                      <div className="blog-card__meta">
                        <span className="blog-card__category">{post.category}</span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </time>
                        <span>{post.readTime} min read</span>
                      </div>
                      <h2>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      {post.heroQuote && <blockquote>“{post.heroQuote}”</blockquote>}
                    </header>

                    <p className="blog-card__summary">{post.summary}</p>

                    <ul className="blog-card__tags">
                      {post.tags.map((item) => (
                        <li key={item}>
                          <span aria-label={`Tag ${item}`} className="blog-tag-label">#{item}</span>
                        </li>
                      ))}
                    </ul>

                    <footer className="blog-card__footer">
                      <div className="blog-card__footer-left">
                        <span className="blog-card__author">By {post.author}</span>
                        <div className="blog-card__metrics" aria-label="Engagement metrics">
                          <span>{likeTotal.toLocaleString()} likes</span>
                          <span>{shareTotal.toLocaleString()} shares</span>
                          <span>{commentTotal.toLocaleString()} comments</span>
                        </div>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="blog-card__cta">
                        Read article
                      </Link>
                    </footer>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="blog-empty">
              <h2>No articles match your filters yet.</h2>
              <p>Try adjusting the search or tag filters to discover more stories.</p>
            </div>
          )}
        </div>

        <aside className="blog-sidebar" aria-label="Trending insights">
          <section className="blog-sidebar__section">
            <h2>Trending now</h2>
            <ol className="blog-trending">
              {trendingPosts.map((post) => {
                const entry = metrics[post.slug] || {};
                const shareTotal = typeof entry.shares === "number" ? entry.shares : 0;
                const likeTotal = typeof entry.likes === "number" ? entry.likes : 0;
                const commentTotal = Array.isArray(entry.comments) ? entry.comments.length : 0;

                return (
                  <li key={post.id} className="blog-trending__item">
                    <Link to={`/blog/${post.slug}`}>
                      <span className="blog-trending__category">{post.category}</span>
                      <span className="blog-trending__title">{post.title}</span>
                    </Link>
                    <div className="blog-trending__metrics">
                      <span>{shareTotal.toLocaleString()} shares</span>
                      <span>{likeTotal.toLocaleString()} likes</span>
                      <span>{commentTotal.toLocaleString()} comments</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="blog-sidebar__section" aria-label="Popular categories">
            <h2>Categories</h2>
            <ul className="blog-categories">
              <li>
                <button type="button" className={category === "All" ? "active" : undefined} onClick={() => setCategory("All")} aria-pressed={category === "All"} aria-label="Show all insights">
                  <span>All insights</span>
                  <span>{BLOG_POSTS.length}</span>
                </button>
              </li>
              {topCategories.map((item) => (
                <li key={item.label}>
                  <button type="button" className={category === item.label ? "active" : undefined} onClick={() => setCategory(item.label)} aria-pressed={category === item.label} aria-label={`Filter by category ${item.label}`}>
                    <span>{item.label}</span>
                    <span>{item.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="blog-sidebar__section" aria-label="Newsletter">
            <h2>Get the weekly brief</h2>
            <p>Join industry peers receiving our curated note on manufacturing, market access, and sustainability.</p>
            <form className="blog-sidebar__form">
              <label htmlFor="blog-aside-email" className="sr-only">Email address</label>
              <input id="blog-aside-email" type="email" placeholder="you@example.com" />
              <button type="button">Subscribe</button>
            </form>
          </section>
        </aside>
      </section>

      <section className="blog-subscribe" aria-label="Stay updated">
        <div className="blog-subscribe__content">
          <h2>Get the next insight first</h2>
          <p>
            Join our newsletter to receive the latest updates on pharmaceutical innovation, sustainability, and market access from the Rraynex team.
          </p>
        </div>
        <form className="blog-subscribe__form">
          <label htmlFor="blog-subscribe-email" className="sr-only">
            Email address
          </label>
          <input id="blog-subscribe-email" type="email" placeholder="you@example.com" />
          <button type="button">Notify me</button>
        </form>
      </section>
    </main>
  );
}
