import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../selectors/selectors";
import { RootState } from "../store/store";


// get current user full info
export const useUser = () => useSelector((state: RootState) => getCurrentUser(state))

// get loading status
export const useLoading = () => useSelector((state: RootState) => state.ui.loading)

// is someone logged in?
export const useLoggedIn = () => useSelector((state: RootState) => Boolean(state.session.currentUserId))