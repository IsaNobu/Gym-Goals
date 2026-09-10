import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import DashboardHeader from "../../../Components/DashboardHeader";
import { SlEnvolope } from "react-icons/sl";
import Swal from "sweetalert2";

const AppliedTrainersDetails = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { name, photoURL, email, bio, age, shifts = [], skills = [] } = data;

  const handleDelete = async () => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Tell him why you rejected him !",
      inputPlaceholder: "Type your reasoning here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (text === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Please provide a reasoning`,
        showConfirmButton: false,
        timer: 2000,
      });
    }

    axiosSecure
      .patch(`/applied-trainer?email=${email}`, {
        status: "rejected",
        feedback: text,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `You have Successfully rejected ${name} as a trainer`,
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/dashboard/applied-trainers");
        }
      });
  };

  const handleAccept = () => {
    Swal.fire({
      title: "Make him a trainer ?",
      text: "are you sure about making him a trainer ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make him a trainer",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/applied-trainer?email=${email}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            axiosSecure
              .patch(`/users`, {
                email: email,
                roll: "trainer",
              })
              .then((res) => {
                if (res.data.modifiedCount) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `You have Successfully added ${name} as a trainer`,
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  navigate("/dashboard/applied-trainers");
                }
              });
          }
        });
      }
    });
  };

  useEffect(() => {
    axiosSecure.get(`/applied-trainer/${params.id}`).then((res) => {
      setData(res.data);
    });
  }, [axiosSecure, params.id]);

  return (
    <div>
      <DashboardHeader text={`Details of ${name}`} />
      <div className="flex lg:flex-row flex-col items-center justify-center lg:px-0 px-6">
        <div className="flex flex-col gap-4">
          <div>
            <img className="md:w-[439px] md:h-[453px]" src={photoURL} alt="" />
          </div>
          <div className="flex items-center gap-4 text-2xl font-bold">
            <span className="bg-gray-500 w-[60px] h-[60px] rounded-full">
              <SlEnvolope className="mt-3 ml-3 text-4xl" />
            </span>{" "}
            <span>
              {" "}
              Email: <br />
              {email}
            </span>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="lg:w-[757px] md:px-0 px-6">
          <div>
            <h1 className="text-4xl font-bold ">{name}</h1>
            <p className="text-lg font-medium mt-6">{bio}</p>
            <h1 className="text-2xl font-bold mt-6">Age: {age}</h1>
          </div>
          <div className="flex items-center gap-4 mt-12 text-2xl font-semibold">
            <span>Shifts Available: </span>{" "}
            <span className="flex flex-wrap gap-4 ">
              {shifts.map((data, idx) => (
                <h1
                  key={idx}
                  className="border-2 border-white rounded-3xl px-3"
                >
                  {data?.value}
                </h1>
              ))}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-12 text-2xl font-semibold">
            <span>Specialized Area: </span>{" "}
            <span className="flex gap-4 ">
              {skills.map((data, idx) => (
                <h1
                  key={idx}
                  className="border-2 border-white rounded-3xl md:px-3"
                >
                  {data?.value}
                </h1>
              ))}
            </span>
          </div>
          <div className="mt-6 flex items-center gap-6">
            <div>
              <button
                onClick={handleAccept}
                className="btn btn-success rounded-3xl text-xl"
              >
                Accept
              </button>
            </div>
            <div>
              <button
                onClick={handleDelete}
                className="btn btn-error rounded-3xl text-xl"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedTrainersDetails;
