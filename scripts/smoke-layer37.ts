import { sessionHttpRoutes } from '../packages/session-http-route-contracts/src/index.ts';

console.log(
  JSON.stringify(
    {
      open: {
        routeCode: sessionHttpRoutes.open.routeCode,
        method: sessionHttpRoutes.open.method,
        path: sessionHttpRoutes.open.path
      },
      load: {
        routeCode: sessionHttpRoutes.load.routeCode,
        method: sessionHttpRoutes.load.method,
        path: sessionHttpRoutes.load.path
      },
      continuity: {
        routeCode: sessionHttpRoutes.continuity.routeCode,
        method: sessionHttpRoutes.continuity.method,
        path: sessionHttpRoutes.continuity.path
      }
    },
    null,
    2
  )
);
