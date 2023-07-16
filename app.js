const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser')
const port = 3000;
const Cliente = require('./models/cliente') // Cliente database
const Vendedor = require('./models/vendedor') // vendedor database
const produto = require('./models/produto') // produto database
const loja = require('./models/loja') // loja databse
const fornecedor = require("./models/fornecedor"); //Fornecedor database
const path = require('path');
const { application } = require('express');
const { match } = require('assert');


const rotaVendedor  = require("./routes/vendedor"); //rota vendendores
const rotaCliente = require("./routes/cliente"); //rota clientes


//Bodyparser
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


// handlebars;
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//ARQUIVOS ESTÁTICOS HTML E CSS

app.use(express.static(path.join(__dirname,"public")))


    //Rotas

    app.use('/vendedor',rotaVendedor);
    app.use('/cliente',rotaCliente);
   

 // Rota de cadastro de cliente
app.post('/cadastroCliente', (req, res) => {
    // Aqui você pode processar o cadastro do cliente recebido no req.body
    const cliente = req.body.cliente;
    // Exemplo de salvamento no banco de dados:
    Cliente.cadastro(cliente)
      .then(() => {
        res.send('Cliente cadastrado com sucesso!');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Erro ao cadastrar o cliente.');
      });
  });

   //////LOJA//////

   app.get('/',(req,res)=>{
        res.render('home')
   })




        app.get('/loja',(req,res)=>{
            res.render('loja')
        })

    




    app.listen(port);









