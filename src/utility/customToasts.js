import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toastStyles.css'

const toastError = (message) => {
    toast.error(
        message, {
        position: toast.POSITION.TOP_CENTER,
        className: 'custom-error-toast',
        autoClose: 3000,
        }
    );
}

const toastSuccess = (message) => {
    toast.success(
        message, {
        position: toast.POSITION.TOP_CENTER,
        className: 'custom-success-toast',
        autoClose: 3000,
        }
    );
}

export { toastError, toastSuccess };