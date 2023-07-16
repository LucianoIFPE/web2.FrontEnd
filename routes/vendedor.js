const express = require('express');
const router = express.Router();
const fornecedor = require('../models/fornecedor')
const Produto = require("../models/produto")
const multer = require('multer')
const Vendedor = require("../models/vendedor");
const loja = require('../models/loja')

//multer

const upload = multer({dest:"uploads/"})

router.get('/',(req,res)=>{
    res.render('home')
})

//------- EXIBINDO OS PRODUTOS CADASTRADOS --------//

router.get('/loja',(req,res)=>{
    Produto.findAll().then(function(produtos){
        res.render('loja',{produtos:produtos})
    })
})

// ------------------ Cadastrar vendedor --------------------------//
router.get('/cadastrovendedor',(req,res)=>{
    res.render('cadastroVendedor')
})

router.get("/loginvendedor",(req,res)=>{
    res.render('loginvendedor')
})

router.post('/loginvendedor',(req,res)=>{
Vendedor.create({
    nome: req.body.nome,
    Cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email,
    senha: req.body.password
}).then(()=>{
    res.render('loginvendedor')
}).catch((error)=>{
    console.log("erro"+error)
})})



// ------------------ EXCLUIR VENDEDOR -----------------//

router.get('/deletarvendedor',(req,res)=>{
    res.render('deletarVendedor')
})

router.post('/deletarVendedor',(req,res)=>{
    Vendedor.destroy({where:{'cpf': req.body.cpf} })
    res.send("vendedor deletado com sucesso!")
})



// ------------------ ler dados VENDEDOR -----------------//

router.get('/detalhesvendedor',(req,res)=>{
    res.render('preDetalhesVendedor')
})


router.post("/detalhesvendedor",(req,res)=>{
    Vendedor.findOne({cpf:req.body.cpf}).then((vendedor)=>{
        res.render('detalhesVendedor',{vendedor:vendedor})
    })  
    
})


// ------------------ Cadastrar Produtos --------------------------//
router.get('/cadastroproduto',(req,res)=>{
     fornecedor.findAll().then(function(fornecedor){
        loja.findAll().then(function(loja){
            res.render('cadastraProduto',{fornecedor:fornecedor, loja:loja})
        })
      
    })
    
})   


router.post('/cadastroproduto',(req,res)=>{
    Produto.create({
        nome: req.body.nome,
        marca: req.body.marca,
        cor: req.body.cor,
        Preco: req.body.preco,
        nome_loja: req.body.nome_loja,
        id_loja: (Math.floor(Math.random() * 7000)),
        tamanho: req.body.tamanho
    }).then(()=>{
        res.redirect('loja') 
    }).catch(function(error){
        res.send("Erro, Tente Novamente!")
    })
})

// ------------------ excluir produto --------------------------//
router.get('/loja/:id',(req,res)=>{
    Produto.destroy({
        where:{'id': req.params.id}}).then(()=>{
            res.send("<h1 style='margin: 12rem 40rem;'>PRODUTO DELETADO COM SUCESSO</H1>")
        })
         
})


//-----------------------Editar Produtos -----------------//

router.get('/editarProduto/:id',(req,res)=>{
        Produto.findOne({where:{'id':req.params.id}}).then((produto)=>{
            fornecedor.findAll().then(function(fornecedor){
                loja.findAll().then(function(loja){
                    res.render('editarProduto',{fornecedor:fornecedor, loja:loja, produto: produto})
                })
              
            })
            
        })
     
})


router.post('/editarProduto/:id',(req,res)=>{
        Produto.update({
            nome: req.body.nome,
            tamanho: req.body.tamanho,
            cor: req.body.cor,
            Preco: req.body.preco,
            nome_loja: req.body.nome_loja,
        },
           {where:{id: req.params.id}},
           res.send("<h1 style='margin: 12rem 40rem;'>PRODUTO EDITADO COM SUCESSO</H1>")
            
    )})
   


// ------------------ Cadastrar Fornecedores --------------------------//
router.get('/fornecedor',(req,res)=>{
    res.render('fornecedor')
});

router.post('/fornecedor',(req,res)=>{
        fornecedor.create({
            nome: req.body.fornecedor
        }).then(()=>{
            res.redirect('cadastroproduto')
        }).catch(()=>{
            res.send("NÃO FOI POSSIVEL CADASTRAR O FORNECEDOR, TENTE NOVAMENTE!!!")
        })  
})

// ------------------ Cadastrar loja --------------------------//
router.get('/criarloja',(req,res)=>{
    res.render('criarloja')
})

router.post('/criarloja',(req,res)=>{
    loja.create({
            nome: req.body.nome,
            CNPJ: req.body.CNPJ
    }).then(()=>{
        res.redirect('cadastroproduto')
    }).catch(()=>{
        res.send("NÃO FOI POSSIVEL CADASTRAR A LOJA")
    })
})


module.exports = router;