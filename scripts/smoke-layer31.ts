import { createStudioWebShell } from '../packages/studio-web-shell/src/index.ts';

const shell = createStudioWebShell({
  title: 'Mikage Studio OS',
  hostBaseUrl: 'http://127.0.0.1:43130',
  activeRegion: 'execution'
});

console.log(
  JSON.stringify(
    {
      title: shell.state.title,
      activeRegion: shell.state.activeRegion,
      navigationCount: shell.state.navigation.length,
      hasExecutionMount: shell.render().includes('studio-execution-panel')
    },
    null,
    2
  )
);
