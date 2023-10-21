import { Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import * as React from "react";
import Paneli18n from "./Paneli18n";
import { HiTranslate } from "react-icons/hi";

interface II18DropdownProps {}

const I18Dropdown: React.FunctionComponent<II18DropdownProps> = (props) => {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={classNames(
              "group w-8 h-8 hover:bg-slate-10 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative",
              open && "text-opacity-90"
            )}
          >
            <HiTranslate className="w-5 h-5" />
          </Popover.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Paneli18n close={close} />
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default I18Dropdown;
