import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    logOut().then(() => {
      navigate(location?.state ? location.state : "/");
    });
  };
  const LargeDeviceLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border border-white" : "text-white"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <div className="dropdown dropdown-bottom dropdown-hover">
          <div tabIndex={0} role="button" className="m-1">
            Pages
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border border-white" : "text-white"
                }
                to={"/all-trainer"}
              >
                All Trainer
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/all-classes"}
                className={({ isActive }) =>
                  isActive ? "border border-white" : "text-white"
                }
              >
                All Classes
              </NavLink>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <NavLink
          to={"community-posts"}
          className={({ isActive }) =>
            isActive ? "border border-white" : "text-white"
          }
        >
          Newsletter
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border border-white" : "text-white"
          }
          to={"/dashboard"}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  if (loading) {
    return;
  }

  return (
    <div className="flex justify-center">
      <div className="navbar lg:max-w-6xl lg:fixed z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "border border-white" : "text-white"
                    }
                    to={"/"}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "border border-white" : "text-white"
                    }
                    to={"/all-trainer"}
                  >
                    All Trainer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/all-classes"}
                    className={({ isActive }) =>
                      isActive ? "border border-white" : "text-white"
                    }
                  >
                    All Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"community-posts"}
                    className={({ isActive }) =>
                      isActive ? "border border-white" : "text-white"
                    }
                  >
                    Newsletter
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "border border-white" : "text-white"
                    }
                    to={"/dashboard"}
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            </ul>
          </div>
          <Link to={"/"} className="flex items-center">
            <img
              className="lg:w-[80px]"
              src="https://i.ibb.co/MSSs5xS/Logo.png"
              alt=""
            />{" "}
            <span className="lg:text-4xl teko font-bold">Body Goals</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl font-bold">
            {LargeDeviceLinks}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              {" "}
              <div className="dropdown dropdown-bottom dropdown-hover">
                <div tabIndex={0} role="button" className="m-1 text-5xl">
                  {user.photoURL ? (
                    <>
                      <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={user.photoURL}
                        alt=""
                      />
                    </>
                  ) : (
                    <CgProfile />
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) =>
                        isActive ? "border border-white" : "text-white"
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="cursor-pointer" onClick={handleLogOut}>
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) =>
                        isActive ? "border border-white" : "text-white"
                      }
                    >
                      Log Out
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className={"text-2xl font-bold"}>
              {" "}
              <NavLink
                to={"login"}
                className={({ isActive }) =>
                  isActive ? "border border-white px-4 py-1" : ""
                }
              >
                {" "}
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
