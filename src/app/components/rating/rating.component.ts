import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-rating',
  template: '<div>'
    + '<span class="icon" *ngFor = "let s of maxItem">'
    + '<i [ngClass]=" s <= this.ratedCount ? \'filled\' :\'\'\ " class="fa fa-star"'
    + 'aria-hidden="true" (click)="toggleRating(s)"></i>'
    + '</span>'
    + '</div>',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() max: number;
  @Input() ratedCount: number;
  @Output() onRating = new EventEmitter<Number>();

  maxItem: any[];

  constructor(public ss: ShowService) {
  }

  ngOnInit() {
    this.maxItem = [];
    for (var i = 0; i < this.max; i++) {
      this.maxItem.push(i + 1);
    }
  }
  toggleRating(s: number) {
    this.ss.rating(s).subscribe(value=>{
      console.log(value)
    })
    this.ratedCount = s;
    this.onRating.emit(this.ratedCount);
  }

}
