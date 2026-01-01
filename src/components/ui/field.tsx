"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn("space-y-6", className)}
    {...props}
  />
))
FieldSet.displayName = "FieldSet"

const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement> & {
    variant?: "legend" | "label"
  }
>(({ className, variant = "legend", ...props }, ref) => (
  <legend
    ref={ref}
    className={cn(
      variant === "label" && "text-sm font-medium leading-none",
      variant === "legend" && "text-base font-semibold",
      className
    )}
    {...props}
  />
))
FieldLegend.displayName = "FieldLegend"

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-6", className)}
    {...props}
  />
))
FieldGroup.displayName = "FieldGroup"

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "vertical" | "horizontal" | "responsive"
    "data-invalid"?: boolean
  }
>(({ className, orientation = "vertical", "data-invalid": invalid, ...props }, ref) => {
  const orientationClasses = {
    vertical: "flex flex-col gap-2",
    horizontal: "flex flex-row items-center gap-4",
    responsive: "@container/field-group flex flex-col gap-2 @md/field-group:flex-row @md/field-group:items-center",
  }

  return (
    <div
      ref={ref}
      role="group"
      data-invalid={invalid ? "" : undefined}
      className={cn(
        orientationClasses[orientation],
        invalid && "data-[invalid]:text-destructive",
        className
      )}
      {...props}
    />
  )
})
Field.displayName = "Field"

const FieldContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
))
FieldContent.displayName = "FieldContent"

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    asChild?: boolean
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : Label
  return (
    <Comp
      ref={ref}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
})
FieldLabel.displayName = "FieldLabel"

const FieldTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
))
FieldTitle.displayName = "FieldTitle"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground [text-wrap:balance]",
      className
    )}
    {...props}
  />
))
FieldDescription.displayName = "FieldDescription"

const FieldError = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    errors?: Array<{ message?: string } | undefined>
  }
>(({ className, errors, children, ...props }, ref) => {
  if (!errors && !children) {
    return null
  }

  const errorMessages = errors
    ? errors.filter(Boolean).map((err) => err?.message).filter(Boolean)
    : []

  if (errorMessages.length === 0 && !children) {
    return null
  }

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {errorMessages.length > 0 ? (
        <ul className="flex flex-col gap-1 ">
          {errorMessages.map((msg, i) => (
            <li className="text-destructive" key={i}>{msg}</li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  )
})
FieldError.displayName = "FieldError"

const FieldSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn("my-1", className)}
    {...props}
  />
))
FieldSeparator.displayName = "FieldSeparator"

export {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldError,
  FieldSeparator,
}

