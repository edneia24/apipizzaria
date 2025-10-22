

 
//Primeira linha do seu projeto. Carrega as variáveis de ambiente antes de qualquer outro código.
import 'dotenv/config';
 
//Sintaxe de importaçãopara todas as dependências.
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; //Necessário para recriar o '__dirname'.
import db from './db/db.js'; // excluir depois
 
// //Importando as rotas com sintaxe ESM.
// import authRoutes from './routes/authRoutes.js'; // Importa as rotas de autenticação
// //import routes from './routes/routes.js';
// import clienteRoutes from './routes/clienteroutes.js';
// //import produtoRoutes from './routes/produtoroutes.js';
 
 
 
// --- CONFIGURAÇÕES ---
//Em ESM, '__dirname' não existe nativamente. Este é o padrão moderno para obtê-lo.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//As opções do CORS permanecem as mesmas, estão bem configuradas.
const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
};
 
// --- INICIALIZAÇÃO DO APP ---
const app = express();//ja tem
 
// --- MIDDLEWARES ---
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());//ja tem
 
//Servindo a pasta 'public' para arquivos estáticos (CSS, JS, imagens).
app.use(express.static(path.join(__dirname, '..', 'public')));
 
// --- ROTAS ---
// Rota principal que serve a página HTML.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'home.html'));
});
 
//Rotas da API prefixadas para melhor organização e versionamento.
// Isso evita conflitos e deixa claro quais rotas pertencem à API.
const apiPrefix = '/api';
//app.use(`${apiPrefix}/`, routes);

 
 
 
 
// // Rotas gerais da API (ex: /api/status)
// app.use(`${apiPrefix}/clientes`, clienteRoutes); // Rotas de clientes (ex: /api/clientes, /api/clientes/123)
// app.use(`${apiPrefix}/login`, authRoutes); // Rota de login
 
// --- TRATAMENTO DE ERROS ---
// Um middleware de erro centralizado.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!');
});
 
// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORTA = process.env.PORT || 3333;//atualizar
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});// ja tem
 