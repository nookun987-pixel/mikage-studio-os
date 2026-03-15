import {
  runtimeExecutionRoute,
  studioQueryRoute,
  worklistProjectionRoute
} from '../packages/api-route-contracts/src/index.ts';

console.log(
  JSON.stringify(
    {
      runtimeRoute: {
        routeCode: runtimeExecutionRoute.routeCode,
        method: runtimeExecutionRoute.method
      },
      queryRoute: {
        routeCode: studioQueryRoute.routeCode,
        method: studioQueryRoute.method
      },
      worklistRoute: {
        routeCode: worklistProjectionRoute.routeCode,
        method: worklistProjectionRoute.method
      }
    },
    null,
    2
  )
);
