import { Router } from "express";
import { AdminRoutes } from "../modules/admin/route/admin.route";
import { AuthRoutes } from "../modules/auth/route/auth.route";
import { LernersRoutes } from "../modules/lerner/route/lerner.route";
import { LessonsRoutes } from "../modules/lesson/route/lesson.route";
import { TutorialsRoutes } from "../modules/tutorial/route/tutorial.route";
import { UserRoutes } from "../modules/user/route/user.route";
import { VocabulariesRoutes } from "../modules/vocabulary/route/vocabulary.route";

const routes = Router();

// TODO  => All Router

type TRouteModules = { path: string; routes: Router };

const routesModule: TRouteModules[] = [
  {
    path: "/users",
    routes: UserRoutes,
  },
  {
    path: "/admin",
    routes: AdminRoutes,
  },
  {
    path: "/auth",
    routes: AuthRoutes,
  },
  {
    path: "/lerner",
    routes: LernersRoutes,
  },
  {
    path: "/lesson",
    routes: LessonsRoutes,
  },
  {
    path: "/vocabulary",
    routes: VocabulariesRoutes,
  },
  {
    path: "/tutorial",
    routes: TutorialsRoutes,
  },
];

// TODO: Implement routes here
routesModule.forEach((item: TRouteModules) =>
  routes.use(item.path, item.routes),
);

export default routes;
