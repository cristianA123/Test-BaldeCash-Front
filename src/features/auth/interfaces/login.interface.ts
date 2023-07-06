import { Dispatch } from "@reduxjs/toolkit";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

export interface Login {
  email: string;
  password: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string
}
export interface LoginFormProps {
  register: UseFormRegister<Login>;
  handleSubmit: UseFormHandleSubmit<Login, undefined>;
  watch: UseFormWatch<Login>;
  errors: FieldErrors<Login>;
  onSubmit: (value: Login) => void;
  loading?: boolean
}

export interface ErrorData {
  title: string;
  description: string;
}

export interface LoginResponse {
  ok?: boolean;
  message?: string;
  user?: any;
  token?: string;
  statusCode?: number;
  error?: string;
}
