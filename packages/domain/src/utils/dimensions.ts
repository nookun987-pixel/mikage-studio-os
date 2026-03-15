export type AspectRatio = '1:1' | '3:4' | '4:3' | '16:9' | '9:16';

const DIMENSION_MAP: Record<AspectRatio, { width: number; height: number }> = {
  '1:1': { width: 1024, height: 1024 },
  '3:4': { width: 960, height: 1280 },
  '4:3': { width: 1280, height: 960 },
  '16:9': { width: 1600, height: 900 },
  '9:16': { width: 900, height: 1600 }
};

export const mapAspectRatioToDimensions = (aspectRatio: AspectRatio) =>
  DIMENSION_MAP[aspectRatio];
