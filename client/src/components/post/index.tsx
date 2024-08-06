import React from "react";

interface PostProps {
  id: number;
  imageUrl: string;
  onClick: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({ id, imageUrl, onClick }) => {
  return (
    <div onClick={() => onClick(id)} className="cursor-pointer">
      <div className="w-full h-full aspect-w-1 aspect-h-1">
        <img
          src={imageUrl}
          alt={`Post ${id}`}
          className="object-cover w-full h-full rounded"
        />
      </div>
    </div>
  );
};

export default Post;
