export const EXAMPLE_UUID = "fe0a8810-0981-4d8b-a272-95dd1507230b";

export const NAME_APP = "Teslo";

export const MONTHS = () => [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const formatDateDDMMYYYY = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	if (month < 10) return `${day}-0${month}-${year}`;
	else return `${day}-${month}-${year}`;
};

export const formatDateYYYYMMDD = (date: Date) => {
	let d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	return [year, month, day].join("-");
};

export const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month, 0).getDate();
};
