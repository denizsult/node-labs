import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "../../api";
import { signUpSchema } from "../../validation-schemas";
import { RenderIf } from "@/components/render-if";
import { GoogleIcon, UnderlineIcon } from "@/components/icons";

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const { mutate: registerMutation, isPending: isRegistering } = useRegister({
    onSuccess: (response) => {
      if (response.data) {
        navigate("/sign-in");
      }
    },
    onError: (error) => {
      console.error("Sign up error:", error);
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    registerMutation(data);
  };

  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="font-semibold text-foreground text-3xl">
          Create new account
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Please enter your details
        </p>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-[5px]">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => {
                const error = form.formState.errors.fullName;
                return (
                  <Field data-invalid={!!error} className="flex flex-col gap-0">
                    <div className="flex items-start gap-2.5 pl-0 pr-2.5 py-2.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Full Name
                      </FieldLabel>
                    </div>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="John Doe"
                      aria-invalid={!!error}
                      className={`w-full h-auto px-5 py-4 rounded-[10px] border border-solid text-sm`}
                    />
                    <RenderIf condition={error}>
                      <FieldError errors={[error]} className="text-sm   mt-1" />
                    </RenderIf>
                  </Field>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const error = form.formState.errors.email;
                return (
                  <Field data-invalid={!!error} className="flex flex-col gap-0">
                    <div className="flex items-start gap-2.5 pl-0 pr-2.5 py-2.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Email
                      </FieldLabel>
                    </div>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="example@gmail.com"
                      aria-invalid={!!error}
                      className={`w-full h-auto px-5 py-4 rounded-[10px] border border-solid text-sm`}
                    />
                    <RenderIf condition={error}>
                      <FieldError errors={[error]} className="text-sm   mt-1" />
                    </RenderIf>
                  </Field>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const error = form.formState.errors.password;
                return (
                  <Field data-invalid={!!error} className="flex flex-col gap-0">
                    <div className="flex items-start gap-2.5 pl-0 pr-2.5 py-2.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </FieldLabel>
                    </div>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="********"
                      aria-invalid={!!error}
                      className={`w-full h-auto px-5 py-4 rounded-[10px] border border-solid text-sm`}
                    />
                    <RenderIf condition={error}>
                      <FieldError errors={[error]} className="text-sm   mt-1" />
                    </RenderIf>
                  </Field>
                );
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-[25px]">
            <div className="flex flex-col gap-[15px] w-full">
              <Button
                type="submit"
                loading={isRegistering}
                className="w-full h-auto text-text-1 cursor-pointer px-5 py-3.5 bg-primary rounded-[10px] text-sm font-semibold  text-center hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-auto cursor-pointer p-[13px] rounded-[10px] border border-solid border-neutral-100 text-sm font-semibold text-muted-foreground hover:bg-neutral-50 transition-colors"
              >
                <GoogleIcon className="w-6 h-6" />
                Sign up with google
              </Button>
            </div>

            <div className="relative flex flex-col items-end justify-center gap-2.5">
              <p className="font-normal text-sm leading-[14px]">
                <span className="text-muted-foreground">
                  Already have an account?
                </span>
                <span className="text-black">&nbsp;</span>

                <div className="relative inline-block">
                  <span
                    onClick={() => navigate("/sign-in")}
                    className="text-sm font-medium text-foreground cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    Sign in
                  </span>
                  <UnderlineIcon className="absolute  top-5  h-2" />
                </div>
              </p>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
