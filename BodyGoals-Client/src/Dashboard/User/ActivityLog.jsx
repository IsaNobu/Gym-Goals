import { FaEye } from "react-icons/fa6";
import DashboardHeader from "../../Components/DashboardHeader";
import useFetchTrainerDetails from "../../Hooks/useFetchTrainerDetails";
import { Tooltip } from "react-tooltip";

const ActivityLog = () => {
  const [, trainerDetails] = useFetchTrainerDetails();

  return (
    <div>
      <DashboardHeader text="Activity Log" />
      <Tooltip id="my-tooltip" />

      <div className="lg:w-[700px] mx-auto flex justify-between border p-7">
        <h1># Applied to become a trainer</h1>
        <p className="text-orange-400 font-bold cursor-pointer">
          {trainerDetails.status === "rejected" ? (
            <FaEye
              data-tooltip-id="my-tooltip"
              data-tooltip-content={trainerDetails.feedback}
              data-tooltip-place="top"
            />
          ) : (
            "pending"
          )}
        </p>
      </div>
    </div>
  );
};

export default ActivityLog;
