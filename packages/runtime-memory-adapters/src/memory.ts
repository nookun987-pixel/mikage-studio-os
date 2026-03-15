import {
  runtimeMemorySnapshotSchema,
  type JobRecord,
  type RouteRecord,
  type RuntimeMemorySnapshot,
  type SessionRecord
} from './contracts.js';

export const createRuntimeMemoryAdapters = () => {
  const routes = new Map<string, RouteRecord>();
  const jobs = new Map<string, JobRecord>();
  const sessions = new Map<string, SessionRecord>();

  return {
    saveRoute(routeCode: string, value: RouteRecord) {
      routes.set(routeCode, value);
      return value;
    },
    saveJob(jobCode: string, value: JobRecord) {
      jobs.set(jobCode, value);
      return value;
    },
    saveSession(sessionCode: string, value: SessionRecord) {
      sessions.set(sessionCode, value);
      return value;
    },
    getRoute(routeCode: string) {
      return routes.get(routeCode) ?? null;
    },
    getJob(jobCode: string) {
      return jobs.get(jobCode) ?? null;
    },
    getSession(sessionCode: string) {
      return sessions.get(sessionCode) ?? null;
    },
    snapshot(): RuntimeMemorySnapshot {
      return runtimeMemorySnapshotSchema.parse({
        routeCount: routes.size,
        jobCount: jobs.size,
        sessionCount: sessions.size
      });
    }
  };
};
