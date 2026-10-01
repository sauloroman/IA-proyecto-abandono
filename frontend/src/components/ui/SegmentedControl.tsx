export interface SegmentOption<T extends string | number> {
    value: T;
    label: string;
}

interface SegmentedControlProps<T extends string | number> {
    label: string;
    options: SegmentOption<T>[];
    value: T;
    onChange: (value: T) => void;
    error?: string;
}

export function SegmentedControl<T extends string | number>({
    label,
    options,
    value,
    onChange,
    error,
}: SegmentedControlProps<T>) {
    return (
        <div className="space-y-2 pt-1">
            <label className="block text-xs font-medium text-zinc-300">{label}</label>
            <div className="grid grid-cols-2 gap-2">
                {options.map((opt) => {
                    const isSelected = opt.value === value;
                    return (
                        <button
                            key={String(opt.value)}
                            type="button"
                            onClick={() => onChange(opt.value)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${isSelected
                                    ? 'bg-zinc-800 text-zinc-100 border-zinc-600 shadow-xs'
                                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-zinc-200'
                                }`}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
            {error && <span className="text-[11px] text-rose-400 block">{error}</span>}
        </div>
    );
}
