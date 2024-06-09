import React from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';
import PropostaEditor from './components/PropostaEditor/PropostaEditor';
import './App.css';

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <AppBar position="static" className="App-header">
                <Toolbar>
                    <Typography variant="h6">
                        PROPOSTAS
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className="container">
                <PropostaEditor />
            </Container>
        </div>
    );
}

export default App;
