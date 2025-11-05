import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase"
import { store } from "../../app/store"
import { setUser } from "./authSlice"

export const authListener = () => {
    onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
            store.dispatch(setUser({
                uid: fbUser.uid,
                email: fbUser.email
            }))
        } else {
            store.dispatch(setUser(null))
        }
    })
}