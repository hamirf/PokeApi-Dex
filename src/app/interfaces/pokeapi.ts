export interface PokeApi {
    count: number;
    next: string;
    previous: string;
    results: PokeApiBase[];
}

export interface PokeApiBase {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokeAbilityBase[];
    forms: PokeFormBase[];
    game_indices: PokeGameIndex[];
    held_items: PokeHeldItem[];
    location_area_encounters: string;
    moves: PokeMoveBase[];
    species: PokeSpeciesBase;
    sprites: PokeSpriteBase;
    cries: PokeCries;
    stats: PokeStatBase[];
    types: PokeTypeBase[];
    past_types: PokePastTypeBase[];
}

export interface PokeAbilityBase {
    is_hidden: boolean;
    slot: number;
    ability: PokeApiBase[];
}

export interface PokeFormBase {
    name: string;
    url: string;
}

export interface PokeGameIndex {
    game_index: number;
    version: PokeApiBase[];
}

export interface PokeHeldItem {
    item: PokeApiBase[];
    version_details: PokeHeldItemDetail[];
}

export interface PokeHeldItemDetail {
    rarity: number;
    version: PokeApiBase[];
}

export interface PokeMoveBase {
    move: PokeApiBase[];
    version_group_details: PokeMoveDetail[];
}

export interface PokeMoveDetail {
    level_learned_at: number;
    version_group: PokeApiBase[];
    move_learn_method: PokeApiBase[];
}

export interface PokeSpeciesBase {
    name: string;
    url: string;
}

export interface PokeSpriteBase {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: [];
    versions: [];
}

export interface PokeCries {
    latest: string;
    legacy: string;
}

export interface PokeStatBase {
    base_stat: number;
    effort: number;
    stat: PokeApiBase;
}

export interface PokeTypeBase {
    slot: number;
    type: PokeApiBase;
}

export interface PokePastTypeBase {
    generation: PokeApiBase;
    types: PokeTypeBase;
}

export interface PokemonSpecies {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: PokeApiBase;
    pokedex_numbers: PokedexNumber[];
    egg_groups: PokeApiBase;
    color: PokeApiBase;
    shape: PokeApiBase;
    evolves_from_species: PokeApiBase;
    evolution_chain: PokeApiBase;
    habitat: PokeApiBase;
    generation: PokeApiBase;
    names: PokemonName[];
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: FormDescription[];
    genera: PokemonGenera[];
    varieties: PokemonVariety[];
}

export interface PokedexNumber {
    entry_number: number;
    pokedex: PokeApiBase;
}

export interface PokemonName {
    name: string;
    language: PokeApiBase;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: PokeApiBase;
}

export interface FormDescription {
    description: string;
    language: PokeApiBase;
}

export interface PokemonGenera {
    genus: string;
    language: PokeApiBase;
}

export interface PokemonVariety {
    is_default: boolean;
    pokemon: PokeApiBase;
}