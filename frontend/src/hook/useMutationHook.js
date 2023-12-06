import { useMutation } from "react-query"

export const useMutationHooks = (fnCallback, options) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
        onSuccess: options?.onSuccess
    })
    return mutation
}

// export const useMutationHooks = (options) => {
//     const mutation = useMutation(options)
//     return mutation
// }