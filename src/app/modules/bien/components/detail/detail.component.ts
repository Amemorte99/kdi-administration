import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BienService } from '../../common/bien.service';
import { AuthService } from 'src/app/modules/auth/common/auth.service';
import { of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() goodsDataInProduct : any 
  goodsData!: any;
  photoArray! : any 
  apiUrl: any =  `${environment.apiUrl}api/uploads/get/`;
  constructor(private bienservice: BienService, 
    private authservice : AuthService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.getAgoodDetail(`${id}`)
    // this.getOffreurListOfGoods()
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   // if(changes['goodsDataInProduct'] && changes['goodsDataInProduct'].currentValue){
  //   //   console.log(this.goodsDataInProduct);
  //   // }
  //   console.log(this.goodsDataInProduct)
  //   this.photoArray = this.goodsDataInProduct?.reduce((acc: any, bien: any) => {
  //     const photos = bien.photos;
  //     acc = acc.concat(photos);
  //     return acc;
  //   }, []);
  //   console.log(this.photoArray)
    
  // }
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
  getAgoodDetail(id : string){
    this.bienservice.getAgoodByHisId(id).subscribe((response)=>{
      console.log(response)
      this.photoArray = response.photos
      console.log(this.photoArray)
    })
  }
  // getOffreurListOfGoods() {
  //   this.getUserId().subscribe((result) => {
  //     console.log(result)
  //     this.bienservice.getAgoodByOffreurId(result._id).subscribe((result) => {
  //       console.log(result)   
  //       this.goodsData = result.biens
  //       this.photoArray = result.biens?.reduce((acc: any, bien: any) => {
  //         const photos = bien.photos;
  //         acc = acc.concat(photos);
  //         return acc;
  //       }, []);
  //       console.log(this.photoArray)
   

  //     })
  //   })
  // }

}
