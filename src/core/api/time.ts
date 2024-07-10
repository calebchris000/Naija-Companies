import axios from "axios";

export const GetTime = async () => {
  try {
    const response = await axios.get("http://worldtimeapi.org/api/ip");
    const { status, data } = response;

    return { status, data };
  } catch (error) {
    return {
      status: 500,
      data: String(error),
    };
  }
};
