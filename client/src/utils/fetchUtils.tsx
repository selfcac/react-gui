import { notification } from "antd";

export async function getJson<T>(url: string, actionName:string = "data") : Promise<T>  {
    let result : any;
    try {
        let response = await fetch(url);
        let json = await response.json();
        result = json as unknown as T;
    } catch (error ) {
        notification.error({
            message: "Error fetching " + actionName,
            description: (error as TypeError).message,
            placement: "topRight",
            duration: 3,
        });
        throw error;
    }
    return result;
}

export async function postJson<T>(url: string, body: any, actionName:string = "data") : Promise<T>  {
    let result : any;
    try {
        let response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json();
        result = json as unknown as T;
    } catch (error ) {
        notification.error({
            message: "Error fetching " + actionName,
            description: (error as TypeError).message,
            placement: "topRight",
            duration: 3,
        });
        throw error;
    }
    return result;
}