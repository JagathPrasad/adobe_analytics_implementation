import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginEncryptionService } from './login.encryption.service';
import { NotificationsService } from 'angular2-notifications'
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '../../_injectables/Globals';
import { digitalData } from '../../shared/digitalData';
import { DigitalService } from '../../shared/digital.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	
	username:any;
	password:any;
	errorFlag: boolean;
	passwordMatch : boolean;
	loginFailure : boolean;
	loginSuccess : boolean;
	response:any={};
	loginData={};
	public digital = new digitalData();
  constructor(public LoginService: LoginService,public router: Router,
	public _encryptionService: LoginEncryptionService,public changeDetector : ChangeDetectorRef,
	public _NotificationsService : NotificationsService,
		public translate: TranslateService, private globals: Globals, private digitalService: DigitalService) { }

	ngOnInit() {
		//====================================
		this.digital.events.pageView = true;
		this.digital.events.error = false;
		this.digital.page.name = "login";
		this.digital.page.url = window.location.href;
		this.digital.page.referrer = window.location.href;
		this.digital.page.hierarchy = ['isbo'];
		this.digital.page.accessibility = true;
		this.digitalService.AdobeAnalytics(this.digital);
		//====================================
		this.loginSuccess = true;
		this.errorFlag = false;
		this.globals.viewSummaryPage = false;
	}

	loginDatachange(username, password) {
		this.passwordMatch = false;
	}

	doLogin(username, password, userForm, passwordForm) {
		this.errorFlag = true;
		this.passwordMatch = false;
		if (userForm.valid && passwordForm.valid) {
			this.LoginService.doLogin(username, this._encryptionService.encrypt(password)).subscribe(
				data => {
					this.response = data;
					if (this.response.message.message === "Your account have been de-activated,Please contact administrator") {
						this.loginFailure = true;
						this.loginSuccess = false;
					}
					if (this.response.status === 1) {
						this.LoginService.handleSuccessfulLogin(this.response.data);
						//====================================
						this.digital.events.login = true;
						this.digital.events.pageView = false;
						this.digital.events.error = false;
						this.digital.page.name = "login";
						this.digital.page.url = window.location.href;
						this.digital.page.referrer = window.location.href;
						this.digital.page.hierarchy = ['isbo'];
						this.digital.page.accessibility = true;
						this.digitalService.AdobeAnalytics(this.digital);
						//====================================
						this.router.navigate(['/transactions']);
						this.changeDetector.markForCheck();
						this.errorFlag = false;
						this.passwordMatch = false;
						this.loginFailure = false;
						this.loginSuccess = true;
					} else if (this._encryptionService.encrypt(password) != username) {
						this.errorFlag = true;
						this.passwordMatch = true;
						//this._NotificationsService.error("", this.translate.instant(this.response.message.message));
					}
				},
				error => {
					this.ErrorUpdates(['server-error']);
					this._NotificationsService.error("", error);
				});
		} else {
			this.ErrorUpdates(['Registered Email Address', 'Password']);
		}
	}
	goPage(url) {
		this.router.navigate([url]);
	}
	onKeyEnter(event, loginDataUsername, loginDataPassword, username, pwd) {
		this.doLogin(loginDataUsername, loginDataPassword, username, pwd);
	}

	ErrorUpdates(fiedNames: any[]) {
  //====================================
		let errors = [];
		for (let i = 0; i < fiedNames.length; i++) {
			if (fiedNames[i] != '') {
				if (fiedNames[i] != 'server error') {
					var x = {
						field: fiedNames[i],
						code: 'na',
						type: 'error',
						subtype: 'wrong'
					};
					errors.push(x);
				}
				else {
					var x = {
						field: fiedNames[i],
						code: '45c43fda2',
						type: 'error',
						subtype: 'missing'
					};
					errors.push(x);
				}
			}
		}
		this.digital.errors = errors;
		this.digital.events.pageView = false;
		this.digital.events.login = false;
		this.digital.events.error = true;
		this.digitalService.AdobeAnalytics(this.digital);
		//====================================
	}
}
