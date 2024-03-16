import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
      username,
      password,
      firstName,
      lastName,
    });
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
          <div className="text-4xl font-bold pt-6">Sign Up</div>
          <div className="text-xl pt-4 px-4 text-slate-500">Enter your information to create an account</div>
          <div>
            <div className="text-left text-md font-medium py-2 pt-6">First Name</div>
            <input
              className="w-full py-1 px-2 border rounded border-slate-300"
              type="text"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <div className="text-left text-md font-medium py-2 pt-3">Last Name</div>
            <input
              className="w-full py-1 px-2 border rounded border-slate-300"
              type="text"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <div className="text-left text-md font-medium py-2 pt-3">Email</div>
            <input
              className="w-full py-1 px-2 border rounded border-slate-300"
              type="text"
              placeholder="johnDoe@gmail.com"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="text-left text-md font-medium py-2 pt-3">Password</div>
            <input
              className="w-full py-1 px-2 border rounded border-slate-300"
              type="text"
              placeholder="JohnDoe123"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="mb-3 mt-5 py-2.5 border rounded-lg w-full bg-slate-600 hover:bg-slate-700 text-white font-medium text-md"
            onClick={handleButtonClick}
          >
            Sign Up
          </button>
          <div className="flex justify-center font-medium text-md py-2">
            <div>Already have an account?</div>
            <Link className="cursor-pointer pl-1 underline" to="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
