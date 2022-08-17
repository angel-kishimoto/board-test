import * as YAML from "yaml";

export type CardData = {
    name: string
    description: string
}

export type PlanetCardData = CardData & {
    type: string,
    condition: string,
}

export type SilhouetteCardData = CardData & {
    color: "青" | "赤"
}

export type WhiteCardData = CardData & {
}

export type BaseCardData = CardData & {
    type: string,
    header: string,
}

export type CombatCardData = CardData & {
    type: string,
    level: number | "",
    fire: number | "",
}





const planetCardsFile = "locke_data/planet_card.yaml";
const silhouetteCardsFile = "locke_data/silhouette_card.yaml";
const whiteCardsFile = "locke_data/white_card.yaml";
const baseCardsFile = "locke_data/base_card.yaml";
const combatCardsFile = "locke_data/combat_card.yaml";




const fetchLockeData = async (filePath: string) => {
    let response = await fetch(filePath);
    let text = await response.text();
    return YAML.parse(text);
}


const loadData = async () => {
    let planetCards: PlanetCardData[] = await fetchLockeData(planetCardsFile);
    let silhouetteCards: SilhouetteCardData[] = await fetchLockeData(silhouetteCardsFile);
    let whiteCards: WhiteCardData[] = await fetchLockeData(whiteCardsFile);
    let baseCards: BaseCardData[] = await fetchLockeData(baseCardsFile);
    let combatCards: CombatCardData[] = await fetchLockeData(combatCardsFile);
    return {
        planetCards, silhouetteCards, whiteCards, baseCards, combatCards
    }
}



export {
    loadData
};

