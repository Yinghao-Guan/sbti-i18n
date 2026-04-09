(function() {
// SBTI — English localization
// Style: Reddit/Tumblr personality quiz. Natural, mildly chaotic, emotionally aware.
// Transcreation, not translation.

const dimensionMeta = {
  S1:  { name: 'S1 Self-Esteem',        model: 'Self Model' },
  S2:  { name: 'S2 Self-Clarity',       model: 'Self Model' },
  S3:  { name: 'S3 Core Values',        model: 'Self Model' },
  E1:  { name: 'E1 Attachment Security',model: 'Emotional Model' },
  E2:  { name: 'E2 Emotional Investment',model:'Emotional Model' },
  E3:  { name: 'E3 Boundaries & Dependency', model: 'Emotional Model' },
  A1:  { name: 'A1 World Outlook',      model: 'Attitude Model' },
  A2:  { name: 'A2 Rules vs. Flexibility', model: 'Attitude Model' },
  A3:  { name: 'A3 Sense of Meaning',   model: 'Attitude Model' },
  Ac1: { name: 'Ac1 Motivation Drive',  model: 'Action Model' },
  Ac2: { name: 'Ac2 Decision Style',    model: 'Action Model' },
  Ac3: { name: 'Ac3 Execution Mode',    model: 'Action Model' },
  So1: { name: 'So1 Social Initiative', model: 'Social Model' },
  So2: { name: 'So2 Interpersonal Boundaries', model: 'Social Model' },
  So3: { name: 'So3 Expression & Authenticity', model: 'Social Model' }
};

const questions = [
  {
    id: 'q1', dim: 'S1',
    text: `Not gonna lie — I've spent more time imagining a romantic life than actually living one. No relationship, no real direction, just vibing through existence while everyone else seems to have it figured out. Every time someone makes "loser" jokes online, it kind of hits different. Like... yeah, that's me. Can I get at least one W?`,
    options: [
      { label: 'I relate. Hard.', value: 1 },
      { label: 'What even is this.', value: 2 },
      { label: "That's not me at all.", value: 3 }
    ]
  },
  {
    id: 'q2', dim: 'S1',
    text: "I'm not good enough. Everyone around me is just... more.",
    options: [
      { label: 'Lowkey yeah.', value: 1 },
      { label: 'Sometimes.', value: 2 },
      { label: 'Not really.', value: 3 }
    ]
  },
  {
    id: 'q3', dim: 'S2',
    text: 'I have a pretty clear picture of who I actually am.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 }
    ]
  },
  {
    id: 'q4', dim: 'S2',
    text: "There's something I genuinely care about pursuing.",
    options: [
      { label: "Not really.", value: 1 },
      { label: 'Kind of?', value: 2 },
      { label: 'Yeah, for sure.', value: 3 }
    ]
  },
  {
    id: 'q5', dim: 'S3',
    text: 'I need to keep leveling up. Staying still feels wrong.',
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 }
    ]
  },
  {
    id: 'q6', dim: 'S3',
    text: "Other people's opinions about me? Whatever.",
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 }
    ]
  },
  {
    id: 'q7', dim: 'E1',
    text: "Your partner hasn't replied in 5 hours. They say they weren't feeling well. Your gut reaction?",
    options: [
      { label: "Five hours for being sick sounds off. Something's up.", value: 1 },
      { label: "I'm going back and forth on it.", value: 2 },
      { label: 'Could be real. Hope they feel better.', value: 3 }
    ]
  },
  {
    id: 'q8', dim: 'E1',
    text: "I'm always lowkey afraid of being left.",
    options: [
      { label: 'Yeah.', value: 1 },
      { label: 'Sometimes.', value: 2 },
      { label: 'Not really.', value: 3 }
    ]
  },
  {
    id: 'q9', dim: 'E2',
    text: "Hand on heart — I've genuinely meant it every time.",
    options: [
      { label: 'Not really.', value: 1 },
      { label: 'Maybe?', value: 2 },
      { label: 'Yes! (no regrets face)', value: 3 }
    ]
  },
  {
    id: 'q10', dim: 'E2',
    text: 'Your partner is basically perfect. Warm, funny, kind, sharp — and somehow also very good-looking. Like, unreasonably good. What happens to you?',
    options: [
      { label: "I'd still hold back. Depth has limits.", value: 1 },
      { label: 'Somewhere in the middle, I guess.', value: 2 },
      { label: "I'd be fully gone. Full romance mode activated.", value: 3 }
    ]
  },
  {
    id: 'q11', dim: 'E3',
    text: 'Your partner turns out to be very clingy. Your reaction?',
    options: [
      { label: 'Honestly? Kind of love it.', value: 1 },
      { label: 'Depends on the day.', value: 2 },
      { label: 'I need my own space, sorry.', value: 3 }
    ]
  },
  {
    id: 'q12', dim: 'E3',
    text: 'Personal space matters to me, no matter who it is.',
    options: [
      { label: "I'd rather be close and interdependent.", value: 1 },
      { label: 'Depends.', value: 2 },
      { label: 'Yes. Non-negotiable.', value: 3 }
    ]
  },
  {
    id: 'q13', dim: 'A1',
    text: 'Most people are genuinely decent.',
    options: [
      { label: "Lol no. The world is full of people who'd step on you.", value: 1 },
      { label: 'Maybe. Hard to say.', value: 2 },
      { label: "Yeah, I'd like to believe that.", value: 3 }
    ]
  },
  {
    id: 'q14', dim: 'A1',
    text: 'A little kid walks up to you on the street and hands you a lollipop. Out of nowhere. Just because.',
    options: [
      { label: "Aww! That's the sweetest thing ever!", value: 3 },
      { label: 'Uh... what just happened?', value: 2 },
      { label: 'Sounds suspicious. I should probably walk away.', value: 1 }
    ]
  },
  {
    id: 'q15', dim: 'A2',
    text: "Midterms are coming. You're technically supposed to be studying tonight, but your crush wants to play games online with you. What do you do?",
    options: [
      { label: "Screw it. Once can't hurt.", value: 1 },
      { label: 'Make an excuse and just go.', value: 2 },
      { label: "It's midterms. There'll be other nights.", value: 3 }
    ]
  },
  {
    id: 'q16', dim: 'A2',
    text: 'I like bending rules. Constraints feel suffocating.',
    options: [
      { label: 'Agree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Disagree.', value: 3 }
    ]
  },
  {
    id: 'q17', dim: 'A3',
    text: "I usually know what I'm working toward.",
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 }
    ]
  },
  {
    id: 'q18', dim: 'A3',
    text: "One day it just hits you — life doesn't have some deep meaning. We eat when hungry, sleep when tired, follow our impulses just like any other animal. We're really not that different.",
    options: [
      { label: "Yeah. That's kind of it, isn't it.", value: 1 },
      { label: 'Maybe, maybe not.', value: 2 },
      { label: "That's a pretty bleak take.", value: 3 }
    ]
  },
  {
    id: 'q19', dim: 'Ac1',
    text: "I'm more motivated by growth than by avoiding failure.",
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 }
    ]
  },
  {
    id: 'q20', dim: 'Ac1',
    text: "You've hit a wall on something. Completely stuck. Thirty minutes in with nothing to show. What do you do?",
    options: [
      { label: 'Wait it out. Something might click.', value: 1 },
      { label: 'Get frustrated and try to force it anyway.', value: 2 },
      { label: 'Find a workaround. Just get it done.', value: 3 }
    ]
  },
  {
    id: 'q21', dim: 'Ac2',
    text: "I make up my mind pretty quickly. I hate going back and forth.",
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 }
    ]
  },
  {
    id: 'q22', dim: 'Ac2',
    text: 'This question has no context. Just pick one.',
    options: [
      { label: 'After overthinking... probably A?', value: 1 },
      { label: 'Uh... B?', value: 2 },
      { label: 'No idea, C.', value: 3 }
    ]
  },
  {
    id: 'q23', dim: 'Ac3',
    text: `Someone tells you you're "really good at following through." Which feels truest?`,
    options: [
      { label: 'Pressure is my only real motivator, honestly.', value: 1 },
      { label: 'Sometimes? I guess?', value: 2 },
      { label: 'Yeah. Things should get done.', value: 3 }
    ]
  },
  {
    id: 'q24', dim: 'Ac3',
    text: 'I usually have a plan, ____',
    options: [
      { label: '...which the universe ignores.', value: 1 },
      { label: '...and I follow it maybe half the time.', value: 2 },
      { label: "...and I hate when it gets disrupted.", value: 3 }
    ]
  },
  {
    id: 'q25', dim: 'So1',
    text: "You've made some close online friends through a game. They want to meet up in person. Your first thought?",
    options: [
      { label: 'Online is fine. Meeting IRL feels a bit different.', value: 1 },
      { label: "Sure, why not. I'll see how it goes.", value: 2 },
      { label: "I'm actually excited. What if this becomes something?", value: 3 }
    ]
  },
  {
    id: 'q26', dim: 'So1',
    text: "Your friend brings someone you don't know to hang out. Your vibe?",
    options: [
      { label: 'A little awkward, honestly. I need time to warm up.', value: 1 },
      { label: "Fine if they're cool. I'll adjust.", value: 2 },
      { label: "More the merrier! Let's talk.", value: 3 }
    ]
  },
  {
    id: 'q27', dim: 'So2',
    text: 'I have an invisible boundary around me. Get too close and it goes off.',
    options: [
      { label: 'Agree.', value: 3 },
      { label: 'Neutral.', value: 2 },
      { label: 'Disagree.', value: 1 }
    ]
  },
  {
    id: 'q28', dim: 'So2',
    text: 'With people I trust, I want to be genuinely close. Like family.',
    options: [
      { label: 'Agree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Disagree.', value: 3 }
    ]
  },
  {
    id: 'q29', dim: 'So3',
    text: "You disagree with something but don't say it. What's usually behind that?",
    options: [
      { label: "That rarely happens. I usually speak up.", value: 1 },
      { label: "Don't want to mess up the vibe or the relationship.", value: 2 },
      { label: "I don't want people to see the darker side of me.", value: 3 }
    ]
  },
  {
    id: 'q30', dim: 'So3',
    text: "I'm a different version of myself depending on who I'm with.",
    options: [
      { label: 'Disagree.', value: 1 },
      { label: 'Neutral.', value: 2 },
      { label: 'Agree.', value: 3 }
    ]
  }
];

const specialQuestions = [
  {
    id: 'drink_gate_q1',
    special: true,
    kind: 'drink_gate',
    text: 'What do you do in your free time?',
    options: [
      { label: 'Eating, sleeping, the basics.', value: 1 },
      { label: 'Art stuff.', value: 2 },
      { label: 'Drinking.', value: 3 },
      { label: 'Working out.', value: 4 }
    ]
  },
  {
    id: 'drink_gate_q2',
    special: true,
    kind: 'drink_trigger',
    text: 'How do you feel about drinking?',
    options: [
      { label: "It's fine in moderation. I know my limits.", value: 1 },
      { label: 'Alcohol is my emotional support liquid. I keep it close at all times.', value: 2 }
    ]
  }
];

const TYPE_LIBRARY = {
  "CTRL": {
    "code": "CTRL",
    "cn": "The Handler",
    "intro": "Surprised I had it all under control? You're welcome.",
    "desc": "Congrats — you've landed one of the rarest personality types in existence. You're a walking task manager in human form. While others call things 'rules,' you see them as default settings waiting to be optimized. While others make 'plans,' you sketch rough drafts to refine in real time. Having a CTRL friend means your life finally has a reliable save point. They'll hit Ctrl+S before you crash, drag you back on track before you spiral, and somehow make it look effortless. They're the last backup drive in a chaotic universe — the only restart button still blinking."
  },
  "ATM-er": {
    "code": "ATM-er",
    "cn": "The Giver",
    "intro": "You think I have unlimited capacity? Lol.",
    "desc": "Congrats — you've got one of the rarest types. ATM-er doesn't necessarily mean money. It means you're always paying. Time, energy, patience, the quiet evenings you never get back. Like a worn-but-reliable ATM: people insert their problems, you dispense 'it's fine, I've got this.' Your life is one long, unacknowledged tab. You carry impossible reliability through impossible asks, and only at 2am do you finally let out a sigh — looking at the mental bill. That exhausting, nowhere-to-put-it sense of responsibility."
  },
  "Dior-s": {
    "code": "Dior-s",
    "cn": "The Realist",
    "intro": "Watch me glow up from the bottom.",
    "desc": "You're not a loser — you're the spiritual heir of Diogenes, the original cynical philosopher. (Dior-s: Diogenes' Original Idealist Realist - sage.) This personality is the most thorough rejection of hustle culture and self-improvement grift in existence. It's not 'no ambition' — it's having already seen that every ladder just leads to a fancier cage. While others chase trends and get swallowed by the current, Dior-s is chilling in their metaphorical barrel, having achieved total peace. Their creed: lying down beats standing up, and you should eat when it's time to eat."
  },
  "BOSS": {
    "code": "BOSS",
    "cn": "The Driver",
    "intro": "Hand me the wheel. I've got this.",
    "desc": "BOSS always has their hands on the wheel. Even when the tank is empty and the GPS is lying, you'll just say, calmly: I got it. And then you'll actually get there. This type operates under its own law of physics — the perpetual upward drive. A BOSS sees the world the way a seasoned player looks at a tutorial level. Efficiency is their religion. Order is how they breathe. They don't 'have leadership energy' — they ARE the energy. Within a five-meter radius, the air shifts toward focused and productive. Their version of 'self-improvement' looks like everyone else's version of extreme suffering."
  },
  "THAN-K": {
    "code": "THAN-K",
    "cn": "The Grateful",
    "intro": "I'm grateful for EVERYTHING. Seriously.",
    "desc": "Congrats — you're one of the rarest types. You should be grateful you took this quiz! Stuck in traffic? THAN-K says: I'm grateful for this extra time with this song, and for the chance to observe everyone else's stress up close. These people have warmth and oceanic generosity. In their world, there are no bad people — just friends who haven't been reached by the light of gratitude yet. Having a THAN-K friend is like having a positivity tower on standby that never runs out of signal. They'll find a masterpiece in the water stain on your bathroom ceiling."
  },
  "OH-NO": {
    "code": "OH-NO",
    "cn": "The Anxious",
    "intro": "OH NO. How is THIS my type?!",
    "desc": "'Oh no' isn't fear — it's top-tier pattern recognition. Where others see a cup near the edge of a table, OH-NO sees a cascade: water spill → short circuit → fire → evacuation → economic loss → butterfly effect → the end of days. So, with a soul-deep 'Oh no,' they'll move the cup to the exact center of the table and add a coaster. OH-NO has near-obsessive respect for boundaries: yours is yours, mine is mine. Every risk gets neutralized before it can bloom. They are the last emotionally composed humans standing in a world that refuses to stop being chaotic."
  },
  "GOGO": {
    "code": "GOGO",
    "cn": "The Doer",
    "intro": "Let's GO — we're moving.",
    "desc": "Research suggests GOGO's brain is fundamentally different from everyone else's. GOGO lives in a pure 'what you see is what you get' world. Their philosophy is almost aggressively simple: if I close my eyes, it's dark; if I spend all my money, I'm broke; if I'm on the crosswalk, I'm a pedestrian. Perfect logic, zero gaps. While others debate the chicken and egg, GOGO has already turned both into dinner. They don't 'solve problems' — they clear a to-do list. In their world, there are two states: done, and about to be done by me."
  },
  "SEXY": {
    "code": "SEXY",
    "cn": "The Vibe",
    "intro": "Born like this. Sorry not sorry.",
    "desc": "When you walk into a room, the lighting instinctively softens. When you smile, you become a smiling vibe, and the humidity drops because the water vapor has all condensed into hearts in people's eyes. Everyone tends to pay you an unreasonable amount of attention. Legend says if enough SEXY types gather at a party, the combined charisma energy is enough to temporarily warp spacetime — attendees report feeling like time slowed down. They don't need to try. Sometimes just existing is already a little too much."
  },
  "LOVE-R": {
    "code": "LOVE-R",
    "cn": "The Romantic",
    "intro": "Feelings are so full. Reality can't keep up.",
    "desc": "LOVE-R is like a rare creature from an ancient myth that somehow survived to the present. The odds of encountering this type are impossibly low. You're the last traveling poet of this concrete era. Your emotional processor isn't binary — it's full spectrum. A falling leaf, to others, just means autumn. To LOVE-R, it's a thirteen-act drama about cycles, sacrifice, and love too quiet to name. Inside you is a theme park that never closes, and you're spending your life looking for someone who can read the map and ride the merry-go-round with you until the end of everything."
  },
  "MUM": {
    "code": "MUM",
    "cn": "The Caretaker",
    "intro": "Can I... call you mom? (...kind of joking)",
    "desc": "Congrats — you've gotten the rarest of the rare. Before time had a name, before the first star lit up, there was already the MUM energy. Gentle, emotionally perceptive, with a near-supernatural ability to sense what others need — and when to stop pushing. They're the emotional first responder in every room, fixing everyone else's moods. The sad part? When MUM finally hurts, the dose of care they give themselves is always a little smaller than what they give everyone else."
  },
  "FAKE": {
    "code": "FAKE",
    "cn": "The Shapeshifter",
    "intro": "Human? Not really anymore.",
    "desc": "SCP Foundation Emergency Report: Object Class — FAKE. In social settings, FAKE is effortlessly charming because they switch social masks faster than most people switch apps. One second: best friend mode, totally open, completely real. Next second: manager walks in — instant switch to composed-professional mode, expression recalibrated. You think you've made a genuine connection? Wake up. You've just met a highly functional social chameleon. Late at night, when FAKE peels back the masks one by one, they find — surprise — the masks are the whole thing."
  },
  "OJBK": {
    "code": "OJBK",
    "cn": "MEH",
    "intro": "When I say 'whatever,' I genuinely mean it.",
    "desc": "Let's face it: MEH is not just a personality type. It's a governing philosophy. When mere mortals agonize over rice vs. noodles for lunch, burning mental calories on that impossible dilemma — MEH just says: either's fine. This isn't indecisiveness. This is a statement: your choices are beneath the level of my concern. Why argue? Debating a paramecium about the future of the universe is pointless. Why care? Emperors don't track which direction the dust blows. Whatever, dude."
  },
  "MALO": {
    "code": "MALO",
    "cn": "CHAOS",
    "intro": "Life's a dungeon and I'm just a chaotic NPC.",
    "desc": "Friend, you didn't fail to grow up — you never left the starting branch. Your soul is still swinging from trees, lighting up at the sight of something fun. When humanity's ancestors climbed down from the trees, put on suits, and invented corporate culture, the CHAOS ancestor stayed up there, scratched their head, and made a sound of absolute contempt. They already understood: 'civilization' is just the world's most unfun pay-to-play game. Rules are there to be questioned, ceilings are for hanging upside down from, and the conference room is a parkour course. CHAOS isn't a personality — it's an escape hatch from the mundane."
  },
  "JOKE-R": {
    "code": "JOKE-R",
    "cn": "The Jester",
    "intro": "Turns out we're all jesters in the end.",
    "desc": "JOKE-R is not a person — they're a joke wearing a person as a costume. Peel back one layer: another joke. Keep going: more jokes. All the way down to the center, and you find — nothing, just a faint echo saying: ha, bet you didn't see that coming. JOKE-R is the designated vibe officer of every social setting. With them around, the energy doesn't die. Everyone's laughing, doubled over — and the one laughing loudest is JOKE-R themselves. Using the biggest laugh to cover the sound of something cracking underneath."
  },
  "WOC!": {
    "code": "WOC!",
    "cn": "The Reactor",
    "intro": "Wait, WTF — this is my type??",
    "desc": "We've identified a fascinating creature: The Reactor. They run two completely separate operating systems. System 1 — 'Surface': outputs 'wait what,' 'actually wild,' 'no way,' and similar dramatic responses. System 2 — 'Backend': quietly thinking: yeah, saw that coming. The Reactor will react, but won't meddle — because they've learned that explaining logic to someone who won't hear it is like trying to polish wet cement. It just makes a mess. So they deliver a heartfelt 'WTF' and move on, offering the highest tribute a chaotic world can receive."
  },
  "THIN-K": {
    "code": "THIN-K",
    "cn": "The Analyst",
    "intro": "Currently deep thinking... (processing...)",
    "desc": "Research suggests THIN-K's brain structure is fundamentally different from everyone else's. Exactly as the name implies: your brain is in near-permanent analysis mode. You evaluate sources, check logical consistency, flag potential bias, and would cite a 'complete intellectual lineage background check' if you could. In this era of information overload, you don't follow easily. You weigh every relationship. You protect your mental space. When someone sees you staring blankly into space? Not zoning out. That's active archiving, sorting, and deletion of everything that came in today."
  },
  "SHIT": {
    "code": "SHIT",
    "cn": "GRIT",
    "intro": "This world is a whole mess.",
    "desc": "Congrats — GRIT is the only known paradox personality in the universe. Mouth: 'This project is a disaster.' Hands: *quietly opens spreadsheet, starts building a Gantt chart.* Mouth: 'These coworkers are impossible.' Hands: *after they mess up, pulls an all-nighter to clean it up.* Mouth: 'This world is a mess, let it end.' Hands: *up at 7am, squeezes onto the crowded train, shows up to the job anyway.* Don't be scared — that's not a doomsday alarm. That's the charge-up sound before they go save the world again."
  },
  "ZZZZ": {
    "code": "ZZZZ",
    "cn": "The Ghost",
    "intro": "I'm not dead. Just... not available.",
    "desc": "Congrats — you've tested into the rarest low-presence type. You can watch 99+ unread notifications pile up and feel absolutely nothing. But the moment someone @ everyone with '30 minutes to deadline' — you rise from the digital void, slowly type 'seen,' and submit something passable with 29 minutes to spare. This type only truly activates when the deadline — the one and only ultimate authority — has spoken. And when it does, they go off. The lesson: sometimes doing nothing means not doing it wrong."
  },
  "POOR": {
    "code": "POOR",
    "cn": "The Focused",
    "intro": "Broke in everything except the one thing that matters.",
    "desc": "Congrats — you've tested into The Focused. This 'poor' isn't about your bank account. It's a radical decluttering of desire. While others scatter their energy like confetti, you compress yours into a laser — aimed at the one thing that matters. Then it starts smoking. The Focused world is simple: noise gets muted, the important thing gets everything. Social stuff, shallow networking, keeping up appearances? No time. You're not resource-poor. You've poured everything into one shaft. Looks sparse from the outside. Looks like a mine from the inside. Once you've locked onto something worth digging — external chaos is just background noise."
  },
  "MONK": {
    "code": "MONK",
    "cn": "DETACH",
    "intro": "No interest in any of that worldly stuff.",
    "desc": "While others are out processing the complexities of love and belonging, DETACH is home, at peace. DETACH has seen through the noise. They don't want it disturbed, their space broken into. Their personal space is sacred territory — an absolute domain. Step into it uninvited and feel an existential chill from somewhere deep. DETACH doesn't cling or tangle — in their worldview, everything has its own independent orbit. Planets keep billions of miles between them and the universe stays balanced. Why can't people do the same?"
  },
  "IMSB": {
    "code": "IMSB",
    "cn": "The Overthinker",
    "intro": "Wait... am I really just an overthinker??",
    "desc": "Congrats — you're technically outside the human range of normal. You've tested into the once-in-a-million IMSB type. Inside IMSB's brain live two warriors locked in eternal combat. One screams: GO! Text them! Ask them out! Say it out loud! The other replies: Why would they even look at you? You'd just embarrass yourself. Final result: stares at their back until they disappear, then googles 'how to be less anxious around people.' IMSB isn't actually clueless — it's just that your internal narrative might be longer than every Marvel movie combined."
  },
  "SOLO": {
    "code": "SOLO",
    "cn": "The Loner",
    "intro": "Wait... how am I a loner? I'm crying.",
    "desc": "Congrats — you've tested into one of the rarest types: The Loner. Don't rush to cry. A coronation is usually a solo ceremony. SOLO tends to have a lower baseline sense of self-worth — which sometimes means pulling away before someone else can. They've built a wall around their soul that says, in so many words: 'don't come too close.' Each brick is an old wound. SOLO is like a hedgehog with every soft part hidden away, every spike pointed outward. Those spikes aren't attacks — they're all the unsaid words: 'stay back, I don't want you to get hurt' and 'please, don't leave.'"
  },
  "FUCK": {
    "code": "FUCK",
    "cn": "REBEL",
    "intro": "WHAT — this is my type?",
    "desc": "Congrats — you're technically not in the human category. You've tested into the once-in-a-million REBEL type. In a world of neatly domesticated creatures, REBEL is the unkillable wildflower growing through the pavement crack. In REBEL's worldview, social conventions are suggestions at best. Their emotional dial has two settings: HELL YES and HARD NO. They're not just chasing immediate pleasure — they're chasing something alive, untamed, running through the veins like something that can't be contained. When everyone else has been tamed and domesticated, REBEL is still howling."
  },
  "DEAD": {
    "code": "DEAD",
    "cn": "The Burnout",
    "intro": "Am I... still here?",
    "desc": "Congrats — you've hit one of the rarest types. Just so you know, DEAD can also stand for: Don't Expect Any Drives. This type has looked at all the philosophical anguish and decided: not worth it. They've gone quiet on everything. They look at the world the way a maxed-out player looks at the main menu after finishing every questline, every side quest, every hidden achievement — 999 times — and finally realizes: this game just isn't that interesting. DEAD is the ultimate sage who has transcended desire and ambition. Their existence is the most silent, most complete protest against a world that won't stop yelling."
  },
  "IMFW": {
    "code": "IMFW",
    "cn": "SOFT",
    "intro": "Wait... am I really...?",
    "desc": "Congrats — you haven't tested into an ordinary personality. You're one of the rarest, a vanishingly small fraction of humanity — SOFT. SOFT types tend to be a little fragile in their self-esteem, a little uncertain, sometimes unsure of direction. But this also means they can sense the strongest signal in any room — the person they trust most. Walking into SOFT's world is like entering a specialized greenhouse: the temperature, the humidity, and daily doses of genuine affirmation all need to be just right. Give a SOFT person one kind thing, and they'll give you back a completely open, bright-eyed trust. You're not broken — you're just unguarded. And that's actually kind of rare."
  },
  "HHHH": {
    "code": "HHHH",
    "cn": "The Anomaly",
    "intro": "Ha. Ha. Ha. Ha.",
    "desc": "Congrats — your thought process is so unique that the standard personality library has fully crashed. This type only triggers when your best match falls below 60% similarity — at that point the system gives up and assigns you THE ANOMALY. What are the defining traits? Ha ha ha ha ha ha ha. Sorry, that's genuinely all there is. You can check your fifteen dimension scores for a rough, non-professional self-assessment. The author did not account for a brain like yours. Ha ha ha... and now I'm actually a little sad. How does someone's mind work like this."
  },
  "DRUNK": {
    "code": "DRUNK",
    "cn": "The Drinker",
    "intro": "The burn hits right. What can you do.",
    "desc": "Why do you walk a little sideways? Why are you always in a great mood? Why is everything slightly blurry right now? Because what runs through your veins isn't blood — it's your favorite drink, beloved and burning. You've made alcohol your emotional support liquid and built your whole vibe around it. One drink in: you're the funniest person at the table. A few more in: you're having a very personal conversation with the bathroom floor. You believe you're a nighttime poet, the undying flame at the center of the universe. Next morning at 10am, head splitting like a dropped phone, a quiet moment of clarity: last night's version of you has officially graduated into The Drinker."
  }
};

const TYPE_IMAGES = {
  "IMSB": "./image/IMSB.png",
  "BOSS": "./image/BOSS.png",
  "MUM": "./image/MUM.png",
  "FAKE": "./image/FAKE.png",
  "Dior-s": "./image/Dior-s.jpg",
  "DEAD": "./image/DEAD.png",
  "ZZZZ": "./image/ZZZZ.png",
  "GOGO": "./image/GOGO.png",
  "FUCK": "./image/FUCK.png",
  "CTRL": "./image/CTRL.png",
  "HHHH": "./image/HHHH.png",
  "SEXY": "./image/SEXY.png",
  "OJBK": "./image/OJBK.png",
  "JOKE-R": "./image/JOKE-R.jpg",
  "POOR": "./image/POOR.png",
  "OH-NO": "./image/OH-NO.png",
  "MONK": "./image/MONK.png",
  "SHIT": "./image/SHIT.png",
  "THAN-K": "./image/THAN-K.png",
  "MALO": "./image/MALO.png",
  "ATM-er": "./image/ATM-er.png",
  "THIN-K": "./image/THIN-K.png",
  "SOLO": "./image/SOLO.png",
  "LOVE-R": "./image/LOVE-R.png",
  "WOC!": "./image/WOC.png",
  "DRUNK": "./image/DRUNK.png",
  "IMFW": "./image/IMFW.png"
};

const NORMAL_TYPES = [
  { "code": "CTRL",   "pattern": "HHH-HMH-MHH-HHH-MHM" },
  { "code": "ATM-er", "pattern": "HHH-HHM-HHH-HMH-MHL" },
  { "code": "Dior-s", "pattern": "MHM-MMH-MHM-HMH-LHL" },
  { "code": "BOSS",   "pattern": "HHH-HMH-MMH-HHH-LHL" },
  { "code": "THAN-K", "pattern": "MHM-HMM-HHM-MMH-MHL" },
  { "code": "OH-NO",  "pattern": "HHL-LMH-LHH-HHM-LHL" },
  { "code": "GOGO",   "pattern": "HHM-HMH-MMH-HHH-MHM" },
  { "code": "SEXY",   "pattern": "HMH-HHL-HMM-HMM-HLH" },
  { "code": "LOVE-R", "pattern": "MLH-LHL-HLH-MLM-MLH" },
  { "code": "MUM",    "pattern": "MMH-MHL-HMM-LMM-HLL" },
  { "code": "FAKE",   "pattern": "HLM-MML-MLM-MLM-HLH" },
  { "code": "OJBK",   "pattern": "MMH-MMM-HML-LMM-MML" },
  { "code": "MALO",   "pattern": "MLH-MHM-MLH-MLH-LMH" },
  { "code": "JOKE-R", "pattern": "LLH-LHL-LML-LLL-MLM" },
  { "code": "WOC!",   "pattern": "HHL-HMH-MMH-HHM-LHH" },
  { "code": "THIN-K", "pattern": "HHL-HMH-MLH-MHM-LHH" },
  { "code": "SHIT",   "pattern": "HHL-HLH-LMM-HHM-LHH" },
  { "code": "ZZZZ",   "pattern": "MHL-MLH-LML-MML-LHM" },
  { "code": "POOR",   "pattern": "HHL-MLH-LMH-HHH-LHL" },
  { "code": "MONK",   "pattern": "HHL-LLH-LLM-MML-LHM" },
  { "code": "IMSB",   "pattern": "LLM-LMM-LLL-LLL-MLM" },
  { "code": "SOLO",   "pattern": "LML-LLH-LHL-LML-LHM" },
  { "code": "FUCK",   "pattern": "MLL-LHL-LLM-MLL-HLH" },
  { "code": "DEAD",   "pattern": "LLL-LLM-LML-LLL-LHM" },
  { "code": "IMFW",   "pattern": "LLH-LHL-LML-LLL-MLL" }
];

const DIM_EXPLANATIONS = {
  "S1": {
    "L": "You're harder on yourself than anyone else is. A compliment? First instinct is to fact-check it.",
    "M": "Your confidence fluctuates with the wind. Tailwinds help, headwinds hurt.",
    "H": "You have a rough sense of your own worth. A stranger's comment won't knock it over."
  },
  "S2": {
    "L": "A lot of static on the internal channel. 'Who am I' is basically buffering constantly.",
    "M": "You mostly recognize yourself — until emotions temporarily log you out.",
    "H": "You know your triggers, your wants, your limits. Reasonably well-mapped."
  },
  "S3": {
    "L": "Comfort and safety come first. No need to sprint every day.",
    "M": "Part of you wants to level up. Part of you wants to lie down. The committee is still meeting.",
    "H": "Goals, growth, or some core belief tends to push you forward."
  },
  "E1": {
    "L": "Your relationship alarm is extremely sensitive. Left on read = full worst-case storyline loading.",
    "M": "Half trust, half suspicion — your heart is constantly negotiating.",
    "H": "You're willing to trust the relationship itself. A little turbulence won't wreck it."
  },
  "E2": {
    "L": "Emotionally controlled. The door isn't locked — just heavily monitored.",
    "M": "You'll invest, but you keep a backup plan. Not going all in.",
    "H": "Once you decide someone's worth it, you go there fully. No holding back."
  },
  "E3": {
    "L": "Closeness and being needed matter a lot. Warmth is the point.",
    "M": "You want some intimacy and some space. Adjustable dependency.",
    "H": "Space is non-negotiable. Even love doesn't get to take all of it."
  },
  "A1": {
    "L": "You approach the world with a defensive lens. Skepticism first, openness later.",
    "M": "Not naive, not paranoid. Observation is your default.",
    "H": "You lean toward trusting people and assuming good faith."
  },
  "A2": {
    "L": "Rules are optional guidelines. Freedom and comfort usually win.",
    "M": "You follow the rules when it makes sense, and bend them when it doesn't.",
    "H": "Structure feels right. Doing things by the book is genuinely preferred."
  },
  "A3": {
    "L": "Low sense of meaning. A lot of things feel like going through the motions.",
    "M": "Sometimes motivated, sometimes in full chill mode. Half-booted life philosophy.",
    "H": "You have a direction. You roughly know where you're going."
  },
  "Ac1": {
    "L": "You focus on not messing up first. Risk avoidance leads, ambition follows.",
    "M": "Sometimes you want to win. Sometimes you just want to not deal with it. Mixed motivation.",
    "H": "Outcomes, growth, and momentum tend to light you up."
  },
  "Ac2": {
    "L": "Decisions require a few extra laps. Your brain committee runs overtime.",
    "M": "You think it through without freezing up. Normal amounts of hesitation.",
    "H": "Once you decide, you move. No second-guessing allowed."
  },
  "Ac3": {
    "L": "You and deadlines have a deep, meaningful relationship. The later it gets, the more alive you feel.",
    "M": "You can execute — when the timing and mood align.",
    "H": "You don't feel okay until things are actually done. Unfinished tasks are physically itchy."
  },
  "So1": {
    "L": "Warming up to new people takes effort. Initiating is a whole thing.",
    "M": "You'll engage if someone comes to you. Won't force it otherwise.",
    "H": "You're comfortable being the one to kick things off. Crowds don't intimidate."
  },
  "So2": {
    "L": "You want to be close, to merge a little. Real intimacy feels important.",
    "M": "Closeness and space, depending on the person. Adjustable.",
    "H": "Strong sense of personal boundary. Getting too close triggers an instinctive step back."
  },
  "So3": {
    "L": "Pretty direct. What's inside usually comes out.",
    "M": "You read the room and calibrate — a mix of honesty and social tact.",
    "H": "You're skilled at showing different versions of yourself to different people. Authenticity comes in layers."
  }
};

const dimensionOrder = ['S1','S2','S3','E1','E2','E3','A1','A2','A3','Ac1','Ac2','Ac3','So1','So2','So3'];

const DRUNK_TRIGGER_QUESTION_ID = 'drink_gate_q2';

  window.QUIZ_LANGS = window.QUIZ_LANGS || {};
  window.QUIZ_LANGS['en'] = { dimensionMeta, questions, specialQuestions, TYPE_LIBRARY, TYPE_IMAGES, NORMAL_TYPES, DIM_EXPLANATIONS, dimensionOrder, DRUNK_TRIGGER_QUESTION_ID };
})();
