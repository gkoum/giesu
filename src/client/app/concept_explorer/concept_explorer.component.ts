import {Component, Input} from '@angular/core';
import {Concept} from "../models/concept";

@Component({
    moduleId: module.id,
    selector: 'concept_explorer',
    templateUrl: "concept_explorer.component.html",
    styleUrls: ['concept_explorer.component.css']
})
export class ConceptExplorerComponent{
  @Input()
  concept: Concept;
  newConcept: string='';
  concepts: any[] = [];
  selectedConcept: string='';

  addConcept(): boolean {
    // TODO: implement nameListService.post
    if(this.newConcept!="" && !this.concepts.includes(this.newConcept)){
      this.concepts.push(this.newConcept);
      this.newConcept = '';
    }
    return false;
  }

  getInfo(concept: string): boolean{
    console.log("getInfo("+concept+") was called");
    return false;
  }
  deleteConcept(): boolean{
    console.log("deleteConcept("+this.selectedConcept+") was called");
    var index = this.concepts.indexOf(this.selectedConcept);
    if (index === -1) { return;}
    console.log(`Index about to remove: ${index} this.concepts length: ${this.concepts.length}`);
    this.concepts.splice(index, 1);
    console.log(`this.concepts length: ${this.concepts.length}`);
    return false;
  }
  submitQuery(): boolean{
    console.log("submitQuery("+this.concepts+") was called");
    return false;
  }
  onSelect(concept: Concept) {
    this.newConcept = concept.toString();
    this.selectedConcept = concept.toString();
  }
}
