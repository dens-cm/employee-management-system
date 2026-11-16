import { toaster } from '@/components/ui/toaster'

export function notifyTransaction(ok: boolean, successTitle: string, errorTitle: string) {
    toaster.create({ title: ok ? successTitle : errorTitle, type: ok ? 'success' : 'error', closable: true })
}
