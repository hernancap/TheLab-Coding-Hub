import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: 'user' | 'admin';
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'usuarios',
        timestamps: true,
    }
);

export default User;
