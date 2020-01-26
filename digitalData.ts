/*
Created By  : Jagath
Created On  : 4th Mar 2019
Description : Common file for Adobe Analytics
*/

//#region  Namespaces
import { environment } from '../../environments/environment';
import { DigitalService } from './digital.service';
//#endregion


export class digitalData {


    constructor() {

    }
    public events: any = {
        pageView: false,
        login: false,
        siteRegistration: false,
        formView: false,
        formSubmit: false,
        formQualify: false,
        formStep: false,
        formPrefill: false,
        onlineAccount: false,
        paperless: false,
        error: false,
        type: false,
        subtype: false,
        field: false,
        code: false,
        download: false,
        exit: false,
        siteInteraction: false,
        adImpression: false,
        adClick: false,
        applicationPersonalDetails: false,
        applicationSummary: false,
        applicationFulfillment: false,
        applicationTermsConditions: false,
        applicationConfirmation: false,
        systemCancelled: false,
        lead: false,
        appComplete: false,
        purchase: false
    };

    public site: any = {
        brand: "cibc",
        name: 'isbo',
        type: 'responsive',
        environment: environment.production ? "production" : "development",
        appVersion: "1.0.13",
        lastBuildDate: "2019-01-19"
    };


    public page: any = {
        name: "",
        url: "",
        referrer: "",
        hierarchy: [],
        language: DigitalService.instance.GetLanguage(),
        accessibility: false

    };


    public user: any = {
        authState: DigitalService.instance.IsLoggedIn() != true ? 'not-authenticated' : 'authenticated',
        // type: 'pb',
        type: DigitalService.instance.IsLoggedIn() != true ? '' : 'pb',
        ID: DigitalService.instance.GetUserId(),
        segment: ''
    };


    public form: any = {
        name: '',
        uniqueID: null,
        stepName: '',
        prefillMethod: ''
    };

    public transaction: any = {
        ID: null,
        items: [
            {
                from: {
                    currency: '',
                    holding: 'external'
                },
                to: {
                    currency: '',
                    holding: ''
                },
                amount: 0,
                fees: 0
            }
        ]
    };

    public download: any = {
        filename: '',
        filetype: ''
    }

    public exit: any = {
        linkURL: ''
    }

    public interaction: any = {
        name: ''
    }

    public advertising: any = {
        trackingCode: '',
        location: '',
        type: ''
    }

    public products: any = [{
        id: '',
        marketingSiteSection: '',
        positioning: '',
        grouping: '',
        parentProduct: '',
        fulfilment: '',
        quantity: '',
        price: '',
        adjudication: '',
        joint: '',
        paperless: ''

    }];

    public errors: any = [{
        type: '',
        subtype: '',
        field: '',
        code: ''
    }];

}

