import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentialService {

  headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6').set('content-type', 'application/json');
  url__residential1 = 'https://whitefang-digitaloffice.form.io/residentials1/submission';

  constructor(private http: HttpClient) { }

  getGridData(officeId, params){
    const index = params.indexOf("property24.p24ID__regex");
    if(index > 0){
     params = params.replace('property24.p24ID__regex','property24.p24ID');
    }
    // let filterData = '?data.user.data.office._id=' + officeId + '&data.listingStatus=' + type;
    return this.http.get<any[]>(this.url__residential1 + params, {headers:this.headers})
  }
  
  getTotalRows(officeId, type){
    let params = '?skip=0&limit=100000&select=_id&data.listingStatus=' + type
    return new Promise(resolve => {
      this.http.get<any[]>(this.url__residential1 + params, {headers:this.headers}).subscribe(resp => {
        resolve(resp.length)
      })
    })
  }
}
