import { Auth } from "aws-amplify";

export const fetchUser = async () => {
  const userInfo = await Auth.currentAuthenticatedUser();
  if (!userInfo) {
    return null;
  }
  const userId = userInfo.attributes.sub;
  return userId;
};
