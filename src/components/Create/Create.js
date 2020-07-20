import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "../../axios-create";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Create.css";

const CreateSession = (props) => {
  const { register, handleSubmit, control } = useForm();
  const [startDate, setStartDate] = useState();

  // const onChange = (date) => {
  //   setStartDate(date);
  //   console.log(date);
  // };

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const onSubmit = (data) => {
    console.log(data);
    setStartDate(data.dateSelected.toDateString());

    axios
      .post("/activity.json", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={"Form"}>
      <h1>Date: </h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"input"}>
        <input type="text" name="title" placeholder="title" ref={register} />
        <textarea
          type="text"
          name="description"
          placeholder="description"
          ref={register}
        />
        {/* <Controller
          as={
            <DatePicker
              dateFormat="d MMM yyyy"
              showTimeSelect
              // selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeClassName={handleColor}
            />
          }
          placeholderText="Select date and time"
          control={control}
          // valueName="selected"
          name="dateAndTime"
          ref={register}
        /> */}
        <Controller
          as={
            <DatePicker
              dateFormat="d MMM yyyy"
              minDate={new Date()}
              showTimeSelect={false}
              todayButton="Today"
              dropdownMode="select"
              isClearable
              placeholderText="Click to select date"
              shouldCloseOnSelect
            />
          }
          control={control}
          register={register({ required: true })}
          name="dateSelected"
          valueName="selected" // DateSelect value's name is selected
          onChange={([selected]) => {
            return selected;
          }}
          rules={{
            required: true,
          }}
        />
        <h2>Date and Time {startDate ? startDate : null} </h2>
        <input
          type="text"
          name="location"
          placeholder="location"
          ref={register}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateSession;
