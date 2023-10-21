import AuthorityCheck from "@/components/AuthorityCheck";
import RenderIf from "@/components/ui/RenderIf";
import { Tab, Tabs } from "@/components/ui/Tabs";
import { getMaximiumRol } from "@/utils/getMaximiumRol";
import { User, UserDto, ValidRol } from "@teslo/interfaces";
import * as React from "react";
import BackgroundProfileLayout from "./Background";
import FormProfileUser from "./FormProfileUser";

interface IProfileLayoutProps {
  user: Partial<User>;
  validRolesActions?: ValidRol[] | "*";
  canUseActions?: boolean;
  onSubmitUpdateUser(user: UserDto): Promise<void>;
  extraInitialValuesFormUpdate?: UserDto;
  extraInputsFormFormUpdate?: React.ReactNode;
}

const ProfileLayout: React.FunctionComponent<IProfileLayoutProps> = (props) => {
  const {
    user,
    onSubmitUpdateUser,
    validRolesActions = "*",
    canUseActions = true,
    extraInitialValuesFormUpdate,
    extraInputsFormFormUpdate,
  } = props;
  const [selected, setSelected] = React.useState("profile-data");

  return (
    <div>
      <BackgroundProfileLayout user={user} />
      <section className="relative bg-blueGray-200 -mt-[24rem]">
        <div className="max-w-xl mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <img
                    alt="..."
                    src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                    className="shadow-xl rounded-full h-32 align-middle border-none -m-16 -ml-20 lg:-ml-16 w-32"
                  />
                  {/* 
									<BiUser className="shadow-xl p-3 bg-white rounded-full h-24 align-middle border-none -m-16 w-24" /> */}
                </div>
              </div>
              <div className="text-center mt-14">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                  {user?.firstName} {user?.lastName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                  {getMaximiumRol(user?.roles)}
                </div>
              </div>
              <RenderIf isTrue={canUseActions}>
                <AuthorityCheck validRoles={validRolesActions}>
                  <div className="pt-4 pb-4 border-t border-blueGray-200 text-center">
                    <Tabs className="mb-6" selectedValue={selected} setSelectedValue={setSelected}>
                      <Tab value={"profile-data"}>Profile data</Tab>
                      {/* 				<Tab
												value={
													'profile-image'
												}
											>
												Profile
												Image
											</Tab> */}
                    </Tabs>

                    <RenderIf isTrue={selected === "profile-data"}>
                      <FormProfileUser
                        user={user}
                        onSubmitUpdateUser={onSubmitUpdateUser}
                        extraInitialValues={extraInitialValuesFormUpdate}
                        extraInputsForm={extraInputsFormFormUpdate}
                      />
                    </RenderIf>
                  </div>
                </AuthorityCheck>
              </RenderIf>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileLayout;
