import * as React from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useMedia } from "../hooks";

interface IDropdownProps {
  placement?: "bottom" | "right";
  children?: React.ReactNode;
  displayButton: React.ReactNode;
  inTable?: boolean;
  classNameButton?: string;
  className?: string;
  isRelativeContainer?: boolean;
  onClickTrigger?(): void;
  disabledDisplayButton?: boolean;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  const {
    displayButton,
    inTable = false,
    classNameButton,
    placement,
    className,
    isRelativeContainer = true,
    onClickTrigger,
    disabledDisplayButton = false,
  } = props;
  const sm = useMedia("(max-width: 640px)");
  const [refPanel, setRefPanel] = React.useState<HTMLDivElement>(null);
  const refButton = React.useRef<HTMLButtonElement>(null);

  const controlPanelPosition = React.useCallback(() => {
    if (!inTable) return;
    // calculate if the panel is out of the screen bottom and move it to the top
    // if there is space to show it move it to the bottom
    const button = refButton.current;
    const panel = refPanel;
    if (button && panel) {
      const buttonRect = button.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();

      if (window.innerHeight > panelRect.bottom) {
        const style = `transform: translate3d(-${sm ? 0 : panelRect.width}px, 0px, 0) !important;`;
        panel.setAttribute("style", style);
      } else if (panelRect.bottom > window.innerHeight) {
        const topCorner = buttonRect.height + panelRect.height;
        const style = `transform: translate3d(-${sm ? 0 : panelRect.width}px, -${
          topCorner + 10
        }px, 0) !important;`;
        panel.setAttribute("style", style);
      }
    }
  }, [refPanel, inTable, sm]);

  React.useEffect(() => {
    controlPanelPosition();

    window.addEventListener("resize", controlPanelPosition);

    return () => {
      window.removeEventListener("resize", controlPanelPosition);
    };
  }, [controlPanelPosition]);

  React.useEffect(() => {
    function handleClick() {
      onClickTrigger();
    }
    if (refButton && refButton.current) {
      refButton.current?.addEventListener?.("click", handleClick);
    }
    return () => {
      refButton.current?.removeEventListener?.("click", handleClick);
    };
  }, [onClickTrigger]);

  return (
    <Menu
      as="div"
      className={classNames(
        "inline-block text-left",
        !inTable && isRelativeContainer && "relative",
        className
      )}
    >
      {(propss) => (
        <React.Fragment>
          <Menu.Button
            ref={refButton}
            disabled={disabledDisplayButton}
            className={classNames("mb-0 mr-0", classNameButton)}
          >
            {displayButton}
          </Menu.Button>

          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              ref={(ref) => setRefPanel(ref)}
              className={classNames(
                "absolute z-[5] mt-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-max overflow-hidden",
                !inTable && placement === "bottom" && "right-0 origin-top-right w-56",
                !inTable && placement === "right" && "left-14 origin-bottom-left top-0 w-44",
                !inTable && !placement && isRelativeContainer && "right-0"
              )}
            >
              {props.children}
            </Menu.Items>
          </Transition>
        </React.Fragment>
      )}
    </Menu>
  );
};

export default Dropdown;
