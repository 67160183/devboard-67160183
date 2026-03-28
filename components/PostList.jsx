import { useState } from "react"; // อย่าลืม import
import PostCard from "../PostCard";
// import PostCount from "../PostCount"; // ถ้ามีก็ใช้ได้ครับ

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");

  // กรองโพสต์
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/* ช่องค้นหา */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)} // ส่งสถานะถูกใจ
          onToggleFavorite={() => onToggleFavorite(post.id)} // ส่งฟังก์ชันกดถูกใจ
        />
      ))}
    </div>
  );
}

export default PostList;
