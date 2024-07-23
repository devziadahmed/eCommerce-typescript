import { FocusEvent } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema, registerSchema } from "@validations/register";

import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

import { Heading } from "@components/shared";
import Input from "@components/Form/Input/Input";
import PasswordWithVisibility from "@components/Form/PasswordWithVisibility/PasswordWithVisibility";

const emailAvailabilityMessages = {
  idle: "",
  checking:
    "We're currently checking the availability of this email address. Please wait a moment.",
  available: "This email address is available for use",
  notAvailable: "This email address already exists",
  failed: "Something went wrong",
};

function Register() {
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

  const onSubmit: SubmitHandler<RegisterSchema> = (fieldValues) => {
    console.log(fieldValues);
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

            <Button variant="info" type="submit" style={{ color: "white" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
