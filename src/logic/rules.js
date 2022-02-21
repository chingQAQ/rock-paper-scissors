export const MEMBERS = [
    { id: 0, name: 'scissors', beats: ['paper', 'lizard']},
    { id: 0, name: 'paper', beats: ['rock', 'spock']},
    { id: 0, name: 'rock', beats: ['paper', 'scissors']},
    { id: 0, name: 'lizard', beats: ['spock', 'paper']},
    { id: 0, name: 'spock', beats: ['scissors', 'rock']}
];

export const compareTwoMember = (member1, member2) => member1 === member2;

export const battle = (player, computer) => {

    const isPlayerWin =
        player.beats.some(i => compareTwoMember(i, computer.name));

    if (isPlayerWin) return player;

    const isComputerWin =
        computer.beats.some(i => compareTwoMember(i, player.name));

    if (isComputerWin) return computer;

    return false;
}
