import { Heading } from "@components/shared";
import { useAppSelector } from "@store/hooks";

const Account = () => {
  const accountInfo = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Heading title="Account Info" />

      <ul>
        <li>{accountInfo?.firstName}</li>
        <li>{accountInfo?.lastName}</li>
        <li>{accountInfo?.email}</li>
      </ul>
    </>
  );
};

export default Account;
