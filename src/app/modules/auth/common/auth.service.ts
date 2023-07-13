import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { HttpService } from 'src/app/common/http.service';
import { Users } from 'src/app/shared/models/Users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpservice: HttpService, private route: Router) {}
  loginUser(data: Users): Observable<any> {
    console.log(data);
    return this.httpservice.postRequest('api/auth/login', data).pipe(
      first(),
      map((value) => {
        if (value) {
          alert(value.message);
          console.log(value.data);
          localStorage.setItem(
            'userToken',
            JSON.stringify(value.data.access_token)
          );
          localStorage.setItem('isAuthenticate', '1');
          // this.route.navigate(['/']);
          this.route.navigate(['/admin/dashboard']);
        }
      })
    );
  }
  getOffreurId(id: string): Observable<any> {
    return this.httpservice.getRequest(`api/offreurs/getByIdUser/${id}`);
  }
  saveUserUploadFiles(data: FormData): Observable<any> {
    return this.httpservice.postUploadRequest('api/uploads/save', data);
  }

  getUserUploadFiles(imageId: string): Observable<any> {
    return this.httpservice.getRequest(`api/uploads/get/${imageId}`);
  }

  decodeTokenAndGetUserEmail(token: string): Observable<any> {
    return this.httpservice.getRequest(`api/auth/decode/${token}`);
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  // les routes pou la publication d'un bien
  typeOfGoodsList(): Observable<any> {
    return this.httpservice.getRequest(`api/typeBiens/list`);
  }
  categorieList(): Observable<any> {
    return this.httpservice.getRequest('api/categoryBiens/list');
  }
  atoutsLists(): Observable<any> {
    return this.httpservice.getRequest('api/atouts/list');
  }
  propertiesList(): Observable<any> {
    return this.httpservice.getRequest('api/properties/list');
  }
  typeVisiteList(): Observable<any> {
    return this.httpservice.getRequest('api/typeVisites/list');
  }
  publishGoods(data: any) {
    return this.httpservice.postRequest('api/biens/save', data);
  }

  getAgoodByHisId(id: string): Observable<any> {
    return this.httpservice.getRequest(`api/biens/getById/${id}`);
  }
  getAgoodByOffreurId(id: string): Observable<any> {
    return this.httpservice.getRequest(`api/biens/getByIdOffreur/${id}`);
  }
}
