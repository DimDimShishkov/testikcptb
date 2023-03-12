import { DoCheck } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICard, IGenre } from 'src/interface/page';
import Cards from '../../../../mockData/data.json';
import Genres from '../../../../mockData/genres.json';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements DoCheck {
    @Output() selectionChange: EventEmitter<number>;

    public cardsArr: ICard[] = Cards;
    public genreArr: IGenre[] = Genres;
    public favoriteCard: ICard;
    public selectedGenre: number = 0;
    public favoriteIDCard: number = 0;
    public selectedName: string = '';

    constructor(public dialog: MatDialog) {}

    /*    ngOnInit() {
        const cardID = +(localStorage.getItem('selectedCard') || 0);
        const card = this.cardsArr.find((card) => card.id === cardID);
        if (card) {
            this.favoriteCard = card;
        }
    } */

    // переделать под RxJS и подпиской на localStorage
    // во всех местах где лайкается карточка прописать дополнительное свойство только в каталог.ts
    // вынести в одну функцию и вызывать здесь
    // из инита убрать
    ngDoCheck() {
        const cardID = +(localStorage.getItem('selectedCard') || 0);
        this.likeCheckHandler(cardID);
    }

    likeCheckHandler(cardID: number) {
        const card = this.cardsArr.find((card) => card.id === cardID);
        if (card) {
            this.favoriteCard = card;
        }
    }

    likeToggleHandler(card: ICard) {
        const cardID = +(localStorage.getItem('selectedCard') || 0);
        this.likeCheckHandler(cardID);
        /*  const cardID = +(localStorage.getItem('selectedCard') || 0);
        const chosenCard = this.cardsArr.find((card) => card.id === cardID);
        if (chosenCard) {
            this.favoriteCard = chosenCard;
        } */
        if (cardID === card.id) {
            localStorage.removeItem('selectedCard');
        } else {
            localStorage.setItem('selectedCard', `${card.id}`);
        }
    }

    openCard(card: ICard) {
        this.dialog.open(ModalComponent, {
            data: card,
        });
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
