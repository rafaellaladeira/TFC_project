import Error from '../helpers/httpError';
import MatchesDb from '../database/models/match';
import team from '../database/models/team';

export default class Matches {
  public getAllMatches = async (): Promise<MatchesDb[]> => {
    const result = await MatchesDb.findAll({
      include: [{
        model: team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
      ],
    });

    return result;
  };

  public getBySearch = async (state: any): Promise<MatchesDb[]> => {
    const result = await MatchesDb.findAll({
      where: { inProgress: state },
      include: [{
        model: team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
      ],
    });
    return result;
  };

  public createNewMatch = async (body: any) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    if (homeTeam === awayTeam) {
      throw new Error(401, 'It is not possible to create a match with two equal teams');
    }
    const result = await team.findOne({ where: { id: homeTeam }, logging: console.log });
    const result2 = await team.findOne({ where: { id: awayTeam } });
    if (result === null || result2 === null) throw new Error(404, 'There is no team with such id!');

    const data = await MatchesDb.create({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true });
    return data;
  };

  public changeInProgress = async (id: number) => {
    await MatchesDb.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  public updateMatch = async (send: any) => {
    const { id, data } = send;
    const { homeTeamGoals, awayTeamGoals } = data;
    await MatchesDb.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id, inProgress: true } },
    );
  };
}
