import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FlexDivComponent } from './flex-div/flex-div.component';
import { DividerComponent } from './divider/divider.component';

@NgModule({
  declarations: [AppComponent, FlexDivComponent, DividerComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
