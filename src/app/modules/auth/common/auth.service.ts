import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { HttpService } from 'src/app/common/http.service';
import { Users } from 'src/app/shared/models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpservice : HttpService, private route:Router) { }
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

}
