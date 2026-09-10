import PropTypes from "prop-types";

const NavbarBanner = ({ text }) => {
  return (
    <div className="relative">
      <div>
        <img
          className="w-full h-full"
          src="https://i.ibb.co/ngqLMFd/Navbar-Banner.jpg"
          alt=""
        />
      </div>
      <div className="flex justify-center">
        <div className="absolute lg:top-[250px] top-12">
          <h1 className="lg:text-[130px] text-5xl font-semibold teko">
            {text}
          </h1>
        </div>
      </div>
    </div>
  );
};

NavbarBanner.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NavbarBanner;
