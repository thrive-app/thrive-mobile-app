import {useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged, User} from 'firebase/auth'
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { useAuth } from "@clerk/clerk-expo";
import { app } from '../utils/firebaseConfig';





export const useAuthentication = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(undefined)
            }
        })
        return unsubscribeFromAuthStateChanged
    }, [])
    return { user }
}