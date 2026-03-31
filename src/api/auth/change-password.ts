import { restApiClient } from "../../utils/clients/restApiClient";

type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const changePassword = async (data: ChangePasswordData) => {
  return restApiClient.url("/auth/change-password").post(data);
};
