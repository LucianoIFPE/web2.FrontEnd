const db = require('./db');

const fornecedor = db.sequelize.define('fornecedore',{

    nome:{
        unique: true,
        type: db.Sequelize.STRING
    }
});
fornecedor.sync({force:true})
module.exports = fornecedor;