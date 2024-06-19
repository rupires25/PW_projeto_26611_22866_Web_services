const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient()

function parseDate(dateString) {
    return new Date(dateString);
}

// Testa a ligação
exports.testConnection = async (req, res) => {
    console.log('Testing database connection...');
    try {
        await prisma.$connect();
        console.log('Database connection successful');
        res.send('Ligação bem-sucedida com o PostgreSQL!');
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        res.send('Erro ao conectar ao PostgreSQL:', error);
    } finally {
        await prisma.$disconnect();
        console.log('Disconnected from database');
    }
}

// Devolve todos os clientes
exports.getAll = async (req, res) => {
    console.log('Fetching all clients...');
    try {
        const response = await prisma.clients.findMany();
        console.log('Clients fetched successfully:', response);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ msg: 'Falha ao mostrar todos os clientes' });
    }
}

// Devolve o cliente pelo id
exports.getById = async (req, res) => {
    const id = req.params.id * 1;
    console.log(`Fetching client with id ${id}...`);
    try {
        const response = await prisma.clients.findUnique({
            where: { id: id },
        });
        console.log(`Client with id ${id} fetched successfully:`, response);
        res.status(200).json(response);
    } catch (error) {
        console.error(`Error fetching client with id ${id}:`, error);
        res.status(404).json({ msg: `Falha ao mostrar o cliente com o id ${id}` });
    }
}

// Criar um cliente
exports.create = async (req, res) => {
    const { name, brand, problems, date, passou } = req.body;

    console.log('Received request to create client with data:', {
        name, brand, problems, date, passou
    });

    try {
        const client = await prisma.clients.create({
            data: {
                name: name,
                brand: brand,
                problems: problems,
                date: date,
                passou: passou
            },
        });
        console.log('Client created successfully:', client);
        res.status(201).json(client);
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(400).json({ msg: 'Falha ao criar o cliente.' });
    }
}

// Atualiza cliente
exports.update = async (req, res) => {
    const { id, name, brand, problems, date, passou } = req.body;
    console.log(`Received request to update client with id ${id}...`);

    try {
        const client = await prisma.clients.update({
            where: { id: id * 1 },
            data: { name, brand, problems, date, passou },
        });
        console.log(`Client with id ${id} updated successfully:`, client);
        res.status(200).json(client);
    } catch (error) {
        console.error(`Error updating client with id ${id}:`, error);
        res.status(400).json({ msg: 'Falha ao atualizar o cliente.' });
    }
}

// Apaga cliente pelo id
exports.delete = async (req, res) => {
    const id = req.params.id * 1;
    console.log(`Received request to delete client with id ${id}...`);

    try {
        await prisma.clients.delete({
            where: { id: id },
        });
        console.log(`Client with id ${id} deleted successfully`);
        res.status(200).send(`Cliente com id ${id} apagado.`);
    } catch (error) {
        console.error(`Error deleting client with id ${id}:`, error);
        res.status(400).json({ msg: `Falha a apagar o cliente com id ${id}` });
    }
}
