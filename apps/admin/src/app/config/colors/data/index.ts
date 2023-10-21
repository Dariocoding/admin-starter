import { IButtonRecommendedColorProps } from "../ButtonRecommendedColor";
import {
  THEMED_SIDEBAR_CLASSNAMES_BLACK,
  THEMED_SIDEBAR_CLASSNAMES_GRAY,
  THEMED_SIDEBAR_CLASSNAMES_SLATE,
  THEMED_SIDEBAR_CLASSNAMES_BLUE,
  THEMED_SIDEBAR_CLASSNAMES_CYAN,
  THEMED_SIDEBAR_CLASSNAMES_EMERALD,
  THEMED_SIDEBAR_CLASSNAMES_FUCHSIA,
  THEMED_SIDEBAR_CLASSNAMES_GREEN,
  THEMED_SIDEBAR_CLASSNAMES_INDIGO,
  THEMED_SIDEBAR_CLASSNAMES_NEUTRAL,
  THEMED_SIDEBAR_CLASSNAMES_ORANGE,
  THEMED_SIDEBAR_CLASSNAMES_PINK,
  THEMED_SIDEBAR_CLASSNAMES_PURPLE,
  THEMED_SIDEBAR_CLASSNAMES_RED,
  THEMED_SIDEBAR_CLASSNAMES_ROSE,
  THEMED_SIDEBAR_CLASSNAMES_SKY,
  THEMED_SIDEBAR_CLASSNAMES_TEAL,
  THEMED_SIDEBAR_CLASSNAMES_VIOLET,
  THEMED_SIDEBAR_CLASSNAMES_ZINC,
  THEMED_SIDEBAR_CLASSNAMES_YELLOW,
  THEMED_SIDEBAR_CLASSNAMES_AMBER,
  THEMED_SIDEBAR_CLASSNAMES_LIME,
  THEMED_SIDEBAR_CLASSNAMES_STONE,
} from "../colors";

export interface ColorsAdminButtonsData {
  name: string;
  colors: IButtonRecommendedColorProps[];
}

export const dataColorsButtons: ColorsAdminButtonsData[] = [
  {
    name: "Dark Colors",
    colors: [
      {
        name: "Black",
        color: THEMED_SIDEBAR_CLASSNAMES_BLACK,
        className: "bg-black hover:bg-neutral-800",
      },
      {
        name: "Slate",
        color: THEMED_SIDEBAR_CLASSNAMES_SLATE,
        className: "bg-slate-800 hover:bg-slate-900",
      },
      {
        name: "Gray",
        color: THEMED_SIDEBAR_CLASSNAMES_GRAY,
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        name: "Zinc",
        color: THEMED_SIDEBAR_CLASSNAMES_ZINC,
        className: "bg-zinc-700 hover:bg-zinc-800",
      },
      {
        name: "Neutral",
        color: THEMED_SIDEBAR_CLASSNAMES_NEUTRAL,
        className: "bg-neutral-700 hover:bg-neutral-800",
      },
      {
        name: "Stone",
        color: THEMED_SIDEBAR_CLASSNAMES_STONE,
        className: "bg-stone-700 hover:bg-stone-800",
      },
    ],
  },
  {
    name: "Green Colors",
    colors: [
      {
        name: "Emerald",
        color: THEMED_SIDEBAR_CLASSNAMES_EMERALD,
        className: "bg-emerald-600 hover:bg-emerald-700",
      },
      {
        name: "Green",
        color: THEMED_SIDEBAR_CLASSNAMES_GREEN,
        className: "bg-green-600 hover:bg-green-700",
      },
      {
        name: "Teal",
        color: THEMED_SIDEBAR_CLASSNAMES_TEAL,
        className: "bg-teal-600 hover:bg-teal-700",
      },

      {
        name: "Lime",
        color: THEMED_SIDEBAR_CLASSNAMES_LIME,
        className: "bg-lime-600 hover:bg-lime-700",
      },
    ],
  },
  {
    name: "Blue Colors",
    colors: [
      {
        name: "Blue",
        color: THEMED_SIDEBAR_CLASSNAMES_BLUE,
        className: "bg-blue-600 hover:bg-blue-700",
      },
      {
        name: "Sky",
        color: THEMED_SIDEBAR_CLASSNAMES_SKY,
        className: "bg-sky-600 hover:bg-sky-700",
      },
      {
        name: "Cyan",
        color: THEMED_SIDEBAR_CLASSNAMES_CYAN,
        className: "bg-cyan-600 hover:bg-cyan-700",
      },
    ],
  },
  {
    name: "Red Colors",
    colors: [
      {
        name: "Red",
        color: THEMED_SIDEBAR_CLASSNAMES_RED,
        className: "bg-red-600 hover:bg-red-700",
      },
      {
        name: "Rose",
        color: THEMED_SIDEBAR_CLASSNAMES_ROSE,
        className: "bg-rose-600 hover:bg-rose-700",
      },
      {
        name: "Orange",
        color: THEMED_SIDEBAR_CLASSNAMES_ORANGE,
        className: "bg-orange-600 hover:bg-orange-700",
      },
      {
        name: "Yellow",
        color: THEMED_SIDEBAR_CLASSNAMES_YELLOW,
        className: "bg-yellow-400 hover:bg-yellow-500",
      },
      {
        name: "Amber",
        color: THEMED_SIDEBAR_CLASSNAMES_AMBER,
        className: "bg-amber-500 hover:bg-amber-600",
      },
    ],
  },
  {
    name: "Others Colors",
    colors: [
      {
        name: "Indigo",
        color: THEMED_SIDEBAR_CLASSNAMES_INDIGO,
        className: "bg-indigo-800 hover:bg-indigo-90",
      },
      {
        name: "Purple",
        color: THEMED_SIDEBAR_CLASSNAMES_PURPLE,
        className: "bg-purple-800 hover:bg-purple-900",
      },
      {
        name: "Fuchsia",
        color: THEMED_SIDEBAR_CLASSNAMES_FUCHSIA,
        className: "bg-fuchsia-700 hover:bg-fuchsia-800",
      },
      {
        name: "Pink",
        color: THEMED_SIDEBAR_CLASSNAMES_PINK,
        className: "bg-pink-600 hover:bg-pink-700",
      },
      {
        name: "Violet",
        color: THEMED_SIDEBAR_CLASSNAMES_VIOLET,
        className: "bg-violet-700 hover:bg-violet-800",
      },
    ],
  },
];
