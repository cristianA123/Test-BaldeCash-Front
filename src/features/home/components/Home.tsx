"use client";
import { useForm } from "react-hook-form";
import { User } from "../interfaces/user.interface";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddUser } from "./AddUser";
import moment from "moment";
moment().format();
import { useAppDispatch, useAppSelector } from "@src/store";
import { useRouter } from "next/navigation";
import { logout } from "@src/features/auth/store/authSlice";

interface Props {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}

export const Home = ({ users = [], setUsers }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user :authUser } = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (authUser) {
      // router.push('/')
    }
  }, [authUser]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setValue("id", user.id);
    setValue("name", user.name);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    setValue("password", user.simple_password);
    setValue("simple_password", user.simple_password);
    setValue("role", user.role);
    setValue("created_at", user.created_at);

    setShowModal(true);
  };

  const handleAddUser = () => {
    setValue("name", "");
    setValue("lastName", "");
    setValue("email", "");
    setValue("password", "");
    setValue("role", "");

    setShowModal(true);
  };

  const onSubmit = async (value: User) => {
    if (selectedUser) {
      const url = process.env.ApiBackEnd || "";
      const token = localStorage.getItem("token");
      const postData = {
        id: watch("id"),
        name: watch("name"),
        lastName: watch("lastName"),
        password: watch("password"),
        email: watch("email"),
        role: watch("role"),
      };

      fetch(url + "/user/" + watch("id"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data: { success: boolean; token: string }) => {
          if (data.success) {
            const updatedUsers = users.map((user) => {
              if (user.id === value.id) {
                return value;
              }
              return user;
            });

            setUsers(updatedUsers);
            closeModal();
          }
          // Aquí puedes manejar la respuesta del servidor
        })
        .catch((error) => {
          console.error("Error:", error);
          // Aquí puedes manejar errores de la solicitud
        });
      // Modificar usuario existente
    } else {
      // Crear nuevo usuario
      const url = process.env.ApiBackEnd || "";
      const token = localStorage.getItem("token");
      const postData = {
        name: watch("name"),
        lastName: watch("lastName"),
        password: watch("password"),
        email: watch("email"),
        role: watch("role"),
      };

      fetch(url + "/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data: { success: boolean; user: User; token: string }) => {
          if (data.success) {
            setUsers([...users, data.user]);
            closeModal();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const onDelete = (value: User) => {
    const url = process.env.ApiBackEnd || "";
    const token = localStorage.getItem("token");

    fetch(url + "/user/" + value.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data: { success: boolean; user: User; token: string }) => {
        if (data.success) {
          const updatedUsers = users.filter((user) => user.id !== value.id); // Remover el usuario eliminado de la lista
          setUsers(updatedUsers);
          closeModal();
          closeModal();
        }
        // Aquí puedes manejar la respuesta del servidor
      })
      .catch((error) => {
        console.error("Error:", error);
        // Aquí puedes manejar errores de la solicitud
      });
  };

  const onLogout = () => {
    router.push('/')  
    dispatch(logout())
  }

  return (
    <section className="w-full h-screen px-2 lg:px-5 max-w-screen-2xl mx-auto pt-2 sm:pt-3 pb-10 sm:pb-12">
      <div className="relative w-full h-full mx-auto px-0 sm:px-6 flex justify-center md:px-8 dark:text-white mt-4 mb-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl m-2">
            Usuarios
            {/* <span className="block font-extrabold text-blue-700">
              Hotel California.
            </span> */}
          </h1>
          {authUser?.role == "Administrador" && (
            <button
              onClick={handleAddUser}
              className="m-3 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              Agregar Usuario
            </button>
          )}
            <button
              onClick={onLogout}
              className="m-3 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              cerrar Session
            </button>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    ID
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nombre(s)
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Apellidos(s)
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Correo electrónico
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Rol
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Fecha del registro
                  </th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                      {user.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                      {user.lastName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                      {user.role}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                      {moment(user.created_at).format("L")}
                    </td>
                    {authUser?.role == "Administrador" && (
                      <>
                        <td className="whitespace-nowrap px-4 py-2">
                          <span
                            onClick={() => handleEdit(user)}
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                          >
                            Modificar
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <span
                            onClick={() => onDelete(user)}
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                          >
                            Eliminar
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddUser
          register={register}
          handleSubmit={handleSubmit}
          watch={watch}
          errors={errors}
          onSubmit={onSubmit}
          setShowModal={setShowModal}
          selectedUser={selectedUser}
          setValue={setValue}
        />
      )}
    </section>
  );
};
