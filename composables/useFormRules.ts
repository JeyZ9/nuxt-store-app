export const useFormRules = () => {
    return {
        ruleRequired: (v: string) => !!v || 'This field is required',
        ruleEmail: (v: string) => {
            const pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || 'Invalid e-mail.'
        },
        rulePassLen: (v: string) => (!!v && v.length >= 6) || 'Password must be at least 6 characters',
    }
}