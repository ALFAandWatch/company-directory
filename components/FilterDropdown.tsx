'use client';

type Option = {
   label: string;
   value: string;
};

type Props = {
   id: string;
   options: Option[];
   selected: string | string[];
   onChange: (value: string | string[]) => void;
   isOpen: boolean;
   onToggle: () => void;
   dictionary?: any;
   testId?: string;
};

export default function FilterDropdown({
   id,
   isOpen,
   onToggle,
   options,
   selected,
   onChange,
   dictionary,
}: Props) {
   const selectedLabel =
      options.find((opt) => opt.value === selected)?.label ||
      `${dictionary.suggest.select}`;

   const textColor = selected === 'all' ? 'text-gray-500' : 'text-gray-200';

   const isMulti = Array.isArray(selected);

   return (
      <div className="relative w-64 bg-black/40">
         {/* BOTÓN */}
         <button
            type="button"
            data-testid={`suggestion-country`}
            onClick={onToggle}
            className={`flex justify-between w-full px-4 py-2 border border-gray-700 hover:border-gray-400 hover:cursor-pointer rounded-lg text-left ${textColor}`}
         >
            {selectedLabel}
            <img
               src="/icons/arrow_up.svg"
               alt="Arrow"
               className={`w-6 h-6 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
               }`}
            />
         </button>

         {/* DROPDOWN */}
         {isOpen && (
            <div className="absolute mt-1 p-2 w-full border border-gray-700 rounded-lg bg-[#0a0a0a] shadow-lg text-gray-300 z-10 max-h-60 overflow-y-auto overscroll-none">
               {options.map((option) => (
                  <button
                     key={option.value}
                     data-testid={`test-${option.value}`}
                     type="button"
                     onClick={() => {
                        if (isMulti) {
                           const newValue = selected.includes(option.value)
                              ? selected.filter((v) => v !== option.value)
                              : [...selected, option.value];

                           onChange(newValue);
                        } else {
                           onChange(option.value);
                           onToggle();
                        }
                     }}
                     className="block w-full text-left px-4 py-2 rounded-md hover:bg-mist-900 hover:cursor-pointer"
                  >
                     {option.label}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
}
