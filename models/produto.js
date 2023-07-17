const db = require('./db')


const produto = db.sequelize.define('produto',{
   
    nome:{
        type: db.Sequelize.STRING
    },

    marca:{
        type: db.Sequelize.STRING
    },

    Preco:{
        type: db.Sequelize.DOUBLE(6,2)
    },
   
    nome_loja: {
        type: db.Sequelize.STRING
    },
    
     id_loja:{
        type: db.Sequelize.INTEGER,
        foreignKey: 'id_loja'
        
    },
    
});







produto.sync({force:true})
module.exports = produto;