import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import {  MatSelectModule } from '@angular/material/select';
import {  MatButtonToggleModule } from '@angular/material/button-toggle';
import { CdkTableModule } from '@angular/cdk/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule
    , MatGridListModule
    , MatTableModule
    , CdkTableModule
    , MatProgressSpinnerModule
    , MatSlideToggleModule
    , MatFormFieldModule
    , MatInputModule
    , MatStepperModule
    , MatDatepickerModule
    , MatMomentDateModule
    , MatSelectModule
    , MatDividerModule
    , MatListModule
    , MatButtonToggleModule
    ,MatIconModule

  ]
  , providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } }
  ]
  , exports: [
    MatButtonModule
    , MatGridListModule
    , MatTableModule
    , CdkTableModule
    , MatProgressSpinnerModule
    , MatSlideToggleModule
    , MatFormFieldModule
    , MatInputModule
    , MatStepperModule
    , MatDatepickerModule
    , MatMomentDateModule
    , MatSelectModule
    , MatDividerModule
    , MatListModule
    ,MatButtonToggleModule
    , MatIconModule

  ]
})

export class MaterialUIModule { }
