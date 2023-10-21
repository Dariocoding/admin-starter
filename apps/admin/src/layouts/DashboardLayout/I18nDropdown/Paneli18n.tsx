import { ValidLocales } from "@/i18n";
import { useI18Store } from "@/store/i18Store";
import { Popover } from "@headlessui/react";
import classNames from "classnames";
import * as React from "react";

interface IPaneli18nProps {
  close: () => void;
}

const buttons = [
  { label: ValidLocales.ENGLISH.name, locale: ValidLocales.ENGLISH.locale },
  { label: ValidLocales.SPANISH.name, locale: ValidLocales.SPANISH.locale },
];

const Paneli18n: React.FunctionComponent<IPaneli18nProps> = React.forwardRef((props, ref) => {
  const { close } = props;
  const { setLocale, locale } = useI18Store();
  const onChange = (locale: string) => {
    setLocale(locale);
    close();
  };

  return (
    <Popover.Panel
      ref={ref as any}
      className="absolute z-10 w-[225px] sm:w-[115px] px-12 mt-3.5 -right-28 sm:right-0 sm:px-0"
    >
      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
        <div className="relative bg-white">
          <div className="max-h-[45vh] p-2 overflow-y-auto hiddenScrollbar">
            <div className="divide-y divide-slate-100">
              <div className="flex flex-col gap-2">
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => onChange(button.locale)}
                    className={classNames(
                      "flex-1 text-black text-xs flex items-center justify-center w-full h-8 hover:bg-gray-200 gap-1 py-3 transition rounded-lg",
                      button.locale === locale && "bg-gray-200 font-bold"
                    )}
                  >
                    <span>
                      <img src={`/img/i18n/${button.locale}.png`} alt="" className="w-4 h-4" />
                    </span>
                    <span>{button.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popover.Panel>
  );
});

export default Paneli18n;
