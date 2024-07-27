import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Heading } from "@components/shared";
import PasswordWithVisibility from "@components/Form/PasswordWithVisibility/PasswordWithVisibility";
import Input from "@components/Form/Input/Input";

import useLogin from "@hooks/useLogin";

const Login = () => {
  const {
    error,
    status,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isAccountCreated,
    isLoginRequired,
    unlockedPage,
  } = useLogin();

  return (
    <>
      <Heading title="User Login" />

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {isAccountCreated && (
            <Alert variant="success">
              Your account is successfully created, Please login to start shopping
            </Alert>
          )}

          {isLoginRequired && (
            <Alert variant="danger">
              {unlockedPage ? (
                <>
                  Login is required to enter{" "}
                  <span className="text-capitalize">{unlockedPage?.replaceAll("/", "")}</span>{" "}
                  page
                </>
              ) : (
                "Login is required to do this action"
              )}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              label="Email Address"
              register={register}
              error={errors.email?.message}
            />

            <PasswordWithVisibility
              name="password"
              label="Password"
              register={register}
              error={errors.password?.message}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              {status === "pending" ? (
                <>
                  Loading <Spinner animation="border" size="sm" />
                </>
              ) : (
                "Submit"
              )}
            </Button>

            {error && <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
