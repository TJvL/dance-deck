#!/usr/bin/env bun

import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Check for required arguments.
const args = process.argv.slice(2);
if (args.length !== 3) {
  console.error('Usage: bun run create_sample_library.js <source.mp3> <target-directory> <number-of-copies>');
  process.exit(1);
}

const [sourceFile, targetDirectory, countArg] = args;
const count = parseInt(countArg, 10);
if (isNaN(count) || count <= 0) {
  console.error('Invalid number of copies:', countArg);
  process.exit(1);
}

// Verify that the source file exists.
if (!existsSync(sourceFile)) {
  console.error('Source file does not exist:', sourceFile);
  process.exit(1);
}

// Ensure the target directory exists.
if (!existsSync(targetDirectory)) {
  mkdirSync(targetDirectory, { recursive: true });
}

// Helper function: get a random element from an array.
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Hardcoded lists of names.
const artists = [
  'The Beatles',
  'The Rolling Stones',
  'Led Zeppelin',
  'Pink Floyd',
  'Queen',
  'Interpol',
  'Nirvana',
  'Metallica',
  'U2',
  'The Who',
  'Red Hot Chili Peppers',
  "Guns N' Roses",
  'Radiohead',
  'The Doors',
  'The Eagles',
  'Black Sabbath',
  'Deep Purple',
  'Bon Jovi',
  'Fleetwood Mac',
  'Van Halen',
  'The Police',
  'Oasis',
  'Green Day',
  'R.E.M.',
  'Pearl Jam',
  'Aerosmith',
  'Foo Fighters',
  'Coldplay',
  'David Bowie',
  'Bruce Springsteen',
  'The Clash',
  'Bob Dylan',
  'The Cure',
  'Blur',
  'Imagine Dragons',
  'Arctic Monkeys',
  'The Smashing Pumpkins',
  'Linkin Park',
  'Muse',
  'Sublime',
  'Bon Iver',
  'Kings of Leon',
  'The Strokes',
  'Paramore',
  'Fall Out Boy',
  'My Chemical Romance',
  'Twenty One Pilots',
  'The Black Keys',
  'Tame Impala',
  'Florence + The Machine',
];

const songs = [
  'Bohemian Rhapsody',
  'Stairway to Heaven',
  'Hotel California',
  "Sweet Child O' Mine",
  'Imagine',
  'Smells Like Teen Spirit',
  'Hey Jude',
  'Like a Rolling Stone',
  'Billie Jean',
  'Comfortably Numb',
  'Wonderwall',
  "Livin' on a Prayer",
  'Blackbird',
  'Purple Haze',
  'Back in Black',
  'Yesterday',
  'One',
  'Highway to Hell',
  "Don't Stop Believin'",
  'Every Breath You Take',
  'Another Brick in the Wall',
  'Good Vibrations',
  'Light My Fire',
  'Born to Run',
  'Free Bird',
  "What's Going On",
  'Superstition',
  'Thunderstruck',
  'Under Pressure',
  'Crazy Train',
  'Dream On',
  'Roxanne',
  'Layla',
  'Africa',
  'Sweet Home Alabama',
  'I Want to Hold Your Hand',
  'Another One Bites the Dust',
  'Waterloo Sunset',
  'In the Air Tonight',
  'Take on Me',
  'Everybody Wants to Rule the World',
  'Time',
  'Money',
  'Clocks',
  'Everlong',
  'One More Time',
  'Jump',
  'Radioactive',
  'Paradise City',
  'The Sound of Silence',
];

const dances = [
  'Salsa',
  'Tango',
  'Waltz',
  'Hip Hop',
  'Breakdance',
  'Ballet',
  'Contemporary',
  'Swing',
  'Foxtrot',
  'Charleston',
  'Jitterbug',
  'Merengue',
  'Bachata',
  'Samba',
  'Rumba',
  'Cha-Cha',
  'Paso Doble',
  'Lindy Hop',
  'Quickstep',
  'Argentine Tango',
  'Mambo',
  'Bolero',
  'Cumbia',
  'Zouk',
  'Reggaeton',
  'Kizomba',
  'Bharatanatyam',
  'Kathak',
  'Flamenco',
  'Street Dance',
  'Krumping',
  'Popping',
  'Locking',
  'House',
  'Voguing',
  'Waacking',
  'Samba de Gafieira',
  'Lambada',
  'Afrobeat',
  'Acro Dance',
  'Dancehall',
  'Line Dance',
  'Modern Dance',
  'Contemporary Dance',
  'Belly Dance',
  'Capoeira',
  'B-boying',
  'DanceSport',
  'Freestyle Dance',
  'Electro Dance',
];

// Copy the file 'count' times with random names.
for (let i = 0; i < count; i++) {
  const artist = getRandomElement(artists);
  const song = getRandomElement(songs);
  const dance = getRandomElement(dances);

  // Compose the new filename.
  const newFileName = `${artist} - ${song} - ${dance}.mp3`;

  // Create the full path in the target directory.
  const targetPath = join(targetDirectory, newFileName);

  // Copy the source file to the target path.
  copyFileSync(sourceFile, targetPath);
  console.log(`Copied to: ${targetPath}`);
}
