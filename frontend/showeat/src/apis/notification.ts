/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Getting Funding Detail Data */
const getNotification = async () => {
    const props: FetchProps = {
        url: "notification",
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Getting Notification Exist */
const getNotificationExist = async () => {
    const props: FetchProps = {
        url: "notification/exist",
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getNotificationExist, getNotification };
