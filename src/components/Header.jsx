import React from "react";
import { Logo, LogoutBtn } from "./index.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <>
      <header className="fixed z-10 p-2 px-6 shadow-md shadow-teal-600 w-full bg-teal-500">
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="w-24" />
            </Link>
          </div>
          <ul className="flex items-center ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`hidden md:inline-block mx-2 px-6 py-2 duration-200 bg-teal-500 hover:text-white rounded-lg hover:shadow-lg`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="w-full h-0 md:h-20"></div>
      <ul className="flex justify-around w-full ml-auto pt-20 md:hidden">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className={`inline-block mx-2 px-6 py-2 duration-200 bg-teal-500 hover:text-white hover:bg-teal-600 rounded-xl`}
              >
                {item.name}
              </button>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
}

export default Header;
