import { FaEye } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import DashboardHeader from "../../Components/DashboardHeader";
import useFetchTrainerDetails from "../../Hooks/useFetchTrainerDetails";
import "react-tabs/style/react-tabs.css";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";

const ManageSlots = () => {
  const [, trainerData, , refetch2] = useFetchTrainerDetails();
  const axiosSecure = useAxiosSecure();

  const { shifts = [], email } = trainerData;

  let day = [];
  let getTime = [];
  let time = [];

  for (const days of shifts) {
    const getDay = days.label.split(" ");
    const removeColumn = getDay[0]?.split(":");

    day = [...day, removeColumn[0]];
    getTime = [removeColumn[0]];

    for (const m of getTime) {
      const getShifts = days.label.split(`${m}: `);
      time = [...time, getShifts[1]];
    }
  }

  const handleDelete = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this slot ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch("/class-details", {
            email: email,
            shift: value,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Slot has been removed",
                icon: "success",
              });
              refetch2();
            }
          });
      }
    });
  };

  return (
    <div>
      <Tooltip id="my-tooltip" />
      <DashboardHeader text="Manage Your Slots" />
      <div className="lg:w-[1000px] mx-auto">
        <div className="overflow-x-auto mt-12">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>$</th>
                <th>Day</th>
                <th>Shifts</th>
                <th>Remove Shifts</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((data, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{day[idx]}</td>
                  <td>{time[idx]}</td>
                  <td>
                    {data.value === "booked" ? (
                      <FaEye
                        data-tooltip-id="my-tooltip"
                        className="text-xl cursor-pointe"
                      />
                    ) : (
                      <CiTrash
                        onClick={() => handleDelete(data)}
                        className="text-xl cursor-pointer text-red-600"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSlots;
