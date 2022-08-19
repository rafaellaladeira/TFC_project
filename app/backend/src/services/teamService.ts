import TeamDb from '../database/models/team';

export default class Team {
  public getAll = async () => {
    const result = await TeamDb.findAll();
    return result;
  };
}
