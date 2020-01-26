//#region Namespaces
import { Injectable } from '@angular/core';
import { digitalData } from './digitalData';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../user/login/login.service';
import { Subject } from 'rxjs';
import { DataService } from '../services/data.service';
//#endregion


@Injectable()
export class DigitalService {
    paymentInfoData: any = {}
    static instance: DigitalService;

    constructor(private http: HttpClient, private loginService: LoginService, private dataService: DataService) {
        DigitalService.instance = this;
    }


    /*
    Created By : Jagath
    Created On : 5th Mar 2019
    Description: Updating to Adobe Analytics
      */
    AdobeAnalytics(digitalData: digitalData) {
        setTimeout(function () {
            window['_trackData'](digitalData);
        }, 1000)
    }

    /*
    Created By : Jagath
    Created On : 11th Mar 2019
    Description: Verifying User LoggedIn
      */
    IsLoggedIn(): boolean {
        return this.loginService.isLoggedIn();
    }

    /*
   Created By : Jagath
   Created On : 11th Mar 2019
   Description: Fetching the Current User Id
     */
    GetUserId(): any {
        var userData = this.loginService.getCurrentUserData();
        if (userData != {} && userData != null) {
            return userData.user_id;
        } else {
            return 0;
        }
    }


    SetLanguage(key: any, value: any) {
        sessionStorage.setItem(key, value);
    }

    public GetLanguage() {
        return sessionStorage.getItem('language') != null ? sessionStorage.getItem('language').toString() : "en";
    }
}
