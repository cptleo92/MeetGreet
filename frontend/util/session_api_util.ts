import ax from "./axiosCSRF";

export interface UserLogin {
  fname?: string;
  lname?: string;
  email: string;
  password: string;
}

export const login = (user: UserLogin) => (
  ax({
    method: "POST",
    url: "/api/session",
    data: { user }
  }).then(res => res.data)
)

export const logout = () => (
  ax({
    method: "DELETE",
    url: "/api/session"
  }).then(res => res.data)
)

export const signup = (user: UserLogin) => (
  ax({
    method: "POST",
    url: "/api/users",
    data: { user }
  }).then(res => res.data)
)