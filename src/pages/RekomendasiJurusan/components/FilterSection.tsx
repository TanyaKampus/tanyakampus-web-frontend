interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const FilterSection = ({ title, options, selected, onChange }: FilterSectionProps) => (
  <div className="mb-6">
    <h3 className="font-medium text-neutral-800 mb-3 text-base">{title}</h3>
    <div className="flex flex-wrap gap-6">
      {options.map((option) => (
        <label key={option} className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={selected === option}
            onChange={() => onChange(option)}
            className="w-5 h-5 rounded-full border-2 border-neutral text-primary-200 focus:ring-2 focus:ring-primary-200 cursor-pointer appearance-none checked:bg-primary-200 checked:border-primary-200"
          />
          <span className="ml-2 text-neutral group-hover:text-neutral-900">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default FilterSection;
