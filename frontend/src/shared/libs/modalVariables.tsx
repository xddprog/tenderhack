import { AuthModalConfirmation } from "@/features/auth/ui/authModalConfirmation";
import { JSX } from "react";

export const enum EModalVariables {
  CONFIRMATION = "CONFIRMATION",
}

export const uniqueModal: Record<EModalVariables, JSX.Element> = {
  [EModalVariables.CONFIRMATION]: <AuthModalConfirmation />,
};
