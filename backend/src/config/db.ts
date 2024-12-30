import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gestion_eventos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
