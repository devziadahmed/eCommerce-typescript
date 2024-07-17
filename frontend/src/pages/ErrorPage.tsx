import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import useError from "@hooks/useError";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

const ErrorPage = () => {
  const renderErrorMessage = useError();

  return (
    <Container>
      <div className="d-flex flex-column align-items-center" style={{ marginTop: "15%" }}>
        <LottieHandler type="notFound" width={500} />

        <h3 style={{ fontSize: "22px" }}>{renderErrorMessage()}</h3>

        <Link to="/" replace>
          Looks like you've reached to non-existant page <br />
          How about going back to safety?
        </Link>
      </div>
    </Container>
  );
};

export default ErrorPage;
