import { createContext, useContext, useState, ReactNode } from 'react';

// Define types for the context value
interface AuthContextType {
  role: string | null;
  setRole: (role: string | null) => void;
}

// Set initial value for context
const AuthContext = createContext<AuthContextType>({
  role: null, // Set default role as null
  setRole: () => {} // Placeholder function for setting role
});

interface AuthProviderProps {
  children: ReactNode; // Define children as ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [role, setRole] = useState<string | null>(null); // 'student' or 'teacher'

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
