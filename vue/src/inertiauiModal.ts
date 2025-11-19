import { getConfig, putConfig, resetConfig } from './config'
import { useModalStack, initFromPageProps, renderApp } from './modalStack'
import useModal from './useModal.js'
import Deferred from './Deferred.vue'
import HeadlessModal from './HeadlessModal.vue'
import Modal from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'
import WhenVisible from './WhenVisible.vue'
import  { type ModalOptions, type Modal as ModalClass } from './modalStack'

function visitModal(url: string, options: ModalOptions = {}) {
    return useModalStack()
        .visit(
            url,
            options.method ?? 'get',
            options.data ?? {},
            options.headers ?? {},
            options.config ?? {},
            options.onClose,
            options.onAfterLeave,
            options.queryStringArrayFormat ?? 'brackets',
            options.navigate ?? getConfig('navigate'),
        )
        .then((modal: ModalClass) => {
            const listeners = options.listeners ?? {}

            Object.keys(listeners).forEach((event) => {
                // e.g. refreshKey -> refresh-key
                const eventName = event.replace(/([A-Z])/g, '-$1').toLowerCase()
                modal.on(eventName, listeners[event])
            })

            return modal
        })
}

export {
    Deferred,
    HeadlessModal,
    Modal,
    ModalLink,
    ModalRoot,
    WhenVisible,
    getConfig,
    initFromPageProps,
    putConfig,
    renderApp,
    resetConfig,
    useModal,
    visitModal,
}
