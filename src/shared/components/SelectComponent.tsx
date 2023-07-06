import React from 'react'

interface Options {
  value: string,
  label: string,
}

interface Props {
  label?: string,
  options: Options[],
  disabled?: boolean,
}

export const SelectComponent = ({ label, options, disabled = false }: Props) => {
  const newOptions = [{ value: '', label: 'Selecciona una opción' }, ...options]
  
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <select 
        disabled={disabled} 
        id="select_options" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={newOptions[0].value}
      >
        {
          newOptions.map((option, index) => (
            <option 
              key={index} 
              // selected={index === 0} 
              value={option.value}
              disabled={index === 0}
              hidden={index === 0}
            >{option.label}</option>
          ))
        }
      </select>
    </>
  )
}
