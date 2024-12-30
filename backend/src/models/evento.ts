import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Event extends Model {
    public id!: number;
    public title!: string;
    public description?: string;
    public date!: Date;
    public available_slots!: number;
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        available_slots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Event',
        tableName: 'eventos',
        timestamps: true,
    }
);

export default Event;
