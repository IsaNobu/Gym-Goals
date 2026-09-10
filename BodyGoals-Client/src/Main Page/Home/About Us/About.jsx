import "../../../index.css";

const About = () => {
  return (
    <div className="teko my-24 lg:flex flex lg:flex-row md:grid md:grid-cols-[356px_356px] flex-col justify-center gap-6 lg:px-0 px-6">
      <div className="lg:w-[356px] border border-[#484848] px-7 py-7">
        <h1 className="text-7xl">
          4<span className="text-red-600">+</span>
        </h1>
        <h1 className="text-5xl font-semibold">Years Experience</h1>
        <p className="text-xl">
          We have trainer who has 4+ experience in this <br /> field just for
          your best performance
        </p>
      </div>
      <div className="lg:w-[356px] border border-[#484848] px-7 py-7">
        <h1 className="text-7xl">
          37<span className="text-red-600">+</span>
        </h1>
        <h1 className="text-5xl font-semibold">Experts Trainers</h1>
        <p className="text-xl">
          plenty of experts and professional to train you and help you become
          the bigger man
        </p>
      </div>
      <div className="lg:w-[356px] border border-[#484848] px-7 py-7">
        <h1 className="text-7xl">
          27<span className="text-red-600">+</span>
        </h1>
        <h1 className="text-5xl font-semibold">Workout Classes</h1>
        <p className="text-xl">
          You can have every kind of class to attend with you desired time
        </p>
      </div>
      <div className="lg:w-[356px] border border-[#484848] px-7 py-7">
        <h1 className="text-7xl">
          5<span className="text-red-600">K</span>
        </h1>
        <h1 className="text-5xl font-semibold">Satisfied Clients</h1>
        <p className="text-xl">
          Hesitating to join ? No worries because we put smiles on more than 5k
          + clients
        </p>
      </div>
    </div>
  );
};

export default About;
