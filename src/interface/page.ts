export interface ICard {
    id: number;
    name: string;
    year: number;
    description: string;
    genre: number[];
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IData {
    card: ICard;
    isLiked: boolean;
    likeToggleEvent: (card: ICard) => void;
}
