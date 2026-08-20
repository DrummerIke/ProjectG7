import { create } from 'zustand';
import type { Note } from '../types';
import { notesApi } from '../services/api';

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  fetchNotes: () => Promise<void>;
  addNote: (content: string) => Promise<void>;
  updateNote: (id: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  isLoading: false,

  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const notes = await notesApi.getAll();
      set({ notes, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addNote: async (content) => {
    const newNote = await notesApi.create(content);
    set((state) => ({ notes: [...state.notes, newNote] }));
  },

  updateNote: async (id, content) => {
    const updatedNote = await notesApi.update(id, content);
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? updatedNote : n)),
    }));
  },

  deleteNote: async (id) => {
    await notesApi.delete(id);
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
  },
}));
