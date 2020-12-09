import axios from "axios";
const url = "http://localhost:4000";

export const getData = async () => {
  try {
    const { data } = await axios.get(`${url}/getData`);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const postData = async (body) => {
  try {
    const { data } = await axios.post(`${url}/postData`, body);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const convertTime = (duration) => {
  var a = duration.match(/\d+/g);

  if (
    duration.indexOf("M") >= 0 &&
    duration.indexOf("H") === -1 &&
    duration.indexOf("S") === -1
  ) {
    a = [0, a[0], 0];
  }

  if (duration.indexOf("H") >= 0 && duration.indexOf("M") === -1) {
    a = [a[0], 0, a[1]];
  }
  if (
    duration.indexOf("H") >= 0 &&
    duration.indexOf("M") === -1 &&
    duration.indexOf("S") === -1
  ) {
    a = [a[0], 0, 0];
  }

  duration = 0;

  if (a.length === 3) {
    duration = duration + parseInt(a[0]) * 3600;
    duration = duration + parseInt(a[1]) * 60;
    duration = duration + parseInt(a[2]);
  }

  if (a.length === 2) {
    duration = duration + parseInt(a[0]) * 60;
    duration = duration + parseInt(a[1]);
  }

  if (a.length === 1) {
    duration = duration + parseInt(a[0]);
  }
  return duration;
};
