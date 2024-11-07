import { auth } from '@/auth';
import { DeleteButton } from '@/components/button/delete-post-btn';
import { SubmitButton } from '@/components/button/submit-button';
import { getPostById } from '@/lib/actions/get-post-byid';
import Link from 'next/link';
import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  userEmail: string;
  description: string;
  user: {
    email: string;
    image: string;
  };
}

const SinglePostPage = async ({ params }: { params: { id: string } }) => {
    const session = await auth();
    const activeUser = session?.user.email;
    const { id } = await params

    const post: Post | null = await getPostById(id);

    if (!post) {
        return <div>Post not found</div>; // Handle case where post doesn't exist
    }

    return (
        <section>
            <div className='mx-auto max-w-screen-lg p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='relative h-64 md:h-80'>
                        <img
                            src={post.imageUrl || "https://images.pexels.com/photos/13610249/pexels-photo-13610249.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"}
                            alt={post.title}
                            className='object-cover w-full h-full rounded-md'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-bold'>{post.title}</h1>
                        <p className='text-gray-600 mb-4'>{post.description}</p>
                        <div className='flex items-center'>
                            <img className='h-8 w-8 rounded-full mr-2' alt='User' src={post.user.image} />
                            <p className='text-sm text-gray-500'>{post.user.email}</p>
                            {activeUser === post.userEmail && ( // Check if active user matches post user
                                <div className='ml-auto flex items-center space-x-2'>
                                    <Link
                                    href={`/post/${post.id}/edit`}
                                    className='text-gray-600 hover:text-gray-800 transition-colors'>
                                        <FiEdit size={20} />
                                    </Link>
                                    <div className='text-gray-600 hover:text-gray-800 transition-colors'>
                                        <DeleteButton id={post.id} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SinglePostPage;
