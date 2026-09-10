import { Link, useParams, useSearchParams } from "react-router-dom";
import NavbarBanner from "../../Components/NavbarBanner";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import { SlEnvolope } from "react-icons/sl";

import Select from "react-select";

const TrainerBookPage = () => {
  const param = useParams();
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("classId");
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState({});
  const { shifts = [] } = data;
  const [value, setValue] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState("");
  const [error, setError] = useState(false);

  const filterShift = shifts.filter((data) => data.value !== "booked");

  const getSelectedOption = (selectedOptions) => {
    setValue(selectedOptions);
  };

  const handleSelection = (membership) => {
    setSelectedMembership(membership);
  };

  const handleJoin = () => {
    if (value.length === 0 || selectedMembership === "") {
      return setError(true);
    }

    const info = {
      price:
        selectedMembership === "Basic Membership"
          ? 10
          : selectedMembership === "Standard Membership"
            ? 50
            : 100,
      shift: value.label,
      trainerId: param.id,
      trainerName: data?.name,
      class: paramValue,
      trainerImage: data.photoURL,
    };

    localStorage.setItem("user", JSON.stringify(info));
  };

  const isSelected = (membership) => selectedMembership === membership;

  useEffect(() => {
    axiosPublic.get(`/trainer-details?id=${param.id}`).then((res) => {
      setData(res.data);
    });
  }, [axiosPublic, param.id]);
  return (
    <div>
      <NavbarBanner text="Trainer Details Page" />

      <div>
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
            <div>
              <label className="label text-2xl font-medium">Skills :</label>
              <Select
                styles={{
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "black",
                  }),
                  control: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected ? "black" : null,
                    borderColor: isFocused ? "black" : "white",
                  }),
                  option: (styles, { isFocused }) => ({
                    ...styles,
                    backgroundColor: isFocused ? "gray" : null,
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? "red" : "white",
                  }),
                }}
                className="basic-single"
                classNamePrefix="select"
                name="color"
                options={filterShift}
                value={value}
                onChange={getSelectedOption}
              />
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-black border border-gray-600 text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-gray-600"></th>
                    <th
                      className={`px-4 py-2 border border-gray-600 cursor-pointer ${
                        isSelected("Basic Membership") ? "text-blue-600" : ""
                      }`}
                      onClick={() => handleSelection("Basic Membership")}
                    >
                      Basic Membership
                    </th>
                    <th
                      className={`px-4 py-2 border border-gray-600 cursor-pointer ${
                        isSelected("Standard Membership") ? "text-blue-600" : ""
                      }`}
                      onClick={() => handleSelection("Standard Membership")}
                    >
                      Standard Membership
                    </th>
                    <th
                      className={`px-4 py-2 border border-gray-600 cursor-pointer ${
                        isSelected("Premium Membership") ? "text-blue-600" : ""
                      }`}
                      onClick={() => handleSelection("Premium Membership")}
                    >
                      Premium Membership
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-gray-600">Price</td>
                    <td className="px-4 py-2 border border-gray-600">$10</td>
                    <td className="px-4 py-2 border border-gray-600">$50</td>
                    <td className="px-4 py-2 border border-gray-600">$100</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-600">
                      Access to gym facilities during regular operating hours
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-600">
                      Use of cardio and strength training equipment
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-600">
                      Access to locker rooms and showers
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-600">
                      Access to group fitness classes
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center"></td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-600">
                      Use of additional amenities like a sauna or steam room
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center"></td>
                    <td className="px-4 py-2 border border-gray-600 text-center"></td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-600">
                      Access to personal training sessions
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center"></td>
                    <td className="px-4 py-2 border border-gray-600 text-center"></td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-600">
                      Discounts on additional services
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center"></td>
                    <td className="px-4 py-2 border border-gray-600 text-center"></td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      ✔
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-white mt-4">
              <p>Selected Membership: {selectedMembership || "None"}</p>
            </div>
            <button
              disabled={
                (value.length === 0 ? true : false) || selectedMembership === ""
                  ? true
                  : false
              }
              onClick={handleJoin}
              className="text-2xl mt-6 btn bg-red-600"
            >
              <Link to={"/book-trainer"}>Join Now</Link>
            </button>
            {error ? (
              <div className="text-red-600 text-xl mt-3">
                <span
                  className="cursor-pointer"
                  onClick={() => setError(false)}
                >
                  X
                </span>{" "}
                Please Select Options
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerBookPage;
