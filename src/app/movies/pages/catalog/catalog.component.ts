import { Component, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICard, IGenre } from 'src/interface/page';
import Cards from '../../../../mockData/data.json';
import Genres from '../../../../mockData/genres.json';
import { ModalComponent } from '../../components/modal/modal.component';

/**
 * @title Итоговый компонент с Фильтром и Инпутом (Этап 3)
 */

@Component({
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements DoCheck {
    public cardsArr: ICard[] = Cards;
    public genreArr: IGenre[] = Genres;
    public favoriteCard: ICard | undefined;
    public favoriteCardID: number = 0;
    public selectedGenre: number = 0;
    public selectedName: string = '';

    constructor(public dialog: MatDialog) {}

    // переделать под RxJS и подпиской на localStorage
    ngDoCheck() {
        const cardID = +(localStorage.getItem('selectedCard') || 0);
        this.likeCheckHandler(cardID);
        this.favoriteCardID = cardID;
    }

    likeCheckHandler(cardID: number) {
        const card = this.cardsArr.find((card) => card.id === cardID);
        if (card) {
            this.favoriteCard = card;
        }
    }

    likeToggleHandler(cardID: number) {
        if (cardID === this.favoriteCardID) {
            localStorage.removeItem('selectedCard');
            this.favoriteCardID = 0;
            this.favoriteCard = undefined;
        } else {
            localStorage.setItem('selectedCard', `${cardID}`);
            this.favoriteCardID = cardID;
            this.likeCheckHandler(cardID);
        }
    }

    openCardHandler(cardID: number) {
        const card = this.cardsArr.find((card) => card.id === cardID);
        if (card) {
            this.dialog.open(ModalComponent, {
                data: {
                    card: card,
                    isLiked: card.id === this.favoriteCardID,
                    likeToggleEvent: () => this.likeToggleHandler(cardID),
                },
                maxWidth: '756px',
            });
        }
    }

    selectGenre(genre: number) {
        this.selectedGenre = genre;
        const cardsArr = genre ? Cards.filter((card) => card.genre.includes(genre)) : Cards;
        this.cardsArr = this.selectedName
            ? cardsArr.filter((card) => card.name.toUpperCase().includes(this.selectedName.toUpperCase()))
            : cardsArr;
    }

    selectName(selectedName: string) {
        this.selectedName = selectedName;
        const cardsArr = this.selectedName
            ? Cards.filter((card) => card.name.toUpperCase().includes(this.selectedName.toUpperCase()))
            : Cards;
        this.cardsArr = this.selectedGenre ? cardsArr.filter((card) => card.genre.includes(this.selectedGenre)) : cardsArr;
    }
}
