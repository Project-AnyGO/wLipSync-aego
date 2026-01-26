import type { Profile } from "./types.js";
import wasm from "./public/wlipsync.wasm?url";
import audioProcessorUrl from './public/audio-processor.js?url'; 
import { configuration, WLipSyncAudioNode } from "./audio-node.js";


export async function init() {
    if (configuration.wasmModule) {
        return;
    }
    configuration.wasmModule = await WebAssembly.compileStreaming(fetch(wasm));
}

export async function createWLipsyncNode(audioContext: AudioContext, profile: Profile) {
    if (!configuration.wasmModule) {
        throw new Error("wlipsync is not initialized. Please call init() before creating a node.");
    }

    try {
        return new WLipSyncAudioNode(audioContext, profile);
    } catch (e) {
        await audioContext.audioWorklet.addModule(audioProcessorUrl);
        return new WLipSyncAudioNode(audioContext, profile);
    }
}

export type * from './types.js';
export * from './parse.js';

export { configuration, WLipSyncAudioNode } from './audio-node.js';
