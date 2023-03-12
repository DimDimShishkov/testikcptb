import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICard, IData } from 'src/interface/page';
import Genres from '../../../../mockData/genres.json';

/**
 * @title Диалоговое окно с фильмом (Этап 2)
 */

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    public card: ICard;
    public genreArr: string = '';
    public isLiked: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: IData) {}

    ngOnInit() {
        this.genreArr = Genres.filter((n) => this.data.card.genre.indexOf(n.id) !== -1)
            .map((item) => item.name)
            .join(', ');
        this.isLiked = this.data.isLiked;
        this.card = this.data.card;
    }

    like() {
        this.data.likeToggleEvent(this.data.card);
        this.isLiked = !this.isLiked;
    }
}
