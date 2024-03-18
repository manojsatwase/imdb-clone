import axios from "axios";

export const METHODS = {
 "GET":"GET",
 "POST":"POST",
  "PUT":"PUT",
  "PATCH":"PATCH",
  "DELETE":"DELETE"
}

Object.freeze(METHODS);

const axiosOptions = {
    headers:{
        "Content-Type":"application/json"
    }
}


export const makeRequest = async (dispatch,requestAction,successAction,failureAction,method,url,data) => {
    try {
        dispatch(requestAction());
        let response;

        switch(method.toUpperCase()){
         case METHODS.GET :
            response = await axios.get(url);
            break;
         case METHODS.POST :
            response = axios.post(url,data,axiosOptions);
            break;
        case METHODS.PUT :
            response = axios.put(url,data,axiosOptions);
            break;
        case METHODS.PATCH :
            response = axios.patch(url,data,axiosOptions);
            break;
        case METHODS.DELETE :
            response = axios.delete(url,{data},axiosOptions);
            break;
        default :
           throw new Error(`Unsupported Request ${method.toUpperCase()} Method`)
        }
        dispatch(successAction(response?.data));
       
    } catch (error) {
        dispatch(failureAction(error.response.data?.message));
    }
}