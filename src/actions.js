import { ADD_TASK, DELETE_TASK, SET_TASKS } from './actionTypes';

const API_URL = 'http://localhost:5000/tasks';

export const fetchTasks = () => async (dispatch) => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        dispatch({ type: SET_TASKS, payload: data });
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
};

export const addTask = (newTask) => async (dispatch) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        const data = await response.json();
        dispatch({ type: ADD_TASK, payload: data });
    } catch (error) {
        console.error('Failed to add task:', error);
    }
};

export const deleteTask = (id) => async (dispatch) => {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        dispatch({ type: DELETE_TASK, payload: id });
    } catch (error) {
        console.error('Failed to delete task:', error);
    }
};
