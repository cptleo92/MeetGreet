import { AppDispatch } from "../store/store";

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modal: string) => ({
  type: OPEN_MODAL,
  payload: modal
})

const closingModal = () => ({
  type: CLOSE_MODAL
})

export const closeModal = () => (dispatch: AppDispatch) => {
    const modal = document.querySelector(".modal-child")
    modal?.classList.add('animate__fadeOut', 'animate__faster')    
    setTimeout( () => dispatch(closingModal()), 300)
}