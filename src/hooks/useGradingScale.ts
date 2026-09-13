import { useGradingScaleContext } from "@/components/providers/grading-scale-provider";

export function useGradingScale() {
  return useGradingScaleContext();
}
