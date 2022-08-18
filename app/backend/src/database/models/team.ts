import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class team extends Model {
  id!: number;
  teamname!: string;
}

team.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teamname: {
    type: STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default team;
