import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../../models/client.model';
import {StringHelperService} from '../../../shared/services/string-helper.service';
import {MapClientService} from '../../services/map-client.service';

@Component({
  selector: 'app-client-select-list',
  templateUrl: './client-select-list.component.html',
  styleUrls: ['./client-select-list.component.scss'],
})
export class ClientSelectListComponent implements OnInit {
  @Input() required = false;
  @Output() changeSelectedClient = new EventEmitter<string | null>();

  form: FormGroup;
  private clientList: Client[];
  public filteredClientList: Client[];

  constructor(
    private mapClientService: MapClientService,
    private stringHelperService: StringHelperService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
    const clientList = await this.mapClientService.getValues();
    this.clientList = clientList;
    this.filteredClientList = clientList;
  }

  private initForm(): void
  {
    const clientFilterValidator = [];
    if (this.required) {
      clientFilterValidator.push(Validators.required);
    }
    this.form = new FormGroup({
      clientFilter: new FormControl('', clientFilterValidator),
      clientUuid: new FormControl(''),
    });

    this.form.controls.clientFilter.valueChanges
      .subscribe((value) => {
        this.filteredClientList = this.clientList.filter(
          (client) => this.stringHelperService.contains(client.name, value)
        );
      });

    this.form.controls.clientUuid.valueChanges
      .subscribe((newClientUuid) => this.changeSelectedClient.emit(newClientUuid));
  }

  public selectClient(client?: Client): void {
    this.form.patchValue({
      clientFilter: client?.name,
      clientUuid: client?.uuid,
    });
  }

  // Unuse async problem with selectClient method
  public async closeAutocomplete(): Promise<void> {
    // if (this.form.controls.clientUuid.value) {
    //   const selectedClient = await (this.mapClientService.get(this.form.controls.clientUuid.value));
    //   const selectedClientName = selectedClient.name;
    //   if (selectedClientName === this.form.controls.clientFilter.value) {
    //     return;
    //   }
    //   this.form.patchValue({clientFilter: selectedClientName});
    // } else {
    //   this.form.patchValue({clientFilter: ''});
    // }
  }

  public isValid(): boolean {
    if (!this.form.controls.clientUuid.valid) {
      this.form.patchValue({clientFilter: ''});
    }

    this.form.markAsTouched();
    return this.form.valid;
  }

  public getValue(): string | null
  {
    const clientUuid = this.form.controls.clientUuid.value;
    if (!clientUuid) {
      return null;
    }
    return clientUuid;
  }
}
