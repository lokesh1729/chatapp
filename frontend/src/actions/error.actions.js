export const createErrors = (msg_type, msg, status) => {
    return { type: msg_type, payload: { msg, status } };
};

export const createMessages = (msg_type, msg) => {
    return { type: msg_type, payload: msg };
};
