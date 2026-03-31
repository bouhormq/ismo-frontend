import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { forgotPassword } from "$/api/auth/forgot-password";
import { loginUser } from "$/api/auth/login";
import Form from "$/components/form/Form";
import FormPasswordInput from "$/components/form/FormPasswordInput";
import FormTextInput from "$/components/form/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import useAuth from "$/hooks/contexts/useAuth";
import { PATHS } from "$/routes/constants";
import { QueryError } from "$/types/api/restApiClient.types";
import { getFrenchDateInfo } from "$/utils/functions/misc.functions";

import {
  DataLogin,
  LoginDataType,
  loginSchema,
} from "../constants/validations.constants";

const LoginForm = () => {
  const navigate = useNavigate();
  const { invalidateUser } = useAuth();
  const [forgotUsername, setForgotUsername] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const { mutate: login, isPending } = useMutation<
    DataLogin,
    QueryError,
    LoginDataType
  >({
    mutationFn: loginUser,
    onSuccess: () => {
      invalidateUser();
      navigate(PATHS.DASHBOARD);
    },
    onError: () => {
      toast.error(
        "Votre nom d'utilisateur ou votre mot de passe sont incorrects",
      );
    },
  });

  const { mutate: sendForgot, isPending: isForgotPending } = useMutation({
    mutationFn: (username: string) => forgotPassword(username),
    onSuccess: () => {
      toast.success("Un email a été envoyé à l'administrateur.");
      setShowForgot(false);
      setForgotUsername("");
    },
    onError: () => {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    },
  });

  const { year, month, dayNumber } = getFrenchDateInfo();
  return (
    <Flexbox
      fullWidth
      fullHeight
      justify="center"
      align="center"
      className="tabletScreen:py-10 mobileScreen:py-5"
    >
      <Form<LoginDataType>
        onSubmit={(data) => login(data)}
        resolverSchema={loginSchema}
        className="flex w-[60%] flex-col gap-16 tabletScreen:w-[90%]"
        isLoading={isPending}
      >
        <Flexbox fullWidth>
          <h5 className="w-full text-4xl font-bold tabletScreen:text-center tabletScreen:text-3xl">
            {dayNumber} {month} {year}
          </h5>
        </Flexbox>
        <Flexbox fullWidth className="gap-5">
          <p className="text-base font-semibold text-blue-normal">
            Bienvenue ISMO
          </p>
          <FormTextInput
            label="Nom d'utilisateur"
            name="username"
            wrapperClassName="min-w-[unset]"
            placeholder="Nom d'utilisateur"
          />
          <FormPasswordInput
            label="Mot de passe"
            name="password"
            placeholder="Mot de passe"
          />
          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="self-end text-sm text-blue-normal underline hover:opacity-80"
          >
            Mot de passe oublié ?
          </button>
          <Button
            variant="primary"
            type="submit"
            className="mx-auto w-fit rounded-[100px] bg-blue-normal px-6 py-[11px] font-normal text-white"
            isLoading={isPending}
            disabled={isPending}
          >
            Se connecter{" "}
          </Button>
        </Flexbox>
      </Form>

      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-[400px] flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-blue-normal">
              Mot de passe oublié
            </h3>
            <p className="text-sm text-gray-600">
              Entrez votre nom d&apos;utilisateur et un email sera envoyé à
              l&apos;administrateur pour réinitialiser votre mot de passe.
            </p>
            <input
              type="text"
              value={forgotUsername}
              onChange={(e) => setForgotUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-normal"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForgot(false);
                  setForgotUsername("");
                }}
                className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  if (forgotUsername.trim()) {
                    sendForgot(forgotUsername.trim());
                  }
                }}
                disabled={!forgotUsername.trim() || isForgotPending}
                className="rounded-lg bg-blue-normal px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50"
              >
                {isForgotPending ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Flexbox>
  );
};

export default LoginForm;
