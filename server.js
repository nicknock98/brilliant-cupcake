const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


let cart = [];


app.post('/add-to-cart', (req, res) => {
  const { name, quantity, price } = req.body;

  // Verifique se os dados estão corretos
  if (!name || !quantity || !price) {
    return res.status(400).json({ message: 'Dados incompletos!' });
  }

  const item = {
    id: Date.now(), // Usando o timestamp como ID único
    name,
    quantity,
    price,
    totalPrice: price * quantity,
  };

  // Adiciona o item ao carrinho, que está armazenado no array
  cart.push(item);

  // Retorna o item adicionado
  res.status(201).json(item);
});



app.get('/cart', (req, res) => {
  res.status(200).json(cart);
});

app.delete('/remove-from-cart/:id', (req, res) => {
  const { id } = req.params;

 
  const index = cart.findIndex(item => item.id === parseInt(id));

  if (index === -1) {
    return res.status(404).send('Item não encontrado');
  }


  const removedItem = cart.splice(index, 1);

  res.status(200).json(removedItem[0]);
});
