import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todo from './components/Todo';
import { TodoProvider } from './context/TodoContext';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return (
        <TodoProvider>
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Todo />} />
                            {/* inne trasy tutaj */}
                        </Routes>
                    </div>
                </Router>
            </Provider>
        </TodoProvider>
    );
};

export default App;

//json-server --watch db.json --port 5000