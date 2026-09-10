import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./Axios/useAxiosSecure";

const useFetchClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { data, refetch: refetch1 } = useQuery({
    queryKey: ["class-details"],
    queryFn: async () => {
      const res = await axiosSecure.get("/class-details");
      return res.data;
    },
  });
  return [data, refetch1];
};

export default useFetchClasses;
