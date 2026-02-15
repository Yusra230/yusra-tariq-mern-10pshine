import {
  getNotesFromServer,
  addNotesToServer,
  updateNotesOnServer,
  deleteNotesFromServer,
} from '../services/notesService';

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockToken = 'fake-token';
const mockNote = {
  id: '1',
  title: 'Test',
  content: 'Content',
  tags: [],
  isPinned: false,
  isArchived: false,
  color: 'blue',
  format: 'plain',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
};

describe('noteService', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    localStorage.setItem('token', mockToken);
  });

  describe('getNotesFromServer', () => {
    test('fetches notes and maps them', async () => {
      const serverNotes = [
        {
          _id: '1',
          title: 'Test',
          content: 'Content',
          tags: [],
          isPinned: false,
          isArchived: false,
          color: 'blue',
          format: 'plain',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => serverNotes,
      });

      const notes = await getNotesFromServer();
      expect(notes).toEqual([mockNote]);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/notes',
        expect.objectContaining({
          headers: { Authorization: `Bearer ${mockToken}` },
        })
      );
    });

    test('throws on error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Unauthorized' }),
      });

      await expect(getNotesFromServer()).rejects.toThrow('Unauthorized');
    });
  });

  describe('addNotesToServer', () => {
    test('sends POST with correct data', async () => {
      const newNote = {
        title: 'New',
        content: 'New content',
        tags: ['test'],
        isPinned: false,
        isArchived: false,
        color: 'pink',
        format: 'plain' as const,
      };
      const serverResponse = {
        _id: '2',
        ...newNote,
        createdAt: '2023-01-02',
        updatedAt: '2023-01-02',
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => serverResponse,
      });

      const result = await addNotesToServer(newNote);
      expect(result).toMatchObject({ id: '2', ...newNote });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/notes',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mockToken}`,
          },
          body: JSON.stringify(newNote),
        })
      );
    });
  });

  describe('updateNotesOnServer', () => {
    test('sends PUT with partial fields', async () => {
      const updates = { title: 'Updated' };
      const serverResponse = {
        _id: '1',
        title: 'Updated',
        content: 'Content',
        tags: [],
        isPinned: false,
        isArchived: false,
        color: 'blue',
        format: 'plain',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => serverResponse,
      });

      const result = await updateNotesOnServer('1', updates);
      expect(result.title).toBe('Updated');
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/notes/1/updatenotes', // your custom path
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updates),
        })
      );
    });
  });

  describe('deleteNotesFromServer', () => {
    test('sends DELETE and returns id', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}), // server might return empty
      });

      const result = await deleteNotesFromServer('1');
      expect(result).toBe('1');
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/notes/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        })
      );
    });
  });
});