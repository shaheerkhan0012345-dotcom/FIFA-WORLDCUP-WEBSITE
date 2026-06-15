import { Match, Player, LeagueTeam, ShopItem } from './types';

export const CHAMP_LEAGUE_TABLE: LeagueTeam[] = [
  { position: 1, name: 'Real Madrid', code: 'RMD', logoColor: '#FEF08A', played: 8, won: 6, drawn: 2, lost: 0, goalsFor: 18, goalsAgainst: 5, points: 20, form: ['W', 'W', 'D', 'W', 'W'] },
  { position: 2, name: 'Bayern Munich', code: 'FCB', logoColor: '#F87171', played: 8, won: 5, drawn: 2, lost: 1, goalsFor: 16, goalsAgainst: 8, points: 17, form: ['W', 'D', 'W', 'L', 'W'] },
  { position: 3, name: 'Manchester City', code: 'MCI', logoColor: '#38BDF8', played: 8, won: 5, drawn: 1, lost: 2, goalsFor: 20, goalsAgainst: 10, points: 16, form: ['W', 'W', 'L', 'D', 'W'] },
  { position: 4, name: 'Arsenal', code: 'ARS', logoColor: '#EF4444', played: 8, won: 4, drawn: 3, lost: 1, goalsFor: 13, goalsAgainst: 7, points: 15, form: ['D', 'W', 'W', 'W', 'L'] },
  { position: 5, name: 'Paris Saint-Germain', code: 'PSG', logoColor: '#1E3A8A', played: 8, won: 4, drawn: 2, lost: 2, goalsFor: 14, goalsAgainst: 9, points: 14, form: ['W', 'L', 'W', 'D', 'D'] },
  { position: 6, name: 'FC Dallas', code: 'FCD', logoColor: '#2563EB', played: 8, won: 4, drawn: 2, lost: 2, goalsFor: 12, goalsAgainst: 11, points: 14, form: ['W', 'W', 'D', 'W', 'L'] },
  { position: 7, name: 'Inter Milan', code: 'INT', logoColor: '#1E293B', played: 8, won: 3, drawn: 4, lost: 1, goalsFor: 11, goalsAgainst: 8, points: 13, form: ['D', 'W', 'D', 'D', 'W'] },
  { position: 8, name: 'D.C. United', code: 'DCU', logoColor: '#334155', played: 8, won: 3, drawn: 2, lost: 3, goalsFor: 10, goalsAgainst: 12, points: 11, form: ['L', 'W', 'D', 'L', 'W'] },
  { position: 9, name: 'Borussia Dortmund', code: 'BVB', logoColor: '#FACC15', played: 8, won: 3, drawn: 1, lost: 4, goalsFor: 9, goalsAgainst: 11, points: 10, form: ['L', 'L', 'W', 'W', 'L'] },
  { position: 10, name: 'AC Milan', code: 'ACM', logoColor: '#000000', played: 8, won: 2, drawn: 2, lost: 4, goalsFor: 8, goalsAgainst: 13, points: 8, form: ['L', 'D', 'L', 'W', 'D'] },
];

export const TEAM_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Mateo De Silva',
    number: 10,
    position: 'Forward',
    nationality: 'Brazil',
    rating: 90,
    stats: { pac: 94, sho: 89, pas: 85, dri: 92, def: 38, phy: 76 },
    avatarSeed: 'mateo',
    goals: 12,
    assists: 5,
    marketValue: '€110M'
  },
  {
    id: 'p2',
    name: 'Christian Wright',
    number: 7,
    position: 'Forward',
    nationality: 'United States',
    rating: 87,
    stats: { pac: 89, sho: 86, pas: 80, dri: 88, def: 42, phy: 80 },
    avatarSeed: 'christian',
    goals: 8,
    assists: 7,
    marketValue: '€75M'
  },
  {
    id: 'p3',
    name: 'Luka Kovačić',
    number: 8,
    position: 'Midfielder',
    nationality: 'Croatia',
    rating: 89,
    stats: { pac: 78, sho: 82, pas: 92, dri: 89, def: 72, phy: 78 },
    avatarSeed: 'luka',
    goals: 4,
    assists: 14,
    marketValue: '€85M'
  },
  {
    id: 'p4',
    name: 'Aurelién Ndong',
    number: 6,
    position: 'Midfielder',
    nationality: 'France',
    rating: 86,
    stats: { pac: 81, sho: 74, pas: 83, dri: 82, def: 85, phy: 88 },
    avatarSeed: 'aurelien',
    goals: 2,
    assists: 3,
    marketValue: '€65M'
  },
  {
    id: 'p5',
    name: 'Alessandro Rossi',
    number: 4,
    position: 'Defender',
    nationality: 'Italy',
    rating: 88,
    stats: { pac: 80, sho: 55, pas: 78, dri: 75, def: 90, phy: 86 },
    avatarSeed: 'alessandro',
    goals: 3,
    assists: 1,
    cleanSheets: 11,
    marketValue: '€70M'
  },
  {
    id: 'p6',
    name: 'Sven Lindström',
    number: 3,
    position: 'Defender',
    nationality: 'Sweden',
    rating: 85,
    stats: { pac: 83, sho: 60, pas: 75, dri: 76, def: 84, phy: 85 },
    avatarSeed: 'sven',
    goals: 1,
    assists: 2,
    cleanSheets: 9,
    marketValue: '€45M'
  },
  {
    id: 'p7',
    name: 'Marcus Henderson',
    number: 1,
    position: 'Goalkeeper',
    nationality: 'England',
    rating: 88,
    stats: { pac: 89, sho: 86, pas: 88, dri: 90, def: 50, phy: 85 }, // GK stats represented simply
    avatarSeed: 'marcus',
    cleanSheets: 14,
    marketValue: '€55M'
  },
  {
    id: 'p8',
    name: 'Tyler Ferreira',
    number: 11,
    position: 'Forward',
    nationality: 'Argentina',
    rating: 84,
    stats: { pac: 92, sho: 81, pas: 76, dri: 85, def: 35, phy: 70 },
    avatarSeed: 'tyler',
    goals: 6,
    assists: 4,
    marketValue: '€40M'
  }
];

export const MATCHES_DATA: Match[] = [
  {
    id: 'm_live',
    homeTeam: 'FC Dallas',
    homeCode: 'FCD',
    homeLogoColor: '#2563EB',
    awayTeam: 'D.C. United',
    awayCode: 'DCU',
    awayLogoColor: '#DC2626',
    homeScore: 2,
    awayScore: 1,
    status: 'LIVE',
    date: 'LIVESTREAM',
    time: '68\'',
    venue: 'Toyota Stadium',
    competition: 'Major League Soccer',
    stats: {
      possession: [54, 46],
      shots: [14, 9],
      shotsOnTarget: [7, 4],
      corners: [6, 4],
      fouls: [8, 12],
      yellowCards: [1, 3]
    },
    commentary: [
      { minute: 65, type: 'standard', text: 'Stunning save by Marcus Henderson denying D.C. United at the near post!' },
      { minute: 58, type: 'goal', text: 'GOAL!!! Christian Wright strikes a thunderous volley into the top corner! Dynamic play!' },
      { minute: 49, type: 'card-yellow', text: 'Yellow Card for Aurelién Ndong following a late challenge in midfield.' },
      { minute: 45, type: 'whistle', text: 'Second half kick-off. FC Dallas look to break the deadlock.' },
      { minute: 41, type: 'goal', text: 'GOAL! D.C. United level the score via a beautifully placed header from a corner kick.' },
      { minute: 14, type: 'goal', text: 'GOAL!!! Mateo De Silva opens the scoring for FC Dallas! Absolute masterclass solo run!' },
      { minute: 1, type: 'whistle', text: 'Referee blows the whistle and the match is underway!' }
    ]
  },
  {
    id: 'm_past_1',
    homeTeam: 'FC Dallas',
    homeCode: 'FCD',
    homeLogoColor: '#2563EB',
    awayTeam: 'Real Madrid',
    awayCode: 'RMD',
    awayLogoColor: '#FEF08A',
    homeScore: 3,
    awayScore: 2,
    status: 'FINISHED',
    date: 'Jun 10, 2026',
    time: 'Full Time',
    venue: 'Toyota Stadium',
    competition: 'Championship Showcase',
    stats: {
      possession: [45, 55],
      shots: [11, 15],
      shotsOnTarget: [6, 8],
      corners: [4, 7],
      fouls: [11, 9],
      yellowCards: [2, 1]
    },
    commentary: [
      { minute: 90, type: 'whistle', text: 'Full Time! An historic victory as FC Dallas beats Real Madrid 3-2 in absolute drama!' },
      { minute: 88, type: 'goal', text: 'GOAL!!! Mateo De Silva scores a legendary penalty! The stadium is in full eruption!' },
      { minute: 72, type: 'card-yellow', text: 'Tactical foul card to Alessandro Rossi to stop a lethal Real Madrid breakaway.' }
    ]
  },
  {
    id: 'm_past_2',
    homeTeam: 'Arsenal',
    homeCode: 'ARS',
    homeLogoColor: '#EF4444',
    awayTeam: 'FC Dallas',
    awayCode: 'FCD',
    awayLogoColor: '#2563EB',
    homeScore: 1,
    awayScore: 1,
    status: 'FINISHED',
    date: 'Jun 05, 2026',
    time: 'Full Time',
    venue: 'Emirates Stadium',
    competition: 'Global Club Trophy',
    stats: {
      possession: [58, 42],
      shots: [18, 8],
      shotsOnTarget: [6, 4],
      corners: [9, 3],
      fouls: [7, 13],
      yellowCards: [1, 2]
    },
    commentary: [
      { minute: 90, type: 'whistle', text: 'Full Time whistle blows. A solid defensive display earns Dallas a crucial draw away!' },
      { minute: 23, type: 'goal', text: 'GOAL! Arsenal scores a breakaway tap-in but Wright equalizes 10 minutes later.' }
    ]
  },
  {
    id: 'm_upcoming_1',
    homeTeam: 'FC Dallas',
    homeCode: 'FCD',
    homeLogoColor: '#2563EB',
    awayTeam: 'D.C. United',
    awayCode: 'DCU',
    awayLogoColor: '#334155',
    status: 'UPCOMING',
    date: 'Jun 14, 2026',
    time: '19:30',
    venue: 'Toyota Stadium',
    competition: 'Major League Championship'
  },
  {
    id: 'm_upcoming_2',
    homeTeam: 'Bayern Munich',
    homeCode: 'FCB',
    homeLogoColor: '#F87171',
    awayTeam: 'FC Dallas',
    awayCode: 'FCD',
    awayLogoColor: '#2563EB',
    status: 'UPCOMING',
    date: 'Jun 18, 2026',
    time: '20:45',
    venue: 'Allianz Arena',
    competition: 'Global Club Trophy'
  },
  {
    id: 'm_upcoming_3',
    homeTeam: 'FC Dallas',
    homeCode: 'FCD',
    homeLogoColor: '#2563EB',
    awayTeam: 'Manchester City',
    awayCode: 'MCI',
    awayLogoColor: '#38BDF8',
    status: 'UPCOMING',
    date: 'Jun 22, 2026',
    time: '18:00',
    venue: 'Toyota Stadium',
    competition: 'Club World Friendly'
  }
];

export const SHOP_MERCHANDISE: ShopItem[] = [
  {
    id: 'shop_kit_home',
    name: 'FC Dallas Home Kit 2026/27',
    price: 89.99,
    category: 'kit',
    image: 'https://images.unsplash.com/photo-1577223625856-745524fb08bf?auto=format&fit=crop&q=80&w=600',
    description: 'Adorned in classic white with trophy gold embroidery, this high-performance match kit delivers peak styling, breathable fabric technology, and professional athlete fit.',
    rating: 4.9,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'shop_scarf',
    name: 'Championship Golden Knitted Scarf',
    price: 24.99,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    description: '100% cashmere feel double-knit scarf featuring the Club motto in bold navy text laced with gold tassel finishes.',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'shop_ball',
    name: 'Gold Orbit Premium Matchball',
    price: 39.99,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600',
    description: 'FIFA Pro Quality certified ball with textured grip panels, gold-foil graphics, and premium butyl bladder for consistent bounce and shape retention.',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'shop_ticket_1',
    name: 'FC Dallas vs Manchester City VIP Pass',
    price: 150.00,
    category: 'ticket',
    image: 'https://images.unsplash.com/photo-1508244751996-379b7685d3a5?auto=format&fit=crop&q=80&w=600',
    description: 'Standard West Stand VIP entrance, access to Trophy Lounge before and after the game, and a free limited-edition commemorative scarf.',
    rating: 5.0,
    inStock: true
  },
  {
    id: 'shop_ticket_2',
    name: 'FC Dallas vs DC United - Premium Gate 4',
    price: 45.00,
    category: 'ticket',
    image: 'https://images.unsplash.com/photo-1508244751996-379b7685d3a5?auto=format&fit=crop&q=80&w=600',
    description: 'Standard South Stand tickets with premium mid-pitch visuals. Bring the whole family to yell for the home crew!',
    rating: 4.6,
    inStock: true
  }
];
