/* This file contains all the endpoint names.
 Each constant object is a representation of a router in the program
*/

export const authEndpoints = <const>{
  login: "/login",
  refreshToken: "/refreshToken",
};

// This is the root router containing all other routers
export const endpoints = <const>{
  auth: authEndpoints,
};
