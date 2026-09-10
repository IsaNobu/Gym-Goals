import { useForm } from "react-hook-form";
import DashboardHeader from "../Components/DashboardHeader";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/Axios/useAxiosPublic";
import useFetchItem from "../Hooks/useFetchUsers";

const CommunityForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const [data] = useFetchItem();

  const onSubmit = async (info) => {
    if (info.post === "") {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Check if you want",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .post("/community-post", {
            name: data[0].username,
            badge: data[0].roll,
            post: info.post,
            vote: 0,
          })
          .then((res) => {
            if (res.data.acknowledged === true) {
              Swal.fire({
                title: "Post Added",
                icon: "success",
              });
              reset();
            }
          });
      }
    });
  };
  return (
    <div>
      <DashboardHeader text="Add Community Post" />

      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <textarea
              {...register("post")}
              className="textarea textarea-info lg:w-[800px] lg:h-[400px] border-none text-lg font-bold"
              placeholder="Whats on your mind ...?"
            ></textarea>
          </div>
          <div>
            <button className="btn bg-red-600 md:px-8 text-xl">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityForm;
