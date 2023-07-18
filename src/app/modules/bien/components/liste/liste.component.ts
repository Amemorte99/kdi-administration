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

  //
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
  constructor(
    private router: Router,
    private authservice: AuthService,
    private bienservice: BienService,
    private shareddataService: ShareddataService
  ) {}

  ngOnInit(): void {
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
    return (
      !!this.good.description &&
      !!this.good.chambres &&
      !!this.good.capacite &&
      !!this.good.salleBains
    );
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
      this.section3Completed = false;
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
      this.section4Completed = false;
      this.section5Completed = this.isSection3Valid();

      // concatenation des données section3
      this.infoGoods.disponibilte = this.good?.disponibilte;
      this.infoGoods.tarifs = this.good?.tarifs;
      this.infoGoods.zones = this.good?.zones;
      this.infoGoods.pays = this.good?.pays;
      this.infoGoods.atouts = this.selectedAtoutsIds;
      this.infoGoods.properties = this.selectedPropertieIds;
      console.log(this.infoGoods);
      // this.save2(this.infoGoods);
    }, 8000);
  }
  publishOrShowGood() {
    if (this.isPublished) {
      console.log('affiche le bien');
      this.router.navigate(['/admin/bien/detail/1']);
      // modal pour afficher le bien
    } else {
      // methode pour publier le bien
      console.log('publie le bien');
    }
  }

  onChangeProperties(e: any) {
    console.log(e);
    this.selectedPropertieIds = e.map((item: { _id: any }) => item._id);
    console.log(this.selectedPropertieIds);
  }
  save(formdata: any) {
    console.log(formdata);
    console.log(this.infoGoods);
  }
  save2(formdata: any) {
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
        this.bienservice.publishGoods(this.infoGoods).subscribe((response) => {
          console.log(response);
          if (response.status == true) {
            this.hasBeenPubished = true;
            console.log(this.hasBeenPubished);
            this.router.navigate(['/admin/bien/liste']);
          }
        });
      });
    });
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
      this.fileBase = event.target.result;
      console.log(file);
      this.preuves.push(this.fileBase);
      console.log(this.preuves);
    };
  }
  getOffreurListOfGoods() {
    this.getUserId().subscribe((result) => {
      console.log(result);

      this.bienservice.getAgoodByOffreurId(result._id).subscribe((result) => {
        console.log(result);
        // const photoArray = result.biens.map((bien: { photos: any; }) => bien.photos);
        // console.log(photoArray)

        this.goodsData = result.biens;
        // console.log("googgggg",this.goodsData)
      });
    });
  }
}
