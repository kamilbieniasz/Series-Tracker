export interface Season {
    id: number;
    name: string;
    number: number;
    premiereDate: string;
    summary: string;
    url: string;
    webChannel: NetworkAndWebChannel;
    _links: Links;
    image: Image;
    endDate: string;
    episodeOrder: number;
    network: NetworkAndWebChannel;
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

interface Links {
    self: LinksHref;
    previousepisode: LinksHref;
}

interface LinksHref {
    href: string;
}

interface Image {
    medium: string;
    original: string;
}
