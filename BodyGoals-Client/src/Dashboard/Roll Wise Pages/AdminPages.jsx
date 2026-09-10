import { NavLink, useNavigate } from "react-router-dom";
import { LuNewspaper } from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../Auth Provider/AuthProvider";
import { CiLogout, CiMoneyBill } from "react-icons/ci";
import { GiBiceps } from "react-icons/gi";
import { VscGitStashApply } from "react-icons/vsc";
import { IoMdAddCircle } from "react-icons/io";
import { FaHome } from "react-icons/fa";

const AdminPages = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
    });
  };
  return (
    <ul className="lg:menu flex flex-col menu-horizontal lg:w-80 p-4 lg:h-[100vh] text-xl font-bold">
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

export default AdminPages;
