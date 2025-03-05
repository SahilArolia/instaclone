"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function CreatePost() {
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 0,
    y: 0,
  });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Convert External URL to a Blob to Avoid CORS Issue
  const handleUrlSubmit = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setImage(objectUrl);
    } catch (error) {
      console.error("Failed to fetch image:", error);
      alert("Failed to load the image. Try using another URL.");
    }
  };

  const handleCropComplete = async (crop: Crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
      setCroppedImage(croppedImageUrl);
    }
  };

  // Cropping Logic
  const getCroppedImg = (
    img: HTMLImageElement,
    crop: Crop
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          img,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );

        resolve(canvas.toDataURL("image/jpeg"));
      } else {
        resolve("");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!croppedImage) return alert("Please crop the image before submitting!");

    const newPost = {
      image: croppedImage,
      caption,
      likes: 0,
      comments: [],
      bookmarked: false,
    };

    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    localStorage.setItem("posts", JSON.stringify([newPost, ...storedPosts]));

    setImage(null);
    setCaption("");
    setCroppedImage(null);
    setImageUrl("");

    alert("Post submitted!");
    window.location.href = "/feed";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-white text-2xl font-bold mb-4">Create a New Post</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* URL Input */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="mt-2 w-full p-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Load Image
          </button>
        </div>

        {/* Image Cropper */}
        {image && (
          <div className="mt-3">
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={handleCropComplete}
              aspect={1}
            >
              {/* Ensure crossOrigin="anonymous" to handle CORS */}
              <img
                ref={imageRef}
                src={image as string}
                alt="To crop"
                crossOrigin="anonymous"
                className="rounded-lg mx-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </ReactCrop>
          </div>
        )}

        {/* Cropped Image Preview */}
        {croppedImage && (
          <div className="mt-3">
            <Image
              src={croppedImage}
              alt="Cropped Preview"
              width={400}
              height={300}
              className="rounded-lg mx-auto"
            />
          </div>
        )}

        {/* Caption Input */}
        <textarea
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 mt-3 rounded bg-gray-800 text-white border border-gray-700"
          rows={4}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}
