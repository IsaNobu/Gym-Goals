import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth Provider/AuthProvider";
import { LuNewspaper } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

const TrainerPages = () => {
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

export default TrainerPages;
