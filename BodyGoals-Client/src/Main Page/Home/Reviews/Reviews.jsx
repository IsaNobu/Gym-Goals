import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "../../../index.css";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";

const Reviews = () => {
  const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/review").then((res) => {
      setData(res.data);
    });
  }, [axiosPublic]);
  return (
    <div className="flex md:flex-row flex-col-reverse gap-4 justify-center items-center teko mt-24">
      <div>
        <div>
          <p className="text-gray-500 text-2xl font-bold">Testimonials</p>
          <h1 className="text-6xl font-bold">Client’s Reviews</h1>
        </div>
        <div className="lg:w-[636px]">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper lg:w-full w-[300px]"
          >
            {data.map((data) => (
              <SwiperSlide key={data._id}>
                <div>
                  <div className="lg:w-[540px] text-2xl mt-6">
                    {data.testimonial}
                  </div>
                  <div className="flex mt-6 gap-6 items-center">
                    <div className="bg-red-600 w-[62px] flex justify-center items-center p-4">
                      <img
                        src="https://i.ibb.co/m8bcJbL/quote-left-1.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{data.name}</h1>
                      <h3 className="text-xl font-semibold">
                        {data.trainerName}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div>
        <img
          className="lg:w-full w-[300px]"
          src="https://i.ibb.co/SDgYGNL/clients-images.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Reviews;
