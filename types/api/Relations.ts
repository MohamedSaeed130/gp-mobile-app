import { UserInfo } from "./Users";

type RelationType = "relation" | "incoming" | "outgoing";

export type RelationRequestStatus = "accepted" | "rejected" | "canceled";

export interface Relation {
  id: number;
  type: RelationType;
  user: UserInfo | { id: number };
}
