import React from "react";
import { useForm } from "react-hook-form";
import axios from "../../axios-create";

const CreateSession = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
    <div>
      <h1>Host an activity</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="title" placeholder="title" ref={register} />
        <textarea
          type="text"
          name="description"
          placeholder="description"
          ref={register}
        />
        <input type="text" name="date" placeholder="date" ref={register} />

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
