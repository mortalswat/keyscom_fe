import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService} from '../../layout/services/alert.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private route: Router,
    private alertService: AlertService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        map((res) => {
          this.alertService.clear();
          return res;
        }),
        catchError((res) => {
          if (res?.error?.code === HttpStatusCode.InternalServerError) {
            this.route.navigate(['/error']);
          }
          if (res?.error?.message) {
            this.alertService.error(res.error.message);
            return throwError(res);
          }

          return throwError(res);
        }),
      )
    ;
  }
}
