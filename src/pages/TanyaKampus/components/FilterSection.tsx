type Option = { label: string; value: string };

type Props = {
  title: string;
  options: readonly Option[]; // ✅ ubah jadi readonly
  selected: string;
  onChange: (value: string) => void;
};

export default function FilterSection({
  title,
  options,
  selected,
  onChange,
}: Props) {
  return (
    <div className="mb-6">
      <p className="font-semibold mb-3">{title}</p>

      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              checked={selected === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
