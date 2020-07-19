import React from "react";
import { useForm } from "react-hook-form";

const Auth = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="fName"
          placeholder="First Name"
          ref={register({ required: true, minLength: 2 })}
        />
        <input
          type="text"
          name="lName"
          placeholder="Last Name"
          ref={register}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={register({ required: true })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && <p>Password is invalid.</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Auth;
