import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./Axios/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthProvider";
import useAxiosPublic from "./Axios/useAxiosPublic";

const useFetchTrainerDetails = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: allTrainerData = [], refetch } = useQuery({
    queryKey: ["applied-trainer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied-trainer`);

      return res.data;
    },
  });
  const { data: trainerData = [], refetch: refetch2 } = useQuery({
    queryKey: ["trainer-detail", user.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer-detail?email=${user.email}`);

      return res.data;
    },
  });

  return [allTrainerData, trainerData, refetch, refetch2];
};

export default useFetchTrainerDetails;
