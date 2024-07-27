import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetUI } from "@store/auth/authSlice";
import actAuthLogin from "@store/auth/thunk/actAuthLogin";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loginSchema, LoginSchema } from "@validations/login";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const useLogin = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAccountCreated = searchParams.get("message") === "account_created";
  const isLoginRequired = searchParams.get("message") === "login_required";
  const { error, status, accessToken, unlockedPage } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      return navigate("/");
    }

    dispatch(resetUI());
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (fieldValues) => {
    if (isAccountCreated || isLoginRequired) {
      setSearchParam("");
    }

    await dispatch(actAuthLogin(fieldValues))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return {
    error,
    status,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isAccountCreated,
    isLoginRequired,
    unlockedPage,
  };
};

export default useLogin;
