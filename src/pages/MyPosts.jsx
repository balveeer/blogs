import React, { useEffect, useState } from "react";
import { Container } from "../components/index.js";
import { PostCard } from "../components/index.js";
import appwriteService from "../appwrite/config.js";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService
      .getPosts([Query.equal("userId", userData?.$id)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          console.log(posts.documents);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="w-full py-4">
        {posts.length>0 ?
      <Container>
        <h2 className="text-3xl t-12 p-3 font-bold text-teal-900">My Posts </h2>
        <div className="flex flex-wrap box-border gap-6">
          {posts.map((post) => (
            <div
              key={post?.$id}
              className="p-4 md:w-1/2 lg:w-1/3 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-lg group hover:scale-105 duration-200 shadow-teal-600 shadow-lg box-border"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>:(
      <Container>
        
        <h2 className="text-3xl t-12 p-3 font-bold text-teal-900">You haven't posted anything. </h2>
      </Container>)}
    </div>
  );
}

export default MyPosts;
