import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ProfilePictureModalProps {
  onClose: () => void;
  onSubmit: (imageUrl: string) => void;
}

const defaultImages = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
];

export default function ProfilePictureModal({ onClose, onSubmit }: ProfilePictureModalProps) {
  const [selectedImage, setSelectedImage] = useState(defaultImages[0]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Change Profile Picture</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {defaultImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative rounded-lg overflow-hidden aspect-square ${
                selectedImage === image ? 'ring-2 ring-accent' : ''
              }`}
            >
              <img
                src={image}
                alt={`Profile ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              onSubmit(selectedImage);
              onClose();
            }}
            className="w-full px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
          >
            Save Changes
          </button>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="w-full px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Custom Picture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}