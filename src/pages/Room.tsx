import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { database } from '../services/firebase';


import LogoImg from '../assets/images/seueditorLogo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

// types
type RoomParams = {
    id: string;
}

export function Room() {
    // parametros
    const { user } = useAuth()
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    // ESTADOS
    const [newQuestion, setNewQuestion] = useState('');

    console.log(title)

    // metodos

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }
        if (!user) {
            // toast
            throw new Error('You must be logged in');

        }
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            // destaque que o adm da
            isAnswered: false
        }
        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');
    }

    async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
        if (likeId) {
            //  remover o like
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
        } else {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id,
            });
        }
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImg} alt="seuLogo" />
                    <RoomCode code={params.id}></RoomCode>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que voc?? quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    >

                    </textarea>
                    <div className="form-footer">
                        {user ? (

                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>fa??a seu login</button></span>

                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                // react identifica a diferen??a de uma pergunta pra outra
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                           
                            >

                           {!question.isAnswered && (
                               <>
                                    <button
                                    className={`like-button ${question.likeId ? 'liked' : ''}`}
                                    type="button"
                                    aria-label="Marcar como gostei"
                                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                                >
                                    {question.likeCount > 0 && <span>{question.likeCount}</span>}
                                    <ThumbUpAltIcon></ThumbUpAltIcon>
                                </button>
                               </>
                           )}

                            </Question>
                        )
                    })}
                </div>
            </main>
        </div >
    )
}