export interface ICheckerConfig {
  id: string;
  title: string;
  year: number;
}

export type Checker = (config: ICheckerConfig) => Promise<boolean>;
