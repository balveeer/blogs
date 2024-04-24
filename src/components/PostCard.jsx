import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
function PostCard(post) {
  return (
    <Link to={`/post/${post?.$id}`}>
      <div className="w-full justify-center mb-4">
        <img
          src={
            post
              ? appwriteService.getFilePreview(
                  post?.imageRequired ? post.imageRequired : ""
                )
              : ""
          }
          alt={post.title}
          className="rounded-xl aspect-video duration-300"
        />
      </div>
      <div className="text-xl p-2  text-white rounded bg-teal-600 duration-300">
        {post.title }
        <span className="ml-2 group-hover:translate-x-4 absolute font-semibold delay-200 duration-100">
           ➜
        </span>
      </div>
    </Link>
  );
}

export default PostCard;
