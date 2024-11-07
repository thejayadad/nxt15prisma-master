'use client'
import React, { useState } from 'react';
import { useActionState } from 'react';
import { SubmitButton } from '../button/submit-button';
import { updatePost } from '@/lib/actions/update-post';

interface UpdateFormProps {
  post: {
    id: string;
    title: string;
    imageUrl: string;
    userEmail: string;
  };
  activeUser: string; // The email of the active user
}

const UpdateForm: React.FC<UpdateFormProps> = ({ post, activeUser }) => {
  const [state, formAction] = useActionState(updatePost.bind(null, post.id), null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // Set the preview image state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      setPreviewImage(null); // Reset preview if no file is selected
    }
  };

  return (
    <form action={formAction}> {/* Set enctype for file upload */}
      <div className='mb-4'>
        <label htmlFor='title' className='block text-gray-700'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          defaultValue={post.title}
          className='border border-gray-300 rounded-md p-2 w-full'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='currentImage' className='block text-gray-700'>Current Image:</label>
        {previewImage ? (
          <img src={previewImage} alt="New Preview" className='mb-2 w-full h-48 object-cover rounded-md' />
        ) : (
          post.imageUrl && (
            <img src={post.imageUrl} alt="Current Post" className='mb-2 w-full h-48 object-cover rounded-md' />
          )
        )}
        <label htmlFor='imageUrl' className='block text-gray-700'>Upload New Image:</label>
        <input
          type='file'
          id='imageUrl'
          name='imageUrl'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleImageChange} // Handle image change event
        />
      </div>
      <input type='hidden' name='userEmail' value={activeUser} /> {/* Hidden input for user email */}
      <div className='flex justify-end'>
        <SubmitButton label='Update' />
      </div>
      {state?.error && (
        <div className='mt-2 text-red-500'>
          {state.error.title || state.error.imageUrl} {/* Display validation errors */}
        </div>
      )}
    </form>
  );
}

export default UpdateForm;
