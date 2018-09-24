import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePicker } from '../my-datepicker.directive';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [DatePicker ],exports:[DatePicker]
})
export class SharedModule { }
