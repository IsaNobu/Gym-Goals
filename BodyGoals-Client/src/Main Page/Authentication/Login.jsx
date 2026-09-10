import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import { IoLogoGoogle } from "react-icons/io";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import NavbarBanner from "../../Components/NavbarBanner";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInWithGoogle, signInUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  const [wrongInfo, setWrongInfo] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location.state ? location.state : "/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have successfully logged in",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        setWrongInfo(true);
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "You are logged in",
              showConfirmButton: false,
              timer: 1500,
            });

            navigate(location?.state ? location.state : "/");

            return;
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
        <title>Login || Gym Goals</title>
      </Helmet>
      <NavbarBanner text="Login Here" />
      <div className="my-24 flex justify-center px-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="teko bg-[#0f0f0f] w-[636px] h-[611px] flex items-center flex-col justify-center"
        >
          <h1 className="text-5xl">Login Your Account</h1>
          <div>
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
              {wrongInfo ? (
                <>
                  <div className="text-red-600 text-2xl mt-6">
                    Your email or password is wrong
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <p>Remember Me</p>
              </div>
              <div>Forgot Password ?</div>
            </div>
            <div>
              <button className="btn bg-red-600 w-[117px] h-[40px] text-2xl mt-6">
                Login
              </button>
              <div className="mt-4">
                <p className="text-xl">
                  Do not have an account yet ?{" "}
                  <Link
                    to={"/registration"}
                    className="hover:underline hover:underline-offset-4"
                  >
                    Register Here
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
