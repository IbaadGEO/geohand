import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

// Only self-hosted files: no third-party code or requests (the site's Content-Security-Policy also blocks them)
const WASM = '/wasm';
const MODEL = '/models/hand_landmarker.task';

export class HandTracker {
  constructor() {
    this.landmarker = null;
    this.ready = false;
    this.info = '';
  }

  /** Loads the self-hosted model, GPU first, then CPU. Throws if both fail. */
  async init() {
    let lastErr = null;
    const fileset = await FilesetResolver.forVisionTasks(WASM);
    for (const delegate of ['GPU', 'CPU']) {
      try {
        this.landmarker = await HandLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL, delegate },
          runningMode: 'VIDEO',
          numHands: 2,
          minHandDetectionConfidence: 0.55,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        this.ready = true;
        this.info = delegate;
        return;
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('HandLandmarker failed to initialise');
  }

  /** Returns an array of { landmarks, world, score, label } (0, 1 or 2 hands). Call once per new video frame. */
  detect(video, nowMs) {
    if (!this.ready) return [];
    let res;
    try {
      res = this.landmarker.detectForVideo(video, nowMs);
    } catch {
      return [];
    }
    if (!res || !res.landmarks || !res.landmarks.length) return [];
    return res.landmarks.map((landmarks, i) => ({
      landmarks,
      world: res.worldLandmarks?.[i], // 3D hand in metres, used for gesture shape
      score: res.handedness?.[i]?.[0]?.score ?? 0.9,
      label: res.handedness?.[i]?.[0]?.categoryName || (i ? 'Left' : 'Right'),
    }));
  }
}
