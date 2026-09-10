import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import { SlEnvolope } from "react-icons/sl";
import NavbarBanner from "../../Components/NavbarBanner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import HeaderSection from "../../Components/HeaderSection";

const TrainerDetails = () => {
  const axiosPublic = useAxiosPublic();
  const params = useParams();
  const [data, setData] = useState({});
  const [classesData, setClassesData] = useState([]);

  const { shifts = [], classSelected = [] } = data;

  const filter = shifts.filter((data) => data.value !== "booked");

  let day = [];
  let getTime = [];
  let time = [];
  let classes = [];

  for (const a of classSelected) {
    const filterClass = classesData.filter((data) => data._id === a);

    classes = [...classes, ...filterClass];
  }

  for (const days of shifts) {
    const getDay = days.value.split(" ");
    const removeColumn = getDay[0]?.split(":");

    day = [...day, removeColumn[0]];
    getTime = [removeColumn[0]];

    for (const m of getTime) {
      const getShifts = days.value.split(`${m}: `);
      time = [...time, getShifts[1]];
    }
  }

  useEffect(() => {
    axiosPublic.get(`/trainer-details?id=${params.id}`).then((res) => {
      setData(res.data);
    });

    axiosPublic.get(`/class-details`).then((res) => {
      setClassesData(res.data);
    });
  }, [axiosPublic, params.id]);
  return (
    <div>
      <NavbarBanner text="Trainer Details" />

      <Tabs>
        <div className="lg:w-[700px] mx-auto my-24">
          <TabList>
            <Tab>Trainer Details</Tab>
            <Tab>Available Slots</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="flex lg:flex-row flex-col items-center justify-center lg:px-0 px-6">
            <div className="flex flex-col gap-4">
              <div>
                <img
                  className="md:w-[439px] md:h-[453px]"
                  src={data.photoURL}
                  alt=""
                />
              </div>
              <div className="flex items-center gap-4 text-2xl font-bold">
                <span className="bg-gray-500 w-[60px] h-[60px] rounded-full">
                  <SlEnvolope className="mt-3 ml-3 text-4xl" />
                </span>{" "}
                <span>
                  {" "}
                  Email: <br />
                  {data.email}
                </span>
              </div>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="lg:w-[757px] md:px-0 px-6">
              <div>
                <h1 className="text-4xl font-bold ">{data.name}</h1>
                <p className="text-lg font-medium mt-6">{data.bio}</p>
                <h1 className="text-2xl font-bold mt-6">Age: {data.age}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-12 text-2xl font-semibold">
                <span>Specialized Area: </span>{" "}
                <span className="flex gap-4 ">
                  {data?.skills?.map((data, idx) => (
                    <h1
                      key={idx}
                      className="border-2 border-white rounded-3xl md:px-3"
                    >
                      {data?.value}
                    </h1>
                  ))}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-12 text-2xl font-semibold">
                <span>Shifts: </span>{" "}
                <span className="flex lf:flex-col flex-row flex-wrap gap-4 ">
                  {filter.map((data, idx) => (
                    <h1
                      key={idx}
                      className="border-2 border-white rounded-3xl md:px-3"
                    >
                      {data?.value}
                    </h1>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mx-auto">
            <div className="lg:w-[1000px] mx-auto">
              <div className="overflow-x-auto mt-12">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>$</th>
                      <th>Day</th>
                      <th>Shifts</th>
                      <th>Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filter.map((data, idx) => (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>{day[idx]}</td>
                        <td>{time[idx]}</td>
                        <td>
                          <Link
                            to={`/all-classes`}
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
        </TabPanel>
      </Tabs>
      <HeaderSection text="Classes he conducts" />
      <div>
        {classes.map((data, idx) => (
          <div key={idx}>
            <div className="flex md:flex-row flex-col-reverse justify-center gap-24 items-center">
              <div>
                <h1 className="md:text-5xl font-bold">{data.className}</h1>
                <p className="md:w-[405px] md:h-[80px] overflow-hidden text-ellipsis text-xl mt-6">
                  {data.classDetails}
                </p>
                ...
                <h3 className="mt-6">
                  <span className="text-xl font-bold">Location:</span>{" "}
                  Bangladesh
                </h3>
                <div className="mt-6">
                  <Link
                    to={`/all-classes/${data._id}`}
                    className=" text-red-600 text-xl hover:text-red-800"
                  >
                    Details
                  </Link>
                </div>
              </div>
              <div>
                <img
                  className="md:w-[634px] md:h-[390px]"
                  src={data.classImage}
                />
              </div>
            </div>
            <div className="divider lg:w-[1200px] mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerDetails;
