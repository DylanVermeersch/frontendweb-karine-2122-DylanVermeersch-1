import { axios } from '.';

export const getAllNotes = async () => {
    const { data } = await axios.get(
        'notes',
        {
            params: {
                limit: 25,
                offset: 0,
            }
        } 
    );

    return data;
};

export const saveNote = async ({
    id,
    title,
    text,
    date,
    userId,
}) => {
    const { data } = await axios({
        method: id ? 'put' : 'post',
        url: `notes/${id ?? ''}`,
        data: {
            title,
            text,
            date,
            userId,
        },
    });

    return data;
};

export const deleteNote = async (id) => {
    await axios.delete(`notes/${id}`);
};