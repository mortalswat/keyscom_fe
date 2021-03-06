import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {PaginationModel} from '../../../models/pagination.model';
import {environment} from '../../../../../environments/environment';
import {CLIENT, CLIENT_UUID} from '../../../api.endpoints';
import {Client} from '../../../models/client.model';
import {ApiHelperService} from '../../shared/services/api-helper.service';
import {CreateClientEntity} from '../shared/create-client.entity';

@Injectable({ providedIn: 'root' })
export class ClientService {
  public clients: BehaviorSubject<Client[]>;

  constructor(
    private http: HttpClient,
    private httpHelperService: ApiHelperService,
  ) {
    this.clients = new BehaviorSubject([]);
  }

  getClient(clientUuid: string): Observable<Client> {
    return this.http.get<Client>(`${environment.API_HOST}${CLIENT_UUID}`.replace(':clientUuid', clientUuid));
  }

  getClients(filters?: object): Observable<PaginationModel<Client>> {
    const options = filters !== undefined ?
      { params: this.httpHelperService.convertAnyToHttpParams({filters}) } :
      {};

    return this.http.get<PaginationModel<Client>>(`${environment.API_HOST}${CLIENT}`, options);
  }

  updateClients(filters?: object): void {
    const options = filters !== undefined ?
      { params: this.httpHelperService.convertAnyToHttpParams({filters}) } :
      {};

    this.http.get<PaginationModel<Client>>(`${environment.API_HOST}${CLIENT}`, options)
      .subscribe((res) => this.clients.next(res.results));
  }

  createClient(client: CreateClientEntity): Observable<any>
  {
    return this.http.post<Client>(`${environment.API_HOST}${CLIENT}`, client);
  }

  updateClient(clientUuid: string, client: CreateClientEntity): Observable<any>
  {
    return this.http.put<Client>(`${environment.API_HOST}${CLIENT_UUID}`.replace(':clientUuid', clientUuid), client);
  }

  deleteByUuid(clientUuid: string): Observable<any>
  {
    return this.http.delete<void>(`${environment.API_HOST}${CLIENT_UUID}`.replace(':clientUuid', clientUuid));
  }
}
