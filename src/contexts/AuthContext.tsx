import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string,
  name: string,
  avatar: string

}

type AuthContext = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}


export const AuthContext = createContext({} as AuthContext);


export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();
  // useEfect recebe dois parametros
  // 1 - qual funcao quer executar
  // 2 - quando executar a funcao, sempre vai ser um array
  // se voce deixar o 2 parametro vazio ele executa uma vez, se voce colocar o valor da variavel e eexecuta quando a valor mudar
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // se a authentificacao deu certo
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");

        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      // se a authentificacao deu certo
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");

      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })

    }
  }



  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>

  );
}