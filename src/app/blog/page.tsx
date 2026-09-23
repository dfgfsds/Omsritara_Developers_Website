import axios from "axios";
import BlogClient, { BlogPost } from "./BlogClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Property Blog & Insights | Omsritara Developers Chennai",
  description:
    "Explore real-time property market trends, homebuyer guides, infrastructure news, and investment insights from Omsritara Developers.",
};

export default async function BlogPage() {
  let initialBlogs: BlogPost[] = [];

  try {
    const res = await axios.get("https://api.omsritaradevelopers.in/blog", {
      timeout: 10000,
    });
    const list: BlogPost[] = Array.isArray(res?.data?.result)
      ? res.data.result
      : [];

    initialBlogs = list
      .filter(
        (blog) =>
          blog &&
          blog.status === "active" &&
          blog.isDeleted === false &&
          blog.title
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch (error) {
    console.error("Error pre-fetching blogs on server:", error);
  }

  return <BlogClient initialBlogs={initialBlogs} />;
}