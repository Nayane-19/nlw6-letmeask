import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';


import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useContext, FormEvent, useState } from 'react';
import { database } from '../services/firebase';



export function NewRoom () {
    const {user} = useContext(AuthContext)
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateNewRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }   

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title:newRoom,
            authorId: user?.id,

        })    

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="ilustração simbolizando perguntas e resposta" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main >
                <div className="main-content">
                    <img src={logoImg} alt="letmeask logo" />
                   <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <div className="separator">Crie sua sala</div>
                    <form onSubmit={handleCreateNewRoom}>
                        <input 
                            type="text"
                            placeholder='Digite o código da sala'
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type='submit'>Criar Sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}