import BannerSlider from "./BannerSlider";
import "../../../index.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-[url('https://i.ibb.co/hLCRbnV/Banner.jpg')]">
      <div className="lg:h-[840px] md:h-[440px] h-[640px] pt-12">
        <div className="lg:flex flex-row items-center justify-center gap-2 px-4">
          <div className="teko md:w-[430px] w-[230px]">
            <div>
              <h3 className="text-6xl text-red-600 md:-mb-16 -mb-12">
                high intensity
              </h3>
              <h1 className="md:text-[175px] text-[130px]">workout</h1>
              <h3 className="text-6xl md:-mt-16 -mt-12">for weight loss</h3>
            </div>
            <div className="flex gap-4 mt-3 items-center">
              <p className="text-2xl">isanobu1@gmail.com</p>
              <Link
                to={"/all-trainer"}
                className="btn bg-red-600 lg:w-[210px] h-[65px] rounded text-3xl hover:bg-"
              >
                start consulting
              </Link>
            </div>
          </div>
          <div className="lg:block hidden w-[700px] h-[630px]">
            <BannerSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

//
