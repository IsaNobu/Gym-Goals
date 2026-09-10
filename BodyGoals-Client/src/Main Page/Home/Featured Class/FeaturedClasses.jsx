import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";
import HeaderSection from "../../../Components/HeaderSection";
import { Link } from "react-router-dom";

const FeaturedClasses = () => {
  const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/highest-booked-classes").then((res) => {
      setData(res.data);
    });
  }, [axiosPublic]);
  return (
    <div>
      <HeaderSection text="Top 6 of our most booked classes" />

      <div className="grid lg:grid-cols-[304px_304px_304px] md:grid-cols-[304px_304px] grid-cols-1 gap-6 justify-center items-center">
        {data.map((data) => (
          <div key={data._id} className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={data.classImage} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{data.className}</h2>
              <p className="overflow-hidden h-[70px]">{data.classDetails}</p>...
              <div className="card-actions">
                <Link
                  to={`all-classes/${data._id}`}
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

export default FeaturedClasses;
