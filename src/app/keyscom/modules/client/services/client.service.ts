import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {PaginationModel} from '../../../models/pagination.model';
import {environment} from '../../../../../environments/environment';
import {CLIENT_LIST} from '../../../api.endpoints';
import {Client} from '../../../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  public clients: BehaviorSubject<Client[]>;

  constructor(
    private http: HttpClient,
  ) {
    this.clients = new BehaviorSubject([]);
  }

  updateClients(): void {
    this.http.get<PaginationModel<Client>>(`${environment.API_HOST}${CLIENT_LIST}`)
      .subscribe((res) => this.clients.next(res.results));
  }
}
