import { STORAGE_KEY_CONFIG } from "@/const/storageKey.js"

export function getConfig() {
    const config = localStorage.getItem(STORAGE_KEY_CONFIG)
    if (!config) {
        return null
    }

    return JSON.parse(config);
}

export function setConfig(config) {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config))
}