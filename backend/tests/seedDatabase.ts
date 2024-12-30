import sequelize from '../src/config/db.js';
import Event from '../src/models/evento.js';
import User from '../src/models/usuario.js';
import Inscripcion from '../src/models/inscripcion.js';

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Base de datos sincronizada');

        await Event.bulkCreate([
            {
                title: 'Evento 1',
                description: 'Descripción del evento 1',
                date: new Date('2024-01-15'),
                available_slots: 100,
            },
            {
                title: 'Evento 2',
                description: 'Descripción del evento 2',
                date: new Date('2024-02-20'),
                available_slots: 50,
            },
        ]);

        await User.bulkCreate([
            {
                username: 'admin',
                email: 'admin@admin.com',
                password: '123456',
                role: 'admin',
            },
            {
                username: 'user',
                email: 'test@test.com',
                password: 'password',
                role: 'user',
            },
        ]);

        await Inscripcion.sync();

        console.log('Datos de prueba insertados');
    } catch (error) {
        console.error('Error al insertar datos de prueba:', error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();
