import { create } from 'zustand';

const mainStore = create((set) => ({
    navItems: [],
    setNavItems: (navItems) => set({ navItems }),
    characters: [],
    setCharacters: (characters) => set({ characters }),
}));

export default mainStore;