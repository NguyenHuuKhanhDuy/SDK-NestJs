export class SocketNotificationMessage {
  title: string;
  content: string;
  createdDate: Date;
}

export class SocketNotificationDto {
  name: string;
  message: SocketNotificationMessage;
  data?: any | null;
}
