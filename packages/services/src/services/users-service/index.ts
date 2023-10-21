import {
  OptionsQueryGetUser,
  OptionsQueryUser,
  RecoverPasswordDto,
  SendRequestPasswordRecoverDto,
} from "./interfaces";
import { User, UserDto } from "@teslo/interfaces";
import { axiosClient } from "../../config";
import { MessageResponse } from "../../services/interfaces.api";
import { AxiosRequestConfig } from "axios";

export const usersService = {
  getUsers: () => axiosClient.get<User[]>("/users"),
  getUserByIdAndToken: (id: string, token: string) =>
    axiosClient.get<User>(`/users/${id}/${token}`),
  getUser: (id: string, params?: OptionsQueryGetUser, config?: AxiosRequestConfig) =>
    axiosClient.get<User>(`/users/${id}`, { params, ...(config || {}) }),
  deleteUser: (id: string) => axiosClient.delete<User>(`/users/${id}`),
  createUser: (userDto: UserDto) => axiosClient.post<User>("/users", userDto),
  updateUser: (id: string, userDto: UserDto) => axiosClient.put<User>(`/users/${id}`, userDto),
  updateProfileUser: (user: UserDto, params?: OptionsQueryUser) =>
    axiosClient.patch<User>("/users/profile/user", user, { params }),

  // RECOVER USER
  sendRequestPassword: (data: SendRequestPasswordRecoverDto) =>
    axiosClient.patch<MessageResponse>("/users/sendRequestPassword", data),

  recoverPassword: (data: RecoverPasswordDto) =>
    axiosClient.patch<MessageResponse>("/users/recoverPassword", data),
};

export * from "./interfaces";
