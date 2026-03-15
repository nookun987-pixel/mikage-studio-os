import {
  authContextSchema,
  authorizeAuthContext
} from '../packages/identity-auth-boundary/src/index.ts';

const authContext = authContextSchema.parse({
  authCode: 'auth_layer49_001',
  actor: {
    userCode: 'user_mikage_operator',
    displayName: 'Mikage Operator'
  },
  sessionOwnerships: [
    {
      sessionCode: 'session_layer49_001',
      ownerUserCode: 'user_mikage_operator'
    }
  ],
  permissions: [
    { scope: 'runtime.execute', granted: true },
    { scope: 'session.manage', granted: true },
    { scope: 'studio.query', granted: true }
  ]
});

const decision = authorizeAuthContext(authContext, [
  'runtime.execute',
  'session.manage'
]);

console.log(
  JSON.stringify(
    {
      authCode: authContext.authCode,
      actor: authContext.actor.userCode,
      decision: decision.decision,
      missingScopes: decision.missingScopes
    },
    null,
    2
  )
);
