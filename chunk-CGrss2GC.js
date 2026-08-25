import {T as Ti,o as oo,B as Bo,f as fo,U as Ui,S as So}from'./chunk-BtHJ4iS2.js';import {Y as Yd}from'./chunk-C7xvdjsq.js';import {J as JI,O as Ol,u as ui,m as mD,P as PD,R as Rc,I as Ip,y as yv,M as Vp,F as FD,c as Ro,e as vc,f as mc,ai as ns,T as bE,b2 as TE,x as pp,X as _E,v as vp,C,U as UD,r as Pi,b5 as as,o as os,a as Cp,i as aI,l as lI,j as jp,aw as wp,a0 as VE,ak as zE,S as SD,Z as RE,aD as mu,aE as yu,A as VD}from'./main-SDEH4KAW.js';import {k as kn,m as me$1,j as jn,x as xn,S as Sn,I as In,s as sn,n as nn}from'./chunk-0LgUejG5.js';import {b as be}from'./chunk-BbzkMfAu.js';import'./chunk-HjmtuJuS.js';var E=(()=>{class o{onSubmitLiveForm(){this.liveForm.markAllAsTouched();}resetLiveForm(){this.liveForm.reset({name:"",notes:"",password:"",rating:0,date:"",country:null,countryAutocomplete:null,delivery:null,agree:false});}constructor(){this.formBuilder=C(kn),this.liveErrors=Ro([{error:me$1.required.name,message:"form.errors.required"},{error:me$1.requiredTrue.name,message:"form.errors.requiredTrue"},{error:me$1.minLength.name,message:"form.errors.minLength"},{error:"noMatch",message:"form.errors.noMatch"}]),this.mustBeOk=a=>a.value==="ok"?null:{noMatch:true},this.mustBeFutureDate=a=>{let e=a.value;if(!e)return null;let t=new Date(e);if(Number.isNaN(t.getTime()))return {noMatch:true};let y=new Date;return y.setHours(0,0,0,0),t.setHours(0,0,0,0),t.getTime()>y.getTime()?null:{noMatch:true}},this.mustBeAtLeast10=a=>{let e=a.value;return e==null||e>=10?null:{noMatch:true}},this.countryOptions=Ro([{label:"Italy",value:"IT"},{label:"France",value:"FR"},{label:"Germany",value:"DE"},{label:"Spain",value:"ES"}]),this.deliveryOptions=Ro([{value:"standard",label:"Standard"},{value:"express",label:"Express"}]),this.liveForm=this.formBuilder.group({name:this.formBuilder.control("",[me$1.required,this.mustBeOk]),notes:this.formBuilder.control("",[me$1.required,me$1.minLength(10)]),password:this.formBuilder.control("",[me$1.required,me$1.minLength(6)]),rating:this.formBuilder.control(0,[me$1.required,this.mustBeAtLeast10]),date:this.formBuilder.control("",[me$1.required,this.mustBeFutureDate]),country:this.formBuilder.control(null,[me$1.required]),countryAutocomplete:this.formBuilder.control(null,[me$1.required]),delivery:this.formBuilder.control(null,[me$1.required]),agree:this.formBuilder.control(false,[me$1.requiredTrue])}),this.liveFormValue=Ro(this.liveForm.getRawValue()),this.liveFormStatus=Ro(this.liveForm.status),this.liveFormValid=UD(()=>this.liveFormStatus()==="VALID"),this.liveForm.valueChanges.pipe(Pi()).subscribe(()=>{this.liveFormValue.set(this.liveForm.getRawValue());}),this.liveForm.statusChanges.pipe(Pi()).subscribe(a=>{this.liveFormStatus.set(a);});}static{this.\u0275fac=function(e){return new(e||o)};}static{this.\u0275cmp=JI({type:o,selectors:[["playground-form-live-example"]],decls:41,vars:19,consts:[[1,"text-muted","mb-3"],[1,"card","p-3","mb-3",3,"ngSubmit","formGroup"],["componentId","live-name","componentLabel","Name","componentPlaceholder","Type 'ok'","componentType","text","formControlName","name",3,"errorMap"],["componentId","live-notes","componentLabel","Notes","componentPlaceholder","Write at least 10 characters","componentType","textarea","formControlName","notes",3,"errorMap"],["componentId","live-password","componentLabel","Password","componentPlaceholder","At least 6 characters","componentType","password","formControlName","password",3,"errorMap"],["componentId","live-rating","componentLabel","Rating","componentPlaceholder","Enter a number \u2265 10","componentType","number","formControlName","rating",3,"errorMap"],["componentId","live-date","componentLabel","Date","componentPlaceholder","Select a future date","formControlName","date",3,"errorMap"],["componentId","live-country","componentLabel","Country","componentPlaceholder","Select a country","formControlName","country","selectionMode","single",3,"errorMap","selectOptions"],["componentId","live-country-autocomplete","componentLabel","Country (autocomplete)","componentPlaceholder","Start typing to search","formControlName","countryAutocomplete",3,"errorMap","internalFilterOptions","selectOptions"],["componentId","live-delivery","componentLabel","Delivery","formControlName","delivery",3,"errorMap","radioOptions"],["checkType","checkbox","componentId","live-agree","componentLabel","Agree","formControlName","agree",3,"errorMap"],[1,"d-flex","gap-2"],["type","submit",1,"btn","btn-primary"],["type","button",1,"btn","btn-outline-secondary",3,"click"],[1,"card","p-3"],[1,"d-flex","gap-4","flex-wrap"],[1,"fw-semibold"],[1,"mb-0"]],template:function(e,t){e&1&&(ui(0,"p",0),mD(1," Submit with invalid values to see how errors appear after "),ui(2,"code"),mD(3,"markAllAsTouched()"),Rc(),mD(4,". (Tip: set the name to "),ui(5,"code"),mD(6,"ok"),Rc(),mD(7,", pick a future date, and check the checkbox.) "),Rc(),ui(8,"form",1),Cp("ngSubmit",function(){return t.onSubmitLiveForm()}),Ip(9,"quang-input",2),aI(),Ip(10,"quang-input",3),aI(),Ip(11,"quang-input",4),aI(),Ip(12,"quang-input",5),aI(),Ip(13,"quang-date",6),aI(),Ip(14,"quang-select",7),aI(),Ip(15,"quang-autocomplete",8),aI(),Ip(16,"quang-radio-group",9),aI(),Ip(17,"quang-checkbox",10),aI(),ui(18,"div",11)(19,"button",12),mD(20," Submit "),Rc(),ui(21,"button",13),Cp("click",function(){return t.resetLiveForm()}),mD(22," Reset "),Rc()()(),ui(23,"div",14)(24,"div",15)(25,"div")(26,"div",16),mD(27,"Valid"),Rc(),ui(28,"div"),mD(29),Rc()(),ui(30,"div")(31,"div",16),mD(32,"Status"),Rc(),ui(33,"div"),mD(34),Rc()()(),Ip(35,"hr"),ui(36,"div",16),mD(37,"Value"),Rc(),ui(38,"pre",17),mD(39),PD(40,"json"),Rc()()),e&2&&(yv(8),vp("formGroup",t.liveForm),yv(),vp("errorMap",t.liveErrors()),lI(),yv(),vp("errorMap",t.liveErrors()),lI(),yv(),vp("errorMap",t.liveErrors()),lI(),yv(),vp("errorMap",t.liveErrors()),lI(),yv(),vp("errorMap",t.liveErrors()),lI(),yv(),vp("errorMap",t.liveErrors())("selectOptions",t.countryOptions()),lI(),yv(),vp("errorMap",t.liveErrors())("internalFilterOptions",true)("selectOptions",t.countryOptions()),lI(),yv(),vp("errorMap",t.liveErrors())("radioOptions",t.deliveryOptions()),lI(),yv(),vp("errorMap",t.liveErrors()),lI(),yv(12),jp(t.liveFormValid()),yv(5),jp(t.liveFormStatus()),yv(5),jp(FD(40,17,t.liveFormValue())));},dependencies:[as,jn,xn,Sn,In,sn,nn,oo,Yd,Bo,fo,Ui,So,os],encapsulation:2});}}return o})(),q=`import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { QuangCheckboxComponent } from 'quang/components/checkbox'
import { QuangDateComponent } from 'quang/components/date'
import { QuangInputComponent } from 'quang/components/input'
import { QuangRadioGroupComponent, RadioOption } from 'quang/components/radio-group'
import { QuangSelectComponent } from 'quang/components/select'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-form-live-example',
  imports: [
    ReactiveFormsModule,
    QuangInputComponent,
    QuangDateComponent,
    QuangCheckboxComponent,
    QuangSelectComponent,
    QuangAutocompleteComponent,
    QuangRadioGroupComponent,
  ],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <quang-input formControlName="name" componentLabel="Name" componentType="text" />
      <quang-input formControlName="notes" componentLabel="Notes" componentType="textarea" />
      <quang-input formControlName="password" componentLabel="Password" componentType="password" />
      <quang-input formControlName="rating" componentLabel="Rating" componentType="number" />

      <quang-date formControlName="date" componentLabel="Date" />

      <quang-select
        formControlName="country"
        componentLabel="Country"
        selectionMode="single"
        [selectOptions]="countryOptions"
      />

      <quang-autocomplete
        formControlName="countryAutocomplete"
        componentLabel="Country (autocomplete)"
        [internalFilterOptions]="true"
        [selectOptions]="countryOptions"
      />

      <quang-radio-group
        formControlName="delivery"
        componentLabel="Delivery"
        [radioOptions]="deliveryOptions"
      />

      <quang-checkbox formControlName="agree" componentLabel="Agree" checkType="checkbox" />

      <button type="submit">Submit</button>
    </form>
  \`,
})
export class FormLiveExampleComponent {
  constructor(private readonly fb: FormBuilder) {}

  private mustBeOk(control: AbstractControl<string>): ValidationErrors | null {
    return control.value === 'ok' ? null : { noMatch: true }
  }

  private mustBeFutureDate(control: AbstractControl<string>): ValidationErrors | null {
    const value = control.value
    if (!value) return null

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return { noMatch: true }

    const now = new Date()
    now.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    return date.getTime() > now.getTime() ? null : { noMatch: true }
  }

  private mustBeAtLeast10(control: AbstractControl<number>): ValidationErrors | null {
    return control.value >= 10 ? null : { noMatch: true }
  }

  countryOptions: SelectOption[] = [
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
    { label: 'Spain', value: 'ES' },
  ]

  deliveryOptions: RadioOption[] = [
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
  ]

  form = this.fb.group({
    name: ['', [Validators.required, (c) => this.mustBeOk(c as AbstractControl<string>)]],
    notes: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rating: [0, [Validators.required, (c) => this.mustBeAtLeast10(c as AbstractControl<number>)]],
    date: ['', [Validators.required, (c) => this.mustBeFutureDate(c as AbstractControl<string>)]],
    country: [null, [Validators.required]],
    countryAutocomplete: [null, [Validators.required]],
    delivery: [null, [Validators.required]],
    agree: [false, [Validators.requiredTrue]],
  })

  onSubmit(): void {
    this.form.markAllAsTouched()
  }
}`,w=`<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <quang-input formControlName="name" componentLabel="Name" componentType="text" />
  <quang-input formControlName="notes" componentLabel="Notes" componentType="textarea" />
  <quang-input formControlName="password" componentLabel="Password" componentType="password" />
  <quang-input formControlName="rating" componentLabel="Rating" componentType="number" />

  <quang-date formControlName="date" componentLabel="Date" />

  <quang-select
    formControlName="country"
    componentLabel="Country"
    selectionMode="single"
    [selectOptions]="countryOptions"
  />

  <quang-autocomplete
    formControlName="countryAutocomplete"
    componentLabel="Country (autocomplete)"
    [internalFilterOptions]="true"
    [selectOptions]="countryOptions"
  />

  <quang-radio-group
    formControlName="delivery"
    componentLabel="Delivery"
    [radioOptions]="deliveryOptions"
  />

  <quang-checkbox formControlName="agree" componentLabel="Agree" checkType="checkbox" />

  <button type="submit">Submit</button>
</form>`;var me=(()=>{class o{constructor(){this.liveExampleTs=q,this.liveExampleHtml=w;}static{this.\u0275fac=function(e){return new(e||o)};}static{this.\u0275cmp=JI({type:o,selectors:[["playground-form-example-showcase"]],decls:10,vars:14,consts:[[1,"playground-showcase","form-showcase"],[1,"showcase-header"],[3,"description","htmlCode","title","tsCode"]],template:function(e,t){e&1&&(ui(0,"div",0)(1,"div",1)(2,"h2"),mD(3),PD(4,"transloco"),PD(5,"transloco"),Rc()(),ui(6,"playground-example-viewer",2),PD(7,"transloco"),PD(8,"transloco"),Ip(9,"playground-form-live-example"),Rc()()),e&2&&(yv(3),Vp("",FD(4,6,"menu.form")," / ",FD(5,8,"menu.formExample")),yv(3),vp("description",FD(7,10,"form.showcase.liveExample.description"))("htmlCode",t.liveExampleHtml)("title",FD(8,12,"form.showcase.liveExample.title"))("tsCode",t.liveExampleTs));},dependencies:[Ti,E,Ol],encapsulation:2});}}return o})();var ue=o=>({$implicit:o});function ce(o,M){if(o&1&&wp(0,3),o&2){let a=M.$implicit;VE();let e=zE(9);vp("ngTemplateOutlet",e)("ngTemplateOutletContext",SD(2,ue,a));}}function de(o,M){if(o&1){let a=RE();ui(0,"div",4)(1,"div",5)(2,"h5"),mD(3),Rc(),ui(4,"button",6),PD(5,"transloco"),Cp("click",function(){let t=mu(a).$implicit,y=VE();return yu(y.copyToClipboard(t.import,t.exampleUsage))}),Ip(6,"svg-icon",7),Rc()(),ui(7,"div",8)(8,"p"),mD(9),PD(10,"transloco"),Rc(),ui(11,"pre"),mD(12,"          "),ui(13,"span",9),mD(14),Rc(),mD(15,`
          `),ui(16,"span"),mD(17),Rc(),mD(18,`
      `),Rc()()();}if(o&2){let a=M.$implicit,e=VE();yv(3),jp(a.functionName),yv(),vp("quangTooltip",FD(5,5,e.buttonTooltip())),yv(5),jp(FD(10,7,a.explanationKey)),yv(5),jp(a.import),yv(3),jp(a.exampleUsage);}}var pe=(()=>{class o{constructor(){this.buttonTooltip=Ro("utils.copyContent"),this.formFunctions=[{functionName:"fileMaxSize",import:"import { fileMaxSize } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        file: this.formBuilder.control('', [fileMaxSize(5000000)])
      });`,explanationKey:"form.functions.fileMaxSize"},{functionName:"fileMinSize",import:"import { fileMinSize } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        file: this.formBuilder.control('', [fileMinSize(1000)])
      });`,explanationKey:"form.functions.fileMinSize"},{functionName:"isFile",import:"import { isFile } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        file: this.formBuilder.control('', [isFile()])
      });`,explanationKey:"form.functions.isFile"},{functionName:"fileType",import:"import { fileType } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        file: this.formBuilder.control('', [fileType(['image/png', 'image/jpeg'])])
      });`,explanationKey:"form.functions.fileType"},{functionName:"fileExtensions",import:"import { fileExtensions } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        file: this.formBuilder.control('', [fileExtensions(['.png', '.jpg'])])
      });`,explanationKey:"form.functions.fileExtensions"},{functionName:"requiredCheckbox",import:"import { requiredCheckbox } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        agree: this.formBuilder.control(false, [requiredCheckbox()])
      });`,explanationKey:"form.functions.requiredCheckbox"},{functionName:"minDate",import:"import { minDate } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        date: this.formBuilder.control('', [minDate(new Date('2023-01-01'))])
      });`,explanationKey:"form.functions.minDate"},{functionName:"maxDate",import:"import { maxDate } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        date: this.formBuilder.control('', [maxDate(new Date('2023-12-31'))])
      });`,explanationKey:"form.functions.maxDate"},{functionName:"dateBetween",import:"import { dateBetween } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        date: this.formBuilder.control('', [dateBetween(new Date('2023-01-01'), new Date('2023-12-31'))])
      });`,explanationKey:"form.functions.dateBetween"},{functionName:"isFiscalCode",import:"import { isFiscalCode } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        fiscalCode: this.formBuilder.control('', [isFiscalCode()])
      });`,explanationKey:"form.functions.isFiscalCode"},{functionName:"isVatNumber",import:"import { isVatNumber } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        vatNumber: this.formBuilder.control('', [isVatNumber([EuroLocale.IT, EuroLocale.FR])])
      });`,explanationKey:"form.functions.isVatNumber"},{functionName:"wysiwygRequired",import:"import { wysiwygRequired } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
        content: this.formBuilder.control('<p></p>', [wysiwygRequired()])
      });`,explanationKey:"form.functions.wysiwygRequired"}];}copyToClipboard(a,e){navigator.clipboard.writeText(`${a}
${e}`),this.buttonTooltip.set("utils.copied"),setTimeout(()=>{this.buttonTooltip.set("utils.copyContent");},2e3);}static{this.\u0275fac=function(e){return new(e||o)};}static{this.\u0275cmp=JI({type:o,selectors:[["playground-form-validators-showcase"]],decls:10,vars:6,consts:[["functionCard",""],[1,"playground-showcase","form-showcase"],[1,"showcase-header"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"card","mb-3"],[1,"card-header"],["overlayPosition","top-left","type","button",1,"btn","btn-copy",3,"click","quangTooltip"],["src","assets/icons/svg/copy.svg"],[1,"card-body"],[1,"mb-3"]],template:function(e,t){e&1&&(ui(0,"div",1)(1,"div",2)(2,"h2"),mD(3),PD(4,"transloco"),PD(5,"transloco"),Rc()(),bE(6,ce,1,4,"ng-container",3,TE),Rc(),pp(8,de,19,9,"ng-template",null,0,VD)),e&2&&(yv(3),Vp("",FD(4,2,"menu.form")," / ",FD(5,4,"menu.formValidators")),yv(3),_E(t.formFunctions));},dependencies:[vc,mc,be,ns,Ol],styles:[".card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{margin:0}.card-header[_ngcontent-%COMP%]   .btn-copy[_ngcontent-%COMP%]{padding:0}.card-header[_ngcontent-%COMP%]   .btn-copy[_ngcontent-%COMP%]:active{border-color:transparent}.card-body[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:var(--bs-card-cap-bg);margin:0;display:flex;flex-direction:column;padding:1.5rem;position:relative}"]});}}return o})();var se=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)};}static{this.\u0275cmp=JI({type:o,selectors:[["playground-form-test"]],decls:6,vars:6,consts:[[1,"form-test"]],template:function(e,t){e&1&&(ui(0,"div",0)(1,"h2"),mD(2),PD(3,"transloco"),PD(4,"transloco"),Rc(),Ip(5,"playground-form-live-example"),Rc()),e&2&&(yv(2),Vp("",FD(3,2,"menu.form")," / ",FD(4,4,"menu.formTest")));},dependencies:[E,Ol],styles:[".form-test[_ngcontent-%COMP%]{padding:20px}"]});}}return o})();var fe=[{path:"test",component:se},{path:"validators",component:pe},{path:"example",component:me},{pathMatch:"full",path:"",redirectTo:"validators"},{path:"**",pathMatch:"full",redirectTo:"validators"}],We=fe;export{We as default};