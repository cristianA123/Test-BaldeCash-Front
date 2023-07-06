
  
export interface UserResponse {
ArrayUsers: User[],
success: boolean
}

export interface User {
id: number
name: string
lastName: string
password: string
simple_password: string
email: string
role: string
created_at: string
updated_at?: string

}