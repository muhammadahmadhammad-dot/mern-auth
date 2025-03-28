import React, { useState } from "react";
import { useNavigate } from "react-router";
import {toast} from "react-toastify"

const Register = () => {
  const navigate = useNavigate();
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((pre) => ({ ...pre, [name]: value }));
  };

  const submit =async (e) => {
    e.preventDefault();
    if (data.password !== confirmPass) {
      return;
    }
    
    try {
      setErrors({})
      const sendingRequest =await fetch('http://localhost:3000/api/register',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
      });

      const res = await sendingRequest.json();
      console.log(res);

      if (!sendingRequest.ok) {
        setErrors(res.errors)
        console.log(res.errors)
        // toast.error("Something please try again")
        return;
      }

      toast.success(res.msg)
      navigate('/login')

    } catch (error) {
      console.log(`ERROR : ${error}`)
    }
    
  };

  return (
    <div className="block w-11/12 mx-auto p-6 mt-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Register
      </h5>
      <form onSubmit={submit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required=""
              name="fname"
              onChange={handleData}
              value={data.fname}
            />
            {errors.fname && <p className="text-red-500">{errors.fname._errors[0]}</p>}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              name="lname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required=""
              onChange={handleData}
              value={data.lname}
            />
            {errors.lname && <p className="text-red-500">{errors.lname._errors[0]}</p>}

          </div>
        </div>
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
            onChange={handleData}
            value={data.email}
          />
            {errors.email && <p className="text-red-500">{errors.email._errors[0]}</p>}

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
            onChange={handleData}
            value={data.password}
          />
            {errors.password && <p className="text-red-500">{errors.password._errors[0]}</p>}

          {data.password !== confirmPass && (
            <p className="text-red-500">Password does not match with confirm password.</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required=""
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
          />
          
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
