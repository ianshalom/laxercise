import React, { useState } from "react";
import axios from "../../axios-create";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Listings = () => {
  //Basic Date and description of activity
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [date, setDate] = useState("");

  //Geolocation Coordinates
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(results);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    const data = {
      title: title,
      description: description,
      startDate: startDate.toDateString(),
      coordinates: coordinates,
      location: address,
    };

    axios
      .post("/activity.json", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  return (
    <div onSubmit={handleSubmit}>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Give your activity a name"
          onChange={handleTitleChange}
          value={title}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Give your activity a name"
          onChange={handleDescriptionChange}
          value={description}
        />

        <DatePicker
          name="dateAndTime"
          dateFormat="d MMM yyyy"
          minDate={new Date()}
          showTimeSelect
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeClassName={handleColor}
          value={startDate}
        />

        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                type="text"
                value={address}
                {...getInputProps({ placeholder: "Enter Location" })}
              />
              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#ceefe4" : "#fff",
                  };

                  return (
                    <div
                      key={suggestion.placeId}
                      id={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <input type="submit" />
      </form>
    </div>
  );
};

export default Listings;

// import React, { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import axios from "../../axios-create";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./Create.css";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

// const CreateSession = (props) => {
//   const { register, handleSubmit, control } = useForm();
//   const [startDate, setStartDate] = useState();

//   const [address, setAddress] = useState("");
//   // const [coordinates, setCoordinates] = useState({
//   //   lat: null,
//   //   lng: null,
//   // });

//   // const handleSelect = async (value) => {
//   //   const results = await geocodeByAddress(value);
//   //   console.log(results);
//   //   const latLng = await getLatLng(results[0]);

//   //   setAddress(value);
//   //   setCoordinates(latLng);
//   // };

//   const onSubmit = (data) => {
//     console.log(data);
//     setStartDate(data.dateSelected.toDateString());

//     axios
//       .post("/activity.json", data)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className={"Form"}>
//       <h1>Create Activity </h1>

//       <form onSubmit={handleSubmit(onSubmit)} className={"input"}>
//         <input type="text" name="title" placeholder="title" ref={register} />
//         <textarea
//           type="text"
//           name="description"
//           placeholder="description"
//           ref={register}
//         />

//         <Controller
//           as={
//             <DatePicker
//               dateFormat="d MMM yyyy"
//               minDate={new Date()}
//               showTimeSelect={false}
//               todayButton="Today"
//               dropdownMode="select"
//               isClearable
//               placeholderText="Click to select date"
//               shouldCloseOnSelect
//             />
//           }
//           control={control}
//           register={register({ required: true })}
//           name="dateSelected"
//           valueName="selected" // DateSelect value's name is selected
//           onChange={([selected]) => {
//             return selected;
//           }}
//           rules={{
//             required: true,
//           }}
//         />
//         <h2>Date and Time {startDate ? startDate : null} </h2>

//         <Controller
//           control={control}
//           register={register}
//           name="location"
//           valueName="address"
//           onChange={([address]) => {
//             return address;
//           }}
//           as={
//             <PlacesAutocomplete value={address} onChange={setAddress}>
//               {({
//                 getInputProps,
//                 suggestions,
//                 getSuggestionItemProps,
//                 loading,
//               }) => (
//                 <div>
//                   <input
//                     type="text"
//                     value={address}
//                     {...getInputProps({ placeholder: "Enter Location" })}
//                   />
//                   <div>
//                     {loading ? <div>...loading</div> : null}

//                     {suggestions.map((suggestion, index) => {
//                       const style = {
//                         backgroundColor: suggestion.active ? "#ceefe4" : "#fff",
//                       };
//                       return (
//                         <div
//                           key={suggestion.index}
//                           {...getSuggestionItemProps(suggestion, { style })}
//                         >
//                           {suggestion.description}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </PlacesAutocomplete>
//           }
//         />

//         <input type="submit" />
//       </form>
//     </div>
//   );
// };

// export default CreateSession;
