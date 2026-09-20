const ALERT_EVENT = "campuslink:alert";

export function notify(message, type = "info", title) {
    if (typeof window === "undefined") return;

    window.dispatchEvent(new CustomEvent(ALERT_EVENT, {
        detail: {
            id: `${Date.now()}-${Math.random()}`,
            message,
            type,
            title: title || (type === "success" ? "Success" : type === "error" ? "Something went wrong" : "CampusLink update"),
        },
    }));
}

export { ALERT_EVENT };
