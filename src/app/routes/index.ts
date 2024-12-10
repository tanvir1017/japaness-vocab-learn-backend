import { Router } from "express";
import { AdminRoutes } from "../modules/admin/route/admin.route";
import { AuthRoutes } from "../modules/auth/route/auth.route";
import { LernersRoutes } from "../modules/lerner/route/lerner.route";
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
    path: "/auths",
    routes: AuthRoutes,
  },
  {
    path: "/lerner",
    routes: LernersRoutes,
  },
];

// TODO: Implement routes here
routesModule.forEach((item: TRouteModules) =>
  routes.use(item.path, item.routes),
);

export default routes;
