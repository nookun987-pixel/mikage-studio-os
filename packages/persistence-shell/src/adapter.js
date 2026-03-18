export const localPersistenceAdapter = {
    adapterCode: 'local_repository_adapter',
    mode: 'dry_run',
    persistArtifacts: (artifacts) => artifacts,
    persistLineage: (nodes, edges) => ({ nodes, edges })
};
//# sourceMappingURL=adapter.js.map