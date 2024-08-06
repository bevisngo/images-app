"use client";

import CreatePostModal from "@/components/create-post-modal";
import { DEFAULT_PROFILE } from "@/constant/profile.constant";
import feather from "feather-icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavigationBar: React.FC = () => {
  const [isShowCreatePostModal, setIsShowCreatePost] = useState(false);
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <div className="bg-black text-white fixed top-0 left-0 min-h-screen w-[200px] flex flex-col justify-between p-4 border-r border-gray-700">
      <div>
        <div className="flex items-center mb-8">
          <Image width={200} height={200} src={"/logos/lonagram.png"} alt="" />
        </div>
        <nav className="flex flex-col space-y-4">
          <Link
            href={"/"}
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
          >
            <i data-feather="home" className="w-6 h-6"></i>
            <span>Home</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
          >
            <i data-feather="search" className="w-6 h-6"></i>
            <span>Search</span>
          </Link>
          <Link
            href={"/explore"}
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
          >
            <i data-feather="compass" className="w-6 h-6"></i>
            <span>Explore</span>
          </Link>
          <a
            href="#"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
          >
            <i data-feather="film" className="w-6 h-6"></i>
            <span>Reels</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
          >
            <i data-feather="message-circle" className="w-6 h-6"></i>
            <span>Messages</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
          >
            <i data-feather="heart" className="w-6 h-6"></i>
            <span>Notifications</span>
          </a>
          <button
            type="button"
            onClick={() => setIsShowCreatePost(true)}
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded cursor-pointer"
          >
            <span>
              <i data-feather="plus-square" className="w-6 h-6"></i>
            </span>
            <span>Create</span>
          </button>
          <Link
            href="/profile"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
          >
            <img
              src={DEFAULT_PROFILE.avatar}
              alt="Profile"
              className="rounded-full w-6 h-6 object-cover"
            />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col space-y-4">
        <a
          href="#"
          className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
        >
          <i data-feather="message-square" className="w-6 h-6"></i>
          <span>Threads</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded"
        >
          <i data-feather="more-horizontal" className="w-6 h-6"></i>
          <span>More</span>
        </a>
      </div>

      <CreatePostModal
        isVisible={isShowCreatePostModal}
        onClose={() => setIsShowCreatePost(false)}
      />
    </div>
  );
};

export default NavigationBar;
