export interface UserI {
	id?: number;
	firstName: string;
	secondName: string;
	surname: string;
	secondSurName: string;
	TypesDocument: number | string;
	documentNumber: string;
	email: string;
	password?: string;
	rol?: number | string;
	phone: string;
	state: boolean;
}