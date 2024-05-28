const API_URL = 'http://localhost:5000/tasks';

export const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

export const addTaskApi = async (task) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    const data = await response.json();
    return data;
};

export const removeTaskApi = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
};
