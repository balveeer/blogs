import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {RouterProvider, createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom";
import Home from './pages/Home.jsx'
import { AuthLayout } from "./components/index.js";
import AllPosts from './pages/MyPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import VerifyEmail from "./pages/VerifyEmail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Author from "./pages/Author.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
          <Route path="signup" element={<Signup />} />
          <Route path="my-posts" element={<AuthLayout authentication><AllPosts /></AuthLayout>} />
          <Route path="add-post" element={<AuthLayout authentication><AddPost /></AuthLayout>} />
          <Route path="edit-post/:slug" element={<AuthLayout authentication><EditPost /></AuthLayout>} />
          <Route path="post/:slug" element={<Post />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="author/:slug" element={<Author />} />
        </Route>
      )
    );
    const router2 = createBrowserRouter([
      {
            path: "/",
            element: <App />,
            children: [
              {
                path: "/",
                element: <Home />,
              },
              {
                path: "/login",
                element: (
                  <AuthLayout authentication={false} >
                    <Login />
                  </AuthLayout>
                ),
              },
              {
                path: "/signup",
                element: (
                    <Signup />
                ),
              },
              {
                path: "/my-posts",
                element: (
                  <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                  </AuthLayout>
                ),
              },
              {
                path: "/add-post",
                element: (
                  <AuthLayout authentication>
                    {" "}
                    <AddPost />
                  </AuthLayout>
                ),
              },
              {
                path: "/edit-post/:slug",
                element: (
                  <AuthLayout authentication>
                    {" "}
                    <EditPost />
                  </AuthLayout>
                ),
              },
              {
                path: "/post/:slug",
                element: <Post />,
              },
              {
                path:"/verify-email",
                element: <VerifyEmail />
              },
              {
                path: "/not-found",
                element:<NotFound />
              },
              {
                path: "/author/:slug",
                element: <Author />
              }
            ],
          }
        ]
        );
    

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);