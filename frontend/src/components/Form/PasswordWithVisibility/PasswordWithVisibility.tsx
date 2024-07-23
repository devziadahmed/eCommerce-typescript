import { useState } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import styles from "./styles.module.css";

const { passwordLabel } = styles;

type PasswordFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error: string | undefined;
};

const PasswordWithVisibility = <T extends FieldValues>({
  name,
  label,
  register,
  error,
}: PasswordFieldProps<T>) => {
  const [visibility, setVisibility] = useState("password");

  const handleClick = () => setVisibility(visibility === "password" ? "text" : "password");

  return (
    <Form.Group className="mb-3" controlId={name}>
      <div className={passwordLabel}>
        <Form.Label>{label}</Form.Label>

        <button type="button" onClick={handleClick}>
          {visibility === "password" ? (
            <EyeOff width={20} height={20} strokeWidth={1.5} />
          ) : (
            <Eye width={20} height={20} strokeWidth={1.5} />
          )}
        </button>
      </div>

      <Form.Control type={visibility} {...register(name)} isInvalid={!!error} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default PasswordWithVisibility;
