import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useLogin } from "../../api";
import { signInSchema } from "../../validation-schemas";
import { RenderIf } from "@/components/render-if";
import { GoogleIcon, UnderlineIcon } from "@/components/icons";

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutation, isPending: isLoggingIn } = useLogin({
    onSuccess: (response) => {
      if (response.data) {
        setUser(response.data.user);
        setToken(response.data.accessToken);
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Sign in error:", error);
    },
  });

  const onSubmit = (data: SignInFormData) => {
    loginMutation(data);
  };

  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="font-semibold text-foreground text-3xl">Sign In</h1>
        <p className="text-sm text-text-3">
          Welcome back! Please enter your details
        </p>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[25px]"
        >
          <div className="flex flex-col gap-5">
            <FieldGroup className="flex flex-col gap-[5px]">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-0"
                  >
                    <div className="flex items-start gap-2.5 pl-0 pr-2.5 py-2.5">
                      <FieldLabel
                        htmlFor="sign-in-email"
                        className="text-sm font-medium text-colortext-1"
                      >
                        Email
                      </FieldLabel>
                    </div>

                    <Input
                      {...field}
                      id="sign-in-email"
                      type="email"
                      placeholder="example@gmail.com"
                      aria-invalid={fieldState.invalid}
                      className="w-full h-auto px-5 py-4 rounded-[10px] border border-solid border-[#f2f2f2] text-sm text-colortext-3"
                    />
                    <RenderIf condition={fieldState.invalid}>
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-sm  mt-1"
                      />
                    </RenderIf>
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-0"
                  >
                    <div className="flex items-start gap-2.5 pl-0 pr-2.5 py-2.5">
                      <Label
                        htmlFor="sign-in-password"
                        className="text-sm font-medium text-colortext-1"
                      >
                        Password
                      </Label>
                    </div>

                    <div className="relative w-full">
                      <Input
                        {...field}
                        id="sign-in-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        className="w-full h-auto px-5 py-4 pr-12 rounded-[10px] border border-solid border-[#f2f2f2] text-sm text-colortext-3"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-colortext-3 hover:text-colortext-1 transition-colors"
                      >
                        <RenderIf condition={showPassword}>
                          <EyeOff className="w-5 h-5" />
                        </RenderIf>
                        <RenderIf condition={!showPassword}>
                          <Eye className="w-5 h-5" />
                        </RenderIf>
                      </button>
                    </div>
                    <RenderIf condition={fieldState.invalid}>
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-sm  mt-1"
                      />
                    </RenderIf>
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          <div className="flex flex-col items-center gap-[25px]">
            <div className="flex flex-col gap-[15px] w-full">
              <Button
                type="submit"
                loading={isLoggingIn}
                className="w-full h-auto px-5 py-3.5 bg-primary rounded-[10px] text-base font-semibold text-colortext-1 text-center hover:bg-primary-color/90 transition-colors"
              >
                Sign In
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-auto p-[13px] rounded-[10px] border border-solid border-neutral-100 text-base font-semibold text-colortext-3 hover:bg-neutral-50 transition-colors"
              >
                <GoogleIcon className="w-6 h-6" />
                Sign in with google
              </Button>
            </div>

            <div className="relative flex flex-col items-end justify-center gap-2.5">
              <p className="font-normal text-sm leading-[14px]">
                <span className="text-[#929eae]">
                  Don&apos;t have an account?
                </span>
                <span className="text-black">&nbsp;</span>
                <span
                  onClick={() => navigate("/sign-up")}
                  className="text-sm font-medium text-[#1b212d] cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Sign up
                </span>
              </p>

              <UnderlineIcon className="absolute top-[22px] left-[157px] w-[45px] h-2" />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
