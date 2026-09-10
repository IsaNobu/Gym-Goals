import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./Axios/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthProvider";

const useFetchItem = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data = [], refetch } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);

      return res.data;
    },
  });

  return [data, refetch];
};

export default useFetchItem;
