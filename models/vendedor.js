const db = require('./db')


const vendedor = db.sequelize.define('Vendedor',{

    Cpf:{
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },

    nome:{
        type: db.Sequelize.STRING
    },

    telefone:{
        type: db.Sequelize.INTEGER
    },

    email:{
        type: db.Sequelize.STRING
    },

    senha:{
        type: db.Sequelize.STRING
    }
})




vendedor.sync({force:true})
module.exports = vendedor;
