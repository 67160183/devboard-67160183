import { useState } from "react";
import "./App.css";

// นำเข้า Component ทั้งหมดให้ครบ
import Navbar from "../components/Navbar";
import PostList from "./components/PostList";
import UserCard from "../components/UserCard";
import AddPostForm from "../components/AddPostForm"; // 👈 ดึงฟอร์มเข้ามาใช้งานตรงนี้

function App() {
  // 1. สร้าง State สำหรับเก็บข้อมูลโพสต์ (ใช้ useState แทนตัวแปรธรรมดา)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "React คืออะไร?",
      body: "React เป็น library สำหรับสร้าง UI ที่ทำให้ code อ่านง่ายและดูแลรักษาได้",
    },
    {
      id: 2,
      title: "ทำไมต้องใช้ Components?",
      body: "Components ช่วยให้เราแบ่ง UI ออกเป็นชิ้นเล็ก ๆ ที่ reuse ได้",
    },
    {
      id: 3,
      title: "JSX คืออะไร?",
      body: "JSX คือ syntax ที่ช่วยให้เราเขียน HTML ใน JavaScript ได้อย่างสะดวก",
    },
    {
      id: 4,
      title: "Props ทำงานอย่างไร?",
      body: "Props คือ argument ที่ส่งให้ component เหมือนกับการส่งพารามิเตอร์ให้ฟังก์ชัน",
    },
  ]);

  // 2. สร้าง State สำหรับเก็บรายการที่กดถูกใจ
  const [favorites, setFavorites] = useState([]);

  const USERS = [
    { id: 1, name: "สมชาย ใจดี", email: "somchai@dev.com" },
    { id: 2, name: "สมหญิง รักเรียน", email: "somying@dev.com" },
    { id: 3, name: "วิชาญ โค้ดเก่ง", email: "wichan@dev.com" },
  ];

  // 3. ฟังก์ชันจัดการเมื่อผู้ใช้กดปุ่ม ❤️
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // ถ้าเคยกดแล้ว ให้เอาออก
          : [...prev, postId], // ถ้ายังไม่เคยกด ให้เพิ่มเข้าไป
    );
  }

  // 4. ฟังก์ชันจัดการเมื่อผู้ใช้กด "โพสต์" จากใน AddPostForm
  function handleAddPost({ title, body }) {
    const newPost = { id: Date.now(), title, body };
    setPosts((prev) => [newPost, ...prev]); // เอาโพสต์ใหม่ไปต่อหน้าโพสต์เดิม
  }

  return (
    <>
      {/* ส่งจำนวนยอดคนถูกใจไปแสดงที่ Navbar */}
      <Navbar favoriteCount={favorites.length} />

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย */}
        <div>
          {/* 👈 เรียกใช้ AddPostForm และส่งฟังก์ชันเพิ่มโพสต์ให้มัน */}
          <AddPostForm onAddPost={handleAddPost} />

          {/* เรียกใช้ PostList และส่งข้อมูล+ฟังก์ชันไปให้ */}
          <PostList
            posts={posts}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา */}
        <div>
          <h2
            style={{
              color: "#2d3748",
              borderBottom: "2px solid #1e40af",
              paddingBottom: "0.5rem",
            }}
          >
            สมาชิก
          </h2>
          {USERS.map((user) => (
            <UserCard key={user.id} name={user.name} email={user.email} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
