import { Analyzer } from "../Summary";
import { MatchData } from "../MatchData";
import { MatchResult } from "../MatchResult";

export class WinsAnalysis implements Analyzer {
  constructor(public teamName: string) {}

  run(matches: MatchData[]): string {
    let winCount = 0;

    for (let match of matches) {
      if (match[1] === this.teamName && match[5] === MatchResult.HomeWin) {
        winCount++;
      } else if (
        match[2] === this.teamName &&
        match[5] === MatchResult.AwayWin
      ) {
        winCount++;
      }
    }

    return `Team ${this.teamName} won ${winCount} games.`;
  }
}
