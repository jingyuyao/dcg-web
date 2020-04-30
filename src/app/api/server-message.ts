export interface ServerMessage {
  kind: ServerMessageKind;
  data: any;
}

export enum ServerMessageKind {
  ATTACHMENT_VIEW = 'ATTACHMENT_VIEW',
  ROOM_LIST = 'ROOM_LIST',
  ROOM_VIEW = 'ROOM_VIEW',
  WORLD_VIEW = 'WORLD_VIEW',
}
