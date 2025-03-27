import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handelData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((pre) => ({ ...pre, [name]: value }));
  };
  const handelForm = async (e) => {
    e.preventDefault();
    console.log(data)
    try {
      const sending = await fetch("http://localhost:3000/api/login-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await sending.json();
      console.log(res);

      if (!sending.ok) {
        toast.error(res.error);
        return;
      }

      console.log(sending);
      toast.success("Your are Login Successfully.");
      navigate("/");
    } catch (error) {
      console.log("error : " + error);
    }
  };
  return (
    <div className="block w-1/2 mx-auto p-6 mt-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Login
      </h5>
      <form onSubmit={handelForm}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required=""
            name="email"
            value={data.email}
            onChange={handelData}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required=""
            name="password"
            value={data.passwrd}
            onChange={handelData}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
