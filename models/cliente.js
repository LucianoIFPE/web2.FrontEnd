const db = require('./db')

const Cliente = db.sequelize.define('Cliente',{

    nome:{
        type: db.Sequelize.STRING
    },


    dataNascimento:{
        type: db.Sequelize.DATE
    },

    email:{
        type: db.Sequelize.STRING,
        unique: true
    },

    senha:{
        type: db.Sequelize.STRING
    },
   
    Cpf:{
        type: db.Sequelize.STRING,
        unique: true
        
    },

    Cep:{
        type: db.Sequelize.INTEGER
    },

    numero:{
        type: db.Sequelize.INTEGER
    },
    
    bairro:{
        type: db.Sequelize.STRING
    },

    
    Estado:{
        type: db.Sequelize.STRING
    }
});


Cliente.sync({force:true})
module.exports = Cliente;

