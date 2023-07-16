const express = require("express");
const router = express.Router();
const Cliente = require('../models/cliente')
router.get('/',(req,res)=>{
    res.render('home')
})


router.get('/cadastro',(req,res)=>{
    res.render('cadastroCliente')
   
})

router.get('/login',(req,res)=>{
    res.render('login')
})

    router.post('/login',(req,res)=>{
   Cliente.create({
    nome: req.body.nome,
    dataNascimento: req.body.data,
    email: req.body.email,
    senha: req.body.password,
    Cpf: req.body.cpf,
    Cep: req.body.cep,
    numero: req.body.numero,
    bairro: req.body.bairro,
    Estado: req.body.estado
       }).then(()=>{
        res.render('login')
   }).catch((error)=>{
        console.log("erro"+error)
   })
})


router.get('/loja',(req,res)=>{
    res.render('lojaCliente')
});

// -----------CRUD DO USUARIO------------------- //
router.get('/minhaconta',(req,res)=>{
    res.render('opcaousuario')
})


router.get('/detalhes',(req,res)=>{
    res.render('preDetalhe')
})


router.post("/detalhes",(req,res)=>{
    Cliente.findOne({where:{Cpf:req.body.cpf}}).then((cliente)=>{
        res.render('detalhes',{cliente:cliente})
    })  
    
})






router.get('/deletarusuario',(req,res)=>{
    res.render('deletarUsuario')
})

router.post('/deletarusuario',(req,res)=>{
    Cliente.destroy({where:{'cpf': req.body.cpf} })
    res.send("Usuario deletado com sucesso!")
})

router.get('/atualizarcadastro',(req,res)=>{
            
                res.render('PreEditar')
       
})

router.post('/atualizarcadastro',(req,res)=>{
     Cliente.findOne({where:{Cpf:req.body.cpf}}).then((cliente)=>{
        res.render('atualizarUsuario',{cliente:cliente})
    })
   
})


router.post('/atualizado',(req,res)=>{
    Cliente.update({
        nome: req.body.nomeT,
        Cpf: req.body.cpf,
        dataNascimento: req.body.data,
        email: req.body.email,
        senha: req.body.password,
        Cep: req.body.cep,
        numero: req.body.numero,
        bairro: req.body.bairro,
        Estado: req.body.estado
    },
        {where:{Cpf: req.body.cpf}},
        res.send("Atualizado com sucesso")
)})



   




module.exports = router;