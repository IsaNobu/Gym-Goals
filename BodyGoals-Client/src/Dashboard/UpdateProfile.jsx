import { Helmet } from "react-helmet-async";
import DashboardHeader from "../Components/DashboardHeader";
import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/Axios/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user, loading, updateUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();

  const key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const url = `https://api.imgbb.com/1/upload?key=${key}`;

  const onSubmit = async (data) => {
    if (data.username === user.displayName && data.fileUrl.length === 0) {
      return;
    }

    if (data.fileUrl.length !== 0) {
      const imageFile = { image: data.fileUrl[0] };

      const res = await axiosPublic.post(url, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const photoURL = res?.data.data.display_url;

      updateUser(data.username, photoURL).then(() => {
        axiosPublic
          .patch("/users", {
            email: user.email,
            username: data.name,
            photoURL,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Information successfully updated",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      });
      return;
    }

    updateUser(data.username, user.photoURL).then(() => {
      axiosPublic
        .patch("/users", {
          email: user.email,
          username: data.username,
          photoURL: undefined,
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Information successfully updated",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-96">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Update Profile || Dashboard</title>
      </Helmet>
      <DashboardHeader text="Update Your Profile" />

      <div className="my-24 flex justify-center px-5">
        <div className="w-[636px] h-[811px] flex items-center flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label text-2xl font-medium">Photo Url :</label>
              <div className="flex md:flex-row flex-col items-center gap-4">
                <div>
                  <img
                    className="w-[60px] h-[60px] rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                </div>
                <div>
                  <input
                    {...register("fileUrl")}
                    autoComplete="fileUrl"
                    type="file"
                    className="file-input file-input-bordered file-input-md md:w-[477px]"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="label text-2xl font-medium">Name :</label>
              <input
                {...register("username")}
                autoComplete="username"
                type="text"
                className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
                defaultValue={user.displayName}
              />
            </div>

            <div>
              <label className="label text-2xl font-medium">Email :</label>
              <input
                autoComplete="email"
                type="email"
                className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
                defaultValue={user.email}
                disabled
              />
            </div>
            <div className="flex md:flex-row flex-col items-center justify-between">
              <div>
                <button className="btn bg-gray-400 w-[117px] h-[40px] text-2xl mt-6">
                  Update
                </button>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  last login : {user.metadata.lastSignInTime}
                </h1>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
