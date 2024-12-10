import { Router } from "express";
import { AdminRoutes } from "../modules/admin/route/admin.route";
import { AuthRoutes } from "../modules/auth/route/auth.route";
import { UserRoutes } from "../modules/user/route/user.route";

const routes = Router();

// TODO  => All Router

type TRouteModules = { path: string; routes: Router };

const routesModule: TRouteModules[] = [
  {
    path: "/users",
    routes: UserRoutes,
  },
  {
    path: "/admins",
    routes: AdminRoutes,
  },
  {
    path: "/auth",
    routes: AuthRoutes,
  },
];

// TODO: Implement routes here
routesModule.forEach(({ path, routes }: TRouteModules) =>
  routes.use(path, routes),
);

export default routes;
