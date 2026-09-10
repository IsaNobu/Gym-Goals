import { Link } from "react-router-dom";
import "../../index.css";
import NavbarBanner from "../../Components/NavbarBanner";
import useFetchTrainerDetails from "../../Hooks/useFetchTrainerDetails";

const HomeAllTrainer = () => {
  const [allTrainerData] = useFetchTrainerDetails();

  return (
    <div>
      <NavbarBanner text="Our Selected Trainers" />

      <div>
        <div className="grid lg:grid-cols-[300px_300px_300px_300px] md:grid-cols-[300px_300px_300px] grid-cols-[300px] gap-6 justify-center">
          {allTrainerData.map((data, idx) => (
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
                    to={`/trainer-details/${data._id}`}
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
      <div>
        <div className="teko flex flex-col items-center my-24">
          <h1 className="uppercase text-9xl font-extrabold">
            Contact Us To Be
          </h1>
          <h1 className="uppercase  flex items-center gap-2">
            <span className="text-9xl font-extrabold">A Trainer</span>
            <img
              src="https://gymfito.vercel.app/assets/img/cta-img.png"
              alt=""
            />
            <Link
              to={"/be-a-trainer"}
              className="lg:w-[100px] lg:h-[100px] rounded-full bg-[#e5e7eb] text-center text-2xl font-bold text-black pt-6 cursor-pointer hover:bg-white"
            >
              Contact Us
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomeAllTrainer;
