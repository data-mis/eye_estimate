import { requestOption } from "./fetchConfig";
import { HttpConfig } from "./httpConfig";

const FetchControlStudent = {
  fetchStudent: async function (ayear, token) {
    let year = { year: parseInt(ayear) - 543 };
    let request = requestOption("POST", year, token);
    let http = `${HttpConfig()}/student/get_student`;

    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchGetTeacher: async function (token) {
    let request = requestOption("POST", "", token);
    let http = `${HttpConfig()}/student/get_student_advisor`;
    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchGetGroup: async function (year, token) {
    let request = requestOption("POST", year, token);
    let http = `${HttpConfig()}/student/get_student_grp`;

    try {
      let result = fetch(http, request).then((res) => {
        return res.json();
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchAddStudent: async function (infoStudent, token) {
    let request = requestOption("POST", infoStudent, token);
    let http = `${HttpConfig()}/student/add_student`;

    console.log("request=>", request);
    console.log("HTTP", http);

    try {
      let res = await fetch(`${http}`, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }

    console.log("test", request);
  },
  fetchScoreStudent: async function (infoScoreStudent, token) {
    let request = requestOption("POST", infoScoreStudent, token);
    let http = `${HttpConfig()}/student/add_student_score`;

    try {
      let res = await fetch(`${http}`, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchEditstudent: async function (infoEditStudent, token) {
    let request = requestOption("POST", infoEditStudent, token);
    let http = `${HttpConfig()}/student/edit_student`;

    console.log(request);
    console.log(http);

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchDelete: async function (infoDelete, token) {
    let request = requestOption("POST", infoDelete, token);
    let http = `${HttpConfig()}/student/delete_student`;

    console.log("มาไหม=>", request);
    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchImgae: async function (file, token) {
    let request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: file,
    };

    let http = `${HttpConfig()}/student/upload_image_student`;

    try {
      const data = await fetch(http, request).then((res) => {
        return res.json();
      });
      console.log("?", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  fetchGetImage: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/student/get_image_student`;

    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      console.log("fail");
    }
  },
};

export default FetchControlStudent;
