import { Component, OnInit} from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { NameListService } from '../shared/index';
import {ConceptExplorerComponent} from "../concept_explorer/concept_explorer.component";
import {HTTP_PROVIDERS} from "@angular/http";
import {WikiSmartComponent} from "../shared/wiki/wiki-smart.component";
import {GraphCreationComponent} from "../graph-creation/graph-creation.component";
import {InfoPresentationComponent} from "../info-presentation/info-presentation.component";
/**
 * This class represents the lazy loaded HomeComponent.
 */

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  viewProviders: [NameListService, HTTP_PROVIDERS],
  directives: [REACTIVE_FORM_DIRECTIVES, ConceptExplorerComponent, WikiSmartComponent, GraphCreationComponent, InfoPresentationComponent]
})

export class DashboardComponent implements OnInit {
  //concept_info:string='sdcsdc';
  /*newConcept: string = '';
  errorMessage: string;
  concepts: any[] = [];
  selectedConcept: Concept;*/

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  //constructor(public nameListService: NameListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    //this.getConcepts();
  }

  /**
   * Handle the nameListService observable
   */
  /*getConcepts() {
    this.nameListService.get()
                     .subscribe(
                         concepts => this.concepts = concepts,
                       error =>  this.errorMessage = <any>error
                       );
  }*/

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  /*addConcept(): boolean {
    // TODO: implement nameListService.post
    this.concepts.push(this.newConcept);
    this.newConcept = '';
    return false;
  }
  onSelect(concept: Concept) { this.selectedConcept = concept; }*/

}
