import { viewerSelectors } from "@/entities/viewer/model/store/viewerSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { AuthForm } from "./authForm";
import { ELocalStorageKeys } from "@/shared/libs/localStorageKeys";
import { useCallback } from "react";

export const AuthModalConfirmation = () => {
  const isOpen = useAppSelector(viewerSelectors.isOpen);
  const { setClose } = useActions();

  const handlePermanentAuth = useCallback(() => {
    localStorage.setItem(ELocalStorageKeys.PERMANENT_AUTH, "true");
    setClose(false);
  }, []);

  const handleOnClose = (value: boolean) => {
    setClose(value);
    handlePermanentAuth();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent
        style={{ borderRadius: "20px" }}
        className="bg-zinc-900 text-white border outline-none ring-0 border-zinc-800 rounded-2xl shadow-2xl mx-auto overflow-hidden space-y-2"
      >
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Привет!
          </DialogTitle>
          <DialogDescription className="text-center text-xs md:text-base text-zinc-500">
            Войдите или зарегестрируйтесь, чтобы получать более умные ответы и
            многое другое
          </DialogDescription>
        </DialogHeader>
        <AuthForm handlePermanent={handlePermanentAuth} />
      </DialogContent>
    </Dialog>
  );
};
