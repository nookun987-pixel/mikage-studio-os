/**
 * @package @mikage/scene-graph
 * @wave 15
 *
 * contracts.ts
 */

export interface Scene {
  sceneId: string
  sceneType: "cinematic" | "portrait" | "environment" | "abstract"
  title: string
  description: string
  characters: SceneCharacter[]
  environment: SceneEnvironment
  camera: SceneCamera
  lighting: SceneLighting
  assets: SceneAssetBinding[]
  metadata: SceneMetadata
  createdAt: string
  updatedAt: string
}

export interface SceneNode {
  nodeId: string
  nodeType: "character" | "environment" | "prop" | "light" | "camera"
  name: string
  position: Vector3
  rotation: Vector3
  scale: Vector3
  visible: boolean
  properties: Record<string, unknown>
  children: SceneNode[]
  parentId?: string
}

export interface SceneCharacter {
  characterId: string
  name: string
  role: "protagonist" | "antagonist" | "supporting" | "background"
  appearance: CharacterAppearance
  position: Vector3
  rotation: Vector3
  pose?: string
  expression?: string
  clothing?: string[]
  accessories?: string[]
  importance: number
}

export interface CharacterAppearance {
  gender?: "male" | "female" | "non_binary" | "other"
  age?: string
  ethnicity?: string
  hairColor?: string
  eyeColor?: string
  skinTone?: string
  bodyType?: string
  height?: string
  build?: string
  facialFeatures?: string[]
  style?: string
}

export interface SceneEnvironment {
  environmentId: string
  name: string
  type: "indoor" | "outdoor" | "fantasy" | "sci_fi" | "historical" | "modern"
  location: string
  timeOfDay: "dawn" | "morning" | "noon" | "afternoon" | "evening" | "dusk" | "night"
  weather?: "clear" | "cloudy" | "rainy" | "stormy" | "snowy" | "foggy"
  season?: "spring" | "summer" | "autumn" | "winter"
  architecture?: string
  landscape?: string
  atmosphere: string
  mood: string
  details: EnvironmentDetail[]
}

export interface EnvironmentDetail {
  detailId: string
  type: "prop" | "texture" | "lighting" | "effect" | "background"
  name: string
  description: string
  position?: Vector3
  properties: Record<string, unknown>
}

export interface SceneCamera {
  cameraId: string
  cameraType: "perspective" | "orthographic" | "cinematic"
  position: Vector3
  rotation: Vector3
  target: Vector3
  fov?: number
  focalLength?: number
  aperture?: number
  shotType: "wide" | "medium" | "close_up" | "extreme_close_up" | "establishing" | "tracking"
  angle: "eye_level" | "high_angle" | "low_angle" | "dutch_angle" | "bird_eye" | "worm_eye"
  movement?: "static" | "pan" | "tilt" | "dolly" | "zoom" | "crane" | "handheld"
  focus: string
}

export interface SceneLighting {
  lightingId: string
  setup: "natural" | "studio" | "dramatic" | "soft" | "hard" | "mixed"
  keyLight?: LightSource
  fillLight?: LightSource
  rimLight?: LightSource
  ambientLight?: LightSource
  additionalLights: LightSource[]
  mood: string
  intensity: number
  colorTemperature: number
  shadows: "soft" | "hard" | "none"
}

export interface LightSource {
  lightId: string
  type: "directional" | "point" | "spot" | "area"
  position: Vector3
  rotation: Vector3
  color: string
  intensity: number
  radius?: number
  angle?: number
  castsShadows: boolean
}

export interface SceneAssetBinding {
  assetId: string
  assetType: "texture" | "model" | "reference" | "inspiration"
  bindingType: "character_appearance" | "environment_texture" | "prop" | "lighting_reference" | "style_guide"
  targetNodeId?: string
  targetProperty?: string
  weight: number
  description: string
}

export interface SceneMetadata {
  projectId?: string
  canonId?: string
  canonVersion?: string
  canonVersionId?: string
  tags: string[]
  categories: string[]
  style: string
  genre?: string
  theme?: string
  period?: string
  culturalContext?: string
  technicalNotes?: string
  customFields?: Record<string, unknown>
}

export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface SceneContext {
  scene: Scene
  activeCamera: SceneCamera
  visibleCharacters: SceneCharacter[]
  environmentDetails: EnvironmentDetail[]
  assetBindings: SceneAssetBinding[]
  generationHints: GenerationHint[]
}

export interface GenerationHint {
  hintId: string
  type: "composition" | "lighting" | "character" | "environment" | "style" | "technical"
  priority: number
  content: string
  weight: number
  appliesTo: string[]
}

export interface SceneGraph {
  createScene(sceneData: Omit<Scene, "sceneId" | "createdAt" | "updatedAt">): Promise<Scene>
  getScene(sceneId: string): Promise<Scene | null>
  updateScene(sceneId: string, changes: Partial<Scene>): Promise<Scene | null>
  deleteScene(sceneId: string): Promise<boolean>
  listScenes(filter?: SceneFilter): Promise<Scene[]>
  resolveSceneAssets(scene: Scene): Promise<SceneAssetBinding[]>
}

export interface SceneFilter {
  sceneType?: string
  projectId?: string
  canonId?: string
  tags?: string[]
  categories?: string[]
  style?: string
  genre?: string
  limit?: number
  offset?: number
}

export interface SceneBuilder {
  buildSceneContext(scene: Scene, cameraId?: string): SceneContext
  extractSceneAssets(scene: Scene): SceneAssetBinding[]
  generateScenePrompt(context: SceneContext): string
  extractGenerationParameters(context: SceneContext): Record<string, unknown>
}
