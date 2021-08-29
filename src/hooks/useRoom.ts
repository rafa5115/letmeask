import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../services/firebase';


type FirabaseQuestions = Record<string, {
    author: {
        name: string
        avatar: string
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
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
}


export function useRoom(roomId: string ){

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
                    }
                });
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

    }, [roomId]);
    return{
        questions, title
    }

}