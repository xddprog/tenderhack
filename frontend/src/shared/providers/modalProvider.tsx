"use client";
import { viewerSelectors } from "@/entities/viewer/model/store/viewerSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { uniqueModal } from "../libs/modalVariables";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const type = useAppSelector(viewerSelectors.selectType);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!type) return null;

  return uniqueModal[type];
};

export default ModalProvider;
