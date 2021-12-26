export interface ICheckerConfig {
  _id: string;
  title: string;
  year: number;
}

export type Checker = (config: ICheckerConfig) => Promise<boolean>;
