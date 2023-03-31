export interface UserI {
	id?: number;
	firstName: string;
	secondName: string;
	surname: string;
	secondSurName: string;
	typeDocument: number | string;
	documentNumber: string;
	email: string;
	password?: string;
	rol?: number | string;
	phone: string;
	state?: boolean;
}

export interface OptionI {
	id?: number;
	option: string;
	iscorrect?: boolean;
}

export interface QuestionI {
	id?: number;
	question: string;
	options?: OptionI[];
}