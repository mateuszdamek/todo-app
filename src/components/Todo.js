import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, Checkbox, FormControlLabel, List, ListItem, ListItemText, IconButton, Typography, Box, Paper, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchTasks, addTask, deleteTask } from '../actions';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const Todo = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const [taskText, setTaskText] = useState('');
    const [category, setCategory] = useState('');
    const [isDaily, setIsDaily] = useState(false);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = (e) => {
        e.preventDefault();
        const newTask = { text: taskText, category, isDaily };
        dispatch(addTask(newTask));
        setTaskText('');
        setCategory('');
        setIsDaily(false);
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Todo List
                    </Typography>
                    <Box component="form" onSubmit={handleAddTask} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Task text"
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={<Checkbox checked={isDaily} onChange={(e) => setIsDaily(e.target.checked)} />}
                                    label="Daily Task"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} align="right">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                >
                                    Add Task
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <List>
                        {tasks.map((task) => (
                            <ListItem key={task.id} secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            }>
                                <ListItemText primary={`${task.text} - ${task.category} ${task.isDaily ? '(Daily)' : ''}`} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Todo;
