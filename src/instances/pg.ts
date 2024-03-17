import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.EXTERNAL_DATABASE_URL as string,
    {
        dialect: 'postgres',
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar-se ao banco de dados:', error);
    }
})();