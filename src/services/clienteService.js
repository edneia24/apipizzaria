//sintaxe de 'import'.note a extensao'.js'no import relativo.
import db from "../db/db";
import bcrypt from 'bcrypt';

//usado 'export const' para exportacoes nomeados.
export const findAll = async () =>{
    const [result] = await db.query('SELECT * FROM cliente');
    return result;
};

export const findByCpf = async (cpf) => {
    const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?',[cpf]);
    return result.length > 0 ? result[0]:null;
};
export const findByEmail = async (email) => {
    const sql = 'SELECT * FROM cliente WHERE email = ?';
    const [rows] = await db.query(sql, [email]);

    // retorna o primeiro cliente encontrado ou null
    return rows[0] || null;
};

export const create = async (clieneData) =>{
    const salRounds = 10;
    const hashedPassword = await bcrypt.hash(clieneData.senha,salRounds);

    const newCliente = {
        ...clieneData,
        senha:hashedPassword,
    };

    await db.query('INSERT INTO cliente set ?',newCliente);
    delete newCliente.senha;
    return newCliente;
};

export const update = async (cpf,clienteData) =>{
    if (clienteData.senha){
        const salRounds = 10;
        clienteData.senha = await bcrypt.hash(clienteData.senha,salRounds);
    }
    const [result] = await db.query('UPDATE cliente SET ? WHERE cpf = ?',
    [clienteData,cpf]);
    return result.affectedRows > 0;
};

export const remove = async (cpf) =>{
    const [result] = await db.query('DELETE FROM cliente WHERE cpf = ?',[cpf]);
    return result.affectedRows > 0;
}