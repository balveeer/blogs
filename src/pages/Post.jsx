import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const [load, setLoad] = useState(false);
  const [date, setDate] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData && post && post?.userId == userData?.userData?.$id) {
      setIsAuthor(true);
    }
  }, [userData, post]);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          formatDate(post.$createdAt);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString).toLocaleDateString(undefined, options);
    setDate(date);
  }
  const deletePost = () => {
    setLoad(true);
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const authorPosts = () => {
    navigate("/author/" + post.userId);
  };

  return post ? (
    <div className="py-8 mt-5">
      <Container>
        <h1 className={` p-8 text-3xl font-bold inline pl-4 flex-nowrap`}>
          {post.title}
        </h1>
        <div
          className={`${
            isAuthor ? "w-2/3" : "w-full"
          } px-4 flex justify-center gap-x-4 max-w-fit text-center rounded-full bg-teal-400 mt-4`}
        >
          <h2
            onClick={authorPosts}
            className="text-xl font-semibold text-gray-800 hover:underline cursor-pointer"
          >
            👤by- {post.author}
          </h2>
          <h2 className="text-xl font-semibold text-gray-800">📆at- {date}</h2>
        </div>
        <div className="w-full mb-6 flex justify-between">
          {isAuthor && (
            <div className="w-1/3 z-20 inline-flex flex-wrap">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500 hover:bg-green-600 font-semibold"
                  className="py-2 px-4  rounded-l "
                >
                  Edit Post
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                bgColor="bg-red-500 hover:bg-red-600  font-semibold"
                className="py-2 px-4  rounded-r border-l border-l-white/80"
              >
                {load ? (
                  <span className="animate-[spin_1.5s_ease-in-out_infinite] m-2  px-6 overflow-hidden text-white inline-block">
                    <svg
                      className="animate-spin"
                      width="20"
                      stroke="white"
                      fill="white"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z" />
                    </svg>
                  </span>
                ) : (
                  <span>Delete Post</span>
                )}
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row-reverse">
          <div className="w-full md:w-1/2 max-w-3xl justify-center mb-4 rounded-xl p-2">
            <img
              src={appwriteService.getFilePreview(post.imageRequired)}
              alt={post.title}
              className="rounded-xl"
            />
          </div>
          <div className="md:w-1/2">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
