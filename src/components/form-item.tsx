import { type ReactNode } from "react";
import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RenderIf } from "@/components/render-if";
import { cn } from "@/lib/utils";

type FormItemProps = {
  label: string;
  htmlFor: string;
  error?: string;
  inputProps?: InputProps;
  children?: ReactNode;
  placeholder?: string;
};

export const FormItem = ({
  label,
  htmlFor,
  error,
  inputProps,
  children,
  placeholder,
}: FormItemProps) => {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-start gap-2.5 pl-0 pr-2.5 py-2.5">
        <Label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </Label>
      </div>

      {children || (
        <Input
          id={htmlFor}
          {...inputProps}
          placeholder={placeholder}
          className={cn(
            "w-full h-auto px-5 py-4 rounded-[10px] border border-solid text-sm",
            error
              ? "border-red-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              : "border-[#f2f2f2]  ",
            inputProps?.className
          )}
        />
      )}

      <RenderIf condition={error}>
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </RenderIf>
    </div>
  );
};
