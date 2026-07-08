'use client';

type Option = {
   label: string;
   value: string;
};

type Props = {
   id: string;
   options: Option[];
   selected: string;
   onChange: (value: string) => void;
   isOpen: boolean;
   onToggle: () => void;
};

export default function FilterDropdown({
   id,
   isOpen,
   onToggle,
   options,
   selected,
   onChange,
}: Props) {
   const selectedLabel =
      options.find((opt) => opt.value === selected)?.label || 'Select';

   const textColor = selected === 'all' ? 'text-gray-500' : 'text-gray-200';

   return (
      <div className="relative w-64">
         {/* BOTÓN */}
         <button
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
                     onClick={() => {
                        onChange(option.value);
                        onToggle();
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
