export const MSG_LENGTH = 50;

// Part indicator
const chunkMessagePrefix = (part, total) => `${part}/${total} `;

// Spit message into chunks (without part indicator) on whitespace
const chunkMessageContent = (message, estTotalChunk) => {
    const chunkContents = [];

    let remainMessage = message;//messgae not push into chunks
    let partNumber = 1;
    let chunkContentSize = MSG_LENGTH - chunkMessagePrefix(partNumber, estTotalChunk).length;

    while (remainMessage.length > chunkContentSize) {
        //Find position to spit message 
        const splitAt = remainMessage.lastIndexOf(' ', chunkContentSize);

        if (splitAt === -1) {
            // No whitespace found, throw error
            throw new Error(
                'Message contains a span of non-whitespace characters too long'
            );
        } else {
            //Get chunk and push to list result
            const chunkContent = remainMessage.slice(0, splitAt);
            chunkContents.push(chunkContent);
            //remain messgae not push into chunks
            remainMessage = remainMessage.slice(splitAt + 1);
        }

        partNumber++;
        chunkContentSize = MSG_LENGTH - chunkMessagePrefix(partNumber, estTotalChunk).length;
    }

    //push last chunk
    chunkContents.push(remainMessage);

    return chunkContents;
}

export const splitMessage = (message) => {
    let msgLen = message.length;
    if (msgLen <= MSG_LENGTH) {//length less than limit, post it as is
        return [message];
    }
    else {  // length exceed limit, need to spit into chunks

        // Esitimate total of chunks 
        let minPrefixLength = chunkMessagePrefix(1, 2).length;
        let estTotalChunk = Math.ceil(msgLen / (MSG_LENGTH - minPrefixLength));
        if (estTotalChunk > 9) {
            //when total chunks > 9, perfix (part indicator) length greater than min prefix length,
            // need restimate total chunks
            // Estimate total of chunks with average length of prefix 
            let avgPrefixLength = chunkMessagePrefix(estTotalChunk / 2, estTotalChunk).length;
            estTotalChunk = Math.ceil(msgLen / (MSG_LENGTH - avgPrefixLength))
        }
        
        // Spit message into chunks (without part indicator) on whitespace
        let chunkMessages = chunkMessageContent(message, estTotalChunk);

        let totalChunk = chunkMessages.length;
        while ((totalChunk > estTotalChunk)
            && (chunkMessagePrefix(1, totalChunk).length > chunkMessagePrefix(1, estTotalChunk).length)) {
            //part indicator length is increased may affects chunk length
            // Spit again with new estimate chunks (total chunks at before split)
            estTotalChunk = totalChunk;
            chunkMessages = chunkMessageContent(message, estTotalChunk);
            totalChunk = chunkMessages.length;
        }

        // Set result includes part indicator and content
        for (let i = 0; i < totalChunk; i++) {
            chunkMessages[i] = chunkMessagePrefix(i + 1, totalChunk) + chunkMessages[i];
        }

        return chunkMessages;
    }
}

export default splitMessage;