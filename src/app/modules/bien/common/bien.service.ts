import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/common/http.service';

@Injectable({
  providedIn: 'root',
})
export class BienService {
  constructor(private httpservice: HttpService) {}
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
