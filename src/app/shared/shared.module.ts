import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DndModule } from 'ngx-drag-drop';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IconComponent } from './components/icon/icon.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { CardSlotComponent } from './components/card-slot/card-slot.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, IconComponent, InfoCardComponent, CardSlotComponent],
  imports: [
    CommonModule,
    DndModule,
    TranslateModule,
    FormsModule,
    NgbModule,
    SweetAlert2Module.forRoot({
      provideSwal: () => import('sweetalert2').then(({ default: swal }) => swal.mixin({
        confirmButtonColor: '#7D10FF',
        denyButtonColor: '#A50000'
      }))
    })],
  exports: [DndModule, TranslateModule, IconComponent, CardSlotComponent, InfoCardComponent, WebviewDirective, FormsModule, NgbModule]
})
export class SharedModule {}
