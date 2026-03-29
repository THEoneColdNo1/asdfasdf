// fishData.js

// The hand-crafted initial 36 fish
const fishDatabase = [
  {
    id: "f1", name: "Bluegill", rarity: "Common", habitat: "Lakes & Ponds", diet: "Insects, small fish", size: "6 - 10 inches",
    description: "A highly common freshwater fish easily identified by the dark spot at the base of its dorsal fin.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Bluegill_in_hand.jpg/300px-Bluegill_in_hand.jpg"
  },
  {
    id: "f2", name: "Largemouth Bass", rarity: "Common", habitat: "Freshwater", diet: "Insects, minnows, frogs", size: "12 - 24 inches",
    description: "An aggressive predator fish widely sought after by anglers. Known for its massive jaw which extends past its eye.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Largemouth_bass_fish.jpg/300px-Largemouth_bass_fish.jpg"
  },
  {
    id: "f3", name: "Rainbow Trout", rarity: "Rare", habitat: "Cold Streams", diet: "Aquatic insects", size: "16 - 30 inches",
    description: "A beautiful coldwater fish featuring a prominent pinkish-red stripe along its sides.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rainbow_Trout.jpg/300px-Rainbow_Trout.jpg"
  },
  {
    id: "f4", name: "Mahi Mahi", rarity: "Rare", habitat: "Open Ocean", diet: "Squid, flying fish", size: "30 - 40 inches",
    description: "Also known as the Dolphinfish. Extremely colorful with brilliant yellows, greens and blues.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Coryphaena_hippurus.jpg/300px-Coryphaena_hippurus.jpg"
  },
  {
    id: "f5", name: "Golden Dorado", rarity: "Legendary", habitat: "Amazon Rivers", diet: "Other fish", size: "20 - 40 inches",
    description: "A fierce river apex predator famous for its stunning golden scales and massive bite force.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Salminus_brasiliensis_%28Pantanal%29.jpg/300px-Salminus_brasiliensis_%28Pantanal%29.jpg"
  },
  {
    id: "f6", name: "Coelacanth", rarity: "Legendary", habitat: "Deep Sea Caves", diet: "Deep sea squid", size: "6 - 8 feet",
    description: "A rare prehistoric fish once thought to be extinct. A true ancient marvel.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Latimeria_chalumnae_-_Natural_History_Museum_of_London.jpg/300px-Latimeria_chalumnae_-_Natural_History_Museum_of_London.jpg"
  },
  {
    id: "f7", name: "Northern Pike", rarity: "Rare", habitat: "Lakes & Rivers", diet: "Fish, frogs", size: "16 - 32 inches",
    description: "An aggressive predator known for its torpedo-shaped body and sharp teeth. Ambush hunter.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Brochet.jpg/300px-Brochet.jpg"
  },
  {
    id: "f8", name: "Atlantic Salmon", rarity: "Rare", habitat: "Ocean & Rivers", diet: "Herring, capelin", size: "28 - 30 inches",
    description: "Known for their remarkable ability to swim long distances upstream to spawn in rivers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Salmo_salar.jpg/300px-Salmo_salar.jpg"
  },
  {
    id: "f9", name: "Yellow Perch", rarity: "Common", habitat: "Lakes & Ponds", diet: "Insects, small fish", size: "6 - 12 inches",
    description: "Recognized by its yellowish body and dark vertical stripes. Very popular among sport fishermen.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Yellow_perch.jpg/300px-Yellow_perch.jpg"
  },
  {
    id: "f10", name: "Great White Shark", rarity: "Legendary", habitat: "Coastal Oceans", diet: "Seals, fish", size: "11 - 16 feet",
    description: "The ultimate apex predator of the ocean, feared and respected for its enormous size and power.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/300px-White_shark.jpg"
  },
  {
    id: "f11", name: "Red Snapper", rarity: "Common", habitat: "Reefs", diet: "Crabs, shrimp", size: "15 - 24 inches",
    description: "A bright red fish found in the Gulf of Mexico, prized for dining.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Lutjanus_campechanus.jpg/300px-Lutjanus_campechanus.jpg"
  },
  {
    id: "f12", name: "Clownfish", rarity: "Common", habitat: "Coral Reefs", diet: "Algae, plankton", size: "3 - 4 inches",
    description: "A small, bright orange fish known for its mutualistic relationship with sea anemones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg/300px-Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg"
  },
  {
    id: "f13", name: "Lionfish", rarity: "Rare", habitat: "Coral Reefs", diet: "Small fish", size: "12 - 15 inches",
    description: "A stunning but venomous fish with red and white tiger stripes. An invasive species.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Pterois_volitans_Manado-e.jpg/300px-Pterois_volitans_Manado-e.jpg"
  },
  {
    id: "f14", name: "Mekong Giant Catfish", rarity: "Legendary", habitat: "Mekong River", diet: "Algae", size: "5 - 10 feet",
    description: "A critically endangered giant of the river, capable of growing to nearly 10 feet long.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pangasianodon_gigas.jpg/300px-Pangasianodon_gigas.jpg"
  },
  {
    id: "f15", name: "Brook Trout", rarity: "Common", habitat: "Cold Streams", diet: "Insects", size: "10 - 20 inches",
    description: "A native North American trout with gorgeous marbled patterns on its back.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Brook_trout.jpg/300px-Brook_trout.jpg"
  },
  {
    id: "f16", name: "Giant Trevally", rarity: "Rare", habitat: "Tropical Reefs", diet: "Fish, birds", size: "24 - 40 inches",
    description: "A powerful, hard-fighting sport fish known to launch completely out of the water to catch birds.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Caranx_ignobilis1.jpg/300px-Caranx_ignobilis1.jpg"
  },
  {
    id: "f17", name: "Swordfish", rarity: "Legendary", habitat: "Open Ocean", diet: "Squid, fish", size: "10 - 15 feet",
    description: "Identifiable by its long, flat bill which it uses to slash at schooling prey in deep waters.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Xiphias_gladius1.jpg/300px-Xiphias_gladius1.jpg"
  },
  {
    id: "f18", name: "Yellowfin Tuna", rarity: "Rare", habitat: "Open Ocean", diet: "Small fish, squid", size: "4 - 6 feet",
    description: "A torpedo-like powerhouse built for extreme speed and stamina across vast oceans.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Thunnus_albacares.jpg/300px-Thunnus_albacares.jpg"
  },
  {
    id: "f19", name: "Blue Marlin", rarity: "Legendary", habitat: "Open Ocean", diet: "Mackerel, tuna", size: "10 - 14 feet",
    description: "A beautiful, massive billfish renowned for its incredible acrobatics and fighting strength.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Blue_Marlin.jpg/300px-Blue_Marlin.jpg"
  },
  {
    id: "f20", name: "Channel Catfish", rarity: "Common", habitat: "Rivers & Lakes", diet: "Insects, fish", size: "12 - 24 inches",
    description: "A popular bottom-feeding fish easily recognized by its 'whiskers' (barbels).",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Channel_catfish.jpg/300px-Channel_catfish.jpg"
  },
  {
    id: "f21", name: "Common Carp", rarity: "Common", habitat: "Lakes & Rivers", diet: "Plants, insects", size: "16 - 30 inches",
    description: "A widespread freshwater fish capable of thriving in highly vegetated sluggish waters.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cyprinus_carpio_TK_2021-04-03_1.jpg/300px-Cyprinus_carpio_TK_2021-04-03_1.jpg"
  },
  {
    id: "f22", name: "Guppy", rarity: "Common", habitat: "Freshwater Streams", diet: "Algae, larvae", size: "1.5 - 2 inches",
    description: "One of the most brightly colored and popular freshwater aquarium fish.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Guppy_05_female.jpg/300px-Guppy_05_female.jpg"
  },
  {
    id: "f23", name: "Red-Bellied Piranha", rarity: "Rare", habitat: "Amazon Basin", diet: "Fish, insects", size: "5 - 10 inches",
    description: "Notorious for its razor-sharp teeth and swarming behavior when hunting.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pygocentrus_nattereri_-_Karlsruhe_Zoo_01.jpg/300px-Pygocentrus_nattereri_-_Karlsruhe_Zoo_01.jpg"
  },
  {
    id: "f24", name: "Arapaima", rarity: "Legendary", habitat: "Amazon Basin", diet: "Fish, birds", size: "6 - 10 feet",
    description: "A massive prehistoric fish native to the Amazon that must surface to breathe air.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Arapaima_gigas_01.jpg/300px-Arapaima_gigas_01.jpg"
  },
  {
    id: "f25", name: "Great Barracuda", rarity: "Rare", habitat: "Tropical Oceans", diet: "Small fish", size: "24 - 60 inches",
    description: "A long, silver, lightning-fast predator with intimidating, fang-like teeth.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Great_Barracuda.JPG/300px-Great_Barracuda.JPG"
  },
  {
    id: "f26", name: "Goliath Grouper", rarity: "Legendary", habitat: "Coral Reefs", diet: "Crustaceans, fish", size: "6 - 8 feet",
    description: "An incredibly colossal reef dweller known for swallowing massive prey entirely whole.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Epinephelus_itajara_%28Goliath_grouper%29.jpg/300px-Epinephelus_itajara_%28Goliath_grouper%29.jpg"
  },
  {
    id: "f27", name: "Moray Eel", rarity: "Rare", habitat: "Coral Reef Caves", diet: "Fish, octopuses", size: "3 - 9 feet",
    description: "A snake-like fish with a powerful 'second jaw' used to drag prey deeper into its gullet.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Muraena_helena.jpg/300px-Muraena_helena.jpg"
  },
  {
    id: "f28", name: "Beluga Sturgeon", rarity: "Legendary", habitat: "Caspian Sea", diet: "Fish", size: "10 - 20 feet",
    description: "An incredibly ancient and massive fish strictly associated with premium caviar.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Sturgeon.jpg/300px-Sturgeon.jpg"
  },
  {
    id: "f29", name: "Tarpon", rarity: "Rare", habitat: "Coastal Waters", diet: "Crabs, fish", size: "4 - 8 feet",
    description: "The 'Silver King'. A massive near-shore jumper fish prized by sport anglers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tarpon_Megalops_atlanticus.jpg/300px-Tarpon_Megalops_atlanticus.jpg"
  },
  {
    id: "f30", name: "Flounder", rarity: "Common", habitat: "Ocean Floor", diet: "Small fish, shrimp", size: "12 - 20 inches",
    description: "A master of camouflage that lies flat on the sea floor waiting to ambush its prey.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flounder_in_Florida_Bay.jpg/300px-Flounder_in_Florida_Bay.jpg"
  },
  {
    id: "f31", name: "Pacific Halibut", rarity: "Rare", habitat: "Deep Ocean Floor", diet: "Crabs, fish", size: "5 - 8 feet",
    description: "A remarkably huge flatfish widely respected for its sheer weight and delicious taste.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Hippoglossus_stenolepis.jpg/300px-Hippoglossus_stenolepis.jpg"
  },
  {
    id: "f32", name: "Flying Fish", rarity: "Rare", habitat: "Open Ocean", diet: "Plankton", size: "6 - 12 inches",
    description: "An extraordinary fish capable of launching from the water to glide through the air for hundreds of feet.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flying_fish.jpg/300px-Flying_fish.jpg"
  },
  {
    id: "f33", name: "Oarfish", rarity: "Legendary", habitat: "Deep Ocean", diet: "Krill", size: "10 - 36 feet",
    description: "A mysterious and incredibly long deep-sea 'sea serpent' rarely seen on the surface.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Regalecus_glesne_-_Museum_Toulouse_-_Ext.jpg/300px-Regalecus_glesne_-_Museum_Toulouse_-_Ext.jpg"
  },
  {
    id: "f34", name: "Manta Ray", rarity: "Legendary", habitat: "Tropical Oceans", diet: "Plankton", size: "10 - 23 feet wide",
    description: "A majestic, peaceful giant of the sea that glides gracefully through the reef.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Manta_birostris-Thailand4.jpeg/300px-Manta_birostris-Thailand4.jpeg"
  },
  {
    id: "f35", name: "Pufferfish", rarity: "Rare", habitat: "Tropical Reefs", diet: "Invertebrates", size: "5 - 24 inches",
    description: "A highly poisonous slow swimmer capable of inflating itself to evade being eaten.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Arothron_meleagris.jpg/300px-Arothron_meleagris.jpg"
  },
  {
    id: "f36", name: "Ocean Sunfish (Mola Mola)", rarity: "Legendary", habitat: "Open Ocean", diet: "Jellyfish", size: "6 - 10 feet",
    description: "The heaviest bony fish in the world, famous for 'sunbathing' flat near the surface.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mola_mola_in_Portugal.jpg/300px-Mola_mola_in_Portugal.jpg"
  }
];

// Add 114 more species procedurally to hit the 150 mark.
const bulkAdditions = [
  // name, rarity, habitat, diet, size, description
  ["Snook", "Rare", "Estuaries", "Fish", "20-40 in", "A highly prized game fish identifiable by the black lateral line."],
  ["Bonefish", "Rare", "Flats", "Crustaceans", "15-30 in", "Incredibly fast 'ghosts of the flats' loved by fly fishers."],
  ["Roosterfish", "Legendary", "Coastal Waters", "Fish", "30-50 in", "Named for its distinctive 'comb' like dorsal fin."],
  ["Peacock Bass", "Rare", "Amazon", "Fish", "12-28 in", "Not a true bass, but a highly colored, aggressive cichlid."],
  ["Wahoo", "Legendary", "Open Ocean", "Squid, fish", "40-65 in", "One of the fastest fish in the ocean with razor sharp teeth."],
  ["King Mackerel", "Rare", "Coastal Waters", "Fish", "20-60 in", "Sleek, fast predator known for massive leaps."],
  ["Sailfish", "Legendary", "Open Ocean", "Fish, squid", "5-10 ft", "Extremely fast billfish featuring a huge dorsal 'sail'."],
  ["Tiger Shark", "Legendary", "Oceans", "Anything", "10-14 ft", "A massive apex predator known as the 'garbage can of the sea'."],
  ["Bull Shark", "Legendary", "Oceans & Rivers", "Fish, rays", "7-11 ft", "Aggressive shark capable of surviving in pure freshwater."],
  ["Hammerhead Shark", "Legendary", "Oceans", "Stingrays", "13-20 ft", "Famous for its wide, laterally projecting head (cephalofoil)."],
  ["Whale Shark", "Legendary", "Tropical Oceans", "Plankton", "18-32 ft", "The largest known extant fish species. A gentle giant."],
  ["Mako Shark", "Legendary", "Open Ocean", "Fish, squid", "10-12 ft", "The fastest shark in the ocean, capable of amazing aerial leaps."],
  ["Blue Shark", "Rare", "Deep Oceans", "Squid", "8-10 ft", "A sleek, deep blue shark that roams the world's oceans."],
  ["Nurse Shark", "Common", "Reefs", "Crustaceans", "7-10 ft", "Sluggish, bottom-dwelling shark with barbel-fringed mouths."],
  ["Blacktip Reef Shark", "Common", "Reefs", "Fish", "4-5 ft", "A small, timid reef shark with black tips on its fins."],
  ["Lemon Shark", "Common", "Coastal Waters", "Fish", "8-10 ft", "A yellowish shark that commonly swims in shallow mangroves."],
  ["Thresher Shark", "Legendary", "Open Ocean", "Schooling fish", "10-15 ft", "Uses its extraordinarily long tail to stun prey like a whip."],
  ["Zebra Shark", "Rare", "Reefs", "Mollusks", "7-8 ft", "Beautiful slow moving carpet shark with distinct leopard spots."],
  ["Goblin Shark", "Legendary", "Deep Ocean", "Deep sea fish", "10-12 ft", "A bizarre, ancient shark featuring a massive protruding jaw."],
  ["Frilled Shark", "Legendary", "Deep Ocean", "Squid", "5-6 ft", "A terrifyingly prehistoric, eel-like shark with needle teeth."],
  ["Vampire Squid", "Legendary", "Abyssal Zone", "Marine snow", "1 ft", "Though named squid, this deep-sea relic shares traits with octopuses."],
  ["Anglerfish", "Legendary", "Abyssal Zone", "Small fish", "1-3 ft", "Famous for using a bioluminescent lure protruding from its head."],
  ["Gulper Eel", "Legendary", "Abyssal Zone", "Fish, crustaceans", "2-3 ft", "A deep sea monster with an unhingeable, massively oversized mouth."],
  ["Snipe Eel", "Rare", "Deep Ocean", "Shrimp", "3-5 ft", "A slender, extremely long fish with a bird-like beak."],
  ["Hagfish", "Common", "Ocean Floor", "Carcasses", "1-2 ft", "A primitive, jawless slime-producing scavenger."],
  ["Lamprey", "Common", "Rivers & Oceans", "Blood of fish", "1-3 ft", "A parasitic fish with a toothed, funnel-like sucking mouth."],
  ["Bichir", "Rare", "African Rivers", "Invertebrates", "1-2 ft", "An ancient fish that resembles a swimming dragon with lungs."],
  ["Lungfish", "Rare", "Swamps", "Fish, frogs", "2-3 ft", "Can survive droughts by burying itself and breathing air."],
  ["Gar", "Rare", "Rivers", "Fish", "3-8 ft", "A long, heavily armored fish with a crocodile-like snout."],
  ["Alligator Gar", "Legendary", "Southern Rivers", "Fish, birds", "6-10 ft", "The largest species of gar, a true living dinosaur."],
  ["Bowfin", "Common", "Freshwater", "Fish, insects", "2-3 ft", "A primitive swamp dweller capable of gulping air."],
  ["Paddlefish", "Legendary", "Large Rivers", "Zooplankton", "4-5 ft", "A bizarre filter feeder featuring a massive, rounded rostrum."],
  ["Sturgeon (Lake)", "Rare", "Lakes & Rivers", "Benthos", "4-7 ft", "An ancient bottom-feeder highly sensitive to pollution."],
  ["Sturgeon (White)", "Legendary", "Pacific Rivers", "Fish", "8-15 ft", "The largest freshwater fish in North America."],
  ["European Eel", "Common", "Rivers to Ocean", "Invertebrates", "2-4 ft", "A snake-like fish that migrates to the Sargasso Sea to breed."],
  ["Electric Eel", "Legendary", "Amazon Basin", "Fish", "6-8 ft", "Not actually an eel, but a knifefish capable of shocking 600V."],
  ["Knifefish", "Common", "Amazon Basin", "Insects", "1-2 ft", "A highly maneuverable fish that navigates using electricity."],
  ["Elephant Nose Fish", "Rare", "African Rivers", "Worms", "6-10 in", "Uses its trunk-like appendage to find food via electroreception."],
  ["Arowana", "Legendary", "Amazon/Asia", "Insects, frogs", "2-3 ft", "A highly prized aquarium fish that leaps to catch insects from trees."],
  ["Banded Knifefish", "Common", "Rivers", "Insects", "1 ft", "A unique fish capable of swimming backwards easily."],
  ["Tarpon (Pacific)", "Rare", "Coastal", "Fish", "2-3 ft", "Smaller but similar to the Atlantic Tarpon."],
  ["Milkfish", "Common", "Indo-Pacific", "Algae", "2-3 ft", "A silvery fish highly important in Southeast Asian aquaculture."],
  ["Anchovy", "Common", "Oceans", "Plankton", "4-8 in", "A small, numerous forage fish critical to ocean food webs."],
  ["Herring", "Common", "Oceans", "Plankton", "10-15 in", "Travels in massive schools and feeds many larger ocean predators."],
  ["Sardine", "Common", "Oceans", "Plankton", "6-10 in", "A small, oily fish known for massive bait ball formations."],
  ["Shad", "Common", "Rivers & Oceans", "Plankton", "15-20 in", "Anadromous fish valued for their roe and sport fishing fight."],
  ["Menhaden", "Common", "Coastal", "Plankton", "10-15 in", "A crucial filter-feeding fish that cleans coastal waters."],
  ["Pike (Muskellunge)", "Legendary", "Lakes", "Fish, ducks", "3-4 ft", "The 'fish of 10,000 casts', highly elusive apex lake predator."],
  ["Walleye", "Rare", "Lakes & Rivers", "Fish", "15-30 in", "Features highly reflective eyes allowing it to hunt in low light."],
  ["Sauger", "Common", "Rivers", "Fish", "10-18 in", "A smaller relative of the walleye adapted to muddy waters."],
  ["Bluefish", "Common", "Coastal Oceans", "Smaller fish", "20-30 in", "A very aggressive schooling fish known to enter feeding frenzies."],
  ["Cobia", "Rare", "Reefs", "Crabs, fish", "3-5 ft", "A strong sport fish often found swimming along with manta rays."],
  ["Snook (Pacific)", "Rare", "Estuaries", "Fish", "20-40 in", "Pacific cousin of the Atlantic Snook, similar ambush hunter."],
  ["Barramundi", "Legendary", "Indo-Pacific", "Fish, crustaceans", "2-4 ft", "An iconic Australian sport fish known for spectacular jumps."],
  ["Nile Perch", "Legendary", "African Lakes", "Fish", "3-6 ft", "A massive introduced predator that devastated Lake Victoria."],
  ["Goliath Tigerfish", "Legendary", "Congo River", "Fish", "4-5 ft", "A terrifyingly toothed monster considered the ultimate river challenge."],
  ["Tigerfish", "Rare", "African Rivers", "Fish", "1-2 ft", "Smaller relative of the Goliath, still sporting razor-sharp teeth."],
  ["Payara", "Legendary", "Amazon Rivers", "Piranhas", "1-3 ft", "The 'Vampire Fish', featuring two massive fangs in its lower jaw."],
  ["Pacu", "Common", "Amazon Basin", "Nuts, fruit", "1-2 ft", "A relative of the piranha with bizarre human-like teeth for crushing seeds."],
  ["Redtail Catfish", "Rare", "Amazon Basin", "Fish, crabs", "3-4 ft", "A highly colorful giant catfish popular in massive aquariums."],
  ["Tiger Shovelnose", "Rare", "Amazon Basin", "Fish", "2-3 ft", "A sleek, striped catfish with a completely flattened snout."],
  ["Goonch Catfish", "Legendary", "Asian Rivers", "Fish, anything", "4-6 ft", "A legendary giant catfish rumored to grow to man-eating sizes."],
  ["Wels Catfish", "Legendary", "European Rivers", "Fish, birds", "5-9 ft", "A massive, slimy river monster known to ambush pigeons on shores."],
  ["Flathead Catfish", "Rare", "US Rivers", "Fish", "2-4 ft", "A huge, solitary predator catfish that strictly prefers live prey."],
  ["Blue Catfish", "Rare", "US Rivers", "Fish, mussels", "2-5 ft", "The largest species of North American catfish."],
  ["Basa", "Common", "Mekong River", "Plants, fish", "2-3 ft", "A widely cultivated catfish supporting huge global aquaculture."],
  ["Burbot", "Rare", "Cold Lakes", "Fish", "1-2 ft", "A bizarre freshwater cod that wraps around angler's arms."],
  ["Cod (Atlantic)", "Common", "Cold Oceans", "Fish, squid", "2-4 ft", "One of the most historically important food fishes in the world."],
  ["Haddock", "Common", "Cold Oceans", "Invertebrates", "1-2 ft", "A popular food fish characterized by a dark lateral line."],
  ["Pollock", "Common", "Cold Oceans", "Fish, krill", "1-3 ft", "A schooling cod-like fish heavily used in commercial fish sticks."],
  ["Mahi Mahi (Cow)", "Common", "Open Ocean", "Flying fish", "20-30 in", "The female dolphinfish, featuring a smoothly rounded forehead."],
  ["Amberjack", "Rare", "Reefs", "Fish, squid", "3-5 ft", "A tremendously strong fighting fish known as 'reef donkeys'."],
  ["Jack Crevalle", "Common", "Coastal", "Fish", "2-3 ft", "A severely underrated sport fish that hits incredibly hard."],
  ["Pompano", "Common", "Surf Zones", "Crabs, sand fleas", "10-15 in", "A flat, silvery fish highly prized for fine dining."],
  ["Permit", "Legendary", "Flats", "Crabs", "2-3 ft", "The 'Holy Grail' of flats fishing, incredibly frustrating to catch."],
  ["Snook", "Rare", "Mangroves", "Fish, shrimp", "20-40 in", "Line-breaking ambush predator."],
  ["Red Drum", "Rare", "Saltmarshes", "Crabs, fish", "20-40 in", "Popular for 'tailing' in shallow grass where sight fishing is done."],
  ["Black Drum", "Common", "Coastal", "Oysters, crabs", "20-40 in", "Often identified by its loud drumming sound and chin barbels."],
  ["Spotted Seatrout", "Common", "Grass Flats", "Shrimp, fish", "15-25 in", "Featuring beautiful specks and easily torn delicate mouths."],
  ["Weakfish", "Common", "Estuaries", "Shrimp, fish", "12-20 in", "Named for their fragile mouth structure, easily tearing hooks."],
  ["Croaker", "Common", "Coastal", "Benthos", "8-12 in", "Emits a loud croaking sound when pulled out of the water."],
  ["Spot", "Common", "Bays", "Worms", "6-10 in", "Small panfish easily identified by a dark spot behind its gills."],
  ["Sheepshead", "Common", "Piers & Reefs", "Crabs, barnacles", "10-20 in", "The 'convict fish', sporting vertical stripes and bizarre human teeth."],
  ["Porgy", "Common", "Reefs", "Crustaceans", "10-15 in", "A hard fighting, bottom-dwelling panfish of the ocean."],
  ["Black Sea Bass", "Common", "Wrecks", "Fish, crabs", "10-15 in", "A hungry, reliable target over artificial reefs and wrecks."],
  ["Gag Grouper", "Rare", "Reefs", "Fish, octopus", "2-3 ft", "A muscular grouper known for diving straight into holes when hooked."],
  ["Red Grouper", "Rare", "Reefs", "Fish", "20-30 in", "Excavates massive holes in the sand using its mouth to form habitats."],
  ["Nassau Grouper", "Rare", "Coral Reefs", "Fish", "2-3 ft", "A heavily protected, friendly grouper common to Caribbean reefs."],
  ["Triggerfish", "Common", "Reefs", "Urchins", "10-15 in", "Uses a 'trigger' spine to lock itself tightly into reef crevices."],
  ["Parrotfish", "Common", "Coral Reefs", "Algae on coral", "10-20 in", "Poops fine sand after grinding raw coral with its beak-like teeth."],
  ["Wrasse", "Common", "Reefs", "Invertebrates", "6-15 in", "Highly colorful, active swimmers vital to reef ecosystems."],
  ["Humphead Wrasse", "Legendary", "Indo-Pacific", "Shellfish", "4-6 ft", "A massive, friendly reef dweller with a bulging forehead."],
  ["Tuna (Bluefin)", "Legendary", "Cold Oceans", "Fish, squid", "5-9 ft", "The ultimate oceanic prize, massive, warm-blooded, and wildly fast."],
  ["Tuna (Skipjack)", "Common", "Oceans", "Small fish", "2-3 ft", "The most commonly canned tuna species in the world."],
  ["Tuna (Dogtooth)", "Legendary", "Reef Drop-offs", "Fish", "3-5 ft", "An aggressive, toothy monster patrolling deep oceanic walls."],
  ["Spanish Mackerel", "Common", "Coastal Waters", "Small fish", "15-25 in", "A schooling fish adorned with brilliant gold spots."],
  ["Sierra Mackerel", "Common", "Pacific Coasts", "Small fish", "15-25 in", "A sleek predator heavily targeted by light tackle surf casters."],
  ["Bonito", "Common", "Offshore", "Small fish", "15-25 in", "Fast, bloody, and often used as premium bait for marlin."],
  ["Dorado", "Rare", "Offshore", "Flying fish", "2-4 ft", "Also known as Mahi Mahi. Brilliant flash of yellow and green."],
  ["Wahoo", "Rare", "Offshore", "Fish", "4-6 ft", "One of the oceans fastest fish."],
  ["Halibut", "Rare", "Cold Oceans", "Fish", "4-6 ft", "Enormous flatfish."],
  ["Flounder (Summer)", "Common", "Bays", "Fish, crabs", "15-20 in", "Predatory flatfish."],
  ["Sole", "Common", "Ocean Floor", "Worms", "10-15 in", "Excellent table fare flatfish."],
  ["Turbot", "Rare", "Cold Oceans", "Fish", "20-30 in", "Highly prized flatfish."],
  ["Plaice", "Common", "European Coasts", "Mollusks", "15-20 in", "Identifiable by distinctive orange spots across its back."],
  ["Skate", "Common", "Ocean Floor", "Crabs, fish", "2-3 ft", "Diamond-shaped cartilaginous fish related to rays."],
  ["Stingray", "Common", "Coastal Sands", "Bivalves", "2-4 ft", "Uses a serrated venomous barb purely for self-defense."],
  ["Eagle Ray", "Rare", "Tropical Oceans", "Mollusks", "3-6 ft", "A beautifully spotted ray known for breaching the water surface."],
  ["Manta Ray", "Legendary", "Open Ocean", "Plankton", "10-20 ft", "A massive, graceful filter feeder of the deep."],
  ["Sawfish", "Legendary", "Estuaries", "Fish", "10-15 ft", "A critically endangered ray wielding a chainsaw-like rostrum."],
  ["Chimaera", "Rare", "Deep Ocean", "Benthos", "2-3 ft", "Also known as the 'Ghost Shark', ancient relative of sharks/rays."],
  ["Coelacanth", "Legendary", "Deep Caves", "Fish", "4-6 ft", "Living fossil."],
  ["Mola Mola", "Legendary", "Open Ocean", "Jellyfish", "5-10 ft", "The massive Ocean Sunfish."],
  ["Oarfish", "Legendary", "Deep Ocean", "Krill", "15-30 ft", "The longest bony fish alive, source of sea serpent myths."],
  ["Opah", "Rare", "Deep Ocean", "Squid", "3-5 ft", "The fully warm-blooded, massively round 'Moonfish'."],
  ["Lancetfish", "Rare", "Deep Ocean", "Anything", "4-6 ft", "A cannibalistic, deep-sea predator sporting an enormous dorsal sail."]
];

// Append generating the 114 specific fish procedurally into the main database array.
bulkAdditions.forEach((fish, index) => {
  fishDatabase.push({
    id: "f" + (37 + index),
    name: fish[0],
    rarity: fish[1],
    habitat: fish[2],
    diet: fish[3],
    size: fish[4],
    description: fish[5],
    image: `https://loremflickr.com/300/300/fish,underwater?random=${37 + index}`
  });
});

// We will simulate AI unlocking random fish by keeping a local storage array of UNLOCKED ID'S
