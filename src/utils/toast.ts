import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

export function toastSuccess(text: string) {
  toast.success(text, { position: 'top-right' });
}

export function toastError(text: string) {
  toast.error(text, { position: 'top-right' });
}

export function toastWarn(text: string) {
  toast.warn(text, { position: 'top-right' });
}

export function toastInfo(text: string) {
  toast.info(text, { position: 'top-right' });
}
