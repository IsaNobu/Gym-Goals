import { useContext, useEffect, useState } from "react";
import DashboardHeader from "../../Components/DashboardHeader";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import { AuthContext } from "../../Auth Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const BookedTrainer = () => {
  const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const handleReview = async () => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Add review here",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (text) {
      axiosPublic.post("/review", {
        testimonial: text,
        trainerName: data.trainerName,
        name: data.name,
      });
    }
  };

  useEffect(() => {
    axiosPublic.get(`/payments?email=${user?.email}`).then((res) => {
      setData(res.data);
    });
  }, [axiosPublic, user?.email]);
  return (
    <div>
      <DashboardHeader text="Book Trainers" />

      <div className="space-y-8">
        {data.map((data) => (
          <div className="lg:w-[1000px] mx-auto" key={data._id}>
            <div className="card lg:card-side bg-base-100 shadow-xl">
              <figure>
                <img src={data.trainerImage} alt="Album" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{data.trainerName}</h2>
                <p>Slots: {data.slot}</p>
                <div>
                  <button onClick={handleReview} className="btn">
                    Add Review
                  </button>
                </div>
                <div>
                  <Link
                    to={`/trainer-details/${data.trainerId}`}
                    className="btn btn-primary"
                  >
                    See details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedTrainer;
