import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginSchema } from "@validations/login";

import { Heading } from "@components/shared";
import PasswordWithVisibility from "@components/Form/PasswordWithVisibility/PasswordWithVisibility";
import Input from "@components/Form/Input/Input";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginSchema> = (fieldValues) => {
    console.log(fieldValues);
  };

  return (
    <>
      <Heading title="User Login" />

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
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
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
