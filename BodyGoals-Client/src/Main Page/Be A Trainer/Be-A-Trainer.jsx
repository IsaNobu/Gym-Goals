import { useForm } from "react-hook-form";
import NavbarBanner from "../../Components/NavbarBanner";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth Provider/AuthProvider";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Helmet } from "react-helmet-async";
import "../../index.css";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";

const animatedComponents = makeAnimated();

const BeATrainer = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const options = [
    { value: "Fitness", label: "Fitness" },
    { value: "Cardio", label: "Cardio" },
    { value: "Serene Stretch", label: "Serene Stretch" },
    { value: "Boxing", label: "Boxing" },
    { value: "Spotting and Correction", label: "Spotting and Correction" },
    { value: "Power Flow", label: "Power Flow" },
    { value: "Zumba Blast", label: "Zumba Blast" },
    { value: "HIIT Hustle", label: "HIIT Hustle" },
  ];

  const days = [
    { value: "saturday: 5 AM - 8 AM", label: "saturday: 5 AM - 8 AM" },
    { value: "saturday: 4 PM - 7 PM", label: "saturday: 4 PM - 7 PM" },
    { value: "saturday: 8 PM - 11 PM", label: "saturday: 8 PM - 11 PM" },

    { value: "Sunday: 5 AM - 8 AM", label: "Sunday: 5 AM - 8 AM" },
    { value: "Sunday: 4 PM - 7 PM", label: "Sunday: 4 PM - 7 PM" },
    { value: "Sunday: 8 PM - 11 PM", label: "Sunday: 8 PM - 11 PM" },

    { value: "Monday: 5 AM - 8 AM", label: "Monday: 5 AM - 8 AM" },
    { value: "Monday: 4 PM - 7 PM", label: "Monday: 4 PM - 7 PM" },
    { value: "Monday: 8 PM - 11 PM", label: "Monday: 8 PM - 11 PM" },

    { value: "Tuesday: 5 AM - 8 AM", label: "Tuesday: 5 AM - 8 AM" },
    { value: "Tuesday: 4 PM - 7 PM", label: "Tuesday: 4 PM - 7 PM" },
    { value: "Tuesday: 8 PM - 11 PM", label: "Tuesday: 8 PM - 11 PM" },

    { value: "Wednesday: 5 AM - 8 AM", label: "Wednesday: 5 AM - 8 AM" },
    { value: "Wednesday: 4 PM - 7 PM", label: "Wednesday: 4 PM - 7 PM" },
    { value: "Wednesday: 8 PM - 11 PM", label: "Wednesday: 8 PM - 11 PM" },

    { value: "Thursday: 5 AM - 8 AM", label: "Thursday: 5 AM - 8 AM" },
    { value: "Thursday: 4 PM - 7 PM", label: "Thursday: 4 PM - 7 PM" },
    { value: "Thursday: 8 PM - 11 PM", label: "Thursday: 8 PM - 11 PM" },

    { value: "Friday: 5 AM - 8 AM", label: "Friday: 5 AM - 8 AM" },
    { value: "Friday: 4 PM - 7 PM", label: "Friday: 4 PM - 7 PM" },
    { value: "Friday: 8 PM - 11 PM", label: "Friday: 8 PM - 11 PM" },
  ];
  const [selectedValues1, setSelectedValue1] = useState([]);
  const [selectedValues2, setSelectedValue2] = useState([]);
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    if (selectedValues1.length === 0 || selectedValues2.length === 0) {
      return setError(true);
    }

    const info = {
      name: data.firstName.concat(" ").concat(data.lastName),
      email: user.email,
      age: data.age,
      photoURL: data.url,
      skills: selectedValues1,
      shifts: selectedValues2,
      bio: data.bio,
      status: "pending",
    };

    axiosSecure.post("/applied-trainer", info).then((res) => {
      if (res.data.insertedId === 0) {
        return Swal.fire({
          position: "center",
          icon: "warning",
          title: "You have already submitted your form",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Submitted Success",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      setSelectedValue1([]);
      setSelectedValue2([]);
    });
  };

  const handleSelectChange1 = (selectedOptions) => {
    setSelectedValue1(selectedOptions);
  };
  const handleSelectChange2 = (selectedOptions) => {
    setSelectedValue2(selectedOptions);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-96">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Be A Trainer || Gym Goals</title>
      </Helmet>
      <NavbarBanner text="Be a Trainer" />
      <section className="flex justify-center my-24 teko md:px-0 px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label text-2xl font-medium">Name :</label>
            <div className="inline-flex gap-5">
              <input
                {...register("firstName")}
                autoComplete="firstName"
                type="text"
                className="input input-bordered md:w-[270px] w-[195px] h-[60px]"
                placeholder="First Name"
                required
              />
              <input
                {...register("lastName")}
                autoComplete="lastName"
                type="text"
                className="input input-bordered md:w-[267px] w-[195px] h-[60px]"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div>
            <label className="label text-2xl font-medium">Email :</label>
            <input
              {...register("email")}
              autoComplete="email"
              type="email"
              className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
              defaultValue={user.email}
              disabled
            />
          </div>
          <div>
            <div className="md:inline-flex gap-5">
              <div className="">
                <label className="label text-2xl font-medium">Age :</label>
                <input
                  {...register("age")}
                  autoComplete="age"
                  type="number"
                  className="input input-bordered md:w-[267px] w-[406px] h-[60px]"
                  placeholder="Age (Year)"
                  required
                />
              </div>
              <div>
                <label className="label text-2xl font-medium">Photo :</label>
                <input
                  {...register("url")}
                  autoComplete="url"
                  type="url"
                  className="file-input file-input-bordered file-input-md w-full max-w-xs h-[60px] md:w-[267px]"
                  placeholder="Your profile picture "
                />
              </div>
            </div>
            <div>
              <label className="label text-2xl font-medium">Skills :</label>
              <Select
                styles={{
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "black",
                  }),
                  control: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected ? "black" : null,
                    borderColor: isFocused ? "black" : "white",
                  }),
                  option: (styles, { isFocused }) => ({
                    ...styles,
                    backgroundColor: isFocused ? "gray" : null,
                  }),
                }}
                className="h-[60px] md:w-[556px] w-[406px]"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={selectedValues1}
                options={options}
                onChange={handleSelectChange1}
              />
            </div>
            <div className="md:inline-flex gap-8">
              <div>
                <label className="label text-2xl font-medium">
                  Available days :
                </label>
                <Select
                  styles={{
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "black",
                    }),
                    control: (base, { isFocused, isSelected }) => ({
                      ...base,
                      backgroundColor: isSelected ? "black" : null,
                      borderColor: isFocused ? "black" : "white",
                    }),
                    option: (styles, { isFocused }) => ({
                      ...styles,
                      backgroundColor: isFocused ? "gray" : null,
                    }),
                  }}
                  className="h-[60px] md:w-[556px] w-[406px]"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selectedValues2}
                  options={days}
                  onChange={handleSelectChange2}
                />
              </div>
            </div>
            <div>
              <label className="label text-2xl font-medium">
                Tell us about yourself :
              </label>
              <textarea
                {...register("bio")}
                className="textarea textarea-bordered md:w-[556px] w-[406px] md:h-[200px] h-[100px] text-2xl"
                placeholder="Write here..."
                required
              ></textarea>
            </div>
            <div>
              {error ? (
                <>
                  <div className="text-red-600 mt-4 text-2 font-bold">
                    Fill out the form
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              <button className="btn md:w-[556px] w-[406px] md:h-[60px] mt-4 rounded-xl text-xl bg-red-600 hover:bg-red-800">
                Submit Form
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default BeATrainer;
