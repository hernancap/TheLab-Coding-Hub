import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Inscripcion extends Model {
    public id!: number;
    public id_evento!: number;
    public id_usuario!: number;
}

Inscripcion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Inscripcion',
        tableName: 'inscripciones',
        timestamps: true,
    }
);

export default Inscripcion;
