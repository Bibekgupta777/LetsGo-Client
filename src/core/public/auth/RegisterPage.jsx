import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";
import useRegister from "../../../hooks/useRegister";
import wallpaper from "/Logo/busBg.jpg";
import loadingGif from "/Logo/buttonLoading.gif";
import star from "/Logo/star.png";
import Navbar from "../../../components/Navbar";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { registerUser, loading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submit = async (data) => {
    await registerUser(data);
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full h-screen mx-auto max-w-[1300px] p-2">
        <div
          className="lg:w-7/12 bg-cover bg-center rounded-l-2xl"
          style={{ backgroundImage: `url(${wallpaper})` }}
        ></div>
        <div className="w-full lg:w-5/12 flex items-center justify-center">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex justify-center items-center flex-col w-full"
          >
            <div className="text-center mt-32">
              <img
                src={star}
                alt="Logo"
                className="cursor-pointer md:w-14 w-10"
              />
              <h1 className="text-3xl font-medium mt-6">
                Create Your Account
              </h1>
            </div>

            <div className="md:w-7/12 w-11/12 flex flex-col justify-center mt-20">
              <h1>Full Name</h1>
              <div className="h-12 w-full border-solid border rounded-md border-gray-300 flex items-center pl-4 pr-2">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full outline-none appearance-none"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <h6 className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </h6>
              )}
            </div>

            <div className="md:w-7/12 w-11/12 flex flex-col justify-center mt-6">
              <h1>Email</h1>
              <div className="h-12 w-full border-solid border rounded-md border-gray-300 flex items-center pl-4 pr-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full outline-none appearance-none"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <h6 className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </h6>
              )}
            </div>

            <div className="md:w-7/12 w-11/12 flex flex-col justify-center mt-6">
              <h1>Password</h1>
              <div className="h-12 w-full border-solid border rounded-md border-gray-300 flex items-center pl-4 pr-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full outline-none"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-sm text-gray-500 ml-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <h6 className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </h6>
              )}
            </div>

            <button
              type="submit"
              className="mt-10 md:w-7/12 w-11/12 rounded-md h-12 flex items-center justify-center bg-green-600 text-white text-lg font-normal transition duration-200 ease-in-out hover:bg-[#403a4f] hover:font-semibold"
            >
              {loading ? (
                <img src={loadingGif} alt="Loading..." className="w-10 h-10" />
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="md:w-6/12 w-11/12 flex text-sm justify-center pt-4">
              <h3 className="text-gray-500">Already have an account?</h3>
              <Link to="/login">
                <h3 className="text-green-600 ml-1 font-medium cursor-pointer hover:underline">
                  Sign in
                </h3>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
