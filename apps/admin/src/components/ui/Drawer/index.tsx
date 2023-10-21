import React from "react";
import classNames from "classnames";
import Modal from "react-modal";
import CloseButton from "../CloseButton";
import { motion } from "framer-motion";
import useOutsideClick from "../hooks/useOutsideClick";
import styles from "./_drawer.module.css";
import RenderIf from "../RenderIf";

export type PlacementDrawer = "top" | "right" | "bottom" | "left";

interface IDrawerProps {
  placement?: PlacementDrawer;
  children?: React.ReactNode;
  closable?: boolean;
  isOpen: boolean;
  onClose(): void;
  width?: number | string;
  height?: number | string;
  closeTimeoutMS?: number;
  showBackdrop?: boolean;
  lockScroll?: boolean;
  className?: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  bodyOpenClassName?: string;
  portalClassName?: string;
  overlayClassName?: string;
  headerClass?: string;
  footerClass?: string;
  bodyClass?: string;
  shouldCloseOnOverlayClick?: boolean;
}

const Drawer: React.FunctionComponent<IDrawerProps> = (props) => {
  const {
    children,
    className,
    closable = true,
    width = 250,
    height = 250,
    isOpen,
    onClose,
    closeTimeoutMS = 300,
    placement = "right",
    bodyOpenClassName,
    portalClassName,
    overlayClassName,
    title,
    footer,
    headerClass,
    footerClass,
    bodyClass,
    showBackdrop = true,
    lockScroll = true,
    shouldCloseOnOverlayClick = true,
  } = props;

  const ref = useOutsideClick<HTMLDivElement>(onClose);
  const renderCloseButton = <CloseButton onClick={onClose} />;

  const getStyle = () => {
    if (placement === "left" || placement === "right") {
      return {
        dimensionClass: styles.vertical,
        contentStyle: { width },
        motionStyle: {
          [placement]: `-${width}${typeof width === "number" && "px"}`,
        },
      };
    }

    if (placement === "top" || placement === "bottom") {
      return {
        dimensionClass: styles.horizontal,
        contentStyle: { height },
        motionStyle: {
          [placement]: `-${height}${typeof height === "number" && "px"}`,
        },
      };
    }
  };

  const { dimensionClass, contentStyle, motionStyle } = getStyle();

  React.useEffect(() => {
    const openDrawerShortcut = (e: KeyboardEvent) => {
      if (e?.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", openDrawerShortcut);

    return () => {
      document.removeEventListener("keydown", openDrawerShortcut);
    };
  }, [isOpen]);

  return (
    <Modal
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      className={{
        base: classNames("drawer-dario", className),
        afterOpen: "drawer-after-open",
        beforeClose: "drawer-before-close",
      }}
      overlayClassName={{
        base: classNames(
          styles["drawer-overlay"],
          overlayClassName,
          !showBackdrop && "bg-transparent"
        ),
        afterOpen: styles["drawer-overlay-after-open"],
        beforeClose: styles["drawer-overlay-before-close"],
      }}
      portalClassName={classNames(portalClassName)}
      bodyOpenClassName={classNames(
        styles["drawer-open"],
        lockScroll && styles["drawer-lock-scroll"],
        bodyOpenClassName
      )}
      ariaHideApp={false}
      isOpen={isOpen}
      closeTimeoutMS={closeTimeoutMS}
    >
      <motion.div
        ref={ref}
        className={classNames(styles["drawer-content"], dimensionClass)}
        style={contentStyle}
        initial={motionStyle}
        animate={{
          [placement]: isOpen ? 0 : motionStyle[placement],
        }}
      >
        <RenderIf isTrue={title || closable}>
          <div className={classNames(styles["drawer-header"], headerClass)}>
            {typeof title === "string" ? <h4>{title}</h4> : <span>{title}</span>}
            {closable && renderCloseButton}
          </div>
        </RenderIf>

        <div className={classNames(styles["drawer-body"], bodyClass)}>{children}</div>
        {footer && <div className={classNames(styles["drawer-footer"], footerClass)}>{footer}</div>}
      </motion.div>
    </Modal>
  );
};

export default Drawer;
