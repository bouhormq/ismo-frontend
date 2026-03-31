import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as zod from "zod";

import { changePassword } from "$/api/auth/change-password";
import Form from "$/components/form/Form";
import FormPasswordInput from "$/components/form/FormPasswordInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import useAuth from "$/hooks/contexts/useAuth";
import { getErrorMessage } from "$/utils/functions/misc.functions";

const changePasswordSchema = zod
  .object({
    currentPassword: zod
      .string()
      .min(1, "Mot de passe actuel est requis"),
    newPassword: zod
      .string()
      .min(1, "Nouveau mot de passe est requis"),
    confirmNewPassword: zod
      .string()
      .min(1, "Confirmation du nouveau mot de passe est requis"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmNewPassword"],
  });

type ChangePasswordFormData = zod.infer<typeof changePasswordSchema>;

const ProfilePage = () => {
  const { user } = useAuth();

  const {
    mutate: handleChangePassword,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Mot de passe modifié avec succès");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return (
    <PageHeaderLayout headerText="Profile">
      <Flexbox
        fullWidth
        className="rounded-[30px] bg-white p-8"
      >
        <Flexbox fullWidth className="mb-8 gap-2">
          <label className="px-2.5 text-xs text-[#6C757D]">
            Nom d&apos;utilisateur
          </label>
          <div className="w-full rounded-full bg-[#C4C4C4] px-4 py-2.5 text-sm text-white">
            {user?.username}
          </div>
        </Flexbox>

        <Form<ChangePasswordFormData>
          onSubmit={(data) => handleChangePassword(data)}
          resolverSchema={changePasswordSchema}
          className="flex w-full flex-col gap-5"
          isLoading={isPending}
        >
          <FormPasswordInput
            label="Mot de passe"
            name="currentPassword"
            placeholder="Mot de passe"
          />
          <FormPasswordInput
            label="Nouveau mot de passe"
            name="newPassword"
            placeholder="Nouveau mot de passe"
          />
          <FormPasswordInput
            label="Confirmation du Nouveau mot de passe"
            name="confirmNewPassword"
            placeholder="Confirmation du Nouveau mot de passe"
          />

          <Flexbox
            row
            fullWidth
            justify="end"
            className="mt-4 gap-4"
          >
            <Button
              variant="outlined"
              type="reset"
              className="w-fit rounded-full px-8 py-2.5"
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="w-fit rounded-full bg-blue-normal px-8 py-2.5 text-white"
              isLoading={isPending}
              isSuccess={isSuccess}
              isError={isError}
              withAnimation
            >
              Sauvegarder
            </Button>
          </Flexbox>
        </Form>
      </Flexbox>
    </PageHeaderLayout>
  );
};

export default ProfilePage;
