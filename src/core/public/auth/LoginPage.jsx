import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import wallpaper from "/Logo/busBg.png";
import star from "/Logo/star.png";
import useLogin from "../../../hooks/useLogin";


const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { login } = useLogin(); // Use the custom hook
  const submit = async (data) => {
    await login(data);
  };

  return (
    <>
      <div className={"flex w-full h-screen mx-auto max-w-[1300px] p-2"}>
        <div
          className="lg:w-7/12 bg-cover bg-center rounded-l-2xl"
          style={{ backgroundImage: `url(${wallpaper})` }}
        ></div>
        <div className="w-full lg:w-5/12">
          {/* <Link to={"/"} className="-mt-2">
            <img
              src={star}
              alt="Logo"
              className="cursor-pointer md:w-44 w-28"
            />
          </Link> */}
          <form
            onSubmit={handleSubmit(submit)}
            className={
              "flex justify-center items-center flex-col md:mt-14 mt-20"
            }
          >
            <div className="">
              <img
                src={star}
                alt="Logo"
                className="cursor-pointer md:w-12 w-8"
              />
              <h1 className={"text-2xl md:text-3xl font-medium mb-1 flex mt-4"}>
                Login to your Account
              </h1>
            </div>
            <div className="md:w-7/12 w-11/12 flex flex-col justify-center mt-14">
              <h1>Email</h1>
              <div
                className={
                  "h-12 w-full border-solid border rounded-md border-gray-300 flex items-center pl-4 pr-2"
                }
              >
                <input
                  type={"email"}
                  placeholder={"Enter your email"}
                  className={"w-full outline-none appearance-none"}
                  {...register("email")}
                />
              </div>
            </div>
            {errors.email && (
              <h6 className="md:w-7/12 w-11/12 text-red-500 text-xs">
                {errors.email.message}
              </h6>
            )}
            <div className="md:w-7/12 w-11/12 flex flex-col justify-center mt-6">
              <h1>Password</h1>
              <div
                className={
                  "h-12 border-solid border rounded-md border-gray-300 flex items-center pl-4 pr-2"
                }
              >
                <input
                  type={"password"}
                  placeholder={"Enter your password"}
                  className={"w-full outline-none"}
                  {...register("password")}
                />
              </div>
            </div>

            {errors.password && (
              <h6 className="md:w-7/12 w-11/12 text-red-500 text-xs">
                {errors.password.message}
              </h6>
            )}

            <div className={"md:w-7/12 w-11/12 flex justify-end pt-3 pr-1"}>
              <Link to={"/forgot-password"}>
                <h3
                  className={
                    "text-green-600 cursor-pointer transition-all hover:text-black"
                  }
                >
                  Forgot password?
                </h3>
              </Link>
            </div>
            <button
              className={
                "mt-8 md:w-7/12 w-11/12 rounded-md h-12 bg-green-600 text-white text-lg font-normal transition duration-200 ease-in-out hover:bg-[#403a4f] hover:font-semibold"
              }
              type={"submit"}
            >
              Login
            </button>
            <div
              className={
                "md:w-6/12 w-11/12 flex text-xs justify-center pt-3 pr-1"
              }
            >
              <h3 className={"text-gray-500"}>Not registered yet? </h3>
              <Link to={"/Signup"}>
                <h3
                  className={
                    "text-green-600 ml-1 font-medium cursor-pointer transition-all"
                  }
                >
                  Create an account
                </h3>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
