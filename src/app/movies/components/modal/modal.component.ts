import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICard } from 'src/interface/page';
import Genres from '../../../../mockData/genres.json';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    public genreArr: string = '';
    public buttonText: string = '';
    public buttonClass = '';
    public isLiked: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: ICard) {}

    ngOnInit() {
        this.genreArr = Genres.filter((n) => this.data?.genre.indexOf(n.id) !== -1)
            .map((item) => item.name)
            .join(', ');
        this.isLiked = localStorage.getItem('selectedCard') === `${this.data?.id}`;
        this.buttonHandler(this.isLiked);
    }

    buttonHandler(isLiked: boolean) {
        if (isLiked) {
            this.buttonText = 'Удалить из лучших фильмов';
            this.buttonClass = 'accent';
        } else {
            this.buttonText = 'Выбрать лучшим фильмом';
            this.buttonClass = 'primary';
        }
    }

    likeToggleEvent(event: Event) {
        // event.stopPropagation();
        // this.likeButton.nativeElement.focus();
        // this.likeToggleHandler.emit(this.card);
    }

    like() {
        this.isLiked = !this.isLiked;
        this.isLiked ? localStorage.setItem('selectedCard', `${this.data.id}`) : localStorage.removeItem('selectedCard');
        this.buttonHandler(this.isLiked);
    }
}
