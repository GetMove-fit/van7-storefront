"use client";

import { Button } from "@medusajs/ui";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
  isLoading = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "danger" | null;
  className?: string;
  "data-testid"?: string;
  isLoading?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="large"
      className={className}
      type="submit"
      isLoading={isLoading || pending}
      variant={variant || "primary"}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  );
}
