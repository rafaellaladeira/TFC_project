// import createStatsCollector = require('mocha/lib/stats-collector');
// import team from '../database/models/team';
import MatchesDb from '../database/models/match';

export default class Leader {
//   public getAllHome = async () => {
  //         totalPoints: "",
  //         totalGames: "",
  //         totalVictories: "",
  //         totalDraws: "",
  //         totalLosses: "",
  //         goalsFavor: "",
  //         goalsOwn: "",
  //         goalsBalance: "",
  //         efficiency: "",
  //     }

  public filterHome = async () => {
    //     const getTeams = await team.findAll();
    //     const teamMap = Promise.all(getTeams.map(async ({ id, teamName }) => {
    //       const getMatches = await MatchesDb.findAll({ where: { homeTeam: id, inProgress: false } });
    //       const result = getAllHome(getMatches);
    //       return {
    //         name: teamName,
    //         ...result,
    //       };
    //       return teamMap;
    //     }));

    //     const orderBy = async () => {
    //         const resultOrder = await this.filterHome();
    //         const result = resultOrder.sort((a,b) => b.totalPoints)
    //     }
    const result = await MatchesDb.sequelize?.query(`
    SELECT T.team_name AS name,(SUM(M.home_team_goals > M.away_team_goals)*3 +
    SUM(M.home_team_goals = M.away_team_goals)) AS totalPoints,
    COUNT(M.home_team) AS totalGames,
    SUM(M.home_team_goals > M.away_team_goals) AS totalVictories,
    SUM(M.home_team_goals = M.away_team_goals) AS totalDraws,
    SUM(M.home_team_goals < M.away_team_goals) AS totalLosses,
    SUM(M.home_team_goals) AS goalsFavor, SUM(M.away_team_goals) AS goalsOwn,
    (SUM(M.home_team_goals) - SUM(M.away_team_goals)) AS goalsBalance,
    ROUND(((SUM(M.home_team_goals > M.away_team_goals)*3 + SUM(M.home_team_goals =
        M.away_team_goals)) / (COUNT(M.home_team) * 3)) * 100,2) as efficiency
    FROM matches AS M
    INNER JOIN teams AS T
    ON M.home_team = T.id
    WHERE M.in_progress = 0
    GROUP BY T.team_name
    ORDER BY totalPoints DESC, totalLosses, goalsFavor DESC, goalsOwn;`);
    return result;
  };

  public filterAway = async () => {
    const result = await MatchesDb.sequelize?.query(`
    SELECT T.team_name AS name,(SUM(M.home_team_goals < M.away_team_goals)*3 + 
SUM(M.home_team_goals = M.away_team_goals)) AS totalPoints,
COUNT(M.away_team) AS totalGames, 
SUM(M.home_team_goals < M.away_team_goals) AS totalVictories,
SUM(M.home_team_goals = M.away_team_goals) AS totalDraws,
SUM(M.home_team_goals > M.away_team_goals) AS totalLosses,
SUM(M.away_team_goals) AS goalsFavor, SUM(M.home_team_goals) AS goalsOwn,
(SUM(M.away_team_goals) - SUM(M.home_team_goals)) AS goalsBalance,
ROUND(((SUM(M.home_team_goals < M.away_team_goals)*3 + SUM(M.home_team_goals = 
    M.away_team_goals)) / (COUNT(M.away_team) * 3)) * 100,2) as efficiency
FROM matches M INNER JOIN teams T ON M.away_team = T.id
WHERE M.in_progress = 0 GROUP BY T.id
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;`);
    return result;
  };

  public filterAll = async () => {
    const [away]: any = await this.filterAway();
    // const [home]: any = await this.filterHome();

    console.log(away);
    // return home;
  };
}
