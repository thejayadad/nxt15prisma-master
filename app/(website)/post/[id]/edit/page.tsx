import { auth } from '@/auth';
import UpdateForm from '@/components/form/update-form';
import { getPostById } from '@/lib/actions/get-post-byid';
import React from 'react';

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

const UpdatePostPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const activeUser = session?.user.email;
  const { id } = await params

  const post: Post | null = await getPostById(id);

  if (!post) {
      return <div>Post not found</div>; // Handle case where post doesn't exist
  }

  return (
    <div className='mx-auto max-w-screen-lg p-4'>
      <h1 className='font-bold text-xl text-gray-700'>Update Post Page</h1>
      <UpdateForm post={post} activeUser={activeUser} />
    </div>
  );
}

export default UpdatePostPage;
