import { useActions } from "@/shared/hooks/useActions";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { FC, useState } from "react";
import { useRegisterMutate } from "../hooks/useRegisterMutate";
import { useLoginMutate } from "../hooks/useLoginMutate";
import { AuthFormWrapper } from "./authFormWrapper";
import { CircleAlert } from "lucide-react";
import clsx from "clsx";
import { ELocalStorageKeys } from "@/shared/libs/localStorageKeys";

type AuthType = "confirm" | "auth" | "register";

interface IAuthForm {
  handlePermanent: () => void;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const AuthForm: FC<IAuthForm> = ({ handlePermanent }) => {
  const [authType, setAuthType] = useState<AuthType>("confirm");
  const [errors, setErrors] = useState<FormErrors>({});
  const { setClose } = useActions();

  const { mutate: registerMutate, isRegisterPending } = useRegisterMutate();
  const { mutate: loginMutate, isLoginPending } = useLoginMutate();

  const handleSelectAuthType = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAuthType(event.currentTarget.value as AuthType);
    setErrors({});
  };

  const validateForm = (email: string, password: string): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!password) {
      newErrors.password = "Пароль обязателен";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleAuthType = () => {
    setAuthType((prev) => (prev === "auth" ? "register" : "auth"));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password")).trim();

    if (!validateForm(email, password)) return;

    const requestData = { email, password };

    try {
      if (authType === "auth") {
        loginMutate(requestData, {
          onError: (error) => {
            setErrors({
              general:
                error.message ||
                "Ошибка при входе. Проверьте данные и попробуйте снова",
            });
          },
          onSuccess: () => setClose(false),
        });
      }

      if (authType === "register") {
        registerMutate(requestData, {
          onError: (error) => {
            setErrors({
              general:
                error.message ||
                "Ошибка при регистрации. Возможно, email уже занят",
            });
          },
          onSuccess: () => setClose(false),
        });
      }
      localStorage.removeItem(ELocalStorageKeys.PERMANENT_AUTH);
    } catch (error) {
      setErrors({
        general: "Произошла непредвиденная ошибка",
      });
    }
  };

  return (
    <div
      className={clsx(
        "flex px-8 w-full cursor-pointer flex-col items-center justify-center",
        authType === "confirm" ? "space-y-2" : "space-y-4"
      )}
    >
      {authType === "confirm" && (
        <>
          <Button
            variant={"ghost"}
            value={"auth"}
            className="w-full rounded-xl py-5 bg-white text-black hover:bg-white transition-colors"
            onClick={handleSelectAuthType}
          >
            Войти
          </Button>
          <Button
            value={"register"}
            className="border cursor-pointer border-zinc-500 w-full rounded-xl py-5 hover:bg-zinc-100/10 transition-colors"
            onClick={handleSelectAuthType}
          >
            Зарегистрироваться
          </Button>
        </>
      )}

      {(authType === "auth" || authType === "register") && (
        <AuthFormWrapper onSubmit={onSubmit}>
          <section className="space-y-3">
            <div className="w-full space-y-1">
              <Input
                name="email"
                className={`rounded-xl ${
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                }`}
                placeholder="Email"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="flex items-center text-sm text-red-500">
                  <CircleAlert className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="w-full space-y-1">
              <Input
                name="password"
                type="password"
                className={`rounded-xl ${
                  errors.password ? "border-red-500 focus:ring-red-500" : ""
                }`}
                placeholder="Пароль"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="flex items-center text-sm text-red-500">
                  <CircleAlert className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {errors.general && (
              <div className="w-full p-3 bg-red-500/10 text-red-500 rounded-lg text-sm flex items-center">
                <CircleAlert className="h-5 w-5 mr-2" />
                {errors.general}
              </div>
            )}
          </section>

          <Button
            disabled={authType === "auth" ? isLoginPending : isRegisterPending}
            type="submit"
            variant={"ghost"}
            className="w-full  bg-white text-black hover:bg-white/70 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {authType === "auth" ? "Войти" : "Зарегистрироваться"}
          </Button>
          <p className="text-center md:text-base text-xs">
            Или{" "}
            <button
              type="button"
              className="text-blue-400 cursor-pointer"
              onClick={handleToggleAuthType}
            >
              {authType === "auth" ? "зарегистрируйтесь" : "войдите"}
            </button>{" "}
            для продолжения
          </p>
        </AuthFormWrapper>
      )}

      {authType === "confirm" && (
        <button
          className="underline cursor-pointer py-3 text-zinc-400 hover:text-white transition-colors"
          onClick={handlePermanent}
        >
          Не входить
        </button>
      )}
    </div>
  );
};
