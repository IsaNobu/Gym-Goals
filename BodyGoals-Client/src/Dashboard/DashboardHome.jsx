import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CiLogout, CiMoneyBill } from "react-icons/ci";
import AdminPages from "../Dashboard/Roll Wise Pages/AdminPages";
import useFetchItem from "../Hooks/useFetchUsers";
import TrainerPages from "../Dashboard/Roll Wise Pages/TrainerPages";
import UserPages from "../Dashboard/Roll Wise Pages/UserPages";
import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { MdOutlineLocalActivity } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import { IoMdAddCircle } from "react-icons/io";
import { VscGitStashApply } from "react-icons/vsc";
import { GiBiceps } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

const DashboardHome = () => {
  const [users] = useFetchItem();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [roll, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return;
  }

  const { admin, trainer } = roll;

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center mt-96">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex lg:flex-row flex-col lg:bg-[#303841] lg:w-full">
          <div className="navbar lg:hidden">
            <div className="flex-none ">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">Navbar Title</div>
          </div>
          <div className="hidden lg:block bg-[#38414A]">
            <NavLink
              to={"/"}
              className="inline-flex items-center cursor-pointer"
            >
              <img
                className="w-[60px] h-[60px]"
                src="https://i.ibb.co/MSSs5xS/Logo.png"
                alt=""
              />
              <h1 className="text-2xl font-semibold">GymGoals</h1>
            </NavLink>
            <div className="divider"></div>
            {admin ? (
              <AdminPages />
            ) : trainer ? (
              <TrainerPages />
            ) : (
              <UserPages />
            )}
          </div>
          <div className="lg:w-full">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            <NavLink
              to={"/"}
              className="inline-flex items-center cursor-pointer"
            >
              <img
                className="w-[60px] h-[60px]"
                src="https://i.ibb.co/MSSs5xS/Logo.png"
                alt=""
              />
              <h1 className="text-2xl font-semibold">GymGoals</h1>
            </NavLink>
            <div className="divider"></div>

            {admin ? (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/subscribers"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <LuNewspaper /> Newsletter Subscribers
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/all-trainer"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <GiBiceps /> All Trainers
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/applied-trainers"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <VscGitStashApply /> Applied Trainers
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/Add-class"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <IoMdAddCircle /> Add Classes
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/add-community"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <LuNewspaper /> Add Community Post
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/balance"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <CiMoneyBill /> Balance
                    </span>
                  </NavLink>
                </li>
              </>
            ) : trainer ? (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/manage-slots"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <LuNewspaper /> Manage Slots
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/add-slots"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <LuNewspaper /> Add Slots
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/add-community"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <LuNewspaper /> Add Community Post
                    </span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/activity-log"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      {" "}
                      <MdOutlineLocalActivity />
                      Activity Log
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/booked-trainer"}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-500" : "text-white"
                    }
                  >
                    <span className="flex items-center gap-2">
                      {" "}
                      <MdOutlineLocalActivity />
                      Booked Trainer
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : "text-white"
                }
              >
                <FaHome /> Home
              </NavLink>
            </li>
            <li className="absolute bottom-16">
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : "text-white"
                }
              >
                Update Profile
              </NavLink>
            </li>
            <li onClick={handleLogOut} className="absolute bottom-5 w-[288px]">
              <span>
                <CiLogout className="text-2xl flex items-center text-white" />{" "}
                <span>Log Out</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
