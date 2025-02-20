import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import wallpaper from "/Logo/busBg.png";
import star from "/Logo/star.png";
import { useState } from "react";
import axios from "axios";

const schema = yup
  .object({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  })
  .required();

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async (data) => {
    try {
      setLoading(true);
      setStatus({ type: '', message: '' });

      await axios.post('/api/user/reset-password', {
        token,
        newPassword: data.newPassword
      });
      
      setStatus({
        type: 'success',
        message: 'Password reset successful'
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to reset password'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"flex w-full h-screen mx-auto max-w-[1300px] p-2"}>
      <div
        className="lg:w-7/12 bg-cover bg-center rounded-l-2xl"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      <div className="w-full lg:w-5/12">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex justify-center items-center flex-col md:mt-14 mt-20"
        >
          <div className="">
            <img
              src={star}
              alt="Logo"
              className="cursor-pointer md:w-12 w-8"
            />
            <h1 className="text-2xl md:text-3xl font-medium mb-1 flex mt-4">
              Set New Password
            </h1>
          </div>

          <div className="md:w-7/12 w-11/12 flex flex-col justify-center mt-14">
            <h1>New Password</h1>
            <div className="h-12 w-full border-solid border rounded-md border-gray-300 flex items-center pl-4 pr-2">
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full outline-none appearance-none"
                {...register("newPassword")}
                disabled={loading}
              />
            </div>
            {errors.newPassword && (
              <h6 className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </h6>
            )}
          </div>

          <div className="md:w-7/12 w-11/12 flex flex-col justify-center mt-6">
            <h1>Confirm Password</h1>
            <div className="h-12 w-full border-solid border rounded-md border-gray-300 flex items-center pl-4 pr-2">
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full outline-none appearance-none"
                {...register("confirmPassword")}
                disabled={loading}
              />
            </div>
            {errors.confirmPassword && (
              <h6 className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </h6>
            )}
          </div>

          {status.message && (
            <div className={`md:w-7/12 w-11/12 mt-4 p-3 rounded-md ${
              status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {status.message}
            </div>
          )}

          <button
            className={`mt-8 md:w-7/12 w-11/12 rounded-md h-12 bg-green-600 text-white text-lg font-normal transition duration-200 ease-in-out hover:bg-[#403a4f] hover:font-semibold ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                <span className="ml-2">Resetting...</span>
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;