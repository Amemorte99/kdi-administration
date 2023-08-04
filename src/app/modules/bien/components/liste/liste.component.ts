import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/common/auth.service';
import { ShareddataService } from 'src/app/shared/common/shareddata.service';
import { Goods } from 'src/app/shared/models/goods';
import { BienService } from '../../common/bien.service';

declare var $: any;

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent implements OnInit {
  loading = false;
  // pour le depliage de l'acordion
  section1Depliable: boolean = true;

  section1Completed = false;
  section2Completed = false;
  section3Completed = false;
  section4Completed = false;
  section5Completed = false;

  
  private modalOpenSubject: Subject<boolean> = new Subject<boolean>();
  modalOpen$ = this.modalOpenSubject.asObservable();

  isPublished: boolean = true;

  goodsData!: any;

  step: number = 1;
  good = new Goods();
  categorieList!: any;
  atoutsList!: any;
  propertiesList!: any;
  typeVisiteList!: any;
  typeOfGoods!: any;
  hasBeenPubished: boolean = false;

  infoGoods: any = {};

  selectedAtoutsIds!: string[];
  selectedPropertieIds!: string[];

  dataBien: any = {};

  isChecked = false;
  ids: any[] = [];

  // file variables
  fileActive: any;
  fileActiveBool!: boolean;
  preuves: any = [];

  fileBase: any;
  ifFileIsUpload: boolean = false;
  selectedFiles: any;
  selectedFilesName: any;
  dataFichier: any = [];
  dataFichierName: any = [];
  fichier!: File;
  // end N

  etape: number = 1;
  isLoading: boolean = true;
  constructor(
    private router: Router,
    private authservice: AuthService,
    private bienservice: BienService,
    private shareddataService: ShareddataService
  ) { }

  ngOnInit(): void {
    this.getOffreurListOfGoods()
    // if ($) {
    //   console.log('jQuery is available');
    // } else {
    //   console.log('jQuery is not available');
    // }
    this.getTypeBiensList();
    this.getCategorieList();
    this.getAtoutsList();
    this.getPropertiesList();
    this.getTypeVisiteList();
  }

  openModal() {
    $('#myModal').modal('show');
    this.shareddataService.updateBoolVariable(true);
  }
  closeModal() {
    $('#myModal').modal('hide');
    this.shareddataService.updateBoolVariable(false);
  }


  viewGoodDetail(e:any){
    console.log(e);
    this.router.navigate([`/admin/bien/detail/${e._id}`]);
  }


  onChangeProperties(e: any) {
    console.log(e);
    this.selectedPropertieIds = e.map((item: { _id: any }) => item._id);
    console.log(this.selectedPropertieIds);
  }


  save(formdata: any) {

    if (this.section1Depliable == true) {
      
      this.infoGoods.typeBien = formdata?.typeBien
      this.infoGoods.categoryBien = formdata?.categoryBien
      this.infoGoods.typeVisite = formdata?.typeVisite
      this.infoGoods.titre = formdata?.title
      console.log(this.infoGoods)
      this.section1Depliable = false;
      this.section2Completed = true;

    } else if (this.section2Completed) {
      this.infoGoods.description = formdata.description
      this.infoGoods.chambres = formdata.chambres;
      this.infoGoods.commodite = formdata.commodite;
      this.infoGoods.salleBains = formdata.salleBains;

      this.section2Completed = false;
      this.section3Completed = true;

    } else if (this.section3Completed) {

      this.infoGoods.capacite = formdata.capacite;
      this.infoGoods.emplacement = formdata.emplacement;
      this.infoGoods.serviceSuplementaire = formdata.serviceSuplementaire;
      this.infoGoods.regle = formdata.regle;

      this.section3Completed = false;
      this.section4Completed = true;

    } else if (this.section4Completed) {
      this.infoGoods.disponibilte = formdata.disponibilte;
      this.infoGoods.tarifs = formdata.tarifs;
      this.infoGoods.zones = formdata.zones;
      this.infoGoods.pays = formdata.pays;

      this.section4Completed = false;
      this.section5Completed = true;

    }
    else if (this.section5Completed) {
      console.log(this.section5Completed)
      if(this.section5Completed){
        this.loading=true
      }

      this.infoGoods.atouts = this.selectedAtoutsIds;
      this.infoGoods.properties = this.selectedPropertieIds;
      console.log(this.infoGoods);
      console.log(this.dataFichier);
      let data = this.dataFichier;
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        formData.append('files', data[i], data[i].name);
        formData.forEach((values) => console.log(values));
      }

      this.authservice.saveUserUploadFiles(formData).subscribe((response) => {
        console.log(response.data);
        const filteredArray = response.data.map(
          (item: { filename: any }) => item.filename
        );
        console.log(filteredArray);

        this.getUserId().subscribe((result) => {
          this.infoGoods.photos = filteredArray;
          console.log(this.infoGoods);

          if (this.infoGoods) {
            setTimeout(() => {
              this.ifFileIsUpload = false;
              this.fileActiveBool = false;
            }, 500);
          }
          this.bienservice.publishGoods(this.infoGoods).subscribe((response) => {
            console.log(response);
            if (response.status == true) {
              this.hasBeenPubished = true;
              console.log(this.hasBeenPubished);
              // this.router.navigate(['/admin/bien']);
              window.location.reload();
            }
          });
        });
      });
    }

  }

  getUserId() {
    let token = JSON.parse(localStorage['userToken']);
    return this.authservice.decodeTokenAndGetUserEmail(token).pipe(
      switchMap((response: any) => {
        if (response.decodedToken.userId) {
          return this.authservice.getOffreurId(response.decodedToken.userId);
        }
        return of(null);
      })
    );
  }

  // la liste des bien publiés
  getOffreurListOfGoods() {
    this.getUserId().subscribe((result) => {
      console.log(result);

      this.bienservice.getAgoodByOffreurId(result._id).subscribe((result) => {
        console.log(result);

        this.goodsData = result.biens;
        console.log("googgggg", this.goodsData)
        if( this.goodsData?.length > 0){
          this.isLoading = !this.isLoading;
       }
      });
    });
  }
  getTypeBiensList() {
    this.bienservice.typeOfGoodsList().subscribe((result) => {
      this.typeOfGoods = result.typeBiens;
    });
  }

  getCategorieList() {
    this.bienservice.categorieList().subscribe((result) => {
      this.categorieList = result.categoryBiens;
    });
  }
  getAtoutsList() {
    this.bienservice.atoutsLists().subscribe((result) => {
      this.atoutsList = result.atouts;
      console.log(this.atoutsList);
    });
  }
  getPropertiesList() {
    this.bienservice.propertiesList().subscribe((result) => {
      this.propertiesList = result.properties;
    });
  }
  getTypeVisiteList() {
    this.bienservice.typeVisiteList().subscribe((result) => {
      this.typeVisiteList = result.typeVisites;
    });
  }
  onChangeAtouts(e: any) {
    console.log(e);
    this.selectedAtoutsIds = e.map((item: { _id: any }) => item._id);
    console.log(this.selectedAtoutsIds);
  }

  // quand le fichier change
  chargerPdf(e: any) {
    this.fileActiveBool = true;
    console.log(this.fileActiveBool);

    this.selectedFiles = e.target.files[0];
    this.fileActive = e.target.files[0];
    // console.log(e.target.files[0]);
    this.selectedFiles = e.target.files[0];
    this.fichier = this.selectedFiles;
    console.log('fichier', this.fichier);
    this.selectedFilesName = e.target.files[0].name;
    console.log(this.selectedFiles);
    this.getBase64(e.target.files[0]);
  }
  // on met les fichiers dans un tableau
  uploadFiles() {
    if (this.selectedFiles != null) {
      this.ifFileIsUpload = true;
      this.dataFichier.push(this.selectedFiles);
      this.dataFichierName.push(this.selectedFilesName);
      console.log(this.dataFichier);
      console.log(this.dataFichierName);
      this.selectedFiles = null;
    } else {
      console.log('Veuillez selectionner un fichier');
    }
  }

  getBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.fileBase = event.target.result;
      console.log(file);
      this.preuves.push(this.fileBase);
      console.log(this.preuves);
    };
  }

}
