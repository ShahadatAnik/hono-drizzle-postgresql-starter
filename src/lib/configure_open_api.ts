import { apiReference } from "@scalar/hono-api-reference";

import env from "@/env";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json" with { type: "json" };

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",

    // basePath: env.SERVER_URL,

    info: {
      title: "FZL ERP API",
      description: "FZL API Documentation",
      contact: { name: "RBR", email: "rafsan@fortunezip.com" },
      version: packageJSON.version,
    },
    servers: [
      { url: env.SERVER_URL, description: "Dev" },
      { url: env.SERVER_URL, description: "Prod" },
    ],

  });

  app.get(
    "/reference",
    apiReference({
      pageTitle: "FZL API Reference",
      theme: "kepler",
      layout: "modern",
      // layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      // isEditable: true,
      spec: {
        url: "/doc",
      },
      // hideModels: true,
      hideDownloadButton: true,
      hiddenClients: true,
      withDefaultFonts: true,
      authentication: {
        preferredSecurityScheme: "bearerAuth",
        securitySchemes: {
          bearerAuth: {
            type: "http",
            description: "JWT Authorization header using the Bearer scheme. Please input without Bearer prefix",
            name: "Authorization",
            in: "header",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },

      },
      operationsSorter: "method",

    }),
  );
}
