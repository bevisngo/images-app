// components/Popup.tsx
import { deleteCookie } from "@/utils/client/ cookie";
import { useRouter } from "next/navigation";
import React from "react";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isVisible, onClose }) => {
  const router = useRouter();

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLogout = () => {
    deleteCookie("authorization");
    router.push("/accounts/login");
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-gray-800 text-white rounded-lg w-[400px]">
        <div className="flex flex-col">
          <button
            className="py-4 text-center border-b border-gray-700"
            onClick={onClose}
          >
            Apps and websites
          </button>
          <button
            className="py-4 text-center border-b border-gray-700"
            onClick={onClose}
          >
            QR code
          </button>
          <button
            className="py-4 text-center border-b border-gray-700"
            onClick={onClose}
          >
            Notifications
          </button>
          <button
            className="py-4 text-center border-b border-gray-700"
            onClick={onClose}
          >
            Settings and privacy
          </button>
          <button
            className="py-4 text-center border-b border-gray-700"
            onClick={onClose}
          >
            Meta Verified
          </button>
          <button
            className="py-4 text-center border-b border-gray-700"
            onClick={onClose}
          >
            Supervision
          </button>
          <button
            className="py-4 text-center border-b border-gray-700"
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            Log Out
          </button>
          <button className="py-4 text-center" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
