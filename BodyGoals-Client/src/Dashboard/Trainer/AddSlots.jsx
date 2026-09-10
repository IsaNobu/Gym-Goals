import useFetchClasses from "../../Hooks/useFetchClasses";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useFetchTrainerDetails from "../../Hooks/useFetchTrainerDetails";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useState } from "react";
import "../../index.css";

const animatedComponents = makeAnimated();

const AddSlots = () => {
  const [data, refetch1] = useFetchClasses();
  const [, trainerData, refetch] = useFetchTrainerDetails();
  const axiosSecure = useAxiosSecure();

  const [value, setValue] = useState([]);

  const { shifts = [], photoURL, name, bio, _id, email } = trainerData;

  const filterShift = shifts.filter((data) => data.value !== "booked");

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

  const filteredDays = days.filter((day) => {
    const newOptionValues = new Set(filterShift.map((option) => option.value));
    return !newOptionValues.has(day.value);
  });

  const handleSelect = (selectedOptions) => {
    setValue(selectedOptions);
  };

  const handleAddShifts = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want add this class?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch("/class-details-push", {
            email: email,
            shift: value,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Shift Added",
                icon: "success",
              });
              setValue([]);
              refetch();
            }
          });
      }
    });
  };

  const handleBooking = (id) => {
    Swal.fire({
      title: "Do you want add this class?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch("/make-changes", {
            email: email,
            id: id,
            trainerId: _id,
          })
          .then((res) => {
            if (res.data.classExists === true) {
              Swal.fire({
                title: "Class Already Selected",
                icon: "info",
              });
            } else if (res.data.classFull === true) {
              Swal.fire({
                title: "Class Is Full, Cannot Be Selected",
                icon: "info",
              });
            } else if (
              res.data.result1.modifiedCount > 0 &&
              res.data.result2.modifiedCount > 0
            ) {
              refetch1();
              Swal.fire({
                title: "Class Added",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div>
      <form className="flex flex-col items-center">
        <div>
          <div className="flex md:flex-row flex-col gap-5">
            <div>
              <img
                className="w-[60px] h-[60px] rounded-full"
                src={photoURL}
                alt=""
              />
            </div>
            <label className="label text-2xl font-medium">Name :</label>
            <input
              autoComplete="lastName"
              type="text"
              className="input input-bordered md:w-[267px] w-[195px] h-[60px]"
              defaultValue={name}
              disabled
            />
          </div>
        </div>
        <div>
          <label className="label text-2xl font-medium">Email :</label>
          <input
            autoComplete="email"
            type="email"
            className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
            defaultValue={trainerData.email}
            disabled
          />
        </div>
        <div className="md:inline-flex gap-5">
          <div className="">
            <label className="label text-2xl font-medium">Age :</label>
            <input
              autoComplete="age"
              type="number"
              className="input input-bordered md:w-[556px] w-[406px] h-[60px]"
              placeholder="Age (Year)"
              disabled
            />
          </div>
        </div>
        <div>
          <label className="label text-2xl font-medium">
            Tell us about yourself :
          </label>
          <textarea
            className="textarea textarea-bordered md:w-[556px] w-[406px] md:h-[200px] h-[100px] text-2xl"
            defaultValue={bio}
            disabled
          ></textarea>
        </div>
        <div className="my-2">
          <label className="label text-2xl font-medium">Chosen Slots :</label>
          <div className="text-xl font-bold flex mf:flex-row flex-col md:w-[556px] gap-2">
            {filterShift.map((data, idx) => (
              <h1 key={idx}>
                {idx + 1} {data.label},
              </h1>
            ))}
          </div>
        </div>
        <div>
          <label className="label text-2xl font-medium">Available days :</label>
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
            options={filteredDays}
            value={value}
            onChange={handleSelect}
          />
        </div>
        <div>
          <button onClick={handleAddShifts} className="btn bg-red-600">
            Add
          </button>
        </div>
      </form>
      <div className="divider"></div>
      <div className="flex flex-col items-center">
        {data?.map((data, idx) => (
          <div className="lg:w-[1000px]" key={idx}>
            <div className="flex gap-3">
              <div>
                <img className="lg:w-[300px]" src={data.classImage} alt="" />
              </div>
              <div>
                <div className="flex items-center gap-6">
                  <h1 className="text-xl font-bold">{data.className}</h1>
                  <p className="text-xl font-bold">
                    {data.classInstructors.length}/5
                  </p>
                </div>
                <p>{data.classDetails}</p>
                <button
                  onClick={() => handleBooking(data._id)}
                  className="btn mt-3"
                >
                  Add class
                </button>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSlots;
