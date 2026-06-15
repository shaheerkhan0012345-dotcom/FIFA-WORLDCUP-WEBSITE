export interface MatchStats {
  possession: [number, number]; // [home, away] in percentage
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
}

export interface CommentaryEvent {
  minute: number;
  type: 'goal' | 'card-yellow' | 'card-red' | 'substitute' | 'standard' | 'whistle';
  text: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  homeCode: string;
  homeLogoColor: string;
  awayTeam: string;
  awayCode: string;
  awayLogoColor: string;
  homeScore?: number;
  awayScore?: number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  date: string;
  time: string;
  venue: string;
  competition: string;
  stats?: MatchStats;
  commentary?: CommentaryEvent[];
}

export interface PlayerStats {
  pac: number; // Pace
  sho: number; // Shooting
  pas: number; // Passing
  dri: number; // Dribbling
  def: number; // Defending
  phy: number; // Physical
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  nationality: string;
  rating: number; // EA FC style overall rating (e.g., 91)
  stats: PlayerStats;
  avatarSeed: string;
  goals?: number;
  assists?: number;
  cleanSheets?: number;
  marketValue: string;
}

export interface LeagueTeam {
  position: number;
  name: string;
  code: string;
  logoColor: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: 'kit' | 'accessory' | 'ticket';
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
  sizes?: string[];
}

export interface CartItem {
  item: ShopItem;
  quantity: number;
  selectedSize?: string;
}
