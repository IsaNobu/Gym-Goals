import About from "../About Us/About";
import Banner from "../Banner/Banner";
import Feature from "../Feature/Feature";
import FeaturedClasses from "../Featured Class/FeaturedClasses";
import Reviews from "../Reviews/Reviews";
import TrainerProfile from "../Trainer Profile/TrainerProfile";

const Home = () => {
  return (
    <div>
      <Banner />
      <Feature />
      <FeaturedClasses />
      <TrainerProfile />
      <About />
      <Reviews />
    </div>
  );
};

export default Home;
