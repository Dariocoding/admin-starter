import { useConfigApp } from "@/store";
import { configAppService } from "@teslo/services";
import * as React from "react";
import toast from "react-hot-toast";
import { CiImport } from "react-icons/ci";
import { VscJson } from "react-icons/vsc";
import { Spinner } from "react-rainbow-components";

interface IActionsFormProps {}

const ActionsForm: React.FunctionComponent<IActionsFormProps> = (props) => {
  const {} = props;
  const { colors, setColors } = useConfigApp();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await configAppService.update({ colorsAdmin: colors });
      toast.success("Colors updated");
    } catch (error) {
      console.log(error);
      toast.error("Error updating colors");
    } finally {
      setLoading(false);
    }
  };

  const exportsData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(colors))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "colors.json";
    link.click();
  };

  const importData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setColors(JSON.parse(e.target.result as string));
    };
  };

  return (
    <div className="mt-3">
      <button
        className="btn btn-primary w-full btn-sm"
        type="button"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? <Spinner /> : "Save changes"}
      </button>
      <div className="flex items-center">
        <button
          className="btn btn-outline-dark btn-xs w-1/2 gap-1"
          disabled={loading}
          onClick={exportsData}
        >
          Export as JSON <VscJson className="text-base" />
        </button>
        <input
          type="file"
          onChange={importData}
          className="hidden"
          id="file-json-input"
          accept="application/json"
        />
        <button
          className="btn btn-outline-success btn-xs w-1/2 gap-1"
          disabled={loading}
          onClick={() => document.getElementById("file-json-input").click()}
        >
          Import as JSON <CiImport className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default ActionsForm;
