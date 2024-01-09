import Swal from 'sweetalert2';

const SweetAlertService = {
  success(title, text,html=null) {
    return Swal.fire({
      title: title,
      html:html,
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor:"#a1dd70"
    });
  },

  error(title, text,html=null) {
    return Swal.fire({
      title: title,
      html:html,
      text: text,
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor:"#a1dd70"
    });
  },

  warning(title, text,html=null) {
    return Swal.fire({
      title: title,
      html:html,
      text: text,
      icon: 'warning',
      confirmButtonText: 'Ok',
    });
  },

  info(title, text,html=null) {
    return Swal.fire({
      title: title,
      text: text,
      html:html,
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  },

  confirm(title, text,html=null) {
    return Swal.fire({
      title: title,
      html:html,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  },

  httpAlert(title, text){
    return Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 3000
    })
  }
};

export default SweetAlertService;