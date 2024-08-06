"use client";
import { DEFAULT_PROFILE } from "@/constant/profile.constant";
import { getPostsHomeAPI } from "@/services/api/internal/post.api";
import React, { useCallback, useEffect, useState } from "react";
import feather from "feather-icons";

const ListPost: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const response = await getPostsHomeAPI(skip, limit);
    const newPosts = response.data;
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setTotalPosts(response.total);
    setSkip((prevSkip) => prevSkip + limit);
    if (posts.length + newPosts.length >= response.total) {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [skip, limit, isLoading, posts.length]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    feather.replace();
  }, [posts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      hasMore &&
      !isLoading
    ) {
      fetchPosts();
    }
  }, [hasMore, isLoading, fetchPosts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10">
      <div className="w-full max-w-2xl">
        {posts.map((post, index) => (
          <div key={index} className="mb-8 border-b border-gray-600 pb-6">
            <div className="flex items-center mb-4">
              <img
                src={
                  post?.author?.profile?.avatars &&
                  post.author.profile.avatars.length > 0
                    ? post.author.profile.avatars[0].url
                    : DEFAULT_PROFILE.avatar
                }
                alt={post.username}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <div className="flex items-center">
                  <span className="font-semibold">
                    {post.author.profile.username}
                  </span>
                  {post.location && (
                    <span className="text-gray-400 text-sm ml-2">
                      • {post.location}
                    </span>
                  )}
                </div>
                <div className="text-gray-400 text-sm">{post.created_at}</div>
              </div>
            </div>
            <img
              src={post.images[0].url}
              alt="Post"
              className="w-full rounded-lg mb-4 max-h-[50vh] object-contain"
            />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <i
                  data-feather="heart"
                  className="w-6 h-6 text-white cursor-pointer"
                ></i>
                <i
                  data-feather="message-circle"
                  className="w-6 h-6 text-white cursor-pointer"
                ></i>
              </div>
              <i
                data-feather="bookmark"
                className="w-6 h-6 text-white cursor-pointer"
              ></i>
            </div>
            {!!post.likes && (
              <div className="font-semibold mb-2">
                {post.likes.toLocaleString()} likes
              </div>
            )}
            <div className="mb-2">
              <span className="font-semibold">{post.username}</span>{" "}
              {post.caption}
            </div>
            {!!post.comments && (
              <div className="text-gray-400 text-sm mb-2">
                View all {post.comments} comments
              </div>
            )}
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full bg-transparent border-none text-sm text-gray-400 placeholder-gray-600 focus:outline-none"
            />
          </div>
        ))}
        {isLoading && <h4>Loading...</h4>}
      </div>
    </div>
  );
};

export default ListPost;
