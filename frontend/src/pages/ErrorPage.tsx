import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "react-bootstrap";

const ErrorPage = () => {
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

  return (
    <Container className="not-found">
      {renderErrorMessage()}

      <Link to="/" replace>
        Looks like you've reached to non-existant page <br />
        How about going back to safety?
      </Link>
    </Container>
  );
};

export default ErrorPage;
