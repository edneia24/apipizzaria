import fs from 'node:fs/promises'

async function lerCardapio() {
    console.log(`pizzaria do sandro`)
    try{
        const lista = await fs.readFile(`pizzas.txt`,`utf-8`)
        console.log(`lista de pizzas:${lista}`)
    
    }catch (error){
        console.error(error)
    }
    
    
}
lerCardapio()
    
    
