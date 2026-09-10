import { Link, useParams } from "react-router-dom";
import NavbarBanner from "../../Components/NavbarBanner";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import "../../index.css";
import useFetchTrainerDetails from "../../Hooks/useFetchTrainerDetails";
import HeaderSection from "../../Components/HeaderSection";

const AllClassesDetails = () => {
  const params = useParams();
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState([]);
  const [allTrainerData] = useFetchTrainerDetails();

  const {
    classImage,
    classInstructors = [],
    className,
    classDetails,
    booked,
  } = data;

  let trainerData = [];

  for (const a of classInstructors) {
    const filter = allTrainerData.filter((data) => data._id === a);
    trainerData = [...trainerData, ...filter];
  }

  useEffect(() => {
    axiosPublic.get(`/single-class-details/${params.id}`).then((res) => {
      setData(res.data);
    });
  }, [axiosPublic, params]);
  return (
    <div>
      <NavbarBanner text="Class Details" />

      <div className="my-12 flex lg:flex-row flex-col items-center justify-center teko md:px-0 px-6">
        <div>
          <div>
            <img
              className="md:w-[634px] md:h-[390px]"
              src={classImage}
              alt=""
            />
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div>
          <div>
            <h1 className="text-5xl font-bold">{className}</h1>
            <p className="md:w-[600px] mt-6 text-xl">{classDetails}</p>
            <h1 className="mt-6 text-2xl font-bold">Duration: 180min</h1>
            <h1 className="mb-6 text-2xl font-bold">Class Booked: {booked}</h1>
          </div>
          <div>
            <h1>
              <span className="text-2xl font-bold">Location:</span>{" "}
              <span className="text-2xl">Bangladesh</span>
            </h1>
            <h1 className="flex md:flex-row flex-col gap-6">
              <span className="text-2xl font-bold">Shifts Available:</span>{" "}
              {trainerData.map((data, idx) => (
                <span className="flex flex-col" key={idx}>
                  {data?.shifts?.map((data, idx) => (
                    <span className="text-xl font-medium" key={idx}>
                      {data.label}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className="m-24">
        <HeaderSection text="Select Your Trainer and Start Working Out" />

        <div className="grid lg:grid-cols-[300px_300px_300px_300px] md:grid-cols-[300px_300px_300px] grid-cols-[300px] gap-6">
          {trainerData.map((data, idx) => (
            <div key={idx}>
              <div>
                <img
                  className="md:w-[300px] md:h-[307px]"
                  src={data.photoURL}
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-xl font-bold mt-3">{data.name}</h1>
                <p className="md:w-[300px] h-[70px] overflow-hidden text-ellipsis">
                  {data.bio}
                </p>
                ...
                <div>
                  <Link
                    to={`/trainer-book-page/${data._id}?classId=${params.id}`}
                    className="btn bg-red-600 mt-6"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClassesDetails;
