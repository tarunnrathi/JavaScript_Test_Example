export const createProfile = (user_id = '', email = '', name = '') => {
    window.clevertap.onUserLogin.push({
        "Site": {
            "Identity": user_id,
            "Email": email,
            "Name": name,
            "Domain": "11102",
            "subscription_status_hindi": "default",
            // optional fields. controls whether the user will be sent email, push etc.
            "MSG-email": true, // Disable email notifications
            "MSG-push": true, // Enable push notifications
            "MSG-sms": true, // Enable sms notifications
            "MSG-whatsapp": true, // Enable whatsapp notifications
        }
    });
    setTimeout(() => {
        eventPush(name);
    }, 100);
};

export const createProfile1 = (user_id = '', email = '', name = '', subscriptionStatus) => {
    window.clevertap.onUserLogin.push({
        "Site": {
            "Identity": user_id,
            "Email": email,
            "Name": name,
            "Domain": "11102",
            "subscription_status_hindi": subscriptionStatus,
            // optional fields. controls whether the user will be sent email, push etc.
            "MSG-email": true, // Disable email notifications
            "MSG-push": true, // Enable push notifications
            "MSG-sms": true, // Enable sms notifications
            "MSG-whatsapp": true, // Enable whatsapp notifications
        }
    });
};

export const eventPush = (name) => {
    // console.log("event is pushing")
    window.clevertap.event.push("Signed up Successfully", {
        "Message": `${name} signed up successfully`
    });
};

export const unSubscribe = (user_id) => {
    // InitiateClevertapJs()
    // console.log("user is unsubscribing")
    window.clevertap.profile.push({
        "Site": {
            "Identity": user_id,
            "subscription_status_hindi": "no",
        }
    });
};
export const Subscribe = (user_id) => {
    // InitiateClevertapJs();
    // console.log("user is subscribing")
    window.clevertap.profile.push({
        "Site": {
            "Identity": user_id,
            "subscription_status_hindi": "yes",
        }
    });
};
