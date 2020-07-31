import create from 'zustand';

export interface Message {
	author: string,
	text: string
}

const [useChat, chatStore] = create(set => ({
	messageList: [] as Message[],
	setMessageList: (messageList: Message[]) => set({ messageList }),
	addMessage: (author: string, text: string) => set(state => ({ messageList: [...state.messageList, { author, text }] }))
}));

export {
	useChat,
	chatStore
};
