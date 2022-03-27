import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../selectors/selectors";
import { RootState } from "../store/store";

// this one is for defining the thunk dispatch type for TS
export const useAppDispatch = () => useDispatch<AppDispatch>(); 

export const useUser = () => useSelector((state: RootState) => getCurrentUser(state))