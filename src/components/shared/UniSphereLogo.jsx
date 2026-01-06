import React from 'react';
import { Globe } from 'lucide-react';

export default function UniSphereLogo({ className = "", size = "medium" }) {
    const sizes = {
        small: "text-lg",
        medium: "text-xl",
        large: "text-3xl"
    };

    const iconSizes = {
        small: "w-4 h-4",
        medium: "w-6 h-6",
        large: "w-10 h-10"
    };

    return (
        <div className={`flex items-center gap-2 group ${className}`}>
            <div className={`
        flex items-center justify-center rounded-lg bg-black text-white 
        transition-transform duration-500 group-hover:rotate-[15deg]
        ${size === 'small' ? 'p-1' : 'p-1.5'}
      `}>
                <Globe className={`${iconSizes[size]} stroke-[2px]`} />
            </div>
            <span className={`
        font-black tracking-tighter text-black 
        ${sizes[size]}
      `}>
                UniSphere
            </span>
        </div>
    );
}
