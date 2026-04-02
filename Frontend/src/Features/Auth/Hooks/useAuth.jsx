import { setUser, setError, setLoading } from "../Slices/auth.slice";
import {
  register,
  login,
  updateProfile,
  getProfile,
  logoutUser,
} from "../Services/auth.service";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();
  const handleRegisterUser = async (userData) => {
    try {
      dispatch(setLoading(true));
      const data = await register(userData);
      if (data.success) {
        localStorage.setItem("token", data.token);
        dispatch(setUser(data.user));
        dispatch(setError(null));
        return data;
      } else {
        dispatch(
          setError(
            data?.error || "Something went wrong during registering user",
          ),
        );
      }
    } catch (err) {
      dispatch(
        setError(
          err?.message || "Something went wrong during registering user",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleLoginUser = async (userData) => {
    try {
      dispatch(setLoading(true));
      const data = await login(userData);
      if (data.success) {
        localStorage.setItem("token", data.token);

        dispatch(setUser(data.user));
        dispatch(setError(null));
        return data;
      } else {
        dispatch(
          setError(data?.error || "Something went wrong during loggin in user"),
        );
      }
    } catch (err) {
      dispatch(
        setError(err?.message || "Something went wrong during loggin in user"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleGetProfile = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getProfile();
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setError(null));
        return data;
      } else {
        dispatch(
          setError(data?.error || "Something went wrong during fetchin user"),
        );
      }
    } catch (err) {
      dispatch(
        setError(err?.message || "Something went wrong during fetchin user"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleUpdateProfile = async (userData) => {
    try {
      dispatch(setLoading(true));
      const data = await updateProfile(userData);
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setError(null));
        return data;
      } else {
        dispatch(
          setError(
            data?.error || "Something went wrong during updating profile",
          ),
        );
      }
    } catch (err) {
      dispatch(
        setError(
          err?.message || "Something went wrong during updating profile",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const data = await logoutUser();
      if (data.success) {
        dispatch(setUser(null));
        dispatch(setError(null));
        return data;
      } else {
        dispatch(setError(data?.error || "Something went wrong during logout"));
      }
    } catch (err) {
      dispatch(setError(err?.message || "Something went wrong during logout"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleGetProfile,
    handleLoginUser,
    handleRegisterUser,
    handleUpdateProfile,
    handleLogout,
  };
};

export default useAuth;
