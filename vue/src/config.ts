interface ModalConfig {
    closeButton: boolean
    closeExplicitly: boolean
    maxWidth: string
    paddingClasses: string
    panelClasses: string
    position: string
}

interface ConfigType {
    type: string,
    navigate: boolean,
    modal: ModalConfig,
    slideover: ModalConfig,
}

const defaultConfig: ConfigType = {
    type: 'modal',
    navigate: false,
    modal: {
        closeButton: true,
        closeExplicitly: false,
        maxWidth: '2xl',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white rounded',
        position: 'center',
    },
    slideover: {
        closeButton: true,
        closeExplicitly: false,
        maxWidth: 'md',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white min-h-screen',
        position: 'right',
    }
}

class Config {
    private config: ConfigType

    constructor() {
        this.config = defaultConfig
        this.reset()
    }

    reset() {
        this.config = JSON.parse(JSON.stringify(defaultConfig)) as ConfigType
    }

    put(key: ConfigType | string, value: any): void {
        if (typeof key === 'object') {
            this.config = {
                type: key.type ?? defaultConfig.type,
                navigate: key.navigate ?? defaultConfig.navigate,
                modal: { ...defaultConfig.modal, ...(key.modal ?? {}) },
                slideover: { ...defaultConfig.slideover, ...(key.slideover ?? {}) },
            }
            return
        }

        const keys = key.split('.')
        let current: any = this.config
        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i]
            if (current[k] == undefined) {
                current[k] = {}
            }
            current = current[k]
        }

        const lastKey = keys[keys.length - 1];
        current[lastKey] = value
    }

    get(key?: string) {
        if (typeof key === 'undefined') {
            return this.config
        }

        const keys = key.split('.')
        let current: any = this.config
        for (const k of keys) {
            if (current[k as keyof ConfigType] === undefined) {
                return null
            }
            current = current[k as keyof ConfigType]
        }
        return current
    }
}

const configInstance = new Config()

export const resetConfig = () => configInstance.reset()
export const putConfig = (key: ConfigType | string, value: any) => configInstance.put(key, value)
export const getConfig = (key: string) => configInstance.get(key)
export const getConfigByType = (isSlideover: boolean | null, key: string) => configInstance.get(isSlideover ? `slideover.${key}` : `modal.${key}`)
