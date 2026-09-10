import "../index.css";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import useAxiosPublic from "../Hooks/Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";

const Footer = () => {
  const axiosPublic = useAxiosPublic();

  const [error, setError] = useState(false);

  const handleSubscription = () => {
    const inputValues = document.getElementById("email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkIfEmailValid = emailRegex.test(inputValues.value);

    if (!checkIfEmailValid) {
      return setError(true);
    }

    if (inputValues.value === "") {
      return;
    }

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const time = new Date().toLocaleTimeString();

    const info = {
      email: inputValues.value,
      date,
      time,
    };

    axiosPublic.post("/subscribers", info).then((res) => {
      if (res.data.insertedId === 0) {
        return Swal.fire({
          position: "center",
          icon: "warning",
          title: "You are already subscribed",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "You are now subscribed",
        showConfirmButton: false,
        timer: 1500,
      });
      setError(false);
    });
  };
  return (
    <div
      className={`bg-[url('https://i.ibb.co/rHZC7Kp/Footer.jpg')] lg:h-[455px] h-[800px] teko lg:p-0 px-6 mt-28`}
    >
      <div className="flex lg:flex-row flex-col justify-center items-start gap-12 pt-24">
        <div className="space-y-4">
          <h1 className="text-5xl ">Information</h1>
          <p className="lg:w-[400px] text-lg text-gray-300">
            Regular trips to the gym are great, but do not worry if you can not
            find a large chunk of time to exercise every day.
          </p>
          <div>
            <ul className="flex items-center gap-4">
              <li className="border-2 border-red-600 rounded-full p-4 w-[45px] h-[45px] text-4xl hover:bg-red-600 cursor-pointer">
                <TiSocialFacebook className="-ml-3 -mt-3" />
              </li>
              <li className="border-2 border-red-600 rounded-full p-4 w-[45px] h-[45px] text-3xl hover:bg-red-600 cursor-pointer">
                <IoLogoInstagram className="-ml-2 -mt-3" />
              </li>
              <li className="border-2 border-red-600 rounded-full p-4 w-[45px] h-[45px] text-2xl hover:bg-red-600 cursor-pointer">
                <BsTwitterX className="-ml-2 -mt-2" />
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl ">Contact</h1>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <p className="bg-red-600 p-3 text-2xl">
                <SiGooglemaps />
              </p>
              <p className="text-2xl">
                901 N Pitt Str., Suite 170, <br /> VA 22314, USA
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="bg-red-600 p-3 text-2xl">
                <IoIosPhonePortrait />
              </p>
              <p className="text-2xl">01839527404</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="bg-red-600 p-3 text-2xl">
                <FaEnvelope />
              </p>
              <p className="text-2xl">isanobu1@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl">Newsletter</h1>
          <p className="text-gray-300">
            Sign up for our weekly newsletter <br /> to get the latest news.
          </p>
          <div>
            <label className="input input-bordered flex items-center gap-2 lg:w-[416px] w-[390px] h-[70px]">
              <input
                id="email"
                type="email"
                className="grow"
                placeholder="Enter Your Email"
              />
              <span
                onClick={handleSubscription}
                className="badge lg:w-[60px] h-[55px] cursor-pointer bg-red-600 text-3xl hover:bg-red-800"
              >
                <FaLongArrowAltRight />
              </span>
            </label>
            {error ? (
              <>
                <div className="text-red-600 text-xl mt-3">
                  Email is not valid
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
