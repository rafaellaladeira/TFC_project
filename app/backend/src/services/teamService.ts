import TeamDb from '../database/models/team';

export default class Team {
  public getAll = async () => {
    const result = await TeamDb.findAll();
    return result;
  };

  public getById = async (id: number) => {
    const result = await TeamDb.findOne({
      where: { id } });
    return result;
  };
}
