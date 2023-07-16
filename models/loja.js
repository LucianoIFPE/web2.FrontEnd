const db = require('./db')


const loja = db.sequelize.define('loja',{

    nome:{
        unique: true,
        type: db.Sequelize.STRING
    },

    CNPJ:{
        type: db.Sequelize.INTEGER,
         unique: true
    },

});








loja.sync({force:true})
module.exports = loja;