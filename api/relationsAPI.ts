import { RelationRequestStatus } from "../types/api/Relations";
import API_BASE_URL from "./constants/API_BASE_URL";

export const changeRelationRequestStatus = async (
  status: RelationRequestStatus,
  relationId: number,
  accessToken: string
) => {
  const response = await fetch(`${API_BASE_URL}/relations/${relationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ status }),
  });
  const body = await response.json();
  if (body.status !== "success") throw new Error();
};

export const deleteRelation = async (relationId: number, accessToken: string) =>
  await fetch(`${API_BASE_URL}/relations/${relationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
