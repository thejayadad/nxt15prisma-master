"use client";
import { deletePost } from "@/lib/actions/delete-post";
import { useFormStatus } from "react-dom";

export const DeleteButton = ({ id }: { id: string }) => {
    const deletePostWithId = deletePost.bind(null, id);
    return (
      <form
        action={deletePostWithId}
        className="py-3 text-sm bg-gray-50 rounded-br-md w-full hover:bg-gray-100 text-center"
      >
        <DeleteBtn />
      </form>
    );
  };
  const DeleteBtn = () => {
    const { pending } = useFormStatus();
    return (
      <button type="submit" disabled={pending}>
        {pending ? "Deleting..." : "Delete"}
      </button>
    );
  };