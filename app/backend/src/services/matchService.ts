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
    console.log(state);
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
}
