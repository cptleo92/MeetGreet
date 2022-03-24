import { User } from "../types/interfaces"

export const login = (user: User) => (
  $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user }
  })
)

export const logout = () => (
  $.ajax({
    method: "DELETE",
    url: "/api/session"
  })
)

export const signup = (user: User) => (
  $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  })
)