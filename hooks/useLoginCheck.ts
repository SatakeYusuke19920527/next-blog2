import { useEffect } from 'react';
import { login, logout, selectUser } from '../features/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useRTK';
import { auth } from '../plugins/firebase';
import { UserType } from '../types/types';

export const useLoginCheck = (): boolean => {
  const user: UserType = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  return user.uid !== "" ? true : false
};