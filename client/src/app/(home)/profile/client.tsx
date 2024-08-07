"use client";
import React, { useEffect, useState, useCallback } from "react";
import SettingPopup from "./components/setting-popup";
import feather from "feather-icons";
import CreatePostModal from "@/components/create-post-modal";
import { getPostAPI, getPostsAPI } from "@/services/api/internal/post.api";
import Post from "@/components/post";
import InfiniteScroll from "@/components/InfiniteScroll";
import PostDetailModal from "@/components/post/PostDetailModal";
import {
  getProfileAPI,
  updateAvatarAPI,
} from "@/services/api/internal/profile.api";
import Link from "next/link";
import { DEFAULT_PROFILE } from "@/constant/profile.constant";
import UpdateAvatarConfirmModal from "@/components/modals/update-avatar-confirm";
import { uploadFiles } from "@/services/api/external/s3";

const Profile: React.FC = () => {
  const [isShowSettingPopup, setIsShowSettingPopup] = useState(false);
  const [isShowCreatePostModal, setIsShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isPostDetailModalVisible, setIsPostDetailModalVisible] =
    useState(false);
  const [isShowModalConfirmUpdateAvatar, setIsShowModalConfirmUpdateAvatar] =
    useState(false);

  const [profile, setProfile] = useState<any>(DEFAULT_PROFILE);

  useEffect(() => {
    feather.replace();
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchProfile();
  }, [isShowCreatePostModal]);

  const fetchProfile = () => {
    getProfileAPI().then((prof) => {
      setProfile(prof);
    });
  };

  const fetchPosts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const response = await getPostsAPI(skip, limit);
    const newPosts = response.data;
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setTotalPosts(response.total);
    if (posts.length + newPosts.length >= response.total) {
      setHasMore(false);
    }
    setSkip((prevSkip) => prevSkip + limit);
    setIsLoading(false);
  }, [skip, limit, isLoading]);

  const loadMorePosts = () => {
    if (posts.length >= totalPosts) {
      setHasMore(false);
      return;
    }
    setLimit(9);
    fetchPosts();
  };

  const handlePostClick = async (postId: number) => {
    const post = await getPostAPI(postId);
    setSelectedPost(post);
    setIsPostDetailModalVisible(true);
  };

  const handleUploadAvatar = async (file: File) => {
    uploadFiles([file], "avatar")
      .then((images) => {
        const img = images && images.length > 0 ? images[0] : null;
        if (!img) return;
        if (images && images.length > 0) {
          const avatar = {
            filename: img.filename,
            path: img.path,
            url: img.url,
          };

          updateAvatarAPI(avatar).then((res) => {
            setIsShowModalConfirmUpdateAvatar(false);
            fetchProfile();
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setIsShowModalConfirmUpdateAvatar(false);
  };

  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <div className="flex justify-center">
          <div className="min-w-[800px] w-fit">
            <div className="flex gap-5 justify-between items-center">
              <div className="">
                <img
                  className="rounded-full w-32 h-32 object-cover cursor-pointer"
                  src={profile?.avatar?.url || DEFAULT_PROFILE.avatar}
                  alt="Profile"
                  onClick={() => setIsShowModalConfirmUpdateAvatar(true)}
                />
                <UpdateAvatarConfirmModal
                  isOpen={isShowModalConfirmUpdateAvatar}
                  onClose={() => setIsShowModalConfirmUpdateAvatar(false)}
                  onUpload={handleUploadAvatar}
                  onRemove={() => {}}
                />
              </div>
              <div className="flex justify-center flex-col p-8">
                <div className="flex items-center gap-5">
                  <h1 className=" text-2xl">
                    {profile?.username ? `@${profile.username}` : "_"}
                  </h1>
                  <Link
                    className="bg-gray-700 px-4 py-1 rounded-md h-[40px] flex items-center justify-center"
                    href={"/profile/edit"}
                    type="button"
                  >
                    Edit profile
                  </Link>
                  <button className="bg-gray-700 px-4 py-1 rounded-md h-[40px]">
                    View archive
                  </button>
                  <button
                    className="bg-gray-700 p-2 rounded-md h-[40px]"
                    onClick={() => setIsShowSettingPopup(true)}
                  >
                    <i data-feather="settings"></i>
                  </button>
                </div>
                <div className="mt-4 flex space-x-4">
                  <span>{totalPosts} posts</span>
                  <span>{profile?.followers} followers</span>
                  <span>{profile?.following} following</span>
                </div>
                <h2 className="mt-2">{profile?.name}</h2>
              </div>
            </div>
            <div className="flex mt-5">
              <button className="" onClick={() => setIsShowCreatePost(true)}>
                <div className="bg-gray-700 p-6 rounded-full w-[100px] h-[100px] flex items-center justify-center">
                  <span>
                    <i data-feather="plus-square" className="w-6 h-6"></i>
                  </span>
                </div>
                <div className="mt-2">New</div>
              </button>
              <CreatePostModal
                isVisible={isShowCreatePostModal}
                onClose={() => setIsShowCreatePost(false)}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8">
          <div className="flex justify-center space-x-8 py-4">
            <button className="text-white">Posts</button>
            <button className="text-gray-500">Saved</button>
            <button className="text-gray-500">Tagged</button>
          </div>
        </div>
        {posts.length === 0 && (
          <div className="flex flex-col items-center mt-8">
            <p>Share Photos</p>
            <p className="text-gray-500">
              When you share photos, they will appear on your profile.
            </p>
            <button className="text-blue-500">Share your first photo</button>
          </div>
        )}

        {posts.length > 0 && (
          <>
            <div className="container mx-auto py-8 px-10">
              <div className="grid grid-cols-3 gap-4">
                {posts.map((post, index) => (
                  <Post
                    id={post.id}
                    imageUrl={post.images[0].url}
                    key={index}
                    onClick={handlePostClick}
                  />
                ))}
              </div>
              {hasMore && (
                <InfiniteScroll loadMore={loadMorePosts} hasMore={hasMore} />
              )}
            </div>
          </>
        )}
      </div>

      <PostDetailModal
        isVisible={isPostDetailModalVisible}
        post={selectedPost}
        onClose={() => setIsPostDetailModalVisible(false)}
      />

      <SettingPopup
        isVisible={isShowSettingPopup}
        onClose={() => setIsShowSettingPopup(false)}
      />
    </>
  );
};

export default Profile;
