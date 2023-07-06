import { useState } from "react";
import { LoginFormProps } from "../interfaces/login.interface";

import { FaEye, FaEyeSlash, FaAt } from "react-icons/fa";

const LoginForm = ({
  register,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  loading
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-0 mt-8 max-w-md space-y-4"
    >
      <div>
        <label className="sr-only">Email</label>

        <div className="relative">
          <input
            className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${errors.email ? "text-red-500" : ""}`}
            placeholder="Correo"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4 ">
            <FaAt fontSize={20} color={`${errors.email ? "#b20000" : ""}`} />
          </span>
        </div>
        {errors.email?.type === "required" && (
            <span className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-red-500">
              El email es obligatorio
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-red-500">
              El email debe ser un correo valido
            </span>
          )}
      </div>
      <div>
        <label className="sr-only">Password</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${errors.password ? "text-red-500" : ""}`}
            placeholder="Contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />

          <span
            className="absolute inset-y-0 end-0 grid place-content-center px-4"
            onClick={togglePasswordVisibility}
          >
            {!showPassword ? (
              <FaEyeSlash
                fontSize={20}
                color={`${errors.password ? "#b20000" : ""}`}
              />
            ) : (
              <FaEye fontSize={20} color={`${errors.password ? "#b20000" : ""}`} />
            )}
          </span>
        </div>
        {errors.password?.type === "required" ? (
            <span className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-red-500">
              La contraseña es obligatorio
            </span>
          ) : (
            <span></span>
          )}
          {errors.password?.type === "minLength" ? (
            <span className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-red-500">
              La contraseña debe contener más de 6 caracteres.
            </span>
          ) : (
            <span></span>
          )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
