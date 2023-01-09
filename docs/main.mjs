console.log("Hello World");

let rows = [
	// {
	// 	id: 1,
	// 	first: "Machine",
	// 	last: "One",
	// 	handle: "Some URL",
	// 	inView: true
	// },
	// {
	// 	id: 2,
	// 	first: "Machine",
	// 	last: "Two",
	// 	handle: "Some URL",
	// 	inView: true
	// },
	// {
	// 	id: 3,
	// 	first: "Machine",
	// 	last: "Three",
	// 	handle: "Some URL",
	// 	inView: true
	// },
	// {
	// 	id: 4,
	// 	first: "Tester",
	// 	last: " Four",
	// 	handle: "Some URL",
	// 	inView: true
	// }
	{}

]

function parseCatalogue(toParse){
	const firstSplit = toParse.split(/\r?\n/);
	// console.log(firstSplit)
	const numRows = firstSplit.length;

	for (let i = 1; i < numRows; i++){
		// let currentInnovation = firstSplit[i].split(',');
		let currentInnovation = firstSplit[i].match(/("[^"]*")|[^,]+/g);
		console.log(currentInnovation)
		rows[i] = {
			id: i,
			name: currentInnovation[0],
			Description: currentInnovation[2].replace(/["]+/g, ''),
			TRL: currentInnovation[3],
			Tags: currentInnovation[4].replace(/["]+/g, ''),
			link: currentInnovation[1],
			inView: true
		}


	}
}

async function getCatalogue() {
	let rawCat
	const response = await fetch('./Link_catalogue.csv')
	// mode: 'cors'`
	rawCat = await response.text()

	// await parseCatalogue(rawCat, 37)

	// updateTable()
	return rawCat
}

console.log(parseCatalogue(await getCatalogue(), 37));
getCatalogue();





const btn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-term")
const selectInput = document.getElementById("selectInput")
var currentVal = 5

const updateTable = () => {

	const table = document.getElementById("table-data")
	console.log(table)

	let html = ``
	for (const row of rows) {
		if (row.inView) {
			html += `<tr>`
			html += `<td>${row.id}</td>`
			html += `<td>${row.name}</td>`
			html += `<td>${row.Description}</td>`
			html += `<td>${row.TRL}</td>`
			html += `<td>${row.Tags}</td>`
			html += `<td>${row.link}</td>`
			html += `</tr>`
		}
	}
	table.innerHTML = html
}

const onSearch = () => {
	console.log("Search")
	const searchTerm = searchInput.value
	console.log(searchTerm)
	for (let j = 1; j < rows.length; j++) {
		// const flag = row.last.includes(searchTerm)
		console.log(rows[j])
		const flag = rows[j].Tags.includes(searchTerm) && rows[j].TRL > currentVal

		console.log(flag, rows[j])
		if (flag) {
			console.log(rows[j])
			rows[j].inView = true
		} else {
			rows[j].inView = false
		}
	}
	updateTable()
}


// Add listeners
btn.addEventListener("click", onSearch)
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
		onSearch()
    }
})

selectInput.addEventListener("input", function(event){
	console.log(event)
	currentVal = selectInput.value
	console.log(currentVal)
	document.getElementById('output').innerHTML = currentVal
}
)
selectInput.addEventListener("input", () => {
	setBubble(range, bubble);
}
)
function setBubble(selectInput, bubble) {
	// var val = selectInput.value;
	const min = selectInput.min ? selectInput.min : 0;
	const max = selectInput.max ? selectInput.max : 100;
	const newVal = Number(((currentVal - min) * 100) / (max - min));
	bubble.innerHTML = currentVal;
  
	// Sorta magic numbers based on size of the native UI thumb
	bubble.style.left = newVal = "%";
  }

updateTable();