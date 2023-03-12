import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ICard } from 'src/interface/page';
import Genres from '../../../../mockData/genres.json';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input() card: ICard;
    @Input() isLiked: boolean;
    @Output() likeToggleEvent = new EventEmitter<number>();
    @Output() openCardEvent = new EventEmitter<number>();
    @ViewChild('likeButton') likeButton: ElementRef;

    public genreArr: string = '';

    ngOnInit() {
        this.genreArr = Genres.filter((n) => this.card?.genre.indexOf(n.id) !== -1)
            .map((item) => item.name)
            .join(', ');
    }

    like(event: Event) {
        event.stopPropagation();
        this.likeButton.nativeElement.focus();
        this.likeToggleEvent.emit(this.card.id);
    }

    openCard() {
        this.openCardEvent.emit(this.card.id);
    }
}
