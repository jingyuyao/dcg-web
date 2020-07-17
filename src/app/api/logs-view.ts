import { LogView } from './log-view';

export interface LogsView {
  startIndex: number;
  endIndex: number;
  logs: LogView[];
}
