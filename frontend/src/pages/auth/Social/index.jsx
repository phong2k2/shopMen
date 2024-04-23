import { setAccessToken } from "@/redux/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

function Social() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      dispatch(setAccessToken(token));
      navigate("/");
    }
  }, [token]);
  return <></>;
}

export default Social;
