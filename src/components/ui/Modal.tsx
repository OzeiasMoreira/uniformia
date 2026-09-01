import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="fixed inset-0 cursor-default"
      />
      <div className="relative z-10 w-full max-w-[480px] rounded-[25.2px] bg-white p-8 shadow-[0px_7.56px_47.88px_0px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between">
          <h2 className="font-app text-lg font-bold text-navy">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="font-app text-xl text-text-muted hover:text-navy"
          >
            ×
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
