import ProfileLayout from "@/layouts/ProfileLayout";
import { useAuthStore } from "@/store";
import { UserDto } from "@teslo/interfaces";
import { usersService } from "@teslo/services";
import * as React from "react";
import toast from "react-hot-toast";

interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const {} = props;
  const { user, initAuthenticate, accessToken } = useAuthStore();

  async function onSubmitUpdateUser(user: UserDto) {
    try {
      if (!user.password?.trim()) delete user.password;
      const req = await usersService.updateProfileUser(user);
      initAuthenticate({ token: accessToken, user: req.data });
      toast.success("User updated successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error updating user profile");
    }
  }

  return (
    <div className="p-4">
      <ProfileLayout user={user} onSubmitUpdateUser={onSubmitUpdateUser} />
    </div>
  );
};

export default React.memo(ProfilePage);
