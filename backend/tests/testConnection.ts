import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gestion_eventos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log('Base de datos sincronizada');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

syncDatabase();
