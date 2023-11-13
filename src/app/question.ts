export class Question {

    constructor(
        public qId: number,
        public genre: string,
        public ques: string,
        public optionA: string,
        public optionB: string,
        public optionC: string,
        public optionD: string,
        public imagePath: string,
        public createdTs: Date,
        public lastUpdatedTs: Date
    ) {
    }
}
