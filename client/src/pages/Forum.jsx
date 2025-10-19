import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "coursify_forum_posts";

function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

const Forum = () => {
  const [posts, setPosts] = useState(() => loadPosts());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [query, setQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  function handleCreate(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const ts = new Date().toISOString();
    const newPost = {
      id: crypto.randomUUID(),
      title: title.trim(),
      body: body.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: ts,
      upvotes: 0,
      answers: []
    };
    setPosts([newPost, ...posts]);
    setTitle("");
    setBody("");
    setTags("");
  }

  function handleUpvote(id) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p)));
  }

  function handleAnswer(postId, text) {
    if (!text.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              answers: [...p.answers, { id: crypto.randomUUID(), text: text.trim(), createdAt: new Date().toISOString() }]
            }
          : p
      )
    );
  }

  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesQuery = [p.title, p.body, p.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesTag = !filterTag || p.tags.includes(filterTag);
      return matchesQuery && matchesTag;
    });
  }, [posts, query, filterTag]);

  return (
    <div style={{ maxWidth: 1000, margin: "32px auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Community Forum</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: 8, border: "1px solid var(--border-color)", borderRadius: 8, background: "var(--card-bg)", color: "var(--text-primary)" }}
          />
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            style={{ padding: 8, border: "1px solid var(--border-color)", borderRadius: 8, background: "var(--card-bg)", color: "var(--text-primary)" }}
          >
            <option value="">All tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Create Post */}
      <form onSubmit={handleCreate} style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: 12, padding: 16, boxShadow: "var(--shadow)", marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Ask a question</h3>
        <input
          type="text"
          placeholder="Title (e.g., How to structure a MERN project?)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid var(--border-color)", marginBottom: 10, background: "var(--card-bg)", color: "var(--text-primary)" }}
        />
        <textarea
          placeholder="Describe your issue or share details..."
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid var(--border-color)", marginBottom: 10, background: "var(--card-bg)", color: "var(--text-primary)" }}
        />
        <input
          type="text"
          placeholder="Tags (comma separated, e.g., react, node, mongodb)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid var(--border-color)", marginBottom: 10, background: "var(--card-bg)", color: "var(--text-primary)" }}
        />
        <button type="submit" className="btn-primary" style={{ padding: "10px 16px", borderRadius: 8, border: "none" }}>
          Post Question
        </button>
      </form>

      {/* Posts List */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--text-secondary)", padding: 24 }}>No posts yet. Be the first to ask!</div>
        ) : (
          filtered.map((p) => <PostCard key={p.id} post={p} onUpvote={() => handleUpvote(p.id)} onAnswer={(txt) => handleAnswer(p.id, txt)} />)
        )}
      </div>
    </div>
  );
};

function PostCard({ post, onUpvote, onAnswer }) {
  const [answer, setAnswer] = useState("");
  return (
    <article style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: 12, padding: 16, boxShadow: "var(--shadow)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h4 style={{ margin: 0 }}>{post.title}</h4>
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{new Date(post.createdAt).toLocaleString()}</span>
      </header>
      <p style={{ marginTop: 0, color: "var(--text-secondary)" }}>{post.body}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        {post.tags.map((t) => (
          <span key={t} style={{ fontSize: 12, padding: "4px 8px", background: "#e5e7eb", color: "#111827", borderRadius: 999 }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
        <button onClick={onUpvote} className="btn-outline" style={{ padding: "6px 10px" }}>▲ Upvote ({post.upvotes})</button>
      </div>
      <section style={{ marginTop: 12 }}>
        <h5 style={{ margin: "12px 0 8px" }}>Answers ({post.answers.length})</h5>
        {post.answers.length === 0 ? (
          <div style={{ color: "var(--text-secondary)" }}>No answers yet. Share your knowledge!</div>
        ) : (
          <ul style={{ paddingLeft: 20 }}>
            {post.answers.map((a) => (
              <li key={a.id} style={{ marginBottom: 6 }}>
                {a.text}
                <span style={{ marginLeft: 8, color: "var(--text-secondary)", fontSize: 12 }}>— {new Date(a.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write an answer..."
            style={{ flex: 1, padding: 8, border: "1px solid var(--border-color)", borderRadius: 8, background: "var(--card-bg)", color: "var(--text-primary)" }}
          />
          <button className="btn-primary" onClick={() => { onAnswer(answer); setAnswer(""); }} style={{ padding: "8px 12px" }}>Post</button>
        </div>
      </section>
    </article>
  );
}

export default Forum;
