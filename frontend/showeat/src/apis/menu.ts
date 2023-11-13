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
    // Create a new FormData instance
    const formData = new FormData();

    // // addNewMenu 함수 내에서 formData를 만들기 전에 로그로 확인
    // function logFormData(formData) {
    //     formData.forEach((value, key) => {
    //         console.log(`${key}, ${value}`);
    //     });
    // }
    // logFormData(formData);

    // Append each file
    multipartFiles.forEach((file) => {
        formData.append(`multipartFiles`, file);
    });

    // addNewMenu 함수 내에서 formData를 만든 후에 로그로 확인
    // logFormData(formData);

    const props: FetchProps = {
        url: "business/menu",
        method: "POST",
        isAuth: true,
        contentType: "file", // or "multipart/form-data"
        params: { menu, price },
        data: formData,
        // data: multipartFiles
        // data: { multipartFiles: multipartFiles[0] },
    };

    console.log(menu, price, multipartFiles, formData);

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
