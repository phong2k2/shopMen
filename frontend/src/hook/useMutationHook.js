import { useMutation } from "react-query";

export const useMutationHooks = (fnCallback, options) => {
  const mutation = useMutation({
    mutationFn: fnCallback,
    onSuccess: options?.onSuccess,
  });
  return mutation;
};
