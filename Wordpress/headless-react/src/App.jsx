import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_WP_API_BASE;

function extractFirstImageUrl(html) {
  if (!html) return "";

  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] || "";
}

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        setLoading(true);
        setError("");

        if (!API_BASE) {
          throw new Error("VITE_WP_API_BASE is missing");
        }

        const cleanBase = API_BASE.replace(/\/$/, "");
        // const url = `${cleanBase}/?rest_route=/wp/v2/cake&_embed&per_page=10`;
        const url = `${cleanBase}/?rest_route=/wp/v2/posts`;


        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        if (!cancelled) setPosts(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1>Post</h1>

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 16 }}>
        {posts.map((post) => {
          const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
          const featuredImageUrl =
            featuredMedia?.media_details?.sizes?.medium?.source_url ||
            featuredMedia?.source_url ||
            "";
          const contentImageUrl = extractFirstImageUrl(post.content?.rendered);
          const imageUrl = featuredImageUrl || contentImageUrl;

          return (
            <li
              key={post.id}
              style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={featuredMedia?.alt_text || post.title.rendered}
                 /*style={{
                    width: "100%",
                    maxHeight: 260,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 12,
                  }}*/
                />
              )}

              <h2
                style={{ marginTop: 0 }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />

              <a href={post.link} target="_blank" rel="noreferrer">
                Read on WordPress →
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}