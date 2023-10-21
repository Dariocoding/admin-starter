import { User } from "@teslo/interfaces";

export const getUserRememberLocalStorage = (): string | null =>
	localStorage.getItem("userRemember");

export const storeUserRememberLocalStorage = (user: User) => {
	localStorage.setItem("userRemember", user.iduser);
};

export const removeUserRememberLocalStorage = () => localStorage.removeItem("userRemember");
