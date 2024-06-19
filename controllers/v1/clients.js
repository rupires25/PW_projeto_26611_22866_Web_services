const { json } = require('body-parser');
const fs = require('fs');

//devolve todos os clientes
exports.getAll = async (req, res) => {
    //ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //devolver os clientes
    return res.send(data.clients);
}


//devolve o cliente com o id
exports.getById = async (req, res) => {
    //obter o id do cliente
    const id = req.params.id;
    //ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar um cliente com o id
    const clients = data.clients.filter(clients => clients.id == id);
    //devolve o cliente
    res.send(clients);
}


//cria um cliente
exports.create = async (req, res) => {
    //obter o cliente pelas características enviadas
    const {id, name, brand, problems, date, passou} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //adicionar cliente à lista
    data.clients.push(req.body);
    //Criar o novo ficheiro com o cliente adicionado
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolve o novo cliente
    return res.status(201).send(req.body);
}



//atualiza o cliente
exports.update = async (req, res) => {
    //obter o cliente pelas características enviadas
    const {id, name, brand, problems, date, passou} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o cliente para actualizar
    const clients = data.clients.find(clients => clients.id == id);
    //atualizar as caraterísticas
    clients.name = name;
    clients.brand = brand;
    clients.problems = problems;
    clients.date = date;
    clients.passou = passou;
    //actualizar no ficheiro json
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolver o cliente alterado
    return res.send({id, name, brand, problems, date, passou});
}


//apaga o cliente com o id
exports.delete = async (req, res) => {
    //obter o id do cliente
    const id = req.params.id;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o indice do cliente a ser procurada
    const clientIndex  = data.clients.findIndex(clients => clients.id == id);
     // Verifique se o cliente foi encontrado
    if (clientIndex !== -1) {
        // Exclua o estudante do array de estudantes
        const apagaCliente = data.clients.splice(clientIndex, 1)[0];
        // Atualize o ficheiro json
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Retorne o cliente excluído como resposta
        return res.status(200).send(apagaCliente);
    } else {
        // Caso o cliente não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Cliente não encontrado");
    }
}