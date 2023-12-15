import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/material-module';
import { TypeFilterPipe } from './pipes/typeFilter.pipe';
import { AbilitiesFilterPipe } from './pipes/abilitiesFilter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { PokemonHeaderComponentComponent } from './components/pokemon-header-component/pokemon-header-component.component';
import { PokemonHomepageComponentComponent } from './components/pokemon-homepage-component/pokemon-homepage-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonHeaderComponentComponent,
    PokemonHomepageComponentComponent,
    SearchPipe,
    TypeFilterPipe,
    AbilitiesFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
