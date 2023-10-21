import { Drawer } from "@/components/ui";
import { translate } from "@/i18n";
import { capitalize, validPaths } from "@/utils";
import { User, ValidRoles } from "@teslo/interfaces";
import * as React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import FormUser from "../forms/FormUser";
import { useAuthStore, useConfigApp } from "@/store";
import { RenderIf } from "react-rainbow-components";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { usersService } from "@teslo/services";
import ModalDeleteUser from "../TableUsers.tsx/ModalDeleteUser";

interface ICustomerProfileProps {
  user: User;
  setUser(user: User): void;
}

const CustomerProfile: React.FunctionComponent<ICustomerProfileProps> = (props) => {
  const { user, setUser } = props;
  const navigate = useNavigate();
  const { colors } = useConfigApp();
  const { formatMessage: t } = useIntl();
  const { user: authUser } = useAuthStore();
  const [showDrawerEdit, setShowDrawerEdit] = React.useState(false);
  const [showDeleteUser, setShowDeleteUser] = React.useState(false);
  const [isLoadingDeleteUser, setIsLoadingDeleteUser] = React.useState(false);
  const canUseActions =
    ((user.iduser !== authUser.iduser &&
      (((user?.roles.includes(ValidRoles.SUPER_USER) || user?.roles.includes(ValidRoles.ADMIN)) &&
        authUser?.roles?.includes(ValidRoles.SUPER_USER)) ||
        user?.roles.includes(ValidRoles.ADMIN))) ||
      user?.roles.includes(ValidRoles.USER)) &&
    !user?.roles.includes(ValidRoles.SUPER_USER);

  const renderRoles = authUser?.roles?.some(
    (role) => role === ValidRoles.ADMIN || role === ValidRoles.SUPER_USER
  );

  const onAcceptDeleteUser = async () => {
    try {
      setIsLoadingDeleteUser(true);
      await usersService.deleteUser(user.iduser);
      navigate(validPaths.users.path);
      setShowDeleteUser(false);
      Swal.fire(t({ id: "users.deleted.success" }), "", "success");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || t({ id: "users.deleted.error" }));
    } finally {
      setIsLoadingDeleteUser(false);
    }
  };

  return (
    <React.Fragment>
      <div className="tile">
        <div className="flex flex-col xl:flex-row gap-4">
          <div>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
              <div className="flex xl:flex-col items-center gap-4">
                <img
                  alt="..."
                  src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                  className="shadow-xl rounded-full h-12 align-middle border-none w-12"
                />
                <h6 className="font-bold">
                  {capitalize(user?.firstName) + " " + capitalize(user?.lastName)}
                </h6>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-2 gap-x-4 mt-8">
                <CustomerInfoField title="ID" value={user?.iduser} />

                <CustomerInfoField title="Email" value={user?.email} />
                <CustomerInfoField title="Phone" value={user?.phone} />
              </div>
              <RenderIf isTrue={canUseActions}>
                <div className="mt-4 flex flex-col xl:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteUser(true)}
                    className="btn btn-outline-danger btn-sm w-full gap-1 mb-0"
                  >
                    {translate("app.delete")} <FaTrashAlt />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDrawerEdit(true)}
                    className="btn btn-primary btn-sm w-full gap-1 mb-0"
                  >
                    {translate("app.edit")} <FaPencilAlt />
                  </button>
                </div>
              </RenderIf>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title={<span className="text-lg font-bold">{translate("users.edit")}</span>}
        width={290}
        onClose={() => setShowDrawerEdit(false)}
        isOpen={showDrawerEdit}
      >
        <FormUser
          user={user}
          renderRoles={renderRoles}
          onSuccess={(user) => {
            setShowDrawerEdit(false);
            setUser(user);
          }}
        />
      </Drawer>

      <ModalDeleteUser
        isLoading={isLoadingDeleteUser}
        user={user}
        showModalDeleteUser={showDeleteUser}
        onAcceptDeleteUser={onAcceptDeleteUser}
        onCloseModalDelete={() => setShowDeleteUser(false)}
      />
    </React.Fragment>
  );
};

export default CustomerProfile;
interface ICustomerInfoFieldProps {
  title: string;
  value?: React.ReactNode;
}

const CustomerInfoField: React.FunctionComponent<ICustomerInfoFieldProps> = (props) => {
  const { title, value } = props;
  return (
    <div>
      <span className="font-bold">{title}</span>
      <p className="text-gray-700 dark:text-gray-200 font-semibold text-sm">{value}</p>
    </div>
  );
};
