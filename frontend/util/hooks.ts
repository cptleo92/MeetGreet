import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";

// this one is for defining the thunk dispatch type for TS
export const useAppDispatch = () => useDispatch<AppDispatch>(); 