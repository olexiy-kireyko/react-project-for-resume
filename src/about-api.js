import axios from "axios";

// const UNSPLASH_ACC_KEY = "vRafP9h19WwTpJkR108iVca61WHf6rwGxmB4z9HKnR4";
// axios.defaults.baseURL = "https://api.unsplash.com/search";
// axios.defaults.headers.common["Accept-Version"] = "v1";
// axios.defaults.headers.common["Authorization"] =
// "Client-ID " + UNSPLASH_ACC_KEY;

export const fetchImages = async () => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      page: 1,
      query: "film",
      client_id: "vRafP9h19WwTpJkR108iVca61WHf6rwGxmB4z9HKnR4",
      per_page: 9,
      orientation: "landscape",
      headers: {
        "Accept-Version": "v1",
        // Authorization: "Client-ID vRafP9h19WwTpJkR108iVca61WHf6rwGxmB4z9HKnR4",
      },
    },
  });
  return response.data;
};
