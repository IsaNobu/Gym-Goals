import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthProvider";
import useAxiosSecure from "./Axios/useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: roll, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  return [roll, isAdminLoading];
};

export default useAdmin;
