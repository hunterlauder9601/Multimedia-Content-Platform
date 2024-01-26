import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { HiX, HiMenu } from "react-icons/hi";

export const NavBar = ({ isAdminPage = false, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-10 bg-zinc-900 text-white backdrop-blur-lg bg-opacity-30 border-b border-zinc-200 firefox:bg-opacity-90">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <span className="text-2xl font-extrabold z-10 bg-gradient-to-r from-indigo-600 to-red-500 px-2 text-zinc-900">
              WhatsGoodie
            </span>
          </Link>
          <div className="hidden md:flex space-x-6 text-xl">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/video">Video</CustomLink>
            <CustomLink to="/radio">Radio</CustomLink>
            <CustomLink to="/photo">Photo</CustomLink>
            <CustomLink to="/contact">Contact</CustomLink>
            {isAdminPage && (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Log out
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-white hover:text-red-500 focus:outline-none focus:text-red-500"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <HiX
                  size={30}
                  className="bg-transparent hover:text-red-600 duration-300 ease-linear cursor-pointer"
                />
              ) : (
                <HiMenu
                  size={30}
                  className="bg-transparent hover:text-red-600 duration-300 ease-linear cursor-pointer"
                />
              )}
            </button>
          </div>
        </div>
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden text-xl`}>
          <CustomLink to="/" onClick={toggleMenu}>
            Home
          </CustomLink>
          <CustomLink to="/video" onClick={toggleMenu}>
            Video
          </CustomLink>
          <CustomLink to="/radio" onClick={toggleMenu}>
            Radio
          </CustomLink>
          <CustomLink to="/photo" onClick={toggleMenu}>
            Photo
          </CustomLink>
          <CustomLink to="/contact" onClick={toggleMenu}>
            Contact
          </CustomLink>
          {isAdminPage && (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link to={to} {...props}>
      <div className={isActive ? "text-red-500" : ""}>{children}</div>
    </Link>
  );
}
