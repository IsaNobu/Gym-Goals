import { useEffect, useState } from "react";
import HeaderSection from "../../../Components/HeaderSection";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";
import { Link } from "react-router-dom";

const TrainerProfile = () => {
  const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/recent-trainers").then((res) => {
      setData(res.data);
    });
  }, [axiosPublic]);
  return (
    <div>
      <HeaderSection text="One of the bests" />

      <div className="flex gap-4 md:flex-row flex-col justify-center items-center">
        {data.map((data) => (
          <div key={data._id} className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={data.photoURL} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{data.name}</h2>
              <p className="overflow-hidden h-[70px]">{data.bio}</p>...
              <div className="card-actions">
                <Link
                  to={`/trainer-details/${data._id}`}
                  className="btn btn-primary"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerProfile;
