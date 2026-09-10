import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import { AuthContext } from "../../Auth Provider/AuthProvider";
import Swal from "sweetalert2";
import NavbarBanner from "../../Components/NavbarBanner";
import { Helmet } from "react-helmet-async";

const Registration = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(false);

  const key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const url = `https://api.imgbb.com/1/upload?key=${key}`;

  const onSubmit = async (data) => {
    const hasUppercase = /[A-Z]/.test(data.password);
    const hasLowercase = /[a-z]/.test(data.password);
    const isLongEnough = data.password.length >= 6;

    if (!hasUppercase) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one uppercase letter.",
      });
      return;
    } else if (!hasLowercase) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one lowercase letter.",
      });
      return;
    } else if (!isLongEnough) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }

    const imageFile = { image: data.fileUrl[0] };

    let img = {};

    if (data.fileUrl.length !== 0) {
      const res = await axiosPublic.post(url, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      img = res;
    }

    const photoURL =
      data.fileUrl.length !== 0 ? img?.data.data.display_url : data.url;

    const userData = {
      username: data.username,
      photoURL,
      email: data.email,
      roll: "user",
    };

    createUser(data.email, data.password)
      .then(() => {
        updateUser(data.username, photoURL)
          .then(() => {
            axiosSecure.post("/users", userData);
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your account has been created",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ? location.state : "/");
          });
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle().then((res) => {
      axiosSecure
        .post("/users", {
          username: res.user?.displayName,
          photoURL: res.user?.photoURL,
          email: res.user?.email,
          roll: "user",
        })
        .then((res) => {
          if (res.data.insertedId === 0) {
            return Swal.fire({
              position: "center",
              icon: "success",
              title: "You are logged in",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your account has been created",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location.state : "/");
        });
    });
  };
  return (
    <div>
      <Helmet>
        <title>Sign Up || Gym Goals</title>
      </Helmet>
      <NavbarBanner text="Create an account here" />
      <div className="my-24 flex justify-center px-5">
        <div className="teko bg-[#0f0f0f] w-[636px] h-[811px] flex items-center flex-col justify-center">
          <h1 className="text-5xl">Login Your Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label text-2xl font-medium">Name :</label>
              <input
                {...register("username")}
                autoComplete="username"
                type="text"
                className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="label text-2xl font-medium">
                Photo Url : ( Optional )
              </label>
              <div className="flex items-center gap-4">
                <input
                  {...register("url")}
                  autoComplete="url"
                  type="url"
                  className="input input-bordered md:w-[306px] w-[406px] h-[60px]"
                  placeholder="Your profile picture "
                />
                <div>OR</div>
                <div>
                  <input
                    {...register("fileUrl")}
                    autoComplete="fileUrl"
                    type="file"
                    className="file-input file-input-bordered file-input-md w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="label text-2xl font-medium">Email :</label>
              <input
                {...register("email")}
                autoComplete="email"
                type="email"
                className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div>
              <label className="label text-2xl font-medium">Password :</label>
              <input
                {...register("password")}
                autoComplete="password"
                type="password"
                className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
                placeholder="Enter your Password"
                required
              />
            </div>
            <div>
              {error ? (
                <>
                  <div className="text-red-600 mt-4">
                    Account Already Exists
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className=" mt-6">
              <div className="flex items-center gap-2">
                <input className="cursor-pointer" type="checkbox" />
                <p>Remember Me</p>
              </div>
            </div>
            <div>
              <button className="btn bg-red-600 w-[117px] h-[40px] text-2xl mt-6">
                Register
              </button>
              <div className="mt-4">
                <p className="text-xl">
                  Already have an account ?{" "}
                  <Link
                    to={"/login"}
                    className="hover:underline hover:underline-offset-4"
                  >
                    Login Here
                  </Link>
                </p>
              </div>
            </div>
            <div>
              <div className="divider">OR</div>
            </div>
            <div className="flex justify-center">
              <div
                onClick={handleGoogleLogin}
                className="text-4xl border-2 border-red-600 h-[60px] w-[60px] rounded-full flex justify-center items-center cursor-pointer hover:bg-red-600"
              >
                <IoLogoGoogle />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
