import { FocusEvent } from "react";
import { Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

// Input.tsx

type InputProps<T extends FieldValues> = {
  type?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  error: string | undefined;
  success?: string | boolean;
  formText?: string;
  disabled?: boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

const Input = <T extends FieldValues>({
  type = "text",
  name,
  register,
  label,
  error,
  success,
  formText,
  disabled,
  onBlur,
}: InputProps<T>) => {
  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        onBlur={onBlurHandler}
        isInvalid={error ? true : false}
        isValid={success ? true : false}
        disabled={disabled}
      />

      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      {success && <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>}
      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  );
};

export default Input;
