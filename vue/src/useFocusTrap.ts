import { ref } from 'vue'
import { createFocusTrap, type FocusTrap } from 'focus-trap'

type FocusTrapTarget = HTMLElement | SVGElement | string

export function useFocusTrap(
    wrapper: FocusTrapTarget | FocusTrapTarget[],
    closeExplicitly: boolean,
    onDeactivateCallback?: () => void
) {
    const trap = ref<FocusTrap | null>(null)

    if (wrapper) {
        trap.value = createFocusTrap(wrapper, {
            clickOutsideDeactivates: !closeExplicitly,
            escapeDeactivates: !closeExplicitly,
            onDeactivate: () => onDeactivateCallback?.(),
            fallbackFocus: () => {
                if (Array.isArray(wrapper)) {
                    // use the first element/string as the fallback focus target
                    const first = wrapper[0]
                    return first as FocusTrapTarget
                }

                return wrapper as FocusTrapTarget
            },
        })

        trap.value.activate()
    }

    const deactivate = () => {
        trap.value?.deactivate()
        trap.value = null
    }

    return {
        deactivate,
        wrapper,
    }
}
