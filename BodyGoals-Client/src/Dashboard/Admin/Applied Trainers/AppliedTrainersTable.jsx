import { Link } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { useEffect, useState } from "react";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/applied-trainer").then((res) => {
      const filter = res.data.filter((data) => data.status === "pending");
      setData(filter);
    });
  }, [axiosSecure]);

  return (
    <div>
      <DashboardHeader text="Applied Trainers" />

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>See profile in details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, idx) => (
                <tr key={data._id}>
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
                  <td>
                    <Link
                      to={`/dashboard/applied-trainers/${data._id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      details
                    </Link>
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

export default AppliedTrainers;
