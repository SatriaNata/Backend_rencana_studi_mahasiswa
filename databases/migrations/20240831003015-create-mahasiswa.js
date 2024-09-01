module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('mahasiswa', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            nim: {
                type: Sequelize.STRING,
            },
            nama: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
            },
            no_hp: {
                type: Sequelize.STRING,
            },
            alamat: {
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        })
    },
    down: (queryInterface) => queryInterface.dropTable('mahasiswa'),
};
