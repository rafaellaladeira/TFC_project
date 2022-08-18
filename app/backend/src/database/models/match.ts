import { Model, INTEGER, BOOLEAN } from 'sequelize';
import team from './team';
import db from '.';

class match extends Model {
  id!: number;
  hometeam!: number;
  hometeamgoals!: number;
  awayteam!: number;
  awayteamgoals!: number;
  inprogress!: boolean;
}

match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  hometeam: {
    type: INTEGER,
    field: 'home_team',
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    // onUpdate: 'CASCADE',
    // onDelete: 'CASCADE',
  },
  hometeamgoals: {
    type: INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayteam: {
    type: INTEGER,
    field: 'away_team',
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    // onUpdate: 'CASCADE',
    // onDelete: 'CASCADE',
  },
  awayteamgoals: {
    type: INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inprogress: {
    type: BOOLEAN,
    field: 'in_progress',
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

// match.belongsTo(user, { foreignKey: 'id', as: 'home' });

match.hasMany(team, { foreignKey: 'id', as: 'hometeam' });
match.hasMany(team, { foreignKey: 'id', as: 'awayteam' });

export default match;
