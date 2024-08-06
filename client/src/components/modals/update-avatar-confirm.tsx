// components/ProfilePhotoModal.tsx
import React, { useRef } from "react";

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  onRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-80">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-center text-lg font-semibold">
            Change Profile Photo
          </h2>
        </div>
        <div className="p-4 space-y-4">
          <button
            className="w-full text-blue-500 hover:underline"
            onClick={handleUploadClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            className="w-full text-red-500 hover:underline"
            onClick={onRemove}
          >
            Remove Current Photo
          </button>
          <button
            className="w-full text-gray-400 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoModal;
