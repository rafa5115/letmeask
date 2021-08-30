import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';


type FirabaseQuestions = Record<string, {
    author: {
        name: string
        avatar: string
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string
    }>
}>

// typagem
type QuestionType = {
    id: string;
    author: {
        name: string
        avatar: string
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likeCount: number,
    likeId: string | undefined
}


export function useRoom(roomId: string) {
    const { user } = useAuth();
    // estados
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        // once é o listenner que escuta apenas uma vez
        // escuta o valor de room
        // .val() busca co valor da room

        roomRef.on('value', (room) => {
            const databaseRoom = room.val();
            const firabaseQuestions: FirabaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firabaseQuestions).map(
                ([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighLighted: value.isHighLighted,
                        isAnswered: value.isAnswered,
                        likeCount: Object.values(value.likes ?? {}).length,
                        // função some retorna o objeto se foi encontrado - true pra sim e false pra não,
                        likeId: Object.entries(value.likes ?? {}).find(([key, like])=> like.authorId === user?.id)?.[0]
                    }
                });
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

        return () => {
            roomRef.off('value');
        }

    }, [roomId, user?.id]);
    return {
        questions, title
    }

}