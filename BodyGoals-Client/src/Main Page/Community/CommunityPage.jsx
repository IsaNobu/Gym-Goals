import { useEffect, useState } from "react";
import NavbarBanner from "../../Components/NavbarBanner";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import { RiAdminLine } from "react-icons/ri";
import { GiBiceps } from "react-icons/gi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";

const CommunityPage = () => {
  const { data: votes, refetch } = useQuery({
    queryKey: ["get-post-votes"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-post-votes`);

      return res.data;
    },
  });

  const axiosPublic = useAxiosPublic();
  const [count, setCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const pageCount = Math.ceil(count.length / 6);
  const pages = [...Array(pageCount).keys()];

  const getCurrentPage = (num) => {
    setCurrentPage(num);
  };

  const handleVote = (vote, id) => {
    if (vote === 1) {
      axiosPublic.patch(`/community-posts?id=${id}&vote=${1}`).then(() => {
        refetch();
      });
    } else if (vote === -1) {
      axiosPublic.patch(`/community-posts?id=${id}&vote=${-1}`).then(() => {
        refetch();
      });
    }
  };

  useEffect(() => {
    axiosPublic.get("/community-posts-count").then((res) => {
      setCount(res.data);
    });

    axiosPublic.get(`/community-posts?count=${currentPage}`).then((data) => {
      setPosts(data.data);
    });
  }, [axiosPublic, currentPage]);
  return (
    <div>
      <NavbarBanner text="Community Posts" />
      <div className="flex justify-center items-center">
        <div>
          {posts?.map((data) => (
            <div className="md:w-[700px] space-y-6" key={data._id}>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Poster By: {data.name}</h1>
                <p>
                  {data?.badge === "admin" ? <RiAdminLine /> : <GiBiceps />}
                </p>
              </div>
              <p className="font-bold">{data.post}</p>
              <div className="flex flex-col">
                <FaChevronUp
                  onClick={() => handleVote(1, data._id)}
                  className="cursor-pointer"
                />
                {/* {votes?.map((data) => data)} */}
                <FaChevronDown
                  onClick={() => handleVote(-1, data._id)}
                  className="cursor-pointer"
                />
              </div>
              <div className="divider"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <div className="join">
          {pages.map((data, idx) => (
            <button
              onClick={() => getCurrentPage(idx)}
              key={idx}
              className={`join-item btn btn-lg ${
                currentPage === data && "btn-active"
              }`}
            >
              {data + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
