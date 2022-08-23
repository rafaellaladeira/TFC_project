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
  homeTeam: {
    type: INTEGER,
    field: 'home_team',
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    field: 'away_team',
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayteamgoals: {
    type: INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
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

team.hasMany(match, { foreignKey: 'homeTeam', as: 'teamHome' });
team.hasMany(match, { foreignKey: 'awayTeam', as: 'teamAway' });

match.belongsTo(team, { foreignKey: 'homeTeam', as: 'teamHome' });
match.belongsTo(team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default match;
