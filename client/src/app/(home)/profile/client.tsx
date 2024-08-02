"use client";
import React, { useEffect, useState } from "react";
import SettingPopup from "./components/setting-popup";
import feather from "feather-icons";
import CreatePostModal from "@/components/create-post-modal";

const Profile: React.FC = () => {
  const [isShowSettingPopup, setIsShowSettingPopup] = useState(false);
  const [isShowCreatePostModal, setIsShowCreatePost] = useState(false);
  useEffect(() => {
    feather.replace();
  }, []);
  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <div className="flex justify-center">
          <div className="min-w-[800px] w-fit">
            <div className="flex gap-5 justify-between items-center">
              <div className="">
                <img
                  className="rounded-full w-32 h-32 object-cover"
                  src="/avatars/bevis.png"
                  alt="Profile"
                />
              </div>
              <div className="flex justify-center flex-col p-8">
                <div className="flex items-center gap-5">
                  <h1 className=" text-2xl">@ngocongtuan2104</h1>
                  <button className="bg-gray-700 px-4 py-1 rounded-md h-[40px]">
                    Edit profile
                  </button>
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
                  <span>0 posts</span>
                  <span>22 followers</span>
                  <span>1 following</span>
                </div>
                <h2 className="mt-2">Ngô Công Tuấn</h2>
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
        <div className="flex flex-col items-center mt-8">
          <p>Share Photos</p>
          <p className="text-gray-500">
            When you share photos, they will appear on your profile.
          </p>
          <button className="text-blue-500">Share your first photo</button>
        </div>
      </div>

      <SettingPopup
        isVisible={isShowSettingPopup}
        onClose={() => setIsShowSettingPopup(false)}
      />
    </>
  );
};

export default Profile;
