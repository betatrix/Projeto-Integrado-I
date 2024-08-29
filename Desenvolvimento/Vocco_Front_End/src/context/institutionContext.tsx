// src/contexts/InstitutionContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InstitutionContextType {
    institutionId: number | null;
    setInstitutionId: (id: number | null) => void;
}

const InstitutionContext = createContext<InstitutionContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useInstitution = (): InstitutionContextType => {
    const context = useContext(InstitutionContext);
    if (context === undefined) {
        throw new Error('useInstitution must be used within a InstitutionProvider');
    }
    return context;
};

interface ProviderProps {
    children: ReactNode;
}

export const InstitutionProvider: React.FC<ProviderProps> = ({ children }) => {
    const [institutionId, setInstitutionId] = useState<number | null>(null);

    return (
        <InstitutionContext.Provider value={{ institutionId, setInstitutionId }}>
            {children}
        </InstitutionContext.Provider>
    );
};
