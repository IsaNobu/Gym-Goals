import PropTypes from "prop-types";

const DashboardHeader = ({ text }) => {
  return (
    <div className="flex justify-center items-center text-4xl font-bold my-24">
      {text}
    </div>
  );
};

DashboardHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DashboardHeader;
