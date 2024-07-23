import { useState } from "react";
import axios from "axios";

export type EmailAvailabilityStatus =
  | "idle"
  | "checking"
  | "available"
  | "notAvailable"
  | "failed";

type Users = {
  email: string;
}[];

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<EmailAvailabilityStatus>();
  const [receivedEmail, setReceivedEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setReceivedEmail(email);
    setEmailAvailabilityStatus("checking");

    try {
      const res = await axios.get<Users>(`/users?email=${email}`);

      if (!res.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      console.error(error);
      setEmailAvailabilityStatus("failed");
    }
  };

  const resetAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setReceivedEmail(null);
  };

  return { emailAvailabilityStatus, receivedEmail, checkEmailAvailability, resetAvailability };
};

export default useCheckEmailAvailability;
