import { translate } from "@/i18n";
import Alert from "@/components/ui/Alert";
import RenderIf from "@/components/ui/RenderIf";
import * as React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface IRenderMessageProps {
  loading: boolean;
  message: string;
}

const RenderMessage: React.FunctionComponent<IRenderMessageProps> = (props) => {
  const { loading, message } = props;
  return (
    <React.Fragment>
      <RenderIf isTrue={loading}>
        <div className="flex items-center justify-center absolute w-full h-full top-0 left-0 z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-[2px] rounded-lg">
          <AiOutlineLoading className="text-2xl w-12 h-12 text-black animate-spin" />
        </div>
      </RenderIf>
      <RenderIf isTrue={message}>
        <Alert type="danger" className="mb-4 text-sm" title={translate("login.error.errorAuth")}>
          {message}
        </Alert>
      </RenderIf>
    </React.Fragment>
  );
};

export default RenderMessage;
