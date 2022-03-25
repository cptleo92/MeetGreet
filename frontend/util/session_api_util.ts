export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignup {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export const login = (user: UserLogin) => (
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

export const signup = (user: UserSignup) => (
  $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  })
)