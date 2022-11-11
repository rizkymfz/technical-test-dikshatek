export const success = (message, data = null) => {
    const res = {
        success: true,
        message,
        data
    }

    return res
}

export const error = (message, error) => {
    const res = {
        success: false,
        message,
        error
    }
    
    return res
}