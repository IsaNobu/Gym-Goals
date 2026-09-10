import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth Provider/AuthProvider";
import { MdOutlineLocalActivity } from "react-icons/md";

const UserPages = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
    });
  };
  return (
    <ul className="menu flex flex-col menu-horizontal w-80 p-4 h-[100vh] text-xl font-bold">
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
      <li className="absolute bottom-16 w-[288px]">
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) => (isActive ? "text-white" : "text-white")}
        >
          <span className="flex items-center gap-4">
            <FiEdit2 /> Profile
          </span>
        </NavLink>
      </li>
      <li onClick={handleLogOut} className="absolute bottom-5 w-[288px]">
        <span>
          <CiLogout className="text-2xl flex items-center text-white" />{" "}
          <span>Log Out</span>
        </span>
      </li>
    </ul>
  );
};

export default UserPages;
