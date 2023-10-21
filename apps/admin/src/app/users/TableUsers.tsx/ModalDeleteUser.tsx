import ConfirmModal from "@/components/ui/Modal/ConfirmModal";
import { User } from "@teslo/interfaces";
import * as React from "react";
import { translate } from "@/i18n";

interface IModalDeleteUserProps {
  showModalDeleteUser: boolean;
  user?: User;
  onCloseModalDelete: () => void;
  onAcceptDeleteUser: () => void;
  isLoading: boolean;
}

const ModalDeleteUser: React.FunctionComponent<IModalDeleteUserProps> = (props) => {
  const { user, showModalDeleteUser, onAcceptDeleteUser, onCloseModalDelete, isLoading } = props;

  return (
    <ConfirmModal
      title={translate("users.delete.youSure", { name: `${user?.firstName} ${user?.lastName}` })}
      titleModal={translate("users.delete")}
      subTitle={translate("users.delete.youWillNotBeAbleToRecover")}
      showModal={showModalDeleteUser}
      onClose={onCloseModalDelete}
      onClickButtonAccept={onAcceptDeleteUser}
      buttonAccepText={translate("users.delete")}
      isLoading={isLoading}
      buttonCancelText={translate("app.cancel")}
    />
  );
};

export default ModalDeleteUser;
