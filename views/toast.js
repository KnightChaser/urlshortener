const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})