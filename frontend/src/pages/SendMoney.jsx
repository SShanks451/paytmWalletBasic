import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <div className="flex justify-center w-[100%] h-screen">
        <div className="flex flex-col justify-center w-[30%]">
          <div className="shadow-lg rounded-lg border flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-center my-10">Send Money</h1>
            <div className="flex flex-col">
              <div className="flex">
                <div className="w-16 h-16 bg-green-500 rounded-full ml-8 mt-12">
                  <div className="text-4xl flex justify-center mt-2 text-white">{name[0]}</div>
                </div>
                <div className="mt-16 ml-4 text-xl font-bold">{name}</div>
              </div>
              <div className="ml-8 mt-1 font-semibold">Amount (in Rs)</div>
              <input
                className="w-sceen mx-8 border-2 border-gray-200 my-2 rounded-lg py-2 px-3"
                type="number"
                placeholder="Enter amount"
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
              <button
                className="w-sceen mx-8 border my-2 rounded-lg py-2 px-3 text-white bg-green-500 mb-9"
                onClick={() => {
                  axios.post(
                    "http://localhost:3000/api/v1/account/transfer",
                    {
                      amount: amount,
                      to: id,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                }}
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
