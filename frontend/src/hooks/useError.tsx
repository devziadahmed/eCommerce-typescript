import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const useError = () => {
  const error = useRouteError();

  const renderErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      return (
        <>
          <h1>{error.status}</h1>
          <p>{error.statusText}</p>
        </>
      );
    }

    if (error instanceof Error) {
      return <h1>{error.message}</h1>;
    }

    if (typeof error === "string") {
      return <h1>{error}</h1>;
    }

    if (typeof error === "number") {
      return (
        <>
          <h1>{error}</h1>
          <p>Something went wrong!</p>
        </>
      );
    }

    return <h1>Something went wrong!</h1>;
  };

  return renderErrorMessage;
};

export default useError;
