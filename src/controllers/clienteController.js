// 'import * as' para agrupar todas as exportacoes do service.
import * as clienteService from '../services/clienteService.js';
import joi from 'joi';

//usando 'export const'
export const clienteCreateSchema = joi.object({
    cpf: joi.string().length(11).required(),
    nome: joi.string().required().max(100),
    endereco: joi.string().required(),
    bairro: joi.string().required(),
    cidade: joi.string().required(),
    cep: joi.string().required(),
    telefone: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().min(6).required(),
});
export const clienteUpdateSchema = joi.object({
    nome: joi.string().max(100),
    endereco: joi.string(),
    bairro: joi.string(),
    cidade: joi.string(),
    cep: joi.string(),
    telefone: joi.string(),
    email: joi.string().email(),
    senha: joi.string().min(6), 
}).min(1);

export const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteService.findAll();
    res.status(200).json(clientes);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
 
export const listarClienteCpf = async (req, res) => {
  try {
    const { cpf } = req.params;
    const cliente = await clienteService.findByCpf(cpf);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json(cliente);
  } catch (err) {
    console.error('Erro ao buscar cliente:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
 
export const adicionarCliente = async (req, res) => {
  try {
    const novoCliente = await clienteService.create(req.body);
    res.status(201).json({ message: 'Cliente adicionado com sucesso', data: novoCliente });
  } catch (err) {
    console.error('Erro ao adicionar cliente:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'CPF já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar cliente' });
  }
};
 
export const atualizarCliente = async (req, res) => {
  try {
    const { cpf } = req.params;
    const updated = await clienteService.update(cpf, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};
 
export const deletarCliente = async (req, res) => {
  try {
    const { cpf } = req.params;
    const deleted = await clienteService.remove(cpf);
    if (!deleted) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar cliente:', err);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
};