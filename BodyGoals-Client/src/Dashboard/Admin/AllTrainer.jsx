import DashboardHeader from "../../Components/DashboardHeader";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useFetchTrainerDetails from "../../Hooks/useFetchTrainerDetails";

const AllTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const [allTrainerData, refetch] = useFetchTrainerDetails();

  const handleRemove = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove him as a trainer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove him",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users`, {
            email: email,
            roll: "user",
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              axiosSecure.delete(`/applied-trainer/${id}`).then(() => {
                Swal.fire({
                  title: "Deleted!",
                  text: "Successfully removed",
                  icon: "success",
                });
                refetch();
              });
            }
          });
      }
    });
  };
  return (
    <div>
      <div>
        <DashboardHeader text="All Trainers" />
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Remove Trainer / details</th>
              </tr>
            </thead>
            <tbody>
              {allTrainerData.map((data, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={data.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{data.email}</td>
                  <td>{data.status}</td>
                  <td>
                    {data.status === "pending" ? (
                      <Link
                        to={`/dashboard/applied-trainers/${data._id}`}
                        className="btn btn-ghost btn-xs rounded-2xl"
                      >
                        details
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleRemove(data._id, data.email)}
                        className="btn btn-ghost btn-xs rounded-2xl text-red-600"
                      >
                        Remove
                      </button>
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

export default AllTrainer;
