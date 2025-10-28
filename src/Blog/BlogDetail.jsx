import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Blog.css";
import { getBlogBySlug } from "./blogData";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <main className="blog-page" aria-live="polite">
        <section className="blog-empty">
          <h1>We could not find that story.</h1>
          <p>
            The article you are searching for may have been moved. You can head back to the
            {" "}
            <Link to="/blog">insights hub</Link>{" "}
            to explore the latest updates.
          </p>
        </section>
      </main>
    );
  }

  const published = new Date(post.date);

  return (
    <main className="blog-article" aria-labelledby="blog-article-heading">
      <Helmet>
        <title>{post.title} | Rraynex Blog</title>
        <meta name="description" content={post.summary} />
      </Helmet>

      <nav className="blog-breadcrumb" aria-label="Breadcrumb">
        <Link to="/blog">← Back to Blogs</Link>
      </nav>

      <article className="blog-article__container">
        <header className="blog-article__header">
          <p className="blog-article__category">{post.category}</p>
          <h1 id="blog-article-heading">{post.title}</h1>
          {post.heroQuote && <blockquote>“{post.heroQuote}”</blockquote>}
          <div className="blog-article__meta">
            <span>By {post.author}</span>
            <time dateTime={post.date}>
              {published.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </time>
            <span>{post.readTime} min read</span>
          </div>
        </header>

        <figure className="blog-article__hero">
          <img src={post.image} alt={post.title} loading="lazy" />
          <figcaption>Inside Rraynex operations</figcaption>
        </figure>

        {post.gallery && post.gallery.length > 0 && (
          <section className="blog-article__gallery" aria-label="Image highlights">
            {post.gallery.map((item, index) => (
              <img key={item} src={item} alt={`${post.title} visual ${index + 1}`} loading="lazy" />
            ))}
          </section>
        )}

        <section className="blog-article__body">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>

        <footer className="blog-article__footer">
          <ul className="blog-article__tags" aria-label="Article tags">
            {post.tags.map((item) => (
              <li key={item}>#{item}</li>
            ))}
          </ul>
          <Link to="/blog" className="blog-article__cta">
            Explore more insights
          </Link>
        </footer>
      </article>
    </main>
  );
}
