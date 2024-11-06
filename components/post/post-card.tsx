import Image from 'next/image';
import React from 'react';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    imageUrl: string;
    userEmail: string; // Add other relevant fields as needed
    description: string; // Additional field for a detailed description
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className='flex flex-col md:flex-row p-4 w-full border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200'>
      <div className='relative w-full h-48 md:w-48 md:h-48 rounded-md overflow-hidden'>
        <Image
          alt={post.title}
          layout="fill"
          objectFit="cover"
          src={post.imageUrl || "https://images.pexels.com/photos/13610249/pexels-photo-13610249.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"}
        />
      </div>
      <div className='flex flex-col justify-between p-4 md:ml-4'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>{post.title}</h2>
        <p className='text-sm text-gray-500 mb-2'>Posted by: {post.userEmail}</p>
        {/* <p className='text-base text-gray-600 mb-4'>{post.description.substring(0, 100)}...</p> */}
        <span className='text-crimson-600 font-medium border-b border-crimson-600 hover:text-crimson-800 transition-colors duration-200'>
          Read More
        </span>
      </div>
    </div>
  );
}

export default PostCard;
