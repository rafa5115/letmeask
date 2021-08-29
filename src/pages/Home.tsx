
import { FormEvent } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { database } from '../services/firebase'
import imageSalas from '../assets/images/sala.jpg'
import logoImg from '../assets/images/seueditorLogo.svg'
import googleIconImg from '../assets/images/iconGoogle.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

export function Home() {
    // toda funcção que usa "use" chama-se de hooks, tem que ta dentro do componente
    const history = useHistory();

    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('')
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');

    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        if (roomCode.trim() === '') {
            return;
        }
        const roomRef  = await database.ref(`/rooms/${roomCode}`).get();
        if(!roomRef.exists()){
            alert('Room does not exists');
            return;
        }

        history.push(`/rooms/${roomCode}`);

    }




    return (
        <div id="page-auth">
            <aside>
                <img src={imageSalas} alt="ilustração simbolizando salas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas em tempo real</p>

            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="latmeask" />


                    <button onClick={handleCreateRoom} className="create-room" >
                        <img src={googleIconImg} alt="logo do Google" />
                        Crie sua sala com o Google
                    </button>


                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"

                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>

                </div>
            </main>
        </div>
    )
}