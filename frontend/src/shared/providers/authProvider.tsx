"use client";

import { useEffect } from "react";
import { ELocalStorageKeys } from "../libs/localStorageKeys";
import { getAccessToken } from "@/entities/token/libs/tokenService";
import { useActions } from "../hooks/useActions";
import { EModalVariables } from "../libs/modalVariables";

export const AuthProvider = () => {
  const { setOpen, getCurrentUser } = useActions();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPermanent =
      localStorage.getItem(ELocalStorageKeys.PERMANENT_AUTH) ?? "";
    const accessToken = getAccessToken();
    if (!checkPermanent && !accessToken) {
      setOpen({ type: EModalVariables.CONFIRMATION, isOpen: true });
    } else {
      getCurrentUser();
    }
  }, []);

  return null;
};
