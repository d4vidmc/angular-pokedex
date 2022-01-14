export type Pokemon = {
  name: string;
  url: string;
};

export type Generation = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  weight: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  past_types: any[];
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  species: { name: string; url: string };
};

export type PokemonSpecies = {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: {
    name: string;
    url: string;
  }[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: any;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  growth_rate: {
    name: string;
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  };
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: any;
  order: number;
  pal_park_encounters: {
    base_score: number;
    rate: number;
    area: {
      name: string;
      url: string;
    };
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }[];
  shape: {
    name: string;
    url: string;
  };
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Option = {
  label: string;
  value: string;
};

export type Chain = {
  id: number;
  chain: {
    evolves_to: EvolvesTo[];
    evolution_details: EvolutionDetails[] | null;
  };
};
export type EvolvesTo = {
  evolution_details?: EvolutionDetails[] | null;
  evolves_to?: EvolvesTo[] | null;
  species: { name: string; url: string };
};

export type EvolutionDetails = {
  gender?: null;
  held_item?: null;
  item?: null;
  known_move?: null;
  known_move_type?: null;
  location?: null;
  min_affection?: null;
  min_beauty?: null;
  min_happiness?: null;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species?: null;
  party_type?: null;
  relative_physical_stats?: null;
  time_of_day: string;
  trade_species?: null;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
};