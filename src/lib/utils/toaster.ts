import { toast } from 'react-toastify';

export const showToast = (message:string, success:boolean) => {

    if (success){
        toast.success(message);
    }else{
        toast.error(message);
    }
}