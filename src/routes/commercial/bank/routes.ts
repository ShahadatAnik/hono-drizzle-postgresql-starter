import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { notFoundSchema } from "@/lib/constants";
import * as param from "@/lib/param";

import { insertSchema, patchSchema, selectSchema } from "./utils";

const tags = ["commercial.bank"];

export const list = createRoute({
  path: "/commercial/bank",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectSchema),
      "The list of department",
    ),
  },
});

export const create = createRoute({
  path: "/commercial/bank",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertSchema,
      "The department to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSchema,
      "The created department",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/commercial/bank/{uuid}",
  method: "get",
  request: {
    params: param.uuid,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSchema,
      "The requested department",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Department not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(param.uuid),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: "/commercial/bank/{uuid}",
  method: "patch",
  request: {
    params: param.uuid,
    body: jsonContentRequired(
      patchSchema,
      "The department updates",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSchema,
      "The updated department",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Department not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchSchema)
        .or(createErrorSchema(param.uuid)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/commercial/bank/{uuid}",
  method: "delete",
  request: {
    params: param.uuid,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Department deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Department not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(param.uuid),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
