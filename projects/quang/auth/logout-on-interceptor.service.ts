// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
// import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'

// import { Observable } from 'rxjs'

// export type STATUS_TYPE =
//   | 100
//   | 101
//   | 102
//   | 103
//   | 200
//   | 201
//   | 202
//   | 203
//   | 204
//   | 205
//   | 207
//   | 208
//   | 226
//   | 300
//   | 301
//   | 302
//   | 303
//   | 304
//   | 305
//   | 306
//   | 307
//   | 308
//   | 400
//   | 401
//   | 402
//   | 403
//   | 404
//   | 405
//   | 406
//   | 407
//   | 408
//   | 409
//   | 410
//   | 411
//   | 412
//   | 413
//   | 414
//   | 415
//   | 416
//   | 417
//   | 418
//   | 421
//   | 422
//   | 423
//   | 424
//   | 425
//   | 426
//   | 428
//   | 429
//   | 431
//   | 451
//   | 500
//   | 501
//   | 502
//   | 503
//   | 504
//   | 505
//   | 506
//   | 507
//   | 508
//   | 510
//   | 511

// export const ON_STATUS_LOGOUT = new InjectionToken<STATUS_TYPE[]>('ON_STATUS_LOGOUT')

// @Injectable({ providedIn: 'root' })
// export class LogoutOnIntercept implements HttpInterceptor {
//   constructor(
//     @Optional()
//     @Inject(ON_STATUS_LOGOUT)
//     readonly statusTypeList: STATUS_TYPE[] | null
//   ) {
//     this.addExcludedUrls(statusTypeList ?? [])
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {}

//   public addStatusType(statusTypeList: STATUS_TYPE[]): void {
//     for (const statusType of statusTypeList) {
//       this.statusTypeList?.add(statusType)
//     }
//   }
// }
