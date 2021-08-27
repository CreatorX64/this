import { CsvFileReader } from "./CsvFileReader";
import { DataReader } from "./DataReader";
import { dateStringToDate } from "./utils";
import { MatchData } from "./MatchData";
import { MatchResult } from "./MatchResult";

export class MatchReader {
  matches: MatchData[] = [];

  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read();
    this.matches = this.reader.data.map((row: string[]): MatchData => {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        Number(row[3]),
        Number(row[4]),
        row[5] as MatchResult,
        row[6]
      ];
    });
  }

  static fromCsv(fileName: string): MatchReader {
    return new MatchReader(new CsvFileReader(fileName));
  }
}
