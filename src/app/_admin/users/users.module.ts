import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../materail'
import { UsersRoutingModule } from './users.routing.module';
import { UsersComponent } from './users.component';
import {SharedModule} from '../../shared/shared.module';
import {HttpModule} from '@angular/http';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
