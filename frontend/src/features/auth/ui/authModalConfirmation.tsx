import { viewerSelectors } from "@/entities/viewer/model/store/viewerSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { AuthForm } from "./authForm";

export const AuthModalConfirmation = () => {
  const isOpen = useAppSelector(viewerSelectors.isOpen);
  const { setClose } = useActions();

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-xl shadow-2xl mx-auto overflow-hidden space-y-2">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Привет!
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Войдите или зарегестрируйтесь, чтобы получать более умные ответы и
            многое другое
          </DialogDescription>
        </DialogHeader>
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
};
