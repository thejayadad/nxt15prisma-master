
import { auth } from '@/auth'
import CreateForm from '@/components/form/create-form'
import React from 'react'

const CreatePage = async () => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const session = await auth()
const userEmail = session?.user?.email

  return (
    <div>
        <div className='mx-auto max-w-screen-lg p-4'>
            <h1 className='font-bold text-xl text-gray-700'>Create Post Page</h1>
            <CreateForm
                userEmail={userEmail || ''}
            />
        </div>
    </div>
  )
}

export default CreatePage