import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class CardComponent implements OnInit {

  @Input() titulo: string;
  @Input() class: string;
 // @Input() height: string;
  @Input() imagen: string;

  constructor() { }

  ngOnInit(): void {
  }

}
