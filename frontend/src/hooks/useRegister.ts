import { FocusEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetUI } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { registerSchema, RegisterSchema } from "@validations/register";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCheckEmailAvailability from "./useCheckEmailAvailability";
import actAuthRegister from "@store/auth/thunk/actAuthRegister";

const emailAvailabilityMessages = {
  idle: "",
  checking:
    "We're currently checking the availability of this email address. Please wait a moment.",
  available: "This email address is available for use",
  notAvailable: "This email address already exists",
  failed: "Something went wrong",
};

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error, accessToken } = useAppSelector((state) => state.auth);

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
    getFieldState,
    trigger,
  } = useForm<RegisterSchema>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const { emailAvailabilityStatus, receivedEmail, checkEmailAvailability, resetAvailability } =
    useCheckEmailAvailability();

  const emailAvailabilityMessage =
    emailAvailabilityStatus && emailAvailabilityMessages[emailAvailabilityStatus];

  const onSubmit: SubmitHandler<RegisterSchema> = async (fieldValues) => {
    const { firstName, lastName, email, password } = fieldValues;

    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const emailOnBlurHandler = async (e: FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && receivedEmail !== value) {
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && receivedEmail) {
      resetAvailability();
    }
  };

  return {
    error,
    errors,
    status,
    emailOnBlurHandler,
    onSubmit,
    emailAvailabilityMessage,
    register,
    handleSubmit,
    emailAvailabilityStatus,
  };
};

export default useRegister;
