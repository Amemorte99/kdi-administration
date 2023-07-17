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

  // pour le depliage de l'acordion
  section1Depliable: boolean = true;
  // section2Depliable: boolean = true;

  // pour la verification des champs de chaque section de l'accordion
  section1Completed = false;
  section2Completed = false;
  section3Completed = false;
  section4Completed = false;
  section5Completed = false;
  AllsectionFieldCompleted = false;

  step: number = 1;
  good = new Goods();
  categorieList!: any;
  atoutsList!: any;
  propertiesList!: any;
  typeVisiteList!: any;
  typeOfGoods!: any;
  hasBeenPubished: boolean = false;

  infoGoods: any = {};
  // infoBiens: any = {};

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
  }

  
  // gestion des champs des section section
  isSection1Valid() {
    return (
      this.good.typeBien &&
      this.good.categoryBien &&
      this.good.typeVisite &&
      this.good.titre
    );
  }
  isSection2Valid(): boolean {
    return !!this.good.description &&
      !!this.good.chambres &&
      !!this.good.capacite &&
      !!this.good.salleBains;
  }
  isSection3Valid() {
    return (
      !!this.good.commodite &&
      !!this.good.regle &&
      !!this.good.serviceSuplementaire &&
      !!this.good.emplacement
    );
  }
  isSection4Valid() {
    return (
      this.good.disponibilte &&
      this.good.pays &&
      this.good.zones &&
      this.good.tarifs
    );
  }

  onSectionOneChange() {
    setTimeout(() => {
      this.section1Completed = this.isSection1Valid();
      this.section1Depliable = false;
      this.section2Completed = this.isSection1Valid();

      // concatenation des données section1
      this.infoGoods.typeBien = this.good?.typeBien;
      this.infoGoods.categoryBien = this.good?.categoryBien;
      this.infoGoods.typeVisite = this.good?.typeVisite;
      this.infoGoods.titre = this.good?.titre;
    }, 8000);
  }
onSectionTwoChange() {
  setTimeout(() => {
    this.section2Completed = false;
    this.section3Completed = this.isSection2Valid();

    // concatenation des données section2
    this.infoGoods.description = this.good?.description;
    this.infoGoods.chambres = this.good?.chambres;
    this.infoGoods.capacite = this.good?.capacite;
    this.infoGoods.salleBains = this.good?.salleBains;

  }, 8000);
}
  onSectionThreeChange() {
    setTimeout(() => {
      this.section3Completed = false
      this.section4Completed = this.isSection3Valid();

      // concatenation des données section3
      this.infoGoods.commodite = this.good?.commodite;
      this.infoGoods.emplacement = this.good?.emplacement;
      this.infoGoods.serviceSuplementaire = this.good?.serviceSuplementaire;
      this.infoGoods.regle = this.good?.regle;
    }, 8000);
  }

  onSectionFourChange() {
    setTimeout(() => {
      this.section4Completed = false
      this.section5Completed = this.isSection3Valid();

       // concatenation des données section3
      this.infoGoods.disponibilte = this.good?.disponibilte;
      this.infoGoods.tarifs = this.good?.tarifs;
      this.infoGoods.zones = this.good?.zones;
      this.infoGoods.pays = this.good?.pays;
      this.infoGoods.atouts = this.selectedAtoutsIds;
      this.infoGoods.properties = this.selectedPropertieIds;
    }, 8000);
  }
  onChangeProperties(e: any) {
    console.log(e);
    this.selectedPropertieIds = e.map((item: { _id: any }) => item._id);
    console.log(this.selectedPropertieIds);
  }
  save(formdata: any) {
    console.log(formdata);
    console.log(this.infoGoods)


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
