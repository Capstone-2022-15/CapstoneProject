import axios from "axios";
import React from "react";
import Header from "../components/HeaderDom";

// function _callAPI() {
//   const communityAPI = "http://3.34.185.127/api/announcement";
//   return axios.get(communityAPI);
// }

function Community() {
  // axios
  //   .get("http://3.34.185.127/api/announcement/")
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  return (
    <>
      <Header />
      <div>커뮤니티</div>
    </>
  );
}

export default Community;
