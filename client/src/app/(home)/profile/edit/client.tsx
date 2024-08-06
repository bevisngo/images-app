"use client";
import { useEffect, useState } from "react";
import feather from "feather-icons";
import { DEFAULT_PROFILE } from "@/constant/profile.constant";
import {
  getProfileAPI,
  updateProfile,
} from "@/services/api/internal/profile.api";

export default function ProfileEditClient() {
  const [profile, setProfile] = useState<any>(DEFAULT_PROFILE);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    feather.replace();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    getProfileAPI().then((prof) => {
      setProfile(prof);
      setUsername(prof.username || "");
      setName(prof.name || "");
      setBio(prof.bio || "");
      setGender(prof.gender || "");
    });
  };

  const handleUpdateProfile = () => {
    const payload: any = {};
    if (username.trim()) payload.username = username;
    if (name.trim()) payload.name = name;
    if (bio.trim()) payload.bio = bio;
    if (gender.trim()) payload.gender = gender;

    updateProfile(payload).then((prof) => {
      setProfile(prof);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-lg font-bold mb-6">Edit profile</h1>

        <div className="flex items-center mb-6">
          <img
            src={profile?.avatar || DEFAULT_PROFILE.avatar}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <div className="text-lg font-semibold">
              {profile?.username || "_"}
            </div>
            <div className="text-sm text-gray-400">{profile?.name || "_"}</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border bg-transparent my-2 rounded focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500">Full name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border bg-transparent my-2 rounded focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500">Bio</label>
          <textarea
            className="w-full px-3 py-2 border bg-transparent my-2 rounded focus:outline-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
          />
          <p className="text-sm text-gray-400">{bio.length} / 150</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500">Gender</label>
          <select
            className="w-full px-3 py-2 border bg-transparent my-2 rounded focus:outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <p className="text-sm text-gray-400">
            This won't be part of your public profile.
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500">
            Show account suggestions on profiles (CMS)
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={showSuggestions}
              onChange={() => setShowSuggestions(!showSuggestions)}
            />
            <p className="text-sm text-gray-400">
              Choose whether people can see similar account suggestions on your
              profile, and whether your account can be suggested on other
              profiles.
            </p>
          </div>
        </div>
        <button
          className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
          onClick={handleUpdateProfile}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
