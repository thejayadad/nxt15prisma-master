import { auth, signIn, signOut } from '@/auth';
import Link from 'next/link';
import React from 'react';

const Header = async () => {
    const session = await auth();

    return (
        <header className='w-full border-b'>
            <nav className='mx-auto max-w-screen-lg p-4 w-full flex justify-between items-center'>
                <div>Logo</div>
                {session ? (
                    <>
                    <div className='flex items-center space-x-2'>
                        <Link href={'/create'}>
                            Create
                        </Link>
                    <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <button type="submit">Logout</button>
                        </form>
                    </div>
                    </>
                ) : (
                    <>
                        <form
                            action={async () => {
                                "use server";
                                await signIn("google");
                            }}
                        >
                            <button type="submit">Signin with Google</button>
                        </form>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
