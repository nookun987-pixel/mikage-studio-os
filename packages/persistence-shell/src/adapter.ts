import type {
  IngestionArtifactShell,
  LineageEdgeShell,
  LineageNodeShell
} from '@mikage/contracts';

export type LocalPersistenceAdapter = {
  adapterCode: 'local_repository_adapter';
  mode: 'dry_run';
  persistArtifacts: (artifacts: IngestionArtifactShell[]) => IngestionArtifactShell[];
  persistLineage: (
    nodes: LineageNodeShell[],
    edges: LineageEdgeShell[]
  ) => {
    nodes: LineageNodeShell[];
    edges: LineageEdgeShell[];
  };
};

export const localPersistenceAdapter: LocalPersistenceAdapter = {
  adapterCode: 'local_repository_adapter',
  mode: 'dry_run',
  persistArtifacts: (artifacts) => artifacts,
  persistLineage: (nodes, edges) => ({ nodes, edges })
};
