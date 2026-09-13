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
    return null;
  }

  const { admin, trainer } = roll || {};

  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col w-full min-h-screen bg-base-100">
        {/* Mobile Header Bar */}
        <div className="navbar bg-base-200 lg:hidden w-full">
          <div className="flex-none">
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
          <div className="mx-2 flex-1 px-2 font-semibold text-lg">
            Dashboard
          </div>
        </div>

        {/* Page Content Outlet */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Unified Sidebar for both Mobile and Desktop */}
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
          <div>
            <NavLink
              to={"/"}
              className="inline-flex items-center gap-2 cursor-pointer mb-2"
            >
              <img
                className="w-[50px] h-[50px] object-contain"
                src="https://i.ibb.co/MSSs5xS/Logo.png"
                alt="Logo"
              />
              <h1 className="text-2xl font-semibold">GymGoals</h1>
            </NavLink>
            <div className="divider my-2"></div>

            {/* Role-based Links */}
            {admin ? (
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to={"/dashboard/subscribers"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <LuNewspaper className="text-lg" /> Newsletter Subscribers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/all-trainer"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <GiBiceps className="text-lg" /> All Trainers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/applied-trainers"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <VscGitStashApply className="text-lg" /> Applied Trainers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/Add-class"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <IoMdAddCircle className="text-lg" /> Add Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/add-community"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <LuNewspaper className="text-lg" /> Add Community Post
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/balance"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <CiMoneyBill className="text-lg" /> Balance
                  </NavLink>
                </li>
              </ul>
            ) : trainer ? (
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to={"/dashboard/manage-slots"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <LuNewspaper className="text-lg" /> Manage Slots
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/add-slots"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <LuNewspaper className="text-lg" /> Add Slots
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/add-community"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <LuNewspaper className="text-lg" /> Add Community Post
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to={"/dashboard/activity-log"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <MdOutlineLocalActivity className="text-lg" /> Activity Log
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/booked-trainer"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <MdOutlineLocalActivity className="text-lg" /> Booked
                    Trainer
                  </NavLink>
                </li>
              </ul>
            )}

            <div className="divider my-2"></div>

            {/* General Navigation */}
            <ul className="space-y-1">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FaHome className="text-lg" /> Home
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Bottom Actions Container */}
          <div className="pt-4 border-t border-base-300">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to={"/dashboard"}
                  end
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Update Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 w-full text-left py-2 px-4 hover:bg-error/10 hover:text-error rounded-lg transition-colors"
                >
                  <CiLogout className="text-xl" />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
