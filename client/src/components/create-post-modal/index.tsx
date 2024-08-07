"use client";
import React, { useEffect, useRef, useState } from "react";
import feather from "feather-icons";
import { WRITE_SERVICE_API } from "@/services/api/provider";
import { getCookie } from "@/utils/client/ cookie";
import { uploadFiles } from "@/services/api/external/s3";
import { createPostAPI } from "@/services/api/internal/post.api";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const captionRef = useRef<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [altTexts, setAltTexts] = useState<string[]>([]);

  useEffect(() => {
    feather.replace();
  }, [selectedImages, currentImageIndex]);

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    clear();
  }, [isVisible]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      const images = files.map((file) => URL.createObjectURL(file));
      setSelectedImages(images);
      setCurrentImageIndex(0);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < selectedImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const toggleAccessibility = () => {
    setIsAccessibilityOpen(!isAccessibilityOpen);
  };

  const handleAltTextChange = (index: number, value: string) => {
    const newAltTexts = [...altTexts];
    newAltTexts[index] = value;
    setAltTexts(newAltTexts);
  };

  const handleShare = () => {
    const caption = captionRef.current.trim();
    if (!caption) return;

    uploadFiles(selectedFiles)
      .then((images) => {
        if (images && images.length > 0) {
          const createPostPayload = {
            caption,
            images: images.map((img) => ({
              filename: img.filename,
              path: img.path,
              url: img.url,
            })),
          };

          createPostAPI(createPostPayload).then((res) => {
            clear();
            onClose();
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clear = () => {
    setCurrentImageIndex(0);
    setIsAccessibilityOpen(false);
    setSelectedFiles([]);
    setSelectedImages([]);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-gray-800 text-white rounded-lg p-4 w-[60vw]  min-w-[1200px]">
        <div className="relative w-full">
          <h2 className="text-center text-lg font-semibold mb-4">
            Create new post
          </h2>
          {selectedImages.length > 0 && (
            <button
              className="text-[#2e86de] px-4 rounded absolute right-[10px] top-0 font-bold"
              onClick={handleShare}
            >
              Share
            </button>
          )}
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-gray-600 rounded-lg p-8 bg-gray-900 h-[80vh]">
          {selectedImages.length === 0 ? (
            <>
              <img src="/icons/images.png" />
              <p className="mb-4">Drag photos and videos here</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                onChange={handleImageChange}
                multiple
              />
              <label
                htmlFor="fileInput"
                className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
              >
                Select from computer
              </label>
            </>
          ) : (
            <div className="flex gap-6 h-[80vh]">
              <div className="relative w-full h-full">
                <img
                  src={selectedImages[currentImageIndex]}
                  alt="Selected"
                  className="w-full h-full object-contain mb-4"
                />

                {currentImageIndex > 0 && (
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
                    onClick={handlePrevImage}
                  >
                    <span>
                      <i data-feather="chevron-left" className="w-6 h-6"></i>
                    </span>
                  </button>
                )}
                {currentImageIndex < selectedImages.length - 1 && (
                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
                    onClick={handleNextImage}
                  >
                    <span>
                      <i data-feather="chevron-right" className="w-6 h-6"></i>{" "}
                    </span>
                  </button>
                )}
              </div>
              <div className="flex flex-col w-[500px] p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src="/avatars/bevis.png"
                    alt="Profile"
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <span className="font-semibold">ngocongtuan2104</span>
                </div>
                <textarea
                  className="w-full p-2 mb-4 bg-transparent text-white rounded resize-none outline-none"
                  placeholder="Write a caption..."
                  rows={6}
                  onChange={(e) => (captionRef.current = e.target.value)}
                />
                <div className="flex flex-col space-y-2">
                  <button className="bg-transparent text-white py-2 px-4 rounded flex justify-between items-center">
                    <span>Add location{`( CMS )`}</span>
                    <i data-feather="map-pin" className="w-5 h-5"></i>
                  </button>
                  <button className="bg-transparent text-white py-2 px-4 rounded flex justify-between items-center">
                    <span>Add collaborators{`( CMS )`}</span>
                    <i data-feather="user-plus" className="w-5 h-5"></i>
                  </button>

                  <div>
                    <button
                      className="bg-transparent text-white py-2 px-4 rounded flex justify-between items-center w-full"
                      onClick={toggleAccessibility}
                    >
                      <span>Accessibility</span>
                      <i
                        data-feather={
                          isAccessibilityOpen ? "chevron-up" : "chevron-down"
                        }
                        className="w-5 h-5"
                      ></i>
                    </button>
                    {isAccessibilityOpen && (
                      <div className="mt-2 px-4">
                        <p className="text-gray-500 text-sm mb-2">
                          Alt text describes your photos for people with visual
                          impairments. Alt text will be automatically created
                          for your photos or you can choose to write your own.
                        </p>
                        {selectedImages.map((image, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <img
                              src={image}
                              alt={`Selected ${index}`}
                              className="w-12 h-12 object-cover mr-2 rounded"
                            />
                            <input
                              type="text"
                              className="w-full p-2 bg-transparent text-white rounded"
                              placeholder="Write alt text..."
                              value={altTexts[index]}
                              onChange={(e) =>
                                handleAltTextChange(index, e.target.value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="bg-transparent text-white py-2 px-4 rounded flex justify-between items-center">
                    <span>Advanced settings{`( CMS )`}</span>
                    <i data-feather="settings" className="w-5 h-5"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
