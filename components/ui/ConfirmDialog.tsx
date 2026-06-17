"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";

interface ConfirmDialogProps {
  onConfirm: () => void;
  label?: string;
}

export function ConfirmDeleteButton({ onConfirm, label = "Delete" }: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-danger"
      >
        <Trash2 size={15} />
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative card p-6 w-full max-w-sm">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
            <h3 className="text-base font-semibold text-gray-900">Delete application?</h3>
            <p className="mt-2 text-sm text-gray-500">
              This will permanently delete the application and all its history. This cannot be undone.
            </p>
            <div className="mt-5 flex gap-3 justify-end">
              <button onClick={() => setOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => { setOpen(false); onConfirm(); }}
                className="btn-danger"
              >
                Delete application
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
