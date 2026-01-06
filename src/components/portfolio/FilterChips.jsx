export default function FilterChips({ filters, activeFilter, onFilterChange }) {
    // Portfolio Theme: Green #10B981
    const activeColor = '#10B981';

    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`
              px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300
              border
            `}
                        style={{
                            backgroundColor: isActive ? activeColor : 'white',
                            color: isActive ? 'white' : 'rgba(0,0,0,0.4)',
                            borderColor: isActive ? activeColor : 'rgba(0,0,0,0.1)',
                            boxShadow: isActive ? `0 4px 12px ${activeColor}33` : 'none'
                        }}
                    >
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
}
