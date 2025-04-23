import APIError from "../errors/APIError";
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
  if (body.status === "error") throw new APIError(body.error);
};

export const deleteRelation = async (
  relationId: number,
  accessToken: string
) => {
  const response = await fetch(`${API_BASE_URL}/relations/${relationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const body = await response.json();
    throw new APIError(
      body?.status === "error"
        ? body.error
        : { message: "Failed to delete relation" }
    );
  }
};
