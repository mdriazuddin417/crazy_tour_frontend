"use client";

import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";

type LoginFormProps = {
  redirect?: string;
};

const LoginForm = ({ redirect }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const demoAccounts = {
    Admin: {
      email: "admin@gmail.com",
      password: "12345678",
    },
    Guide: {
      email: "guide@gmail.com",
      password: "123456",
    },
    Tourist: {
      email: "tourist@gmail.com",
      password: "123456",
    },
  };

  return (
    <form action={formAction} className="space-y-4">
      {redirect && (
        <input type="hidden" name="redirect" value={redirect} />
      )}

      <FieldGroup>
        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          <InputFieldError field="email" state={state} />
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <InputFieldError field="password" state={state} />
        </Field>
      </FieldGroup>

      {/* Demo Buttons */}
      <div className="flex justify-between gap-2">
        {Object.entries(demoAccounts).map(([role, creds]) => (
          <Button
            key={role}
            type="button"
            variant="outline"
            onClick={() =>
              setFormValues({
                email: creds.email,
                password: creds.password,
              })
            }
          >
            {role}
          </Button>
        ))}
      </div>

      {/* Submit */}
      <FieldGroup>
        <Field>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-teal-600 hover:underline">
              Sign up
            </a>
          </FieldDescription>

          <FieldDescription className="text-center">
            <a
              href="/forget-password"
              className="text-teal-600 hover:underline"
            >
              Forgot password?
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
