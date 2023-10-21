import classNames from "classnames";
import * as React from "react";

interface ITabsProps {
  selectedValue: any;
  setSelectedValue(value: any): void;
  children?: React.ReactNode;
  className?: string;
}

type TabContextValues = { selectedValue?: any; setSelectedValue?(value: any): void };

const TabContext = React.createContext<TabContextValues>({});

export const Tabs: React.FunctionComponent<ITabsProps> = (props) => {
  const { selectedValue, setSelectedValue, className } = props;
  return (
    <div
      className={classNames(
        "text-sm font-medium text-center text-gray-500 border-b border-gray-200",
        className
      )}
    >
      <TabContext.Provider value={{ selectedValue, setSelectedValue }}>
        <ul className="flex flex-wrap -mb-px">{props.children}</ul>
      </TabContext.Provider>
    </div>
  );
};

interface ITabProps {
  children?: React.ReactNode;
  value: any;
}

export const Tab: React.FunctionComponent<ITabProps> = (props) => {
  const { value } = props;
  const { selectedValue, setSelectedValue } = React.useContext(TabContext);

  const isSelected = value === selectedValue;

  return (
    <li className="mr-2">
      <span
        onClick={() => setSelectedValue(value)}
        className={classNames(
          "inline-block px-4 py-2 border-b-2 rounded-t-lg cursor-pointer",
          isSelected
            ? "text-blue-600 border-blue-600"
            : "border-transparent hover:text-gray-600 hover:border-gray-300"
        )}
      >
        {props.children}
      </span>
    </li>
  );
};
