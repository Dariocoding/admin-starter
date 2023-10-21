import React, { useState } from "react";
import classNames from "classnames";
import { HiCheckCircle, HiInformationCircle, HiExclamation, HiXCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import CloseButton from "../CloseButton";
import RenderIf from "../RenderIf";
import useTimeout from "../hooks/useTimeout";

const TYPE_MAP = {
  success: {
    backgroundColor: "bg-emerald-50 dark:bg-emerald-500",
    titleColor: "text-emerald-700 dark:text-emerald-50",
    textColor: "text-emerald-500 dark:text-emerald-50",
    iconColor: "text-emerald-400 dark:text-emerald-50",
    icon: <HiCheckCircle />,
  },
  info: {
    backgroundColor: "bg-blue-50 dark:bg-blue-500",
    titleColor: "text-blue-700 dark:text-blue-100",
    textColor: "text-blue-500 dark:text-blue-100",
    iconColor: "text-blue-400 dark:text-blue-100",
    icon: <HiInformationCircle />,
  },
  warning: {
    backgroundColor: "bg-yellow-50 dark:bg-yellow-500",
    titleColor: "text-yellow-700 dark:text-yellow-50",
    textColor: "text-yellow-500 dark:text-yellow-50",
    iconColor: "text-yellow-400 dark:text-yellow-50",
    icon: <HiExclamation />,
  },
  danger: {
    backgroundColor: "bg-red-50 dark:bg-red-500",
    titleColor: "text-red-700 dark:text-red-100",
    textColor: "text-red-500 dark:text-red-100",
    iconColor: "text-red-400 dark:text-red-100",
    icon: <HiXCircle />,
  },
};

export type AlertType = keyof typeof TYPE_MAP;
type Display = "show" | "hiding" | "hide";

interface IAlertProps {
  type: AlertType;
  className?: string;
  children?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  title?: React.ReactNode;
  customIcon?: React.ReactNode;
  closable?: boolean;
}

const Alert: React.FunctionComponent<IAlertProps> = (props) => {
  const { className, title, customIcon, closable = false, onClose, duration = 3000, type } = props;
  const typeMap = TYPE_MAP[type];

  const [display, setDisplay] = useState<Display>("show");

  const { clear } = useTimeout({
    fn: () => setDisplay("hide"),
    ms: duration,
    open: duration > 0,
  });

  const handleClose = () => {
    setDisplay("hiding");
    onClose?.();
    clear();
  };

  const alertClass = classNames(
    "p-4 relative flex",
    typeMap.backgroundColor,
    typeMap.textColor,
    {
      "font-semibold": !title,
      "justify-between": closable,
      "items-center": closable && !title,
    },
    "rounded-lg",
    className
  );

  if (display === "hide") return null;

  return (
    <motion.div
      className={alertClass}
      initial={{ opacity: 1 }}
      animate={display === "hiding" ? "exit" : "animate"}
      transition={{ duration: 0.25, type: "tween" }}
      variants={{
        animate: { opacity: 1 },
        exit: { opacity: 0, userSelect: "none" },
      }}
    >
      <div className={`flex ${title ? "" : "items-center"}`}>
        <span className="text-xl mt-0.5">
          {customIcon}
          <RenderIf isTrue={!customIcon}>{typeMap.icon}</RenderIf>
        </span>

        <div className={"mx-2"}>
          <RenderIf isTrue={title}>
            <div className={`font-semibold mb-1 ${typeMap.titleColor}`}>{title}</div>
          </RenderIf>

          {props.children}
        </div>
      </div>
      <RenderIf isTrue={closable}>
        <div className="cursor-pointer" onClick={handleClose}>
          <CloseButton />
        </div>
      </RenderIf>
    </motion.div>
  );
};

export default Alert;
