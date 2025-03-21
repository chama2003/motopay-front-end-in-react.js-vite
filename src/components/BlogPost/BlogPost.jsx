import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPostSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all blog posts when the component mounts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/blog-posts");
        setBlogPosts(response.data);
      } catch (error) {
        setMessage("Error fetching blog posts.");
        console.error(error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="bg-white dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center"id="blog">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="pb-12">
          <h1 className="text-3xl font-semibold text-center sm:text-4xl text-white font-serif">
            Latest Blog Posts
          </h1>
        </div>

        {/* Display Message if any error occurs */}
        {message && <p className="text-center text-yellow-500">{message}</p>}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="card text-center group space-y-4 sm:space-y-6 p-6 bg-black hover:bg-yellow-500 duration-300 text-white hover:text-black rounded-lg shadow-lg"
            >
              {/* Blog Title */}
              <h1 className="text-2xl font-bold text-white">{post.title}</h1>

              {/* Image */}
              {post.image && (
                <img
                  src={`http://localhost:8081/api/blog-posts/download/${post.image}`}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}

              {/* Description */}
              <p className="text-white">{post.description}</p>

              {/* Author & Date */}
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostSection;
