import HeaderSection from "../../../Components/HeaderSection";
import "../../../index.css";

const Feature = () => {
  return (
    <div className="teko">
      <HeaderSection text="Workout Classes" />
      <div className="relative lg:my-0 mb-52">
        <div className="lg:flex hidden justify-end">
          <img src="https://i.ibb.co/MCqwn4g/feature.png" alt="" />
        </div>
        <div className="lg:absolute top-[170px]">
          <div className="grid lg:grid-cols-[472px_472px] md:grid-cols-[372px_372px] justify-center">
            <div className="lg:w-[472px] bg-[#020f23] py-14 px-8">
              <img
                src="https://gymfito.vercel.app/assets/img/services_icon1.svg"
                alt=""
              />
              <div className="mt-6">
                <h1 className="text-3xl font-bold">
                  Customer-Centric Approach
                </h1>
                <p className="mt-3">
                  A customer-centric approach prioritizes customer needs and
                  satisfaction. <br /> It involves understanding customers,
                  providing excellent service, <br /> and building strong
                  relationships.
                </p>
              </div>
            </div>
            <div className="lg:w-[472px] bg-[#020f23] py-14 px-8">
              <img
                src="https://gymfito.vercel.app/assets/img/services_icon2.svg"
                alt=""
              />
              <div className="mt-6">
                <h1 className="text-3xl font-bold">Health and Wellness</h1>
                <p className="mt-3">
                  Health and wellness are essential for a fulfilling life.{" "}
                  <br /> They involve physical, mental, and emotional
                  well-being.
                </p>
              </div>
            </div>
            <div className="lg:w-[472px] bg-[#020f23] py-14 px-8">
              <img
                src="https://gymfito.vercel.app/assets/img/services_icon3.svg"
                alt=""
              />
              <div className="mt-6">
                <h1 className="text-3xl font-bold">Knowledgeable Staff</h1>
                <p className="mt-3">
                  Knowledgeable staff are invaluable assets. They can answer
                  questions, <br /> offer advice, and help customers make
                  informed decisions.
                </p>
              </div>
            </div>
            <div className="lg:w-[472px] bg-[#020f23] py-14 px-8">
              <img
                src="https://gymfito.vercel.app/assets/img/services_icon4.svg"
                alt=""
              />
              <div className="mt-6">
                <h1 className="text-3xl font-bold">
                  Quality Facilities, Equipment
                </h1>
                <p className="mt-3">
                  Our state-of-the-art facilities and top-of-the-line equipment
                  ensure a safe and effective workout experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
