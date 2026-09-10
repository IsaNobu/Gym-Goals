import { useForm } from "react-hook-form";
import DashboardHeader from "../../Components/DashboardHeader";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const url = `https://api.imgbb.com/1/upload?key=${key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.fileUrl[0] };

    const res = await axiosPublic.post(url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const photoURL = res?.data.data.display_url;

    const info = {
      className: data.className,
      classImage: photoURL,
      classDetails: data.bio,
      classInstructors: [],
      booked: 0,
    };

    axiosSecure.post("/class-details", info).then((res) => {
      if (res.data.acknowledged === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Class has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };
  return (
    <div>
      <DashboardHeader text="Add Class Here" />
      <div className="flex justify-center">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label text-2xl font-medium">
              Name Your Class :
            </label>
            <input
              {...register("className")}
              autoComplete="Class Name"
              type="text"
              className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
              placeholder="Enter Class Name"
              required
            />
          </div>
          <label className="label text-2xl font-medium">
            Class Banner Image :
          </label>
          <div>
            <input
              {...register("fileUrl")}
              autoComplete="fileUrl"
              type="file"
              className="file-input file-input-bordered file-input-md md:w-[556px] w-[406px] h-[60px] max-w-xs"
            />
          </div>
          <div>
            <label className="label text-2xl font-medium">
              Tell us about yourself :
            </label>
            <textarea
              {...register("bio")}
              className="textarea textarea-bordered md:w-[556px] w-[406px] md:h-[200px] h-[100px] text-2xl"
              placeholder="Write here..."
              required
            ></textarea>
          </div>
          <div>
            <button className="btn bg-red-600 h-[40px] text-2xl mt-6">
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
