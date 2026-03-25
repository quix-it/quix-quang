import{a as ee,d as te,e as oe,f as ne,g as re,h as ie,i as ae}from"./chunk-KJXH7N4B.js";import"./chunk-HYAKESNB.js";import{c,e as z,f as X,j as $,l as j,m as J,p as W,r as Y}from"./chunk-4N7ISSKL.js";import"./chunk-NGYQ2IGL.js";import{c as Z}from"./chunk-DMJUHVEB.js";import{K as C,M as G,O as H,i as U,k as K,l as b,x as S}from"./chunk-ZGFVJ2CH.js";import"./chunk-DUKSTT3K.js";import{$b as F,Aa as v,Cc as s,Dc as u,Fc as R,Ib as D,Jc as Q,Kb as _,Lb as V,Mb as p,Nb as a,Ob as r,Pb as d,Vb as k,Wb as A,Zb as x,db as n,hc as I,kc as i,la as w,lc as f,nc as y,qa as B,ra as L,ub as h,yc as P,zb as O}from"./chunk-K3GKEJZ6.js";var M=(()=>{let e=class e{onSubmitLiveForm(){this.liveForm.markAllAsTouched()}resetLiveForm(){this.liveForm.reset({name:"",notes:"",password:"",rating:0,date:"",country:null,countryAutocomplete:null,delivery:null,agree:!1})}constructor(){this.formBuilder=w(W),this.liveErrors=v([{error:c.required.name,message:"form.errors.required"},{error:c.requiredTrue.name,message:"form.errors.requiredTrue"},{error:c.minLength.name,message:"form.errors.minLength"},{error:"noMatch",message:"form.errors.noMatch"}]),this.mustBeOk=m=>m.value==="ok"?null:{noMatch:!0},this.mustBeFutureDate=m=>{let t=m.value;if(!t)return null;let o=new Date(t);if(Number.isNaN(o.getTime()))return{noMatch:!0};let E=new Date;return E.setHours(0,0,0,0),o.setHours(0,0,0,0),o.getTime()>E.getTime()?null:{noMatch:!0}},this.mustBeAtLeast10=m=>{let t=m.value;return t==null||t>=10?null:{noMatch:!0}},this.countryOptions=v([{label:"Italy",value:"IT"},{label:"France",value:"FR"},{label:"Germany",value:"DE"},{label:"Spain",value:"ES"}]),this.deliveryOptions=v([{value:"standard",label:"Standard"},{value:"express",label:"Express"}]),this.liveForm=this.formBuilder.group({name:this.formBuilder.control("",[c.required,this.mustBeOk]),notes:this.formBuilder.control("",[c.required,c.minLength(10)]),password:this.formBuilder.control("",[c.required,c.minLength(6)]),rating:this.formBuilder.control(0,[c.required,this.mustBeAtLeast10]),date:this.formBuilder.control("",[c.required,this.mustBeFutureDate]),country:this.formBuilder.control(null,[c.required]),countryAutocomplete:this.formBuilder.control(null,[c.required]),delivery:this.formBuilder.control(null,[c.required]),agree:this.formBuilder.control(!1,[c.requiredTrue])}),this.liveFormValue=v(this.liveForm.getRawValue()),this.liveFormStatus=v(this.liveForm.status),this.liveFormValid=Q(()=>this.liveFormStatus()==="VALID"),this.liveForm.valueChanges.pipe(S()).subscribe(()=>{this.liveFormValue.set(this.liveForm.getRawValue())}),this.liveForm.statusChanges.pipe(S()).subscribe(m=>{this.liveFormStatus.set(m)})}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h({type:e,selectors:[["playground-form-live-example"]],decls:41,vars:19,consts:[[1,"text-muted","mb-3"],[1,"card","p-3","mb-3",3,"ngSubmit","formGroup"],["componentId","live-name","componentLabel","Name","componentPlaceholder","Type 'ok'","componentType","text","formControlName","name",3,"errorMap"],["componentId","live-notes","componentLabel","Notes","componentPlaceholder","Write at least 10 characters","componentType","textarea","formControlName","notes",3,"errorMap"],["componentId","live-password","componentLabel","Password","componentPlaceholder","At least 6 characters","componentType","password","formControlName","password",3,"errorMap"],["componentId","live-rating","componentLabel","Rating","componentPlaceholder","Enter a number \u2265 10","componentType","number","formControlName","rating",3,"errorMap"],["componentId","live-date","componentLabel","Date","componentPlaceholder","Select a future date","formControlName","date",3,"errorMap"],["componentId","live-country","componentLabel","Country","componentPlaceholder","Select a country","formControlName","country","selectionMode","single",3,"errorMap","selectOptions"],["componentId","live-country-autocomplete","componentLabel","Country (autocomplete)","componentPlaceholder","Start typing to search","formControlName","countryAutocomplete",3,"errorMap","internalFilterOptions","selectOptions"],["componentId","live-delivery","componentLabel","Delivery","formControlName","delivery",3,"errorMap","radioOptions"],["checkType","checkbox","componentId","live-agree","componentLabel","Agree","formControlName","agree",3,"errorMap"],[1,"d-flex","gap-2"],["type","submit",1,"btn","btn-primary"],["type","button",1,"btn","btn-outline-secondary",3,"click"],[1,"card","p-3"],[1,"d-flex","gap-4","flex-wrap"],[1,"fw-semibold"],[1,"mb-0"]],template:function(t,o){t&1&&(a(0,"p",0),i(1," Submit with invalid values to see how errors appear after "),a(2,"code"),i(3,"markAllAsTouched()"),r(),i(4,". (Tip: set the name to "),a(5,"code"),i(6,"ok"),r(),i(7,", pick a future date, and check the checkbox.) "),r(),a(8,"form",1),x("ngSubmit",function(){return o.onSubmitLiveForm()}),d(9,"quang-input",2)(10,"quang-input",3)(11,"quang-input",4)(12,"quang-input",5)(13,"quang-date",6)(14,"quang-select",7)(15,"quang-autocomplete",8)(16,"quang-radio-group",9)(17,"quang-checkbox",10),a(18,"div",11)(19,"button",12),i(20," Submit "),r(),a(21,"button",13),x("click",function(){return o.resetLiveForm()}),i(22," Reset "),r()()(),a(23,"div",14)(24,"div",15)(25,"div")(26,"div",16),i(27,"Valid"),r(),a(28,"div"),i(29),r()(),a(30,"div")(31,"div",16),i(32,"Status"),r(),a(33,"div"),i(34),r()()(),d(35,"hr"),a(36,"div",16),i(37,"Value"),r(),a(38,"pre",17),i(39),s(40,"json"),r()()),t&2&&(n(8),p("formGroup",o.liveForm),n(),p("errorMap",o.liveErrors()),n(),p("errorMap",o.liveErrors()),n(),p("errorMap",o.liveErrors()),n(),p("errorMap",o.liveErrors()),n(),p("errorMap",o.liveErrors()),n(),p("errorMap",o.liveErrors())("selectOptions",o.countryOptions()),n(),p("errorMap",o.liveErrors())("internalFilterOptions",!0)("selectOptions",o.countryOptions()),n(),p("errorMap",o.liveErrors())("radioOptions",o.deliveryOptions()),n(),p("errorMap",o.liveErrors()),n(12),f(o.liveFormValid()),n(5),f(o.liveFormStatus()),n(5),f(u(40,17,o.liveFormValue())))},dependencies:[b,Y,$,z,X,j,J,ne,oe,ae,re,te,ie,K],encapsulation:2,changeDetection:0});let l=e;return l})(),q=`import { Component } from '@angular/core'
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
}`,N=`<form [formGroup]="form" (ngSubmit)="onSubmit()">
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
</form>`;var le=(()=>{let e=class e{constructor(){this.liveExampleTs=q,this.liveExampleHtml=N}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h({type:e,selectors:[["playground-form-example-showcase"]],decls:10,vars:14,consts:[[1,"playground-showcase","form-showcase"],[1,"showcase-header"],[3,"description","htmlCode","title","tsCode"]],template:function(t,o){t&1&&(a(0,"div",0)(1,"div",1)(2,"h2"),i(3),s(4,"transloco"),s(5,"transloco"),r()(),a(6,"playground-example-viewer",2),s(7,"transloco"),s(8,"transloco"),d(9,"playground-form-live-example"),r()()),t&2&&(n(3),y("",u(4,6,"menu.form")," / ",u(5,8,"menu.formExample")),n(3),p("description",u(7,10,"form.showcase.liveExample.description"))("htmlCode",o.liveExampleHtml)("title",u(8,12,"form.showcase.liveExample.title"))("tsCode",o.liveExampleTs))},dependencies:[b,ee,M,C],encapsulation:2,changeDetection:0});let l=e;return l})();var ue=l=>({$implicit:l});function ce(l,e){if(l&1&&k(0,3),l&2){let g=e.$implicit;F();let m=I(9);p("ngTemplateOutlet",m)("ngTemplateOutletContext",P(2,ue,g))}}function de(l,e){if(l&1){let g=A();a(0,"div",4)(1,"div",5)(2,"h5"),i(3),r(),a(4,"button",6),s(5,"transloco"),x("click",function(){let t=B(g).$implicit,o=F();return L(o.copyToClipboard(t.import,t.exampleUsage))}),d(6,"svg-icon",7),r()(),a(7,"div",8)(8,"p"),i(9),s(10,"transloco"),r(),a(11,"pre"),i(12,"          "),a(13,"span",9),i(14),r(),i(15,`
          `),a(16,"span"),i(17),r(),i(18,`
      `),r()()()}if(l&2){let g=e.$implicit,m=F();n(3),f(g.functionName),n(),p("quangTooltip",u(5,5,m.buttonTooltip())),n(5),f(u(10,7,g.explanationKey)),n(5),f(g.import),n(3),f(g.exampleUsage)}}var me=(()=>{let e=class e{constructor(){this.buttonTooltip=v("utils.copyContent"),this.formFunctions=[{functionName:"fileMaxSize",import:"import { fileMaxSize } from 'quang/forms/validators';",exampleUsage:`this.formBuilder.group({
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
      });`,explanationKey:"form.functions.wysiwygRequired"}]}copyToClipboard(m,t){navigator.clipboard.writeText(`${m}
${t}`),this.buttonTooltip.set("utils.copied"),setTimeout(()=>{this.buttonTooltip.set("utils.copyContent")},2e3)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h({type:e,selectors:[["playground-form-validators-showcase"]],decls:10,vars:6,consts:[["functionCard",""],[1,"playground-showcase","form-showcase"],[1,"showcase-header"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"card","mb-3"],[1,"card-header"],["overlayPosition","top-left","type","button",1,"btn","btn-copy",3,"click","quangTooltip"],["src","assets/icons/svg/copy.svg"],[1,"card-body"],[1,"mb-3"]],template:function(t,o){t&1&&(a(0,"div",1)(1,"div",2)(2,"h2"),i(3),s(4,"transloco"),s(5,"transloco"),r()(),_(6,ce,1,4,"ng-container",3,D),r(),O(8,de,19,9,"ng-template",null,0,R)),t&2&&(n(3),y("",u(4,2,"menu.form")," / ",u(5,4,"menu.formValidators")),n(3),V(o.formFunctions))},dependencies:[b,U,H,G,Z,C],styles:[".card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{margin:0}.card-header[_ngcontent-%COMP%]   .btn-copy[_ngcontent-%COMP%]{padding:0}.card-header[_ngcontent-%COMP%]   .btn-copy[_ngcontent-%COMP%]:active{border-color:transparent}.card-body[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:var(--bs-card-cap-bg);margin:0;display:flex;flex-direction:column;padding:1.5rem;position:relative}"],changeDetection:0});let l=e;return l})();var pe=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h({type:e,selectors:[["playground-form-test"]],decls:6,vars:6,consts:[[1,"form-test"]],template:function(t,o){t&1&&(a(0,"div",0)(1,"h2"),i(2),s(3,"transloco"),s(4,"transloco"),r(),d(5,"playground-form-live-example"),r()),t&2&&(n(2),y("",u(3,2,"menu.form")," / ",u(4,4,"menu.formTest")))},dependencies:[M,C],styles:[".form-test[_ngcontent-%COMP%]{padding:20px}"],changeDetection:0});let l=e;return l})();var fe=[{path:"test",component:pe},{path:"validators",component:me},{path:"example",component:le},{pathMatch:"full",path:"",redirectTo:"validators"},{path:"**",pathMatch:"full",redirectTo:"validators"}],Ye=fe;export{Ye as default};
