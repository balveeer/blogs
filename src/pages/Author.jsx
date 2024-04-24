import React, { useEffect, useState } from "react";
import { Container } from "../components/index.js";
import { PostCard } from "../components/index.js";
import appwriteService from "../appwrite/config.js";
import { useParams } from "react-router-dom";
import { Query } from "appwrite";

function Author() {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  useEffect(() => {
    appwriteService
      .getPosts([Query.equal("userId", params.slug)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="w-full py-4">
      <Container>
        <h2 className="text-3xl t-12 p-3 font-bold text-teal-900 ">
          {posts[0]?.author}'s Posts{" "}
        </h2>
        <div className="flex flex-wrap justify-start items-stretch gap-4">
          {posts.map((post) => (
            <div
              key={post?.$id}
              className="p-4 md:w-1/2 lg:w-1/3 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-lg group hover:scale-105 duration-200 shadow-teal-600 shadow-lg"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Author;
