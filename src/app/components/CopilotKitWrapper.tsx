'use client';

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

interface CopilotKitWrapperProps {
  children: React.ReactNode;
}

export default function CopilotKitWrapper({ children }: CopilotKitWrapperProps) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      {children}
      <CopilotChat labels={{ title: "Your AI Assistant" }} />
    </CopilotKit>
  );
} 