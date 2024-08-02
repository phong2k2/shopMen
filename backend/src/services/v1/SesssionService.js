// const config = require("config");
// const axios = require("axios");
// const qs = require("qs");

// const getGoogleOauthToken = async ({ code }) => {
//   const rootURl = "https://oauth2.googleapis.com/token";

//   const options = {
//     code,
//     client_id: config.get("googleClientId"),
//     client_secret: config.get("googleClientSecret"),
//     redirect_uri: config.get("googleOauthRedirect"),
//     grant_type: "authorization_code",
//   };

//   try {
//     const { data } = await axios.post(rootURl, qs.stringify(options), {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });

//     return data;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const getGoogleUser = async ({ id_token, access_token }) => {
//   try {
//     const { data } =
//       (await axios.get) <
//       GoogleUserResult >
//       (`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
//       {
//         headers: {
//           Authorization: `Bearer ${id_token}`,
//         },
//       });

//     return data;
//   } catch (err) {
//     throw Error(err);
//   }
// };

// const findAndUpdateUser = async (query, update, options) => {
//   return await userModel.findOneAndUpdate(query, update, options);
// };

// module.exports = {
//   getGoogleOauthToken,
//   getGoogleUser,
//   findAndUpdateUser,
// };
