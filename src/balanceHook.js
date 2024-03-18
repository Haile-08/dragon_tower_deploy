import axios from "axios";

export const getBalance = async (token) => {
  console.log(token);
  const balance = await axios
    .get("https://api.maverickhabesha.com/api/v1/balance/get-balance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  return balance;
};

export const updateBalance = async ({ amount, token, stat }) => {
  const balance = await axios
    .post(
      "https://api.maverickhabesha.com/api/v1/balance/update-balance",
      {
        update_type: stat,
        amount: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  return balance;
};
