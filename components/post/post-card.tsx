'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    imageUrl: string;
    userEmail: string; // Add other relevant fields as needed
    description: string; // Additional field for a detailed description
    user: {
      image: string; // User image URL
    };
  };
  activeUserEmail: string; // Add the active user's email prop
}

const PostCard: React.FC<PostCardProps> = ({ post, activeUserEmail }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='flex w-full bg-transparent rounded-lg hover:shadow-xl transition-shadow duration-200'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative h-[150px] md:w-full w-[100px] rounded-md overflow-hidden'>
        <Image
          alt={post.title}
          layout="fill"
          objectFit="cover"
          src={post.imageUrl || "https://images.pexels.com/photos/13610249/pexels-photo-13610249.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"}
        />
      </div>
      <div className='flex flex-col relative'>
        <h2 className='text-lg font-semibold text-gray-800'>{post.title}</h2>
        <div className='flex items-center w-full'>
          <p className='text-sm text-gray-500'>{post.userEmail}</p>
          <img className='h-8 w-8 rounded-full ml-2' alt='User' src={post.user.image} />
        </div>
        {activeUserEmail === post.userEmail && isHovered && ( // Show edit and delete icons if the user is active
          <div className='absolute top-2 right-2 flex space-x-2'>
            <button className='text-gray-600 hover:text-gray-800 transition-colors'>
              <FiEdit size={20} className='text-blue-600' />
            </button>
            <button className='text-gray-600 hover:text-gray-800 transition-colors'>
              <FiTrash2 size={20} />
            </button>
          </div>
        )}
        <span className='text-crimson-600 font-medium border-b border-crimson-600 hover:text-crimson-800 transition-colors duration-200'>
          Read More
        </span>
      </div>
    </div>
  );
}

export default PostCard;
