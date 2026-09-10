import { useEffect, useState } from "react";
import DashboardHeader from "../../Components/DashboardHeader";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";

const NewsletterSubscribers = () => {
  const axiosSecure = useAxiosSecure();
  const [subscriberData, setSubscribersData] = useState([]);

  console.log(subscriberData);

  useEffect(() => {
    axiosSecure.get("/subscribers").then((res) => {
      setSubscribersData(res.data);
    });
  }, [axiosSecure]);
  return (
    <div>
      <DashboardHeader text="Newsletter Subscribers" />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Subscribed Date</th>
              <th>Subscribed Time</th>
            </tr>
          </thead>
          <tbody>
            {subscriberData.map((data, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{data.email}</td>
                <td>{data.date}</td>
                <td>{data.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterSubscribers;
