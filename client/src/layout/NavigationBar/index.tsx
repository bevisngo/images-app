"use client";

import CreatePost from "@/components/create-post";
import Modal from "@/components/widgets/Modal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavigationBar() {
  const [isShowCreatePostModal, setIsShowCreatePost] = useState(false);

  return (
    <div className="flex flex-col bg-[#000000] fixed top-0 left-0 min-h-screen w-[200px] border-r">
      <div className="flex w-full  py-4 px-4 mb-6">
        <Image width={100} height={100} src={"/logos/lona2.png"} alt="" />
      </div>
      <div className="px-5">
        <ul className="flex flex-col gap-6">
          <li>
            <div>
              <Link href={"/"} className=" font-semibold">
                Home
              </Link>
            </div>
          </li>
          <li>
            <div>
              <Link href={"/"} className=" font-semibold">
                Search
              </Link>
            </div>
          </li>
          <li>
            <div>
              <Link href={"/explore"} className=" font-semibold">
                Explore
              </Link>
            </div>
          </li>
          <li>
            <div>
              <button onClick={() => setIsShowCreatePost(true)}>Create</button>
              <Modal
                isOpen={isShowCreatePostModal}
                title="Create new post"
                handleClose={() => {
                  setIsShowCreatePost(false);
                }}
              >
                <CreatePost />
              </Modal>
            </div>
          </li>
          <li>
            <div>
              <Link href={"/"} className=" font-semibold">
                Profile
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
