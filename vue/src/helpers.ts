let generateIdUsingCallback: (() => string) | null = null

function generateIdUsing(callback: (() => string) | null): void {
    generateIdUsingCallback = callback
}

function sameUrlPath(url1: string | URL, url2: string | URL): boolean {
    url1 = typeof url1 === 'string' ? new URL(url1, window.location.origin) : url1
    url2 = typeof url2 === 'string' ? new URL(url2, window.location.origin) : url2

    return `${url1.origin}${url1.pathname}` === `${url2.origin}${url2.pathname}`
}

function generateId(prefix = 'inertiaui_modal_') {
    if (generateIdUsingCallback) {
        return generateIdUsingCallback()
    }

    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return `${prefix}${crypto.randomUUID()}`
    }

    // Fallback for environments where crypto.randomUUID is not available
    return `${prefix}${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`
}

function strToLowercase(key: string): string {
    return typeof key === 'string' ? key.toLowerCase() : key
}

function except(target: string[], keys: string[], ignoreCase?: boolean): string[]
function except<T extends Record<string, any>>(
    target: T,
    keys: string[],
    ignoreCase?: boolean
): Partial<T>
function except(
    target: string[] | Record<string, any>,
    keys: string[],
    ignoreCase = false
): string[] | Record<string, any> {
    let compareKeys = keys
    if (ignoreCase) {
        compareKeys = keys.map(strToLowercase)
    }

    if (Array.isArray(target)) {
        return target.filter((key) => {
            const comparisonKey = ignoreCase ? strToLowercase(key) : key
            return !compareKeys.includes(comparisonKey)
        })
    }

    const objTarget = target as Record<string, any>
    return Object.keys(objTarget).reduce<Record<string, any>>((acc, key) => {
        const comparisonKey = ignoreCase ? strToLowercase(key) : key
        if (!compareKeys.includes(comparisonKey)) {
            acc[key] = objTarget[key] // copy the key-value pair
        }
        return acc
    }, {})
}

function only(target: string[], keys: string[], ignoreCase?: boolean): string[]
function only<T extends Record<string, any>>(
    target: T,
    keys: string[],
    ignoreCase?: boolean
): Partial<T>
function only(
    target: string[] | Record<string, any>,
    keys: string[],
    ignoreCase = false
): string[] | Record<string, any> {
    let compareKeys = keys
    if (ignoreCase) {
        compareKeys = keys.map(strToLowercase)
    }

    if (Array.isArray(target)) {
        return target.filter((key) => {
            const comparisonKey = ignoreCase ? strToLowercase(key) : key
            return compareKeys.includes(comparisonKey)
        })
    }

    const objTarget = target as Record<string, any>
    return Object.keys(objTarget).reduce<Record<string, any>>((acc, key) => {
        const comparisonKey = ignoreCase ? strToLowercase(key) : key
        if (compareKeys.includes(comparisonKey)) {
            acc[key] = objTarget[key] // copy the key-value pair
        }
        return acc
    }, {})
}

function rejectNullValues(target: string[]): string[]
function rejectNullValues<T extends Record<string, any>>(target: T): Partial<T>
function rejectNullValues(
    target: string[] | Record<string, any>
): string[] | Record<string, any> {
    if (Array.isArray(target)) {
        return target.filter((item) => item !== null)
    }

    const objTarget = target as Record<string, any>
    return Object.keys(objTarget).reduce<Record<string, any>>((acc, key) => {
        const value = objTarget[key]
        if (value !== null) {
            acc[key] = value
        }
        return acc
    }, {})
}

function waitFor<T>(
    conditionFn: () => T,
    waitForSeconds = 3,
    checkIntervalMilliseconds = 10
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        let result = conditionFn()

        if (result) {
            resolve(result)
            return
        }

        let maxAttempts = (waitForSeconds * 1000) / checkIntervalMilliseconds

        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            result = conditionFn()

            if (result) {
                clearInterval(interval)
                resolve(result)
                return
            }

            if (--maxAttempts <= 0) {
                clearInterval(interval)
                reject(new Error('Condition not met in time'))
            }
        }, checkIntervalMilliseconds)
    })
}

function kebabCase(str: string | null): string {
    if (!str) return ''

    // Replace all underscores with hyphens
    str = str.replace(/_/g, '-')

    // Replace all multiple consecutive hyphens with a single hyphen
    str = str.replace(/-+/g, '-')

    // Check if string is already all lowercase
    if (!/[A-Z]/.test(str)) {
        return str
    }

    // Remove all spaces and convert to word case
    str = str
        .replace(/\s+/g, '')
        .replace(/_/g, '')
        .replace(/(?:^|\s|-)+([A-Za-z])/g, (_m, p1: string) => p1.toUpperCase())

    // Add delimiter before uppercase letters
    str = str.replace(/(.)(?=[A-Z])/g, '$1-')

    // Convert to lowercase
    return str.toLowerCase()
}

export { generateIdUsing, sameUrlPath, generateId, except, only, rejectNullValues, waitFor, kebabCase }
