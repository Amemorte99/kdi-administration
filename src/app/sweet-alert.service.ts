import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  langue  = {
    "decimal":        "",
    "emptyTable":     "Aucune donnée dans la table.",
    "info":           "Affiche _START_ à _END_ of _TOTAL_ entrées",
    "infoEmpty":      "Affiche 0 à 0 of 0 entrées",
    "infoFiltered":   "(filtered from _MAX_ total entries)",
    "infoPostFix":    "",
    "thousands":      ",",
    "lengthMenu":     "Affiche _MENU_ entrées",
    "loadingRecords": "Chargement...",
    "processing":     "En cours d'execution...",
    "search":         "Rechercher:",
    "zeroRecords":    "Aucune ligne trouvée",
    "paginate": {
        "first":      "Début",
        "last":       "Fin",
        "next":       "Suivant",
        "previous":   "Précédent"
    },
    "aria": {
        "sortAscending":  ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
    }
}
  constructor() {}


  showSuccessAlert(title: string, message: string, yesBtn: string = "Ok") {
    return Swal.fire({
      title: title,
      text: message,
      icon: "success",
      confirmButtonColor: "#ae3764",
      confirmButtonText: yesBtn,
    });
  }
  showLoadingAlert(title = 'Decaissement en cours...', text ='Veuillez patientez pour le processus de decaissement.') {
    return Swal.fire({
      title: title,
      text: text,
      allowEscapeKey: false,
      allowOutsideClick: false,
      background: '#fff',
      showConfirmButton: false,
      didOpen(popup) {
        Swal.showLoading();
      },
    });
  }
  closeSwal() {
    return Swal.close();
  }

  showErrorAlert(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonColor: "#ae3764",
    });
  }

  showDeleteAlert(title: string, message: string, yesBtn: string = "Oui, Supprimer!", noBtn: string = "Non") {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ae3764",
      cancelButtonColor: "#cdcdcd",
      confirmButtonText: yesBtn,
      
      reverseButtons: true,
      cancelButtonText: noBtn,
    });
  }

  setInputAlert(title: string, message: string, action: string) {
    return Swal.fire({
      title: title,
      input: "number",
      showCancelButton: true,
      confirmButtonText: action,
      confirmButtonColor: "#ae3764",
      customClass: "swal-wide",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      cancelButtonText: "Annuler",
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
  setPhoneNumber(title: string,label:string, action: string) {
    return Swal.fire({
      title: title,
      input: "tel",
      inputLabel: label,
      showCancelButton: true,
      confirmButtonText: action,
      confirmButtonColor: "#ae3764",
      customClass: "swal-wide",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      inputPlaceholder: 'Entrer votre numero de telephone',
      cancelButtonText: "Annuler",
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
  showInformation(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#ae3764",
      reverseButtons: false,
    });
  }

  setInputAmountAlert(title: string, message: string, action: string, amount:number) {
    return Swal.fire({
      title: title,
      input: "number",
      showCancelButton: true,
      confirmButtonText: action,
      confirmButtonColor: "#ae3764",
      customClass: "swal-wide",
      inputValue: amount,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      cancelButtonText: "Annuler",
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
}
