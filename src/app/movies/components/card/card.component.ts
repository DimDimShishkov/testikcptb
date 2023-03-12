import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICard } from 'src/interface/page';
import Genres from '../../../../mockData/genres.json';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input() card: ICard;
    @Input() favoriteCard: ICard;
    @Output() likeToggleHandler = new EventEmitter<ICard>();
    @Output() openedCard = new EventEmitter<ICard>();
    @ViewChild('likeButton') likeButton: ElementRef;

    public genreArr: string = '';
    // public isLiked: boolean = false;

    get isLiked() {
        return this.favoriteCard.id === this.card.id;
    }

    ngOnInit() {
        console.log(this.card);
        this.genreArr = Genres.filter((n) => this.card?.genre.indexOf(n.id) !== -1)
            .map((item) => item.name)
            .join(', ');
        // likeToggleHandler прописать в компонент каталога
        // likeToggleEvent прописать в здесь
        // likeToggleEvent прописать в модалку
        // isLiked = this.favoriteCard?.id === this.card?.id;
        // this.isLiked = localStorage.getItem('selectedCard') === `${this.card.id}`;
    }
    likeToggleEvent(event: Event) {
        event.stopPropagation();
        this.likeButton.nativeElement.focus();
        this.likeToggleHandler.emit(this.card);
    }
    // ngDoCheck() {
    //   this.isLiked = localStorage.getItem('selectedCard') === `${this.card.id}`;
    // }
    // посмотреть как переписать на event.target
    like(event: Event) {
        event.stopPropagation();
        this.likeButton.nativeElement.focus();
        // this.selectedCard.emit(this.card);
    }

    openCard() {
        this.openedCard.emit(this.card);
    }
}
