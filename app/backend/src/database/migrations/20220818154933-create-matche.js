'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hometeam: {
        type: Sequelize.INTEGER,
        field: 'home_team',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
      },
      hometeamgoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
        allowNull: false,
      },
      awayteam: {
        type: Sequelize.INTEGER,
        field: 'away_team',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
      },
      awayteamgoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
        allowNull: false,
      },
      inprogress: {
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};