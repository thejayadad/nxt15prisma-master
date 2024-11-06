import { auth } from "@/auth";
import PostCard from "@/components/post/post-card";
import { getAllPost } from "@/lib/actions/get-post";

export default async function Home() {
  const posts = await getAllPost()
  const session = await auth();
  const activeUser = session?.user.email



  return (
    <div>
      <div className="mx-auto max-w-screen-lg px-4">
        <h1 className="font-bold text-xl text-gray-500 leading-tight">Fitness Chronicles</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
        {
          posts?.map(post => (
            <PostCard
            activeUserEmail={activeUser}
            key={post.id}
            post={post}
            />
          ))
        }
        </div>
      </div>
    </div>
  );
}
