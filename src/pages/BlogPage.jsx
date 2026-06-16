// src/pages/BlogPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "../components/Icon";
import { fetchPosts, mediaUrl } from "../lib/blogApi";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  });
}

function initials(name) {
  if (!name) return "AY";
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let active = true;
    fetchPosts()
      .then((data) => {
        if (!active) return;
        setPosts(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setStatus("error");
      });
    return () => { active = false; };
  }, []);

  return (
    <div>
      <Helmet>
        <title>Around You - Blog</title>
        <meta name="description" content="Tips, stories and updates from AroundYou — local services and trusted professionals near you." />
        <meta property="og:title" content="Blog | AroundYou" />
        <meta property="og:description" content="Insights on local services, trusted workers, and getting things done right around you." />
        <meta property="og:url" content="https://aroundyou.com.ng/blog" />
      </Helmet>

      {/* Hero */}
      <section className="py-20 px-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0B1D3A,#0D6B6E)" }}>
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "#3EC6C8", filter: "blur(80px)" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(255,255,255,0.1)", color: "#6EE7A8" }}>AroundYou Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            Tips, stories &amp; updates from<br />
            <span style={{ color: "#3EC6C8" }}>your neighborhood</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Insights on local services, trusted professionals, and getting things done — right around you.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 px-6" style={{ background: "#f8fafb" }}>
        <div className="max-w-6xl mx-auto">

          {status === "loading" && (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #e8f3f4" }}>
                  <div className="aspect-video animate-pulse" style={{ background: "#eef2f3" }} />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-3/4 rounded animate-pulse" style={{ background: "#eef2f3" }} />
                    <div className="h-3 w-1/2 rounded animate-pulse" style={{ background: "#eef2f3" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-20">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(13,107,110,0.1)" }}>
                <Icon name="alert-circle" size={26} color="#0D6B6E" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>Couldn't load the blog</h3>
              <p className="mt-2 text-sm text-gray-500">{error} — please check your connection and try again.</p>
            </div>
          )}

          {status === "ready" && posts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(62,198,200,0.1)" }}>
                <Icon name="rocket" size={26} color="#0D6B6E" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>No posts yet</h3>
              <p className="mt-2 text-sm text-gray-500">Check back soon — we're working on something good.</p>
            </div>
          )}

          {status === "ready" && posts.length > 0 && (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {posts.map((post) => {
                const cover = mediaUrl(post.cover_image);
                return (
                  <Link key={post.id} to={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col"
                    style={{ border: "1px solid #e8f3f4" }}>
                    <div className="aspect-video overflow-hidden">
                      {cover ? (
                        <img src={cover} alt={post.title} loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold"
                          style={{ background: "linear-gradient(135deg,rgba(13,107,110,0.12),rgba(62,198,200,0.12))", color: "#0D6B6E", fontFamily: "'Sora', sans-serif" }}>
                          {initials(post.title)}
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="text-lg font-semibold text-[#0B1D3A] leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
                        {post.title}
                      </h2>
                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <span>{post.author_name || "AroundYou"}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#0D6B6E" }}>
                        Read article <Icon name="arrow-right" size={15} color="#0D6B6E" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogPage;