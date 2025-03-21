import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPostAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(""); // For viewing the image in modal

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/blog-posts")
      .then((response) => setBlogPosts(response.data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  // Handle adding a new blog post
  const handleAddBlogPost = () => {
    if (!image) {
      alert("Please choose an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    axios
      .post("http://localhost:8081/api/blog-posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setBlogPosts([...blogPosts, response.data]);
        setTitle("");
        setDescription("");
        setImage(null);
      })
      .catch((error) => console.error("Error adding blog post:", error));
  };

  // Handle selecting a blog post for editing
  const handleSelectBlogPost = (blogPost) => {
    setSelectedBlogPost(blogPost);
    setTitle(blogPost.title);
    setDescription(blogPost.description);
    setImage(blogPost.image);
  };

  // Handle updating a blog post
  const handleUpdateBlogPost = () => {
    if (!selectedBlogPost || !image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    axios
      .put(
        `http://localhost:8081/api/blog-posts/${selectedBlogPost.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setBlogPosts(
          blogPosts.map((blogPost) =>
            blogPost.id === selectedBlogPost.id ? response.data : blogPost
          )
        );
        setSelectedBlogPost(null);
        setTitle("");
        setDescription("");
        setImage(null);
      })
      .catch((error) => console.error("Error updating blog post:", error));
  };

  // Handle deleting a blog post
  const handleDeleteBlogPost = (id) => {
    axios
      .delete(`http://localhost:8081/api/blog-posts/${id}`)
      .then(() => {
        setBlogPosts(blogPosts.filter((post) => post.id !== id));
      })
      .catch((error) => console.error("Error deleting blog post:", error));
  };

  // Handle viewing the image


  
  const closeModal = () => {
    setSelectedImageUrl(""); // Close the modal
  };

  return (
    <div className="p-4">
    <div className="container mx-auto max-w-3xl mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Manage Blog Posts</h1>

      {/* Add/Edit Blog Post Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedBlogPost ? "Edit Blog Post" : "Add New Blog Post"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full px-3 py-2 bg-white-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
         <br />
         <br />
        
        <textarea
          placeholder="Description"
          className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <input
          type="file"
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="text-center">
        <br />
        <br />
          {selectedBlogPost ? (
            <button
              onClick={handleUpdateBlogPost}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400"
            >
              Update Blog Post
            </button>
          ) : (
            <button
              onClick={handleAddBlogPost}
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
            >
              Add Blog Post
            </button>
          )}
        </div>
      </div>

      {/* List of Blog Posts */}
      <h2 className="text-2xl font-semibold mb-4">All Blog Posts</h2>
      <div className="grid grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded-md">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.description}</p>
            <img
              src={`http://localhost:8081/api/blog-posts/download/${post.image}`}
              alt={post.title}
              className="w-full h-40 object-cover mb-4"
               // Click to view the image in a modal
            />
            <div className="text-center">
              <button
                onClick={() => handleSelectBlogPost(post)}
                className="py-1 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBlogPost(post.id)}
                className="py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Viewing Image */}
      {selectedImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <img src={selectedImageUrl} alt="Blog Post" className="max-w-full max-h-80" />
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default BlogPostAdmin;
