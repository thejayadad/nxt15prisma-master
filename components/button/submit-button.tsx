"use client";
import { useFormStatus } from "react-dom";
import { clsx } from "clsx";


export const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();
    return (
      <button
        className={clsx(
          "bg-purple-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-purple-600",
          {
            "opacity-50 cursor-progress": pending,
          }
        )}
        type="submit"
        disabled={pending}
      >
        {label === "Create" ? (
          <>{pending ? "One moment creating..." : "Create Post"}</>
        ) : (
          <>{pending ? "One moment updating..." : "Update Post"}</>
        )}
      </button>
    );
  };