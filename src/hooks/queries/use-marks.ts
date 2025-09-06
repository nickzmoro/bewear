import { getMarks } from "@/actions/get-marks";
import { useQuery } from "@tanstack/react-query";

export const getUseMarksQueryKey = () => ["marks"] as const;

export const useMarks = () => {
  return useQuery({
    queryKey: getUseMarksQueryKey(),
    queryFn: () => getMarks(),
  });
};
