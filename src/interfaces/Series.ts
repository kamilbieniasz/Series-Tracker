export interface Series {
    id: number,
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string;
    officialSite: string;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network: NetworkAndWebChannel;
    webChannel: NetworkAndWebChannel;
    dvdCountry: string;
    externals: Externals;
    image: Image;
    summary: string;
    updated: number;
    _links: Links;
}

interface Schedule {
    time: string;
    days: string[];
}

interface Rating {
    average: string;
}

interface NetworkAndWebChannel {
    id: number;
    name: string;
    country: Country;
    officialSite: string;
}

interface Country {
    name: string;
    code: string;
    timezone: string;
}

interface Externals {
    tvrage: number;
    thetvdb: number;
    imdb: string;
}

interface Image {
    medium: string;
    original: string;
}

interface Links {
    self: LinksHref;
    previousepisode: LinksHref;
}

interface LinksHref {
    href: string;
}
