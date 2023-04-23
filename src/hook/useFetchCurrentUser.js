import axios from "axios";

export default function useFetchCurrentUser() {
  const fetchCurrentUser = async (accessToken) => {
    const res = await axios.get("/api/user/get_current.php", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res.data.user;
  };
  return fetchCurrentUser;
}
