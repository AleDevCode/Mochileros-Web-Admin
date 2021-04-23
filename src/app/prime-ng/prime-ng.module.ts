import { NgModule } from '@angular/core';


// PrimeNg
import {MenuModule} from 'primeng/menu';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  exports:[
    MenuModule,
    AvatarGroupModule,
    AvatarModule,
    CardModule,
    PanelModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    FileUploadModule,
    ToastModule, 
    BreadcrumbModule,
    ConfirmDialogModule,
    DialogModule
  ]
})
export class PrimeNgModule { }
