"use client";
import React, { useEffect } from "react";
import feather from "feather-icons";

interface Comment {
  id: number;
  username: string;
  content: string;
  time: string;
}

interface PostDetailModalProps {
  isVisible: boolean;
  post: any;
  onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  isVisible,
  post,
  onClose,
}) => {
  if (!isVisible) return null;

  useEffect(() => {
    feather.replace();
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "modal-background") {
      onClose();
    }
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={handleClose}
    >
      <div className="bg-black text-white rounded-lg overflow-hidden w-3/4 h-3/4 relative flex">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-600 p-1 rounded-full"
        >
          <i data-feather="x" className="w-6 h-6"></i>
        </button>
        <div className="w-1/2">
          <img
            src={post.images[0].url}
            alt="Post Detail"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 p-4 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">{post.username}</h2>
            <p>{post.caption}</p>
            <p className="text-gray-500 text-sm">{post.time}</p>
          </div>
          <div className="flex-grow overflow-y-auto space-y-2">
            {post.postComments.map((comment: Comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <div>
                  <span className="font-bold">{comment.username}</span>
                  <span className="ml-2">{comment.content}</span>
                </div>
                <span className="text-gray-500 text-xs">{comment.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-md bg-gray-800 border-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
