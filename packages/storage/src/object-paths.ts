export interface ObjectPathParts {
  projectId: string;
  jobId: string;
  assetCode: string;
  extension: string;
}

export const buildObjectPath = ({
  projectId,
  jobId,
  assetCode,
  extension
}: ObjectPathParts) => `${projectId}/${jobId}/${assetCode}.${extension}`;
