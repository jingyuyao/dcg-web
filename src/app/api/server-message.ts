export interface ServerMessage {
  kind: ServerMessageKind;
  data: any;
}

export enum ServerMessageKind {
  ATTACHMENT_VIEW = 'ATTACHMENT_VIEW',
  ROOM_LIST = 'ROOM_LIST',
  GAME_ROOM_VIEW = 'GAME_ROOM_VIEW',
  GAME_VIEW = 'GAME_VIEW',
  GAME_LOGS = 'GAME_LOGS',
}
