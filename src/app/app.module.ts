import { EnvService } from './env/env.service';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiAuthInterceptor, ApiJwtInterceptor } from '../lib/api.interceptor';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NotesService } from './notes/notes.service';
import { PartialNotesListComponent } from './notes/partial-notes-list/partial-notes-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import {MatRippleModule,MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';


import { ViewLoginComponent } from './view-login/view-login.component';
import { ViewMainComponent } from './view-main/view-main.component';

import { PartialAlertComponent } from './partial-alert/partial-alert.component';
import {PartialSidebarComponent } from './partial-sidebar/partial-sidebar.component';
import { PartialSidebarNavigationComponent } from './partial-sidebar-navigation/partial-sidebar-navigation.component';

import { UsersService } from './users/users.service';
import { UsersComponent } from './users/users.component';
import { PartialSidebarFoldersComponent } from './partial-sidebar-folders/partial-sidebar-folders.component';
import { PartialToolbarMainComponent } from './partial-toolbar-main/partial-toolbar-main.component';
import { PartialNotesShowComponent } from './notes/partial-notes-show/partial-notes-show.component';

import { MarkdownModule } from 'ngx-markdown';
import { PartialSidebarTagsComponent } from './partial-sidebar-tags/partial-sidebar-tags.component';
import { PartialSidebarNotificationsComponent } from './partial-sidebar-notifications/partial-sidebar-notifications.component';
import { GroupByPipe } from './group-by.pipe';
import { PartialUsersSettingsShowComponent } from './users/partial-users-settings-show/partial-users-settings-show.component';

import { DialogMoveComponent } from './partial-toolbar-main/dialog-move/dialog-move.component';
import { DialogDuplicateComponent } from './partial-toolbar-main/dialog-duplicate/dialog-duplicate.component';
import { DialogExportComponent } from './partial-toolbar-main/dialog-export/dialog-export.component';
import { DialogShareComponent } from './partial-toolbar-main/dialog-share/dialog-share.component';
import { DialogDeleteComponent } from './partial-toolbar-main/dialog-delete/dialog-delete.component';

import { ViewPrintComponent } from './view-print/view-print.component';

import { UsersJournalsService } from './users/journals/journals.service';

import { SyncService } from './api/sync.service';
import { SafePipe } from './safe.pipe';

export function jwtOptionsFactory(envService) {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    throwNoTokenError: false,
    skipWhenExpired: true,
    whitelistedDomains: [envService.gatewayHostPort()],
    blacklistedRoutes: [(envService.gatewayUrl() + '/login')],
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PartialNotesListComponent,
    PartialSidebarComponent,
    PartialSidebarNavigationComponent,
    ViewMainComponent,
    UsersComponent,
    ViewLoginComponent,
    PartialAlertComponent,
    PartialSidebarFoldersComponent,
    PartialToolbarMainComponent,
    PartialNotesShowComponent,
    PartialSidebarTagsComponent,
    PartialSidebarNotificationsComponent,
    GroupByPipe,
    PartialUsersSettingsShowComponent,
    DialogMoveComponent,
    DialogDuplicateComponent,
    DialogExportComponent,
    DialogShareComponent,
    DialogDeleteComponent,
    ViewPrintComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [EnvService]
      }
    }),
    ReactiveFormsModule,

    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,

    MarkdownModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiJwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiAuthInterceptor, multi: true },
    EnvService,
    UsersService,
    UsersJournalsService,
    NotesService,
    SyncService
  ],
  entryComponents: [
    DialogMoveComponent,
    DialogDuplicateComponent,
    DialogExportComponent,
    DialogShareComponent,
    DialogDeleteComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
