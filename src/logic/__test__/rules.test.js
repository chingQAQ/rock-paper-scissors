import { MEMBERS, battle, compareTwoMember } from '../rules';

describe('compareTwoMember function', () => {

    test('function can return true at same name?', () => {
        
        const player = MEMBERS[0];

        const twoMember = compareTwoMember(player.name, player.name);

        expect(twoMember).toBe(true);
    });

    test('function can return true at different name?', () => {

        const member1 = MEMBERS[0];

        const member2 = MEMBERS[1];

        const twoMember = compareTwoMember(member1.name, member2.name);

        expect(twoMember).toBe(false);
    });

})

describe('battle function', () => {

    describe('is scissors can beats other ?', () => {

        test('Fighting paper! scissors should win.', () => {

            const scissors = MEMBERS[0];

            const paper = MEMBERS[1];

            const battleResult = battle(scissors, paper);

            expect(battleResult).toBe(scissors);
        });

        test('Fighting rock! scissors should lose.', () => {

            const scissors = MEMBERS[0];

            const rock = MEMBERS[2];

            const battleResult = battle(scissors, rock);

            expect(battleResult).toBe(rock);
        });

        test('Fighting lizard! scissors should win.', () => {

            const scissors = MEMBERS[0];

            const lizard = MEMBERS[3];

            const battleResult = battle(scissors, lizard);

            expect(battleResult).toBe(scissors);
        });

        test('Fighting spock! scissors should lose.', () => {

            const scissors = MEMBERS[0];

            const spock = MEMBERS[4];

            const battleResult = battle(scissors, spock);

            expect(battleResult).toBe(spock);
        });

        test('Fighting scissors! draw!', () => {

            const scissors = MEMBERS[0];

            const scissors2 = MEMBERS[0];

            const battleResult = battle(scissors, scissors2);

            const draw = false

            expect(battleResult).toBe(draw);
        });

    })

    describe('is paper can beats other ?', () => {

        test('Fighting scissors! paper should lose.', () => {

            const paper = MEMBERS[1];

            const scissors = MEMBERS[0];

            const battleResult = battle(scissors, paper);

            expect(battleResult).toBe(scissors);
        });

        test('Fighting rock! paper should win.', () => {

            const paper = MEMBERS[1];

            const rock = MEMBERS[2];

            const battleResult = battle(paper, rock);

            expect(battleResult).toBe(paper);
        });

        test('Fighting lizard! paper should lose.', () => {

            const paper = MEMBERS[1];

            const lizard = MEMBERS[3];

            const battleResult = battle(paper, lizard);

            expect(battleResult).toBe(lizard);
        });

        test('Fighting spock! paper should win.', () => {

            const paper = MEMBERS[1];

            const spock = MEMBERS[4];

            const battleResult = battle(paper, spock);

            expect(battleResult).toBe(paper);
        });

        test('Fighting paper! draw!', () => {

            const paper = MEMBERS[1];

            const paper2 = MEMBERS[1];

            const battleResult = battle(paper, paper2);

            const draw = false

            expect(battleResult).toBe(draw);
        });

    })
})
