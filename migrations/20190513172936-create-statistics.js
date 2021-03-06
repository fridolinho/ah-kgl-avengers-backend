
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('statistics', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    articleId: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'articles',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    totalTime: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: queryInterface => queryInterface.dropTable('statistics')
};
