import { ValidLocales } from "./locales";

interface Messages {
	[key: string]: () => Promise<any>;
}

export const i18nTranslate: Messages = {
	[ValidLocales.ENGLISH.locale]: () => import("./en"),
	[ValidLocales.SPANISH.locale]: () => import("./es"),
};

export * from "./locales";
export * from "./translate";
