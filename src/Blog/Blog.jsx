import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Blog.css";
import { BLOG_POSTS } from "./blogData";

const VIEW_OPTIONS = [
  { id: "grid", label: "Grid" },
  { id: "list", label: "List" }
];

const SORTERS = {
  newest: (a, b) => new Date(b.date) - new Date(a.date),
  oldest: (a, b) => new Date(a.date) - new Date(b.date),
  "read-time": (a, b) => a.readTime - b.readTime
};

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [tag, setTag] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [view, setView] = useState("grid");

  const categories = useMemo(
    () => ["All", ...new Set(BLOG_POSTS.map((post) => post.category))],
    []
  );

  const years = useMemo(
    () =>
      [
        "All",
        ...new Set(
          BLOG_POSTS.map((post) => new Date(post.date).getFullYear()).sort((a, b) =>
            b - a
          )
        )
      ],
    []
  );

  const tags = useMemo(
    () => ["All", ...new Set(BLOG_POSTS.flatMap((post) => post.tags))],
    []
  );

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const postYear = new Date(post.date).getFullYear();
      const matchesYear = year === "All" || postYear.toString() === year.toString();
      const matchesTag = tag === "All" || post.tags.includes(tag);
      const matchesSearch = searchTerm
        ? [post.title, post.summary, post.tags.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true;

      return matchesCategory && matchesYear && matchesTag && matchesSearch;
    }).sort(SORTERS[sortOrder]);
  }, [category, year, tag, searchTerm, sortOrder]);

  const resetFilters = () => {
    setCategory("All");
    setYear("All");
    setTag("All");
    setSearchTerm("");
    setSortOrder("newest");
  };

  return (
    <main className="blog-page" aria-labelledby="blog-heading">
      <Helmet>
        <title>Insights & Stories | Rraynex Blog</title>
        <meta
          name="description"
          content="Read Rraynex perspectives on pharmaceutical innovation, manufacturing excellence, and market access along with news from our innovation labs."
        />
      </Helmet>

      <section className="blog-hero">
        <p className="blog-kicker">Insights & Stories</p>
        <h1 id="blog-heading">Rraynex Blog</h1>
        <p className="blog-lead">
          Explore the strategies, technology, and people powering our pharmaceutical and healthcare ecosystem.
        </p>
        <div className="blog-hero__essentials" role="region" aria-label="Blog essentials">
          <div className="blog-hero__stat">
            <span className="blog-hero__value">{BLOG_POSTS.length}</span>
            <span className="blog-hero__label">Insights to explore</span>
          </div>
          <div className="blog-hero__stat">
            <span className="blog-hero__value">5-7 min</span>
            <span className="blog-hero__label">Average read time</span>
          </div>
          <div className="blog-hero__cta">
            <a className="blog-hero__button" href="#blog-posts">
              Browse Articles
            </a>
          </div>
        </div>
      </section>

      <section className="blog-controls" aria-label="Blog filters">
        <div className="blog-controls__primary">
          <label className="blog-field" htmlFor="blog-search">
            <span className="blog-field__label">Search</span>
            <input
              id="blog-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, topic, or tags"
            />
          </label>

          <label className="blog-field" htmlFor="blog-category">
            <span className="blog-field__label">Category</span>
            <select
              id="blog-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="blog-field" htmlFor="blog-year">
            <span className="blog-field__label">Year</span>
            <select id="blog-year" value={year} onChange={(event) => setYear(event.target.value)}>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="blog-field" htmlFor="blog-tag">
            <span className="blog-field__label">Tag</span>
            <select id="blog-tag" value={tag} onChange={(event) => setTag(event.target.value)}>
              {tags.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="blog-controls__secondary">
          <label className="blog-field" htmlFor="blog-sort">
            <span className="blog-field__label">Sort by</span>
            <select
              id="blog-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="read-time">Shortest read</option>
            </select>
          </label>

          <div className="blog-view-toggle" role="group" aria-label="Toggle layout">
            {VIEW_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`blog-view-toggle__button ${view === option.id ? "active" : ""}`}
                onClick={() => setView(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button className="blog-reset" type="button" onClick={resetFilters}>
            Clear filters
          </button>
        </div>
      </section>

      <section id="blog-posts" className={`blog-grid blog-grid--${view}`} aria-live="polite">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-card__media">
                <img src={post.image} alt={post.title} loading="lazy" />
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
                      <button type="button" onClick={() => setTag(item)}>
                        #{item}
                      </button>
                    </li>
                  ))}
                </ul>

                <footer className="blog-card__footer">
                  <span className="blog-card__author">By {post.author}</span>
                  <Link to={`/blog/${post.slug}`} className="blog-card__cta">
                    Read article
                  </Link>
                </footer>
              </div>
            </article>
          ))
        ) : (
          <div className="blog-empty">
            <h2>No articles match your filters yet.</h2>
            <p>Try adjusting the search or tag filters to discover more stories.</p>
          </div>
        )}
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
