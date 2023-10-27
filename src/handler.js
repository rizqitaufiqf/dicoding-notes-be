import { nanoid } from 'nanoid';
import { notes } from './notes.js';

const addNoteHandler = (request, h) => {
    const date = new Date().toISOString();
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const cratedAt = date;
    const updatedAt = date;

    const newNote = {
        title,
        tags,
        body,
        id,
        cratedAt,
        updatedAt,
    };
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        return h
            .response({
                status: 'success',
                statusCode: 200,
                message: 'Notes successfully added',
                data: {
                    noteId: id,
                },
            })
            .code(201);
    }

    return h
        .response({
            status: 'failed',
            statusCode: 500,
            message: 'Notes failed to added',
        })
        .code(500);
};

const getAllNotesHandler = () => ({
    status: 'success',
    statusCode: 200,
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            statusCode: 200,
            data: {
                note,
            },
        };
    }

    return h
        .response({
            status: 'failed',
            statusCode: 404,
            message: 'Note not found',
        })
        .code(404);
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };

        return h.response({
            status: 'success',
            statusCode: 200,
            message: 'Note successfully updated',
        });
    }

    return h
        .response({
            status: 'failed',
            statusCode: 404,
            message: 'Note not found',
        })
        .code(404);
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        return h.response({
            status: 'success',
            statusCode: 200,
            message: 'Note successfully deleted',
        });
    }

    return h.response({
        status: 'failed',
        statusCode: 404,
        message: 'Note not found',
    });
};

export {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
