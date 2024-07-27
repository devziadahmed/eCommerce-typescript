import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Heading } from "@components/shared";
import Input from "@components/Form/Input/Input";
import PasswordWithVisibility from "@components/Form/PasswordWithVisibility/PasswordWithVisibility";
import useRegister from "@hooks/useRegister";

function Register() {
  const {
    error,
    errors,
    status,
    emailOnBlurHandler,
    onSubmit,
    emailAvailabilityMessage,
    register,
    handleSubmit,
    emailAvailabilityStatus,
  } = useRegister();

  return (
    <>
      <Heading title="User Register" />

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="firstName"
              label="First Name"
              register={register}
              error={errors.firstName?.message}
            />

            <Input
              name="lastName"
              label="Last Name"
              register={register}
              error={errors.lastName?.message}
            />

            <Input
              name="email"
              label="Email Address"
              register={register}
              error={
                errors.email?.message ||
                (emailAvailabilityStatus !== "available" &&
                emailAvailabilityStatus !== "checking"
                  ? emailAvailabilityMessage
                  : "")
              }
              success={emailAvailabilityStatus === "available" ? emailAvailabilityMessage : ""}
              formText={emailAvailabilityStatus === "checking" ? emailAvailabilityMessage : ""}
              disabled={emailAvailabilityStatus === "checking"}
              onBlur={emailOnBlurHandler}
            />

            <PasswordWithVisibility
              name="password"
              label="Password"
              register={register}
              error={errors.password?.message}
            />

            <PasswordWithVisibility
              name="confirmPassword"
              label="Confirm Password"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={emailAvailabilityStatus === "checking" || status === "pending"}
            >
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
}

export default Register;
