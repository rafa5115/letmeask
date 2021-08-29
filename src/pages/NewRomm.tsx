import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import imageSalas from '../assets/images/sala.jpg'
import logoImg from '../assets/images/seueditorLogo.svg'


import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
export function NewRoom() {
    const [newRoom, setNewRomm] = useState('');
    const { user } = useAuth();
    const history = useHistory();
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        // trim é um metodo que tira todos os espaços
        if (newRoom.trim() === '') {
            return;
        }
        // referencia como uma linha do banco de dados, um dado dentro do banco 
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            tittle: newRoom,
            authorId: user?.id
        });
        history.push(`/rooms/${firebaseRoom.key}`);
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
                    <h2>
                        Criar uma nova sala
                    </h2>

                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRomm(event.target.value)}

                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>

                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}