import { useEffect, useState } from "react";
import DashboardHeader from "../../Components/DashboardHeader";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import { PieChart, Pie, Cell, Legend } from "recharts";

const Balance = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidMembers, setPaidMembers] = useState(0);
  const [newsletterSubscribersCount, setNewsletterSubscribersCount] =
    useState(0);

  const axiosPublic = useAxiosPublic();

  const chartData = [
    { name: "Paid Members", value: paidMembers },
    { name: "newsletter Subscribers", value: newsletterSubscribersCount },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    axiosPublic.get("/payments-and-sum").then((res) => {
      setData(res.data.getIds);
      setTotalPrice(res.data.totalPrice);
      setPaidMembers(res.data.paidMembers);
      setNewsletterSubscribersCount(res.data.newsletterSubscribersCount);
    });
  }, [axiosPublic]);
  return (
    <div>
      <DashboardHeader text="Check Your Balance" />

      <div className="flex md:flex-row flex-col justify-center md:items-start items-center">
        <div className="font-bold text-x flex-col flex gap-3 justify-center">
          <div className="text-2xl font-bold">Last Transactions: </div>
          <div className="flex flex-col gap-6">
            {data.map((data) => (
              <h1 key={data._id}>{data.transactionId}</h1>
            ))}
          </div>
        </div>
        <div className="text-2xl font-bold md:mt-0 mt-7">
          Total Price: {totalPrice}
        </div>
      </div>
      <div className="flex justify-center">
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Balance;
