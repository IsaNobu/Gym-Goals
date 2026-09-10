import PropTypes from "prop-types";
import "../index.css";

const HeaderSection = ({ text }) => {
  return (
    <div className="flex justify-center items-center flex-col teko my-12">
      <div>
        <img
          className="h-[50px] w-[50px]"
          src="https://i.ibb.co/MSSs5xS/Logo.png"
          alt=""
        />
      </div>
      <p className="text-gray-400 text-lg font-bold">Build your body strong</p>
      <h1 className="text-5xl font-bold">{text}</h1>
    </div>
  );
};

HeaderSection.propTypes = {
  text: PropTypes.string.isRequired,
};

export default HeaderSection;
