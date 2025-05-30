const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

require('dotenv').config();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (juegos normales) pasamos los independientes tambien para un solo index
app.get('/', (req, res) => {
    const games = JSON.parse(fs.readFileSync('games.json', 'utf-8'));
    const indepent = JSON.parse(fs.readFileSync('independientes.json', 'utf-8'));

    res.render('index', { 
        games, 
        indepent,
        isIndependent: false 
    });
});

// Ruta para juegos independientes
// app.get('/independientes', (req, res) => {
//     const indepent = JSON.parse(fs.readFileSync('independientes.json', 'utf-8'));
//     res.render('independientes', { games: indepent, isIndependent: true });
// });

// Ruta para juegos normales individuales
app.get('/game/:id', (req, res) => {
    try {
        const games = JSON.parse(fs.readFileSync('games.json', 'utf-8'));
        const gameId = parseInt(req.params.id);
        
        const game = games.find(g => g.id === gameId);
        
        if (game) {
            const similarGames = games
                .filter(g => g.category === game.category && g.id !== game.id)
                .slice(0, 4);
            
            res.render('game', { 
                game,
                similarGames,
                isIndependent: false
            });
        } else {
            res.status(404).send('Juego no encontrado');
        }
    } catch (error) {
        console.error('Error al cargar el juego:', error);
        res.status(500).send('Error al cargar el juego');
    }
});

// Ruta para juegos independientes individuales
app.get('/independiente/:id', (req, res) => {
    try {
        const indepent = JSON.parse(fs.readFileSync('independientes.json', 'utf-8'));
        const gameId = parseInt(req.params.id);
        
        const game = indepent.find(g => g.id === gameId);
        
        if (game) {
            const similarGames = indepent
                .filter(g => g.category === game.category && g.id !== game.id)
                .slice(0, 4);
            
            res.render('independiente', { 
                game,
                similarGames,
                isIndependent: true
            });
        } else {
            res.status(404).send('Juego no encontrado');
        }
    } catch (error) {
        console.error('Error al cargar el juego:', error);
        res.status(500).send('Error al cargar el juego');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('SIGTERM', () => Server.console());

