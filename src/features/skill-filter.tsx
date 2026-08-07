"use client";

import * as React from "react";

type SkillFilterContextValue = {
  active: string | null;
  setActive: (id: string | null) => void;
};

const SkillFilterContext = React.createContext<SkillFilterContextValue | null>(
  null,
);

export function SkillFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = React.useState<string | null>(null);

  const value = React.useMemo(() => ({ active, setActive }), [active]);

  return (
    <SkillFilterContext.Provider value={value}>
      {children}
    </SkillFilterContext.Provider>
  );
}

export function useSkillFilter() {
  const ctx = React.useContext(SkillFilterContext);
  if (!ctx) {
    throw new Error("useSkillFilter must be used within SkillFilterProvider");
  }
  return ctx;
}
