import React from 'react'

export const ValidatorsForm = () => {
  return (
    true
  )
}

export const SamePasswords = (password: string, repeatPassword: string) => {
    return password === repeatPassword
  }
  
