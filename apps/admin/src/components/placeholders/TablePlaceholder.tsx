import classNames from "classnames";

interface ITablePlaceholderProps {
  classNameEachRow?: string;
  className?: string;
}

const rows = Array(5).fill("");

const TablePlaceholder: React.FunctionComponent<ITablePlaceholderProps> = (props) => {
  const { classNameEachRow, className } = props;
  return (
    <div className={classNames("animate-pulse", className)}>
      {rows.map((_, idx) => (
        <div
          key={idx}
          className={classNames(
            idx !== rows.length && "mb-4",
            classNameEachRow || "h-4 bg-gray-200 rounded"
          )}
        ></div>
      ))}
    </div>
  );
};

export default TablePlaceholder;
