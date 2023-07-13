import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/common/auth.service';
import { Goods } from 'src/app/shared/models/goods';

declare var $: any; 
@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
})
export class MenuAdminComponent implements OnInit {
  route: any;
  section1Depliable: boolean = true;
  section2Depliable: boolean = true;
  section3Depliable: boolean = true;
  section4Depliable: boolean = true;
  section5Depliable: boolean = true;
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
  constructor(private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.route = this.router.url;
    }, 500);

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
  }
  // onSectionOneTouch() {
  //   this.section1Depliable = false;
  // }
  onSectionTwoTouch() {
    this.section1Depliable = false;
    // this.section2Depliable = false;
  }
  onSectionThreeTouch() {
    this.section2Depliable = false;
  }
  onSectionFourTouch() {
    this.section3Depliable = false;
  }
  onSectionFiveTouch() {
    this.section4Depliable = false;
  }
  onChangeProperties(e: any) {
    console.log(e);
    this.selectedPropertieIds = e.map((item: { _id: any }) => item._id);
    console.log(this.selectedPropertieIds);
  }
  save(formdata: any) {
    console.log(formdata);
  }
  save2(formdata: any) {
    if (this.step == 1) {
      console.log(this.step);
      this.step += 1;

      // console.log(formdata)

      this.infoGoods.typeBien = formdata?.typeBien;
      this.infoGoods.categoryBien = formdata?.categoryBien;
      this.infoGoods.typeVisite = formdata?.typeVisite;
      this.infoGoods.titre = formdata?.title;

      console.log(this.infoGoods);
    } else if (this.step == 2) {
      console.log(this.step);
      this.step += 1;
      this.infoGoods.description = formdata.description;
      this.infoGoods.chambres = formdata.chambres;
      this.infoGoods.capacite = formdata.capacite;
      this.infoGoods.salleBains = formdata.salleBains;
      // console.log(formdata)
      console.log(this.infoGoods);
    } else if (this.step == 3) {
      console.log(this.step);
      this.step += 1;
      this.infoGoods.commodite = formdata.commodite;
      this.infoGoods.emplacement = formdata.emplacement;
      this.infoGoods.serviceSuplementaire = formdata.serviceSuplementaire;
      this.infoGoods.regle = formdata.regle;
      // console.log(formdata)
      console.log(this.infoGoods);
    } else if (this.step == 4) {
      console.log(this.step);
      this.step += 1;
      this.infoGoods.disponibilte = formdata.disponibilte;
      this.infoGoods.tarifs = formdata.tarifs;
      this.infoGoods.zones = formdata.zones;
      this.infoGoods.pays = formdata.pays;
      // console.log(formdata)
      console.log(this.infoGoods);
    } else if (this.step == 5) {
      console.log(this.step);
      this.step += 1;
      this.infoGoods.atouts = this.selectedAtoutsIds;
      this.infoGoods.properties = this.selectedPropertieIds;
      console.log(this.infoGoods);
      // console.log(formdata)
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
          this.authservice
            .publishGoods(this.infoGoods)
            .subscribe((response) => {
              console.log(response);
              if (response.status == true) {
                this.hasBeenPubished = true;
                console.log(this.hasBeenPubished);
                this.route.navigate(['/admin/goods']);
              }
            });
        });
      });
    }
  }
  changeEtape() {
    this.etape = 2;
  }
  onItemSelect(e: any) {
    console.log(e);
  }
  onSelectAll(e: any) {
    console.log(e);
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
  getTypeBiensList() {
    this.authservice.typeOfGoodsList().subscribe((result) => {
      this.typeOfGoods = result.typeBiens;
    });
  }

  getCategorieList() {
    this.authservice.categorieList().subscribe((result) => {
      this.categorieList = result.categoryBiens;
    });
  }
  getAtoutsList() {
    this.authservice.atoutsLists().subscribe((result) => {
      this.atoutsList = result.atouts;
      console.log(this.atoutsList);
    });
  }
  getPropertiesList() {
    this.authservice.propertiesList().subscribe((result) => {
      this.propertiesList = result.properties;
    });
  }
  getTypeVisiteList() {
    this.authservice.typeVisiteList().subscribe((result) => {
      this.typeVisiteList = result.typeVisites;
    });
  }
  onChangeAtouts(e: any) {
    console.log(e);
    this.selectedAtoutsIds = e.map((item: { _id: any }) => item._id);
    console.log(this.selectedAtoutsIds);
  }

  // when files changes
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
  // here we put file in an array
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
      //Here you can do whatever you want with the base64 String
      this.fileBase = event.target.result;
      // const formData = new FormData();
      console.log(file);

      // formData.append("files", file, file.name);
      // formData.forEach((values) => console.log(values));

      // console.log(this.dataBon);
      // $("#view").attr("src", this.fileBase);
      this.preuves.push(this.fileBase);
      console.log(this.preuves);
    };
  }
}
