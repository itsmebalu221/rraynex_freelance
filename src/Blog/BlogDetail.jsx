import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Blog.css";
import { BLOG_POSTS, getBlogBySlug } from "./blogData";
import { addComment, getMetrics, incrementShare, toggleLike } from "./blogStorage";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);
  const articleRef = useRef(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [shares, setShares] = useState(0);
  const [comments, setComments] = useState([]);
  const [shareNotice, setShareNotice] = useState("");
  const [commentStatus, setCommentStatus] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined" || !post) {
      return "";
    }
    return new URL(`/blog/${post.slug}`, window.location.origin).toString();
  }, [post]);

  const shareTargets = useMemo(() => {
    if (!post || !shareUrl) {
      return [];
    }
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(post.title);
    return [
      {
        id: "linkedin",
        label: "LinkedIn",
        href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
      },
      {
        id: "x",
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
      }
    ];
  }, [post, shareUrl]);

  const featuredImageFor = (p) => p?.featuredImage || p?.image;

  // Reading progress based on article container
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total > 0 ? total : 0);
      const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const related = useMemo(() => {
    if (!post) return [];
    const tags = new Set(Array.isArray(post.tags) ? post.tags : []);
    return BLOG_POSTS.filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags?.some((t) => tags.has(t))))
      .slice(0, 3);
  }, [post]);

  useEffect(() => {
    if (!post) {
      return;
    }

    const metrics = getMetrics(post.slug);
    setLikes(metrics.likes);
    setLiked(metrics.liked);
    setShares(metrics.shares);
    setComments(metrics.comments);
  }, [post]);

  useEffect(() => {
    if (!shareNotice) {
      return undefined;
    }
    const timer = setTimeout(() => setShareNotice(""), 2800);
    return () => clearTimeout(timer);
  }, [shareNotice]);

  useEffect(() => {
    if (!commentStatus) {
      return undefined;
    }
    const timer = setTimeout(() => setCommentStatus(""), 3200);
    return () => clearTimeout(timer);
  }, [commentStatus]);

  const recordShare = () => {
    if (!post) {
      return;
    }
    const entry = incrementShare(post.slug);
    setShares(entry.shares);
  };

  const handleToggleLike = () => {
    if (!post) {
      return;
    }
    const entry = toggleLike(post.slug);
    setLikes(entry.likes);
    setLiked(entry.liked);
  };

  const handleCopyLink = async () => {
    if (!post || !shareUrl) {
      return;
    }

    if (typeof navigator === "undefined" || !navigator.clipboard || !navigator.clipboard.writeText) {
      setShareNotice("Copy isn’t supported on this browser");
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareNotice("Link copied to clipboard");
      recordShare();
    } catch (error) {
      console.warn("Copy failed", error);
      setShareNotice("Copy not supported on this browser");
    }
  };

  const handleNativeShare = async () => {
    if (!post || !shareUrl) {
      return;
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.summary,
          url: shareUrl
        });
        setShareNotice("Share dialog opened");
        recordShare();
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
        console.warn("Native share failed", error);
        setShareNotice("Sharing cancelled or unavailable");
      }
    }

    handleCopyLink();
  };

  const handleShareTargetClick = () => {
    if (!post) {
      return;
    }
    recordShare();
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (!post) {
      return;
    }

    const trimmedMessage = commentMessage.trim();
    const trimmedAuthor = commentAuthor.trim();

    if (!trimmedMessage) {
      setCommentStatus("Please add a comment before posting.");
      return;
    }

    const entry = addComment(post.slug, {
      name: trimmedAuthor,
      message: trimmedMessage
    });

    setComments(entry.comments);
    setCommentAuthor("");
    setCommentMessage("");
    setCommentStatus("Thanks for sharing your thoughts!");
  };

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
  const commentCount = comments.length;
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  return (
    <main
      className="blog-article"
      aria-labelledby="blog-article-heading"
    >
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress__bar" style={{ width: `${progress}%` }} />
      </div>
      <Helmet>
        <title>{post.title} | Rraynex Blog</title>
        <meta name="description" content={post.summary} />
        {shareUrl && <link rel="canonical" href={shareUrl} />}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        {shareUrl && <meta property="og:url" content={shareUrl} />}
        {featuredImageFor(post) && <meta property="og:image" content={featuredImageFor(post)} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        {featuredImageFor(post) && <meta name="twitter:image" content={featuredImageFor(post)} />}

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.summary,
            author: { '@type': 'Person', name: post.author },
            datePublished: post.date,
            image: featuredImageFor(post),
            mainEntityOfPage: shareUrl || undefined
          })}
        </script>
      </Helmet>

      <nav className="blog-breadcrumb" aria-label="Breadcrumb">
        <Link to="/blog">← Back to Blogs</Link>
      </nav>

  <article className="blog-article__container" ref={articleRef}>
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
            <span className="blog-article__stat" aria-label="Total likes">
              {likes.toLocaleString()} {likes === 1 ? "Like" : "Likes"}
            </span>
            <span className="blog-article__stat" aria-label="Total shares">
              {shares.toLocaleString()} {shares === 1 ? "Share" : "Shares"}
            </span>
            <span className="blog-article__stat" aria-label="Total comments">
              {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
            </span>
          </div>
        </header>

        {post.gallery && post.gallery.length > 0 && (
          <section className="blog-article__gallery" aria-label="Image highlights">
            {post.gallery.map((item, index) => (
              <img key={item} src={item} alt={`${post.title} visual ${index + 1}`} loading="lazy" decoding="async" sizes="(min-width: 992px) 33vw, 50vw" />
            ))}
          </section>
        )}

        <section className="blog-article__body">
          {post.content.map((block, index) => {
            if (typeof block !== "string") {
              return <p key={index}>{String(block)}</p>;
            }

            // Split by lines to support headings embedded with newlines
            const lines = block.split(/\n+/).map((l) => l.trim()).filter(Boolean);
            if (lines.length === 0) return null;

            return (
              <React.Fragment key={index}>
                {lines.map((line, li) => {
                  if (/^###\s+/.test(line)) {
                    return <h3 key={li}>{line.replace(/^###\s+/, "")}</h3>;
                  }
                  if (/^##\s+/.test(line)) {
                    return <h2 key={li}>{line.replace(/^##\s+/, "")}</h2>;
                  }
                  if (/^#\s+/.test(line)) {
                    return <h1 key={li}>{line.replace(/^#\s+/, "")}</h1>;
                  }
                  // simple bullet list detection
                  if (/^[*-]\s+/.test(line)) {
                    // convert contiguous list lines into a ul
                    const items = lines.slice(li).filter((ln) => (/^[*-]\s+/.test(ln)));
                    return (
                      <ul key={li}>
                        {items.map((it, k) => (
                          <li key={k}>{it.replace(/^[*-]\s+/, "")}</li>
                        ))}
                      </ul>
                    );
                  }

                  return <p key={li}>{line}</p>;
                })}
              </React.Fragment>
            );
          })}
        </section>

        <section className="blog-article__engagement" aria-label="Share and react to this article">
          <div className="blog-article__actions" role="group" aria-label="Engagement actions">
            <div className="blog-article__metrics">
              <span><strong>{likes.toLocaleString()}</strong> {likes === 1 ? "Like" : "Likes"}</span>
              <span><strong>{shares.toLocaleString()}</strong> {shares === 1 ? "Share" : "Shares"}</span>
              <span><strong>{commentCount}</strong> {commentCount === 1 ? "Comment" : "Comments"}</span>
            </div>
            <button
              type="button"
              className={`blog-like${liked ? " blog-like--active" : ""}`}
              onClick={handleToggleLike}
              aria-pressed={liked}
            >
              {liked ? "Liked" : "Like"}
            </button>
            <button type="button" className="blog-share__button" onClick={handleNativeShare}>
              Share
            </button>
            <button
              type="button"
              className="blog-share__button blog-share__button--secondary"
              onClick={handleCopyLink}
            >
              Copy link
            </button>
          </div>
          {shareTargets.length > 0 && (
            <div className="blog-share__targets" aria-label="Share via social platforms">
              {shareTargets.map((target) => (
                <a
                  key={target.id}
                  href={target.href}
                  target="_blank"
                  rel="noreferrer"
                  className="blog-share__link"
                  onClick={handleShareTargetClick}
                >
                  {target.label}
                </a>
              ))}
            </div>
          )}
          {shareNotice && <p className="blog-share__notice">{shareNotice}</p>}
        </section>

        <section className="blog-comments" aria-label="Article comments">
          <h2>Join the conversation</h2>
          <form className="blog-comments__form" onSubmit={handleCommentSubmit}>
            <div className="blog-field">
              <label className="blog-field__label" htmlFor="comment-name">Name (optional)</label>
              <input
                id="comment-name"
                type="text"
                value={commentAuthor}
                onChange={(event) => setCommentAuthor(event.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="blog-field">
              <label className="blog-field__label" htmlFor="comment-message">Comment</label>
              <textarea
                id="comment-message"
                rows={4}
                value={commentMessage}
                onChange={(event) => setCommentMessage(event.target.value)}
                placeholder="Share your perspective"
                required
              />
            </div>
            <button type="submit" className="blog-share__button">
              Post comment
            </button>
          </form>
          {commentStatus && <p className="blog-comments__status" role="status">{commentStatus}</p>}

          {commentCount > 0 ? (
            <ol className="blog-comments__list">
              {comments.map((comment, index) => {
                const createdAt = comment.createdAt ? new Date(comment.createdAt) : null;
                const isValidDate = createdAt && !Number.isNaN(createdAt.getTime());
                const timestamp = isValidDate
                  ? createdAt.toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                  : "Just now";

                return (
                  <li key={comment.id || index} className="blog-comments__item">
                    <header className="blog-comments__item-header">
                      <span className="blog-comments__author">{comment.name}</span>
                      <time dateTime={isValidDate ? createdAt.toISOString() : undefined}>{timestamp}</time>
                    </header>
                    <p>{comment.message}</p>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="blog-comments__empty">Be the first to add a comment.</p>
          )}
        </section>

        <section className="blog-related" aria-label="Related insights">
          <h2>Related insights</h2>
          <div className="blog-related__grid">
            {related.map((item) => (
              <Link key={item.id} to={`/blog/${item.slug}`} className="blog-related__card">
                <div className="blog-related__media">
                  <img src={featuredImageFor(item)} alt={item.title} loading="lazy" decoding="async" sizes="(min-width: 992px) 220px, 50vw" />
                </div>
                <div className="blog-related__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{item.category}</span>
                    <time dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                    </time>
                    <span>{item.readTime} min read</span>
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="blog-article__footer">
          <ul className="blog-article__tags" aria-label="Article tags">
            {post.tags.map((item) => (
              <li key={item}>#{item}</li>
            ))}
          </ul>
          <div className="blog-article__nav">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="blog-article__cta">← {prevPost.title}</Link>
            ) : <span />}
            <Link to="/blog" className="blog-article__cta">Back to insights</Link>
            {nextPost ? (
              <Link to={`/blog/${nextPost.slug}`} className="blog-article__cta">{nextPost.title} →</Link>
            ) : <span />}
          </div>
        </footer>
      </article>
    </main>
  );
}
