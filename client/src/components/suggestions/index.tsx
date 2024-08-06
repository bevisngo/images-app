import { DEFAULT_PROFILE } from "@/constant/profile.constant";
import React from "react";

const suggestedProfiles = [
  { username: "yennhi.2704", name: "Yến Nhi", image: "/default-profile.jpg" },
  { username: "btram.16", name: "Bích Trâm", image: "/default-profile.jpg" },
  {
    username: "linhhk.152",
    name: "Trần Thị Thùy Linh",
    image: "/default-profile.jpg",
  },
  { username: "_phuc.tm_", name: "TRAMINHPHUC", image: "/default-profile.jpg" },
  { username: "nguyn.nt_", name: "Nguyn", image: "/default-profile.jpg" },
  { username: "_nhihi", name: "Cao Uyen Nhi", image: "/default-profile.jpg" },
  { username: "i_anniel", name: "ngloan", image: "/default-profile.jpg" },
  { username: "zhoujuan15tigypsy", name: "ti", image: "/default-profile.jpg" },
  { username: "tie.msy_", name: "Xuân Tiến", image: "/default-profile.jpg" },
  {
    username: "sophie.21mar",
    name: "Bích Trâm",
    image: "/default-profile.jpg",
  },
  {
    username: "loii14_",
    name: "Châu Thị Vân Hiền",
    image: "/default-profile.jpg",
  },
  {
    username: "truongtuongquan",
    name: "Trương Thanh Hải",
    image: "/default-profile.jpg",
  },
  {
    username: "thuynguyen199x",
    name: "Nguyễn Thùy",
    image: "/default-profile.jpg",
  },
];

const Suggestions: React.FC = () => {
  return (
    <div className="min-h-screen text-white flex items-center justify-center py-10">
      <div className="w-full max-w-md">
        <h1 className="text-lg font-semibold mb-6">Suggested for you</h1>
        <div className="space-y-4">
          {suggestedProfiles.map((profile) => (
            <div
              key={profile.username}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={DEFAULT_PROFILE.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold">{profile.username}</div>
                  <div className="text-sm text-gray-400">{profile.name}</div>
                  <div className="text-sm text-gray-400">Suggested for you</div>
                </div>
              </div>
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
