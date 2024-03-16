import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ balance }) => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then((response) => {
      setUsers(response.data.user);
    });
  }, [filter]);

  return (
    <div>
      <div className="flex justify-between m-6 h-14 shadow rounded-lg">
        <div className="text-2xl font-bold mt-3 mx-2">Payments App</div>
        <div className="flex">
          <div className="mx-5 text-lg mt-3">Hello, User</div>
          <div className="w-12 h-12 mt-1 mr-1 bg-slate-200 rounded-full flex justify-center">
            <div className="text-xl mt-2.5">U</div>
          </div>
        </div>
      </div>
      <div className="flex m-6 text-xl font-bold">
        <div className="mr-4">Your balance</div>
        <div>Rs {balance}</div>
      </div>
      <div className="mx-6 my-8">
        <div className="text-xl font-bold mb-2">Users</div>
        <input
          className="border-2 my-2 w-full py-1.5 px-4 rounded-lg"
          type="text"
          placeholder="Search Users..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mx-6 my-3">
      <div className="flex">
        <div className="w-12 h-12 rounded-full bg-slate-200 flex justify-center">
          <div className="text-xl mt-2">{user.firstName[0]}</div>
        </div>
        <div className="flex flex-col ml-2 justify-center font-bold text-lg">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <button
        className="mr-2 mb-1.5 bg-black text-white px-5 my-1 rounded-lg"
        onClick={() => {
          navigate("/send?id=" + user._id + "&name=" + user.firstName);
        }}
      >
        Send Money
      </button>
    </div>
  );
}

export default Dashboard;
