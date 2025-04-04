export interface IMessage {
  id: string;
  name?: string;
  content?: string;
  message_type: "question" | "message";
  question?: string;
  only_one_selection?: boolean;
  is_sent_by_user: boolean;
  created_at: string;
}
