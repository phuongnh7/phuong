import { MSG_LENGTH, splitMessage } from "./TwitMessage";
export const shortMsg = "This is a message less than 50 characters";
export const msgHasLenEqLimit = "It is a message has length equals to 50 characters";
export const twoChunkMsg = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.";
export const tenChunkMsg = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. (Two) I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. (There) I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. (Four) I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. (Five) End message";
export const noSpaceLongMsg = "Test spilt long message with no space. LongMessageWithNoSapceLongLongMessageWithNoSapceLongLongMessageWithNoSapce";

const verifyEachChunktLen = (chunkMessages) => {
    let totalMsg = chunkMessages.length;
    for (let i = 0; i < totalMsg; i++) {
        expect(chunkMessages[i].length).toBeLessThanOrEqual(MSG_LENGTH);
    }
}

describe('Tests split message function', () => {
    test('Short message', () => {
        const chunkMessages = splitMessage(shortMsg);

        expect(chunkMessages.length).toBe(1);
        expect(chunkMessages).toEqual([shortMsg]);

        expect(chunkMessages[0]).toBe(shortMsg);
        expect(chunkMessages[0].length).toBeLessThan(MSG_LENGTH);
    });

    test('Message equals to limit', () => {
        const chunkMessages = splitMessage(msgHasLenEqLimit);

        expect(chunkMessages.length).toBe(1);
        expect(chunkMessages).toEqual([msgHasLenEqLimit]);

        expect(chunkMessages[0]).toBe(msgHasLenEqLimit);
        expect(chunkMessages[0].length).toBe(MSG_LENGTH);
    });

    test('Message split to two part', () => {
        const chunkMessages = splitMessage(twoChunkMsg);
        expect(chunkMessages.length).toBe(2);
        expect(chunkMessages[0]).toBe("1/2 I can't believe Tweeter now supports chunking");
        expect(chunkMessages[1]).toBe("2/2 my messages, so I don't have to do it myself.");
        verifyEachChunktLen(chunkMessages);
    });

    test('Message split to ten part', () => {
        const chunkMessages = splitMessage(tenChunkMsg);
        expect(chunkMessages.length).toBe(10);
        expect(chunkMessages[0]).toBe("1/10 I can't believe Tweeter now supports chunking");
        expect(chunkMessages[1]).toBe("2/10 my messages, so I don't have to do it myself.");
        verifyEachChunktLen(chunkMessages);
    });

    test('Message split to more than ten part', () => {
        const chunkMessages = splitMessage(tenChunkMsg + twoChunkMsg);
        expect(chunkMessages.length).toBe(12);
        expect(chunkMessages[0]).toBe("1/12 I can't believe Tweeter now supports chunking");
        expect(chunkMessages[1]).toBe("2/12 my messages, so I don't have to do it myself.");
        verifyEachChunktLen(chunkMessages);
    });

    test('throws on splitMessage', () => {
        expect(() => {
            splitMessage(noSpaceLongMsg);
        }).toThrow();
    });

    test('Very long message ', () => {
        let veryLongMsg;
        for (let i = 0; i < 11; i++) {
            veryLongMsg += tenChunkMsg + ' ';
        }
        const chunkMessages = splitMessage(veryLongMsg);

        expect(chunkMessages.length).toBeGreaterThan(100);
        verifyEachChunktLen(chunkMessages);
    });
});