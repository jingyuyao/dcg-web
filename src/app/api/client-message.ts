export interface ClientMessage {
  kind: ClientMessageKind;
  intArgs?: number[];
  strArgs?: string[];
}

export enum ClientMessageKind {
  INIT_ATTACHMENT = 'INIT_ATTACHMENT',
  GET_ROOM_LIST = 'GET_ROOM_LIST',
  JOIN_ROOM = 'JOIN_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
  START_GAME = 'START_GAME',
  EXECUTE_ACTION = 'EXECUTE_ACTION',
}
