export interface HousesResponse {
  _id: string;
  _score: number;
  _source: {
    id: number;
    type: string;
    area: number;
    bathrooms: number;
    bedrooms: number;
    suites: number;
    parkingSpaces: number;
    amenities: Array<string>;
    installations: Array<string>;
    totalCost: number;
    rent: number;
    iptuPlusCondominium: number;
    salePrice: number;
    address: string;
    city: string;
    neighbourhood: string;
    regionName: string;
    isSecondaryHouse: false;
    coverImage: string;
    imageList: Array<string>;
    imageCaptionList: Array<string>;
    forRent: boolean;
    forSale: boolean;
    isPrimaryMarket: boolean;
    visitStatus: string;
    isFurnished: boolean;
    yield: number;
    yieldStrategy: string;
  };
}
