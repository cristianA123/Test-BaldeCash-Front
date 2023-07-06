'use client'
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { User } from "../interfaces/user.interface";
import { Dispatch } from "@reduxjs/toolkit";

interface Props {
  register: UseFormRegister<User>;
  handleSubmit: UseFormHandleSubmit<User, undefined>;
  watch: UseFormWatch<User>;
  errors: FieldErrors<User>;
  onSubmit: (value: User) => void;
  // loading?: boolean,
  setShowModal: any;
  selectedUser: User | null;
  setValue: UseFormSetValue<User>;
}

export const AddUser = ({
  register,
  selectedUser,
  handleSubmit,
  watch,
  errors,
  setShowModal,
  onSubmit,
  setValue,
}: Props) => {


  const roles = ["Administrador", "Revisor"];
  const closeModal = () => {
    setShowModal(false)
  }



  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal Content */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
          {selectedUser && (
              <input
                type="hidden"
                {...register("id")}
                value={selectedUser.id}
              />
            )}
            {selectedUser && (
              <input
                type="hidden"
                {...register("created_at")}
                value={selectedUser.created_at}
              />
            )}
            {selectedUser && (
              <input
                type="hidden"
                {...register("created_at")}
                value={selectedUser.simple_password}
              />
            )}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre(s)
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre(s)"
                  {...register("name", {
                    required: true,
                  })}

                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Apellido(s)
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: true,
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Apellido(s)"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: true,
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Contraseña"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Rol
                </label>
                {/* <input
                  type="text"
                  id="role"
                  {...register("role", {
                    required: true,
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Rol"
                /> */}
                 <select
                  id="role"
                  {...register("role", {
                    required: true,
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {roles.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Agregar
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
