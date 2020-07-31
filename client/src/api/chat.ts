import api from './';

export async function getChat(queryKey: string, roomKey: string) {
	return (await api.get(`rooms/${roomKey}/`)).data.chatMessages;
}