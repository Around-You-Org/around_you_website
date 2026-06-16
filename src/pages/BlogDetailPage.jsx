// src/pages/BlogDetailPage.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "../components/Icon";
import { fetchPost, mediaUrl } from "../lib/blogApi";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  });
}

function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let active = true;
    setStatus("loading");
    fetchPost(slug)
      .then((data) => {
        if (!active) return;
        if (!data) { setStatus("notfound"); return; }
        setPost(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setStatus("error");
      });
    return () => { active = false; };
  }, [slug]);

  const cover = post ? mediaUrl(post.cover_image) : null;
  // content is plain text from a Django TextField -> split blank lines into paragraphs.
  const paragraphs = post?.content
    ? String(post.content).split(/\n\s*\n/).filter(Boolean)
    : [];

  return (
    <div style={{ background: "#f8fafb" }} className="min-h-screen">
      <Helmet>
        <title>{post ? `${post.title} - AroundYou Blog` : "AroundYou Blog"}</title>
        {post && <meta name="description" content={String(post.content || "").slice(0, 150)} />}
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8" style={{ color: "#0D6B6E" }}>
          <Icon name="arrow-right" size={15} color="#0D6B6E" className="rotate-180" />
          Back to blog
        </Link>

        {status === "loading" && (
          <div className="space-y-5">
            <div className="aspect-video rounded-2xl animate-pulse" style={{ background: "#eef2f3" }} />
            <div className="h-8 w-3/4 rounded animate-pulse" style={{ background: "#eef2f3" }} />
            <div className="h-4 w-1/3 rounded animate-pulse" style={{ background: "#eef2f3" }} />
            <div className="space-y-3 pt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 rounded animate-pulse" style={{ background: "#eef2f3", width: `${90 - i * 5}%` }} />
              ))}
            </div>
          </div>
        )}

        {status === "notfound" && (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>Post not found</h1>
            <p className="mt-2 text-gray-500">This article may have been removed or unpublished.</p>
            <Link to="/blog" className="mt-6 inline-block text-sm font-semibold" style={{ color: "#0D6B6E" }}>← Back to blog</Link>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>Couldn't load this post</h1>
            <p className="mt-2 text-gray-500">{error} — please try again.</p>
          </div>
        )}

        {status === "ready" && post && (
          <article>
            {cover && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-sm">
                <img src={cover} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-[#0B1D3A] leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <span>By {post.author_name || "AroundYou"}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="mt-8 text-[17px] leading-relaxed text-gray-700 space-y-5">
              {paragraphs.length > 0
                ? paragraphs.map((p, i) => <p key={i} style={{ whiteSpace: "pre-wrap" }}>{p}</p>)
                : <p>No content.</p>}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default BlogDetailPage;