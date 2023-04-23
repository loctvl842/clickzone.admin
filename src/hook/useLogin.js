import axios from "axios";

export default function useLogin() {
  const login = async (credientials) => {
    const res = await axios.post("/api/auth/login.php", credientials);
    return res.data.tokens;
  };
  return login;
}
