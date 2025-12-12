/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { forgetPasswordAPI } from "@/services/auth/auth.service";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const ForgotPasswordForm = ({ redirect }: { redirect?: string }) => {


  const [state, formAction, isPending] = useActionState(
    forgetPasswordAPI,
    null
  );

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if(state && state.success){
      toast.success("Please check your email for password reset instructions");
    }

  }, [state]);

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            <InputFieldError field="email" state={state as any} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default ForgotPasswordForm;
