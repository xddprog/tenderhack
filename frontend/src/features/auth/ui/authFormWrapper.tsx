import React, { FC, PropsWithChildren } from "react";

interface IAuthFormWrapper {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AuthFormWrapper: FC<IAuthFormWrapper & PropsWithChildren> = ({
  children,
  onSubmit,
}) => {
  return (
    <form className="w-full space-y-5 pb-8" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
