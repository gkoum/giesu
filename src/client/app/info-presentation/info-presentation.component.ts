import {Component, Input} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'info-presentation',
  templateUrl: 'info-presentation.component.html',
  styleUrls: ['info-presentation.component.css']
})
export class InfoPresentationComponent{
  @Input()
  concept_info: string;
}
