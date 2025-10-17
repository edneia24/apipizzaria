// atualizar o index.js

//1. importa a ferramenta express
import express from 'express'

//2. cria a nossa aplicacao(nosso servidor)
const app = express();

// habilita o express para entender o formato json no corpo das requisicoes
app.use(express.json());
//3. define a porta em que o servidor vai"escutar" os pedidos
const porta = 3333;

// rota principal da  aplicacao
app.get('/', (request,response) =>{
    //req = requisicao (dados do pedido do cliente)
    //res = resposta (o que vamos enviar de volta)
    //estamos enviando uma resposta no formato json
    response.json({message:"bem vindo a api da pizzaria senac!"});
})

//4.manda o servidor ficar"escultando" na porta definida
app.listen(porta,() =>{
    console.log(`servidor rodando na porta ${porta}.Acesse http://localhost:${porta}`);
})

// seus dados mockados (simulando o banco de dados)
const listaDeClientes = [
    {id: 1, nome:'joao silva',email:'joao.silva@exemple.com'},
    {id: 2, nome:'maria santos',email:'maria.santos@exemple.com'},
    {id: 3, nome:'pedro almeida',email:'pedro.almeida@exemple.com'}
];
// rota para listar todos os clientes (seu codigo original)
app.get('/clientes',(req,res)=>{
    res.json(listaDeClientes);
});

// nova rota:para buscar um clientepelo id
app.get('/clientes/:id', (req, res) => {
  // 1. Captura o ID da URL e converte para número
  const idDoCliente = parseInt(req.params.id);
  // 2. Procura o cliente no array usando o método find()
  const cliente = listaDeClientes.find(c => c.id === idDoCliente);
  // 3. Verifica se o cliente foi encontrado
  if (cliente) {
    // Se encontrou, retorna o cliente com status 200 (OK)
    res.json(cliente);
  } else {
    // Se não encontrou, retorna um erro 404 (Not Found)
    res.status(404).json({ mensagem: "Cliente não encontrado." });
  }
});
// Rota para criar um novo cliente
app.post('/clientes', (req, res) => {
  // O middleware express.json() pega o corpo da requisição e o coloca em req.body
  const novoCliente = req.body;
 
  console.log("Recebemos um novo cliente:", novoCliente);
 
  res.json({ message: `Cliente ${novoCliente.nome} cadastrado com sucesso!`, data: novoCliente });
});