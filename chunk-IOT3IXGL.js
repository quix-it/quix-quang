import{a as Z,d as ee,e as te,f as oe,g as ne,h as re,i as ie}from"./chunk-ZWRYWSQY.js";import"./chunk-5EFTQQQD.js";import{c as u,e as H,f as z,j as X,l as $,m as j,p as J,r as W}from"./chunk-ATOMAW26.js";import"./chunk-X5G5AH6F.js";import{c as Y}from"./chunk-GEJCXOOG.js";import{K as y,M as K,O as G,i as R,k as Q,l as U,x as F}from"./chunk-763HVDP5.js";import"./chunk-CJPLD6EO.js";import{Bc as I,Eb as B,Gb as _,Gc as P,Hb as O,Ib as l,Jb as m,Kb as r,Lb as c,Rb as D,Sb as V,Vb as b,Xb as x,ab as n,dc as k,ga as q,gc as i,hc as d,jc as h,la as w,ma as N,pb as g,ub as L,uc as A,xa as f,yc as p,zc as s}from"./chunk-GMJUIHLG.js";var C=(()=>{class o{onSubmitLiveForm(){this.liveForm.markAllAsTouched()}resetLiveForm(){this.liveForm.reset({name:"",notes:"",password:"",rating:0,date:"",country:null,countryAutocomplete:null,delivery:null,agree:!1})}constructor(){this.formBuilder=q(J),this.liveErrors=f([{error:u.required.name,message:"form.errors.required"},{error:u.requiredTrue.name,message:"form.errors.requiredTrue"},{error:u.minLength.name,message:"form.errors.minLength"},{error:"noMatch",message:"form.errors.noMatch"}]),this.mustBeOk=a=>a.value==="ok"?null:{noMatch:!0},this.mustBeFutureDate=a=>{let e=a.value;if(!e)return null;let t=new Date(e);if(Number.isNaN(t.getTime()))return{noMatch:!0};let v=new Date;return v.setHours(0,0,0,0),t.setHours(0,0,0,0),t.getTime()>v.getTime()?null:{noMatch:!0}},this.mustBeAtLeast10=a=>{let e=a.value;return e==null||e>=10?null:{noMatch:!0}},this.countryOptions=f([{label:"Italy",value:"IT"},{label:"France",value:"FR"},{label:"Germany",value:"DE"},{label:"Spain",value:"ES"}]),this.deliveryOptions=f([{value:"standard",label:"Standard"},{value:"express",label:"Express"}]),this.liveForm=this.formBuilder.group({name:this.formBuilder.control("",[u.required,this.mustBeOk]),notes:this.formBuilder.control("",[u.required,u.minLength(10)]),password:this.formBuilder.control("",[u.required,u.minLength(6)]),rating:this.formBuilder.control(0,[u.required,this.mustBeAtLeast10]),date:this.formBuilder.control("",[u.required,this.mustBeFutureDate]),country:this.formBuilder.control(null,[u.required]),countryAutocomplete:this.formBuilder.control(null,[u.required]),delivery:this.formBuilder.control(null,[u.required]),agree:this.formBuilder.control(!1,[u.requiredTrue])}),this.liveFormValue=f(this.liveForm.getRawValue()),this.liveFormStatus=f(this.liveForm.status),this.liveFormValid=P(()=>this.liveFormStatus()==="VALID"),this.liveForm.valueChanges.pipe(F()).subscribe(()=>{this.liveFormValue.set(this.liveForm.getRawValue())}),this.liveForm.statusChanges.pipe(F()).subscribe(a=>{this.liveFormStatus.set(a)})}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=g({type:o,selectors:[["playground-form-live-example"]],decls:41,vars:19,consts:[[1,"text-muted","mb-3"],[1,"card","p-3","mb-3",3,"ngSubmit","formGroup"],["componentId","live-name","componentLabel","Name","componentPlaceholder","Type 'ok'","componentType","text","formControlName","name",3,"errorMap"],["componentId","live-notes","componentLabel","Notes","componentPlaceholder","Write at least 10 characters","componentType","textarea","formControlName","notes",3,"errorMap"],["componentId","live-password","componentLabel","Password","componentPlaceholder","At least 6 characters","componentType","password","formControlName","password",3,"errorMap"],["componentId","live-rating","componentLabel","Rating","componentPlaceholder","Enter a number \u2265 10","componentType","number","formControlName","rating",3,"errorMap"],["componentId","live-date","componentLabel","Date","componentPlaceholder","Select a future date","formControlName","date",3,"errorMap"],["componentId","live-country","componentLabel","Country","componentPlaceholder","Select a country","formControlName","country","selectionMode","single",3,"errorMap","selectOptions"],["componentId","live-country-autocomplete","componentLabel","Country (autocomplete)","componentPlaceholder","Start typing to search","formControlName","countryAutocomplete",3,"errorMap","internalFilterOptions","selectOptions"],["componentId","live-delivery","componentLabel","Delivery","formControlName","delivery",3,"errorMap","radioOptions"],["checkType","checkbox","componentId","live-agree","componentLabel","Agree","formControlName","agree",3,"errorMap"],[1,"d-flex","gap-2"],["type","submit",1,"btn","btn-primary"],["type","button",1,"btn","btn-outline-secondary",3,"click"],[1,"card","p-3"],[1,"d-flex","gap-4","flex-wrap"],[1,"fw-semibold"],[1,"mb-0"]],template:function(e,t){e&1&&(m(0,"p",0),i(1," Submit with invalid values to see how errors appear after "),m(2,"code"),i(3,"markAllAsTouched()"),r(),i(4,". (Tip: set the name to "),m(5,"code"),i(6,"ok"),r(),i(7,", pick a future date, and check the checkbox.) "),r(),m(8,"form",1),b("ngSubmit",function(){return t.onSubmitLiveForm()}),c(9,"quang-input",2)(10,"quang-input",3)(11,"quang-input",4)(12,"quang-input",5)(13,"quang-date",6)(14,"quang-select",7)(15,"quang-autocomplete",8)(16,"quang-radio-group",9)(17,"quang-checkbox",10),m(18,"div",11)(19,"button",12),i(20," Submit "),r(),m(21,"button",13),b("click",function(){return t.resetLiveForm()}),i(22," Reset "),r()()(),m(23,"div",14)(24,"div",15)(25,"div")(26,"div",16),i(27,"Valid"),r(),m(28,"div"),i(29),r()(),m(30,"div")(31,"div",16),i(32,"Status"),r(),m(33,"div"),i(34),r()()(),c(35,"hr"),m(36,"div",16),i(37,"Value"),r(),m(38,"pre",17),i(39),p(40,"json"),r()()),e&2&&(n(8),l("formGroup",t.liveForm),n(),l("errorMap",t.liveErrors()),n(),l("errorMap",t.liveErrors()),n(),l("errorMap",t.liveErrors()),n(),l("errorMap",t.liveErrors()),n(),l("errorMap",t.liveErrors()),n(),l("errorMap",t.liveErrors())("selectOptions",t.countryOptions()),n(),l("errorMap",t.liveErrors())("internalFilterOptions",!0)("selectOptions",t.countryOptions()),n(),l("errorMap",t.liveErrors())("radioOptions",t.deliveryOptions()),n(),l("errorMap",t.liveErrors()),n(12),d(t.liveFormValid()),n(5),d(t.liveFormStatus()),n(5),d(s(40,17,t.liveFormValue())))},dependencies:[U,W,X,H,z,j,$,oe,te,ie,ne,ee,re,Q],encapsulation:2,changeDetection:0})}}return o})(),S=`import { Component } from '@angular/core'
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
}`,T=`<form [formGroup]="form" (ngSubmit)="onSubmit()">
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
</form>`;var ae=(()=>{class o{constructor(){this.liveExampleTs=S,this.liveExampleHtml=T}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=g({type:o,selectors:[["playground-form-example-showcase"]],decls:10,vars:14,consts:[[1,"playground-showcase","form-showcase"],[1,"showcase-header"],[3,"description","htmlCode","title","tsCode"]],template:function(e,t){e&1&&(m(0,"div",0)(1,"div",1)(2,"h2"),i(3),p(4,"transloco"),p(5,"transloco"),r()(),m(6,"playground-example-viewer",2),p(7,"transloco"),p(8,"transloco"),c(9,"playground-form-live-example"),r()()),e&2&&(n(3),h("",s(4,6,"menu.form")," / ",s(5,8,"menu.formExample")),n(3),l("description",s(7,10,"form.showcase.liveExample.description"))("htmlCode",t.liveExampleHtml)("title",s(8,12,"form.showcase.liveExample.title"))("tsCode",t.liveExampleTs))},dependencies:[Z,C,y],encapsulation:2,changeDetection:0})}}return o})();var pe=o=>({$implicit:o});function se(o,E){if(o&1&&D(0,3),o&2){let a=E.$implicit;x();let e=k(9);l("ngTemplateOutlet",e)("ngTemplateOutletContext",A(2,pe,a))}}function ue(o,E){if(o&1){let a=V();m(0,"div",4)(1,"div",5)(2,"h5"),i(3),r(),m(4,"button",6),p(5,"transloco"),b("click",function(){let t=w(a).$implicit,v=x();return N(v.copyToClipboard(t.import,t.exampleUsage))}),c(6,"svg-icon",7),r()(),m(7,"div",8)(8,"p"),i(9),p(10,"transloco"),r(),m(11,"pre"),i(12,"          "),m(13,"span",9),i(14),r(),i(15,`
          `),m(16,"span"),i(17),r(),i(18,`
      `),r()()()}if(o&2){let a=E.$implicit,e=x();n(3),d(a.functionName),n(),l("quangTooltip",s(5,5,e.buttonTooltip())),n(5),d(s(10,7,a.explanationKey)),n(5),d(a.import),n(3),d(a.exampleUsage)}}var me=(()=>{class o{constructor(){this.buttonTooltip=f("utils.copyContent"),this.formFunctions=[{functionName:"fileMaxSize",import:"import { fileMaxSize } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
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
      });`,explanationKey:"form.functions.wysiwygRequired"}]}copyToClipboard(a,e){navigator.clipboard.writeText(`${a}
${e}`),this.buttonTooltip.set("utils.copied"),setTimeout(()=>{this.buttonTooltip.set("utils.copyContent")},2e3)}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=g({type:o,selectors:[["playground-form-validators-showcase"]],decls:10,vars:6,consts:[["functionCard",""],[1,"playground-showcase","form-showcase"],[1,"showcase-header"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"card","mb-3"],[1,"card-header"],["overlayPosition","top-left","type","button",1,"btn","btn-copy",3,"click","quangTooltip"],["src","assets/icons/svg/copy.svg"],[1,"card-body"],[1,"mb-3"]],template:function(e,t){e&1&&(m(0,"div",1)(1,"div",2)(2,"h2"),i(3),p(4,"transloco"),p(5,"transloco"),r()(),_(6,se,1,4,"ng-container",3,B),r(),L(8,ue,19,9,"ng-template",null,0,I)),e&2&&(n(3),h("",s(4,2,"menu.form")," / ",s(5,4,"menu.formValidators")),n(3),O(t.formFunctions))},dependencies:[G,K,Y,R,y],styles:[".card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{margin:0}.card-header[_ngcontent-%COMP%]   .btn-copy[_ngcontent-%COMP%]{padding:0}.card-header[_ngcontent-%COMP%]   .btn-copy[_ngcontent-%COMP%]:active{border-color:transparent}.card-body[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:var(--bs-card-cap-bg);margin:0;display:flex;flex-direction:column;padding:1.5rem;position:relative}"],changeDetection:0})}}return o})();var le=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=g({type:o,selectors:[["playground-form-test"]],decls:6,vars:6,consts:[[1,"form-test"]],template:function(e,t){e&1&&(m(0,"div",0)(1,"h2"),i(2),p(3,"transloco"),p(4,"transloco"),r(),c(5,"playground-form-live-example"),r()),e&2&&(n(2),h("",s(3,2,"menu.form")," / ",s(4,4,"menu.formTest")))},dependencies:[C,y],styles:[".form-test[_ngcontent-%COMP%]{padding:20px}"],changeDetection:0})}}return o})();var ce=[{path:"test",component:le},{path:"validators",component:me},{path:"example",component:ae},{pathMatch:"full",path:"",redirectTo:"validators"},{path:"**",pathMatch:"full",redirectTo:"validators"}],je=ce;export{je as default};
