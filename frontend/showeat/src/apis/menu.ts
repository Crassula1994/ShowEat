/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Get Seller's Menu List */
const getMenuList = async () => {
    const props: FetchProps = {
        url: "business/menu",
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Adding New Menu */
const postMenu = async (menu: string, price: string, multipartFiles: File[]) => {
    const formData = new FormData();

    multipartFiles.forEach((file) => {
        formData.append("multipartFiles", file);
    });

    const props: FetchProps = {
        url: "business/menu",
        method: "POST",
        params: { menu, price },
        data: formData,
        isAuth: true,
        contentType: "file",
    };
    const result = await fetchModify(props);

    return result;
};

/* Function for Deleting Menu */
const deleteMenu = async (menuId: string) => {
    const props: FetchProps = {
        url: `business/menu/${menuId}`,
        method: "DELETE",
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getMenuList, postMenu, deleteMenu };
