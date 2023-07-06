"use client"
import React, { useEffect, useRef } from 'react'

interface List {
  name: string,
  onClick: () => void,
  color?: string,
}
interface Props {
  open: boolean,
  list: List[],
  onCloseMenu: () => void,
  children?: React.ReactNode,
  title?: string,
  subtitle?: string,
}



export const MenuComponent = ({list, open, children, onCloseMenu, title, subtitle}: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onCloseMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Button */}
      <div
        className="flex_center items-center overflow-hidden rounded-md bg-white dark:bg-gray-900"
      >
        {
          children
        }
      </div>
      {/* Menu */}
      <div
        className={` ${open ? 'absolute' : 'hidden'} ${title ? 'divide-y' : 'divide-y-0'} end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900  divide-gray-100 dark:divide-gray-600`}
        role="menu"
        
      >
        <div className={`${title ? 'block' : 'hidden'} px-4 py-3`}>
          <span className="block text-sm text-gray-900 dark:text-white">{title}</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{subtitle}</span>
        </div>
        <div className="p-2">
          {
            list.map((item, index) => {

              if (item.color) {
                return (
                  <button
                    key={index}
                    className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-${item.color || 'gray'}-700 hover:bg-${item.color || 'gray'}-50 dark:text-${item.color || 'gray'}-500 dark:hover:bg-${item.color || 'gray'}-600/10`}
                    role="menuitem"
                    onClick={() => {
                      onCloseMenu()
                      item.onClick()
                    }}
                  >
                    {item.name}
                  </button>
                )
              }
              return (
                <button
                    key={index}
                    className="flex w-full rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    role="menuitem"
                    onClick={() => {
                      onCloseMenu()
                      item.onClick()
                    }}
                  >
                    {item.name}
                  </button>
              )
            })
          }
          {/* <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            role="menuitem"
          >
            View on Storefront
          </a>

          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
            role="menuitem"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>

            Delete Product
          </button> */}
        </div>
      </div>
    </div>
  )
}
