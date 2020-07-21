import React, { useState } from "react";
import "./Create.css";
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
  const [image, setImage] = useState("");
  const [participantLimit, setParticipantLimit] = useState("");

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

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleParticipantLimitChange = (event) => {
    setParticipantLimit(event.target.value);
  };

  const handleSubmit = (event) => {
    const data = {
      title: title,
      description: description,
      startDate: startDate.toDateString(),
      time: startDate.getHours(),
      coordinates: coordinates,
      location: address,
      participantLimit: participantLimit,
      imageUrl: image,
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
    <div onSubmit={handleSubmit} className={"container"}>
      <h1 style={{ textAlign: "center" }}>Organise an Activity</h1>
      <hr />
      <form>
        <label>Activity Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <label>Display an activity image. (Use Image URL)</label>
        <input
          type="text"
          name="image"
          onChange={handleImageChange}
          value={image}
        />
        <label>Set the maximum limit for number of participants.</label>
        <input
          type="text"
          name="maxParticipants"
          onChange={handleParticipantLimitChange}
          value={participantLimit}
        />
        <label>
          Add a description to your activity. (i.e. Things to bring, what to
          expect, timeline of activities)
        </label>
        <textarea
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />
        <label>Select start date and time. </label>
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

        <label>Type in location and click on selected choice.</label>
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

        <input type="submit" className={"button"} />
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
