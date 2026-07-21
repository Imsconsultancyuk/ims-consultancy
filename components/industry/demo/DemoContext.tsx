"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface DemoArmState {
  armedToolId: string | null;
  armTool: (toolId: string) => void;
}

// Default (no-op) value lets ToolCard "See it run" buttons render safely
// before the page template (IMS-050) mounts DemoArmProvider around the
// demo zone. IMS-044's LiveDemoPlayer / IMS-042's DropZone read
// armedToolId to pre-select the matching sample file.
const DemoArmContext = createContext<DemoArmState>({
  armedToolId: null,
  armTool: () => {},
});

export function DemoArmProvider({ children }: { children: ReactNode }) {
  const [armedToolId, setArmedToolId] = useState<string | null>(null);
  const armTool = useCallback((toolId: string) => setArmedToolId(toolId), []);
  const value = useMemo(() => ({ armedToolId, armTool }), [armedToolId, armTool]);

  return (
    <DemoArmContext.Provider value={value}>{children}</DemoArmContext.Provider>
  );
}

export function useDemoArm(): DemoArmState {
  return useContext(DemoArmContext);
}
