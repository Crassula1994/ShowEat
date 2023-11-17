/* Import */
import { fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Adding or Removing Bookmark */
const postBookmark = async (fundingId: string) => {
    const props: FetchProps = {
        url: `bookmark/${fundingId}`,
        method: "POST",
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default postBookmark;
