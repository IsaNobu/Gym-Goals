import { useEffect, useState } from "react";
import NavbarBanner from "../../Components/NavbarBanner";
import "../../index.css";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import { Link } from "react-router-dom";

const AllClasses = () => {
  const [data, setData] = useState([]);
  const [forLength, setForLength] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const pageNumber = Math.ceil(forLength.length / 4);
  const pages = [...Array(pageNumber).keys()];

  const getCurrentPage = (num) => {
    setCurrentPage(num);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    axiosPublic
      .get(`/classes?page=${currentPage}&search=${search}`)
      .then((res) => {
        setData(res.data);
      });

    axiosPublic.get(`/class-details`).then((res) => {
      setForLength(res.data);
    });
  }, [axiosPublic, currentPage, search]);

  return (
    <div className="teko">
      <NavbarBanner text="All Classes" />

      <div className="my-6">
        <div className="my-24 flex justify-center">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search Classes"
            className="input input-bordered w-full max-w-xs rounded-full"
          />
        </div>
        {data.map((data, idx) => (
          <div key={idx}>
            <div className="flex md:flex-row flex-col-reverse justify-center gap-24 items-center">
              <div>
                <h1 className="md:text-5xl font-bold">{data.className}</h1>
                <p className="md:w-[405px] md:h-[80px] overflow-hidden text-ellipsis text-xl mt-6">
                  {data.classDetails}
                </p>
                ...
                <h3 className="mt-6">
                  <span className="text-xl font-bold">Location:</span>{" "}
                  Bangladesh
                </h3>
                <div className="mt-6">
                  <Link
                    to={`/all-classes/${data._id}`}
                    className=" text-red-600 text-xl hover:text-red-800"
                  >
                    Details
                  </Link>
                </div>
              </div>
              <div>
                <img
                  className="md:w-[634px] md:h-[390px]"
                  src={data.classImage}
                />
              </div>
            </div>
            <div className="divider lg:w-[1200px] mx-auto"></div>
          </div>
        ))}
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
    </div>
  );
};

export default AllClasses;
