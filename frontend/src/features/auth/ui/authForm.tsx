import { Button } from "@/shared/ui/button/button";
import React, { FC } from "react";

export const AuthForm = () => {
  return (
    <div className="flex px-8 w-full cursor-pointer flex-col space-y-2 items-center justify-center">
      <Button variant={"secondary"} className="w-full rounded-xl py-5">
        Войти
      </Button>
      <Button className="border cursor-pointer border-zinc-500 w-full rounded-xl py-5">
        Зарегестрироваться
      </Button>
      <button className="underline cursor-pointer">Не входить</button>
    </div>
  );
};
