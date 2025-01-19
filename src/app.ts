import configureOpenAPI from "@/lib/configure_open_api";
import createApp from "@/lib/create_app";
import routes from "@/routes/index.route";

const app = createApp();

configureOpenAPI(app);

// ! don't put a trailing slash
export const basePath = "/v1";

routes.forEach((route) => {
  app.route(basePath, route);
});

export type AppType = typeof routes[number];

export default app;
