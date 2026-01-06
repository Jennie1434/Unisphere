import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmer', cancelText = 'Annuler', isDanger = true }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white border-2 border-black p-8 shadow-[12px_12px_0px_black] max-w-md w-full relative"
                onClick={e => e.stopPropagation()}
            >
                <div className={`flex items-center gap-4 mb-6 ${isDanger ? 'text-red-600' : 'text-black'}`}>
                    <div className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-none shadow-[4px_4px_0px_black] text-2xl bg-white">
                        {isDanger ? '⚠️' : 'ℹ️'}
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-black">
                        {title || 'Attention !'}
                    </h3>
                </div>

                <p className="text-black/60 font-medium mb-8 leading-relaxed">
                    {message}
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border-2 border-black font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 px-6 py-3 border-2 border-black font-black uppercase tracking-widest text-xs shadow-[4px_4px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-white hover:bg-white ${isDanger
                                ? 'bg-red-600 hover:text-red-600'
                                : 'bg-black hover:text-black'
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
