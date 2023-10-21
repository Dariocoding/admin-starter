import { hideLoader, showLoader } from "@/components/ui/Loader";
import { axiosClient } from "@teslo/services";
import * as React from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

interface IDeveloperOptionsModalProps {}

const DeveloperOptionsModal: React.FC<IDeveloperOptionsModalProps> = (props) => {
  const {} = props;

  const onHandleResetApp = async () => {
    const swal = await Swal.fire({
      title: "You are going to delete all data app. Are you sure about this decision?",
      text: "Please, be careful bro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (swal.isConfirmed) {
      try {
        showLoader();
        await axiosClient.get("/seed/resetApp");
        Swal.fire("You already deleted all app data", "", "success");
      } catch (error) {
        console.log(error);
        toast.error("Ha ocurrido un error");
      } finally {
        hideLoader();
      }
    }
  };

  return (
    <div>
      <button type="button" className="btn btn-danger btn-sm" onClick={onHandleResetApp}>
        Reset App
      </button>
    </div>
  );
};

export default DeveloperOptionsModal;
