import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import useError from "@hooks/useError";

const ErrorPage = () => {
  const renderErrorMessage = useError();

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
