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

export async function createWLipSyncNode(audioContext: AudioContext, profile: Profile) {
    if (!configuration.wasmModule) {
        throw new Error("Wlipsync is not initialized. Please call init() before creating a node.");
    }
    
    try {
        return new WLipSyncAudioNode(audioContext, profile);
    } catch {
        await audioContext.audioWorklet.addModule(audioProcessorUrl);
        return new WLipSyncAudioNode(audioContext, profile);
    }
}

export async function getWasmModule(): Promise<WebAssembly.Module> {
    if (!configuration.wasmModule) {
        await init();
    }
    if (!configuration.wasmModule) {
        throw new Error("WLipSync WASM module could not be initialized.");
    }
    return configuration.wasmModule;
}

export type * from './types.js';
export * from './parse.js';
export { WLipSyncAudioNode } from './audio-node.js';