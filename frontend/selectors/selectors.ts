import { RootState } from "../store/store";

export const getCurrentUser = (state: RootState) => {
  const currentUserId: number = state.session.currentUserId
  return state.entities.users[currentUserId]
}