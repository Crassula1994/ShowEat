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

/* Function for Add Menu */
interface AddNewMenuType {
    menu: string;
    price: string;
    multipartFiles: File[];
}

const addNewMenu = async ({ menu, price, multipartFiles }: AddNewMenuType) => {
    const formData = new FormData();

    multipartFiles.forEach((file) => {
        formData.append(`multipartFiles`, file);
    });

    const props: FetchProps = {
        url: "business/menu",
        method: "POST",
        isAuth: true,
        contentType: "file",
        params: { menu, price },
        data: formData,
    };

    const result = await fetchModify(props);

    return result;
};

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
export { getMenuList, addNewMenu, deleteMenu };
