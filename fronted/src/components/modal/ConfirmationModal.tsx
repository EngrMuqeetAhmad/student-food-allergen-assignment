type ConfirmModalProps = {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
};

export const ConfirmModal = ({
    title,
    message,
    onConfirm,
    onCancel,
    loading,
}: ConfirmModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-card w-[400px] p-5 rounded-md shadow-lg border border-border">

                {/* Title */}
                <h2 className="text-lg font-semibold text-text">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-text-muted mt-2">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-5">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-border rounded-md text-text"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                    >
                        {loading ? "Removing..." : "Delete"}
                    </button>

                </div>

            </div>
        </div>
    );
};