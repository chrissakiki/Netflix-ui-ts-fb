import { FC, createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

type AppContextInterface = {
  user: User;
  signUp: (email: string, password: string) => any;
  logIn: (email: string, password: string) => any;
  logOut(): void;
};

type User = { email: null | string };

type Props = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

const AppProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({ email: null });
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser({ email: null });
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const state: AppContextInterface = {
    user,
    signUp,
    logIn,
    logOut,
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="loading"></div>
      </div>
    );
  }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export default AppProvider;
