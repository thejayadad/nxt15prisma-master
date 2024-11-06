'use client'
import React from 'react';
import { createPost } from '@/lib/actions/create-post';
import { useActionState } from 'react';

interface UserEmailProps {
    userEmail: string; // Accept userEmail as a prop
}

const CreateForm: React.FC<UserEmailProps> = ({ userEmail }) => { // Use the prop in the function component
    const [state, formAction] = useActionState(createPost, null);

    return (
        <div className='w-full p-4'>
            <form action={formAction}>
                <div className='mb-4 pt-2'>
                    <input type='hidden' name='userEmail' id='userEmail'
                        defaultValue={userEmail} // Set the hidden input value to userEmail
                    />
                    <input type='text' name='title' id='title' placeholder='Title...' />
                    <div id='title-error' aria-label="polite" aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>{state?.error?.title?.[0]}</p> {/* Access first error message */}
                    </div>
                </div>
                <div className='mb-4 pt-2'>
                    <input type='file' id='imageUrl' name='imageUrl'
                        className='file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0'
                    />
                    <div id='imageUrl-error' aria-label="polite" aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>{state?.error?.imageUrl?.[0]}</p> {/* Access first error message */}
                    </div>
                </div>
                <button className='px-5 py-3 bg-purple-300' type='submit'>Create Post</button>
            </form>
        </div>
    );
}

export default CreateForm;
